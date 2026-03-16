'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { useCity, useUpdateCity, useUploadCityImages } from '@/hooks/use-cities';
import { paths } from '@/paths';
import type { UpdateCityDto } from '@/types/city';

type FormValues = UpdateCityDto;

interface CityEditFormProps {
  id: string;
}

export function CityEditForm({ id }: CityEditFormProps): React.JSX.Element {
  const router = useRouter();
  const { data: city, isLoading: isFetching, isError: isFetchError } = useCity(id);
  const { mutate: updateCity, isPending: isUpdating, isError, error } = useUpdateCity(id);
  const { mutateAsync: uploadImages, isPending: isUploading } = useUploadCityImages();

  const isPending = isUpdating || isUploading;

  const { register, handleSubmit, watch, setValue, control, formState: { errors }, reset } =
    useForm<FormValues>({});

  const [highlightsRaw, setHighlightsRaw] = React.useState('');

  // Image states
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = React.useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = React.useState<File[]>([]);

  React.useEffect(() => {
    if (city) {
      reset({
        name: city.name,
        slug: city.slug,
        language: city.language ?? 'az',
        description: city.description ?? undefined,
        google_maps_url: (city as any).google_maps_url ?? undefined,
        region: city.region ?? undefined,
        country_code: city.country_code ?? undefined,
        meta_title: city.meta_title ?? undefined,
        meta_description: city.meta_description ?? undefined,
        is_active: city.is_active,
        is_featured: city.is_featured,
        sort_order: city.sort_order,
      });

      if (city.highlights && city.highlights.length > 0) {
        setHighlightsRaw(city.highlights.join(', '));
      } else {
        setHighlightsRaw('');
      }
    }
  }, [city, reset]);

  // Slug avtomatik yaranır (əgər istifadəçi adını dəyişirsə)
  const nameValue = watch('name');
  React.useEffect(() => {
    if (nameValue && city && nameValue !== city.name) {
      const slug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [nameValue, city, setValue]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  }

  function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...newFiles]);
    }
  }

  function removeGalleryFile(index: number) {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function onSubmit(values: FormValues) {
    const highlights = highlightsRaw
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    updateCity(
      { 
        ...values, 
        highlights: highlights.length > 0 ? highlights : undefined 
      },
      {
        onSuccess: async () => {
          if (imageFile || coverImageFile || galleryFiles.length > 0) {
            const formData = new FormData();
            if (imageFile) formData.append('image', imageFile);
            if (coverImageFile) formData.append('cover_image', coverImageFile);
            if (galleryFiles.length > 0) {
              galleryFiles.forEach((file) => formData.append('gallery', file));
            }
            try {
              await uploadImages({ id, formData });
            } catch (err) {
              console.error('Image upload error:', err);
            }
          }
          router.push(paths.dashboard.cities);
        },
      }
    );
  }

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isFetchError || !city) {
    return <Alert severity="error">Belə bir şəhər tapılmadı və ya xəta baş verdi.</Alert>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.cities)}>
            Geri
          </Button>
          <Typography variant="h4">Şəhərə Düzəliş Et</Typography>
        </Stack>

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ?? 'Xəta baş verdi.'}
          </Alert>
        )}

        {/* Core Info */}
        <Card>
          <CardHeader title="Əsas Məlumatlar" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('name', { required: 'Ad tələb olunur' })}
                  label="Şəhər adı"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('slug', { required: 'Slug tələb olunur' })}
                  label="Slug (URL)"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors.slug)}
                  helperText={errors.slug?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel required>Məzmun Dili</InputLabel>
                      <Select {...field} label="Məzmun Dili" disabled>
                        <MenuItem value="az">🇦🇿 Azərbaycan dili</MenuItem>
                        <MenuItem value="en">🇬🇧 English</MenuItem>
                        <MenuItem value="ru">🇷🇺 Русский</MenuItem>
                        <MenuItem value="tr">🇹🇷 Türkçe</MenuItem>
                        <MenuItem value="ar">🇸🇦 العربية</MenuItem>
                        <MenuItem value="hi">🇮🇳 हिन्दी</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register('description')}
                  label="Təsvir (Müəyyən edilmiş dilə uyğun)"
                  fullWidth
                  multiline
                  rows={4}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Media (File Uploads) */}
        <Card>
          <CardHeader title="Görüntülər (Faylları yeniləyin)" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {/* Esas Sekil */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Əsas Şəkil (Profil/Thumbnail)</Typography>
                <Box
                  sx={{
                    border: '1px dashed var(--mui-palette-neutral-300)',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                  }}
                >
                  {imageFile ? (
                    <Stack spacing={1} alignItems="center">
                      <Typography variant="body2">{imageFile.name}</Typography>
                      <img src={URL.createObjectURL(imageFile)} alt="preview" style={{ maxHeight: 150, borderRadius: 8 }} />
                      <Button color="error" size="small" startIcon={<TrashIcon />} onClick={() => setImageFile(null)}>Yenisini Sil</Button>
                    </Stack>
                  ) : city.image_url ? (
                    <Stack spacing={1} alignItems="center">
                      <img src={city.image_url.startsWith('http') ? city.image_url : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${city.image_url}`} alt="current" style={{ maxHeight: 150, borderRadius: 8 }} />
                      <Button variant="outlined" component="label" startIcon={<UploadIcon />} size="small">
                        Şəkli Dəyişdir
                        <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, setImageFile)} />
                      </Button>
                    </Stack>
                  ) : (
                    <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
                      Şəkil Seç
                      <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, setImageFile)} />
                    </Button>
                  )}
                </Box>
              </Grid>

              {/* Cover Sekil */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Örtük Şəkli (Cover/Banner)</Typography>
                <Box
                  sx={{
                    border: '1px dashed var(--mui-palette-neutral-300)',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                  }}
                >
                  {coverImageFile ? (
                    <Stack spacing={1} alignItems="center">
                      <Typography variant="body2">{coverImageFile.name}</Typography>
                      <img src={URL.createObjectURL(coverImageFile)} alt="preview" style={{ maxHeight: 150, borderRadius: 8, width: '100%', objectFit: 'cover' }} />
                      <Button color="error" size="small" startIcon={<TrashIcon />} onClick={() => setCoverImageFile(null)}>Yenisini Sil</Button>
                    </Stack>
                  ) : city.cover_image_url ? (
                    <Stack spacing={1} alignItems="center">
                      <img src={city.cover_image_url.startsWith('http') ? city.cover_image_url : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${city.cover_image_url}`} alt="current" style={{ maxHeight: 150, borderRadius: 8, width: '100%', objectFit: 'cover' }} />
                      <Button variant="outlined" component="label" startIcon={<UploadIcon />} size="small">
                        Örtük Şəklini Dəyişdir
                        <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, setCoverImageFile)} />
                      </Button>
                    </Stack>
                  ) : (
                    <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
                      Örtük Şəkli Seç
                      <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, setCoverImageFile)} />
                    </Button>
                  )}
                </Box>
              </Grid>

              {/* Gallery */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Yardımçı Şəkillər (Qalereya x 10 qədər)</Typography>
                <Box
                  sx={{
                    border: '1px dashed var(--mui-palette-neutral-300)',
                    borderRadius: 1,
                    p: 3,
                  }}
                >
                  <Button variant="outlined" component="label" startIcon={<UploadIcon />} sx={{ mb: (galleryFiles.length > 0 || (city.gallery_urls && city.gallery_urls.length > 0)) ? 3 : 0 }}>
                    Yeni Yardımçı Şəkillər Əlavə Et
                    <input type="file" hidden multiple accept="image/*" onChange={handleGalleryChange} />
                  </Button>
                  
                  <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                    {/* Existing Gallery Files */}
                    {city.gallery_urls && city.gallery_urls.map((url, idx) => (
                      <Box key={`existing-${idx}`} sx={{ position: 'relative', width: 100, height: 100 }}>
                        <img src={url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${url}`} alt={`existing-gallery-${idx}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />
                      </Box>
                    ))}

                    {/* New Selected Gallery Files */}
                    {galleryFiles.map((f, idx) => (
                      <Box key={`new-${idx}`} sx={{ position: 'relative', width: 100, height: 100, border: '2px solid var(--mui-palette-primary-main)', borderRadius: '10px' }}>
                        <img src={URL.createObjectURL(f)} alt={`new-gallery-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                        <Button 
                          color="error" 
                          size="small"
                          onClick={() => removeGalleryFile(idx)}
                          sx={{ position: 'absolute', top: 0, right: 0, minWidth: 'auto', p: 0.5, bgcolor: 'background.paper' }}
                        >
                          <TrashIcon />
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader title="Məkan" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register('google_maps_url')}
                  label="Google Maps URL"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField {...register('region')} label="Bölgə / Rayon" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  {...register('country_code')}
                  label="Ölkə kodu"
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  InputLabelProps={{ shrink: true }}
                  helperText="Nümunə: AZ"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card>
          <CardHeader title="Önə çıxan xüsusiyyətlər (Highlights)" />
          <Divider />
          <CardContent>
            <TextField
              value={highlightsRaw}
              onChange={(e) => setHighlightsRaw(e.target.value)}
              label="Highlights (vergüllə ayır)"
              fullWidth
              multiline
              rows={3}
              placeholder="İçərişəhər, Heydər Əliyev Mərkəzi, Atəşgah"
              helperText={`Hər bir xüsusiyyəti vergüllə ayır. Seçilmiş dil (${watch('language')}) üçün daxil edin`}
            />
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader title="SEO" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register('meta_title')}
                  label="Meta başlıq"
                  fullWidth
                  inputProps={{ maxLength: 255 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register('meta_description')}
                  label="Meta təsvir"
                  fullWidth
                  multiline
                  rows={2}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader title="Parametrlər" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                      label="Aktiv"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="is_featured"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                      label="Öne çıxan (featured)"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('sort_order')}
                  label="Sıralama"
                  type="number"
                  fullWidth
                  inputProps={{ min: 0 }}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  InputLabelProps={{ shrink: true }}
                  helperText="Kiçik rəqəm = öncə göstər"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={() => router.push(paths.dashboard.cities)}>
            Ləğv et
          </Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Saxlanılır...' : 'Dəyişiklikləri Yadda Saxla'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
