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
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { useCreateCity, useUploadCityImages } from '@/hooks/use-cities';
import { paths } from '@/paths';
import type { CreateCityDto } from '@/types/city';

type FormValues = CreateCityDto;

export function CityCreateForm(): React.JSX.Element {
  const router = useRouter();
  const { mutate: createCity, isPending, isError, error } = useCreateCity();
  const { mutateAsync: uploadImages } = useUploadCityImages();

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } =
    useForm<FormValues>({
      defaultValues: {
        name: '',
        slug: '',
        language: 'az',
        country_code: 'AZ',
        google_maps_url: '',
        is_active: true,
        is_featured: false,
        sort_order: 0,
        highlights: [],
      },
    });

  const nameValue = watch('name');
  React.useEffect(() => {
    const slug = nameValue
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setValue('slug', slug);
  }, [nameValue, setValue]);

  const [highlightsRaw, setHighlightsRaw] = React.useState('');

  const [attractions, setAttractions] = React.useState<Array<{ name: string; type: string }>>([]);
  const [newAttractionName, setNewAttractionName] = React.useState('');
  const [newAttractionType, setNewAttractionType] = React.useState('');

  // Image states
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = React.useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = React.useState<File[]>([]);

  function addAttraction() {
    if (newAttractionName && newAttractionType) {
      setAttractions([...attractions, { name: newAttractionName, type: newAttractionType }]);
      setNewAttractionName('');
      setNewAttractionType('');
    }
  }

  function removeAttraction(index: number) {
    setAttractions(attractions.filter((_, i) => i !== index));
  }

  function fillTestData() {
    setValue('name', 'Baku');
    setValue('description', 'Azərbaycanın paytaxtı — Xəzər dənizinin sahilindəki canlı şəhər. Şərq və Qərb mədəniyyətlərinin qovuşduğu bu şəhər öz müasir memarlığı və qədim İçərişəhəri ilə tanınır.');
    setValue('google_maps_url', 'https://www.google.com/maps/place/Baku');
    setValue('region', 'Abşeron');
    setValue('country_code', 'AZ');
    setValue('language', 'az');
    setValue('is_active', true);
    setValue('is_featured', true);
    setValue('sort_order', 1);
    setValue('meta_title', 'Bakı - Azərbaycanın Paytaxtı | FullGuide');
    setValue('meta_description', 'Bakı haqqında tam məlumat: tarixi yerlər, gəzməli məkanlar, otellər və maraqlı faktlar.');
    setHighlightsRaw('İçərişəhər, Heydər Əliyev Mərkəzi, Atəşgah, Bakı Bulvarı, Alov Qüllələri');
    setAttractions([
      { name: 'İçərişəhər', type: 'Tarixi Yer' },
      { name: 'Qız Qalası', type: 'Abidə' },
      { name: 'Alov Qüllələri', type: 'Müasir Memarlıq' },
      { name: 'Bulvar', type: 'İstirahət Parkı' }
    ]);
  }

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

    createCity(
      {
        ...values,
        highlights: highlights.length > 0 ? highlights : undefined,
        attractions: attractions.length > 0 ? attractions : undefined
      },
      {
        onSuccess: async (city) => {
          if (imageFile || coverImageFile || galleryFiles.length > 0) {
            const formData = new FormData();
            if (imageFile) formData.append('image', imageFile);
            if (coverImageFile) formData.append('cover_image', coverImageFile);
            if (galleryFiles.length > 0) {
              galleryFiles.forEach((file) => formData.append('gallery', file));
            }
            try {
              await uploadImages({ id: city.id, formData });
            } catch (err) {
              console.error('Image upload error:', err);
            }
          }
          router.push(paths.dashboard.cities);
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.cities)}>
            Geri
          </Button>
          <Typography variant="h4">Yeni Şəhər/Region Əlavə Et</Typography>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={fillTestData}
            sx={{ fontWeight: 700, borderStyle: 'dashed' }}
          >
            🧪 Avtomatik Doldur (Baku)
          </Button>
        </Stack>

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ?? 'Xəta baş verdi.'}
          </Alert>
        )}

        {/* Core Info */}
        <Card>
          <CardHeader title="1. Ümumi Məlumatlar" subheader="Şəhərin adı və əsas təsviri" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('name', { required: 'Şəhərin adı mütləqdir' })}
                  label="Şəhər / Region Adı"
                  fullWidth
                  required
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message ?? "Məsələn: Bakı, Şəki"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('slug', { required: 'URL mütləqdir' })}
                  label="URL (Slug)"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: Boolean(watch('slug')) || undefined }}
                  error={Boolean(errors.slug)}
                  helperText={errors.slug?.message ?? 'Avtomatik yaranır (baku, seki)'}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel required>Məzmun Dili</InputLabel>
                      <Select {...field} label="Məzmun Dili">
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
                  label="Şəhər haqqında ətraflı məlumat"
                  fullWidth
                  multiline
                  rows={6}
                  helperText="Bu mətn regionun ana səhifəsində geniş şəkildə göstəriləcək."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Media (File Uploads) */}
        <Card>
          <CardHeader title="2. Görsellər və Qalereya" subheader="Regionun səhifəsində görünəcək şəkillər" />
          <Divider />
          <CardContent>
            <Grid container spacing={4}>
              {/* Esas Sekil */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Kart Şəkli (Thumbnail)</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Siyahılarda və axtarışda görünən kiçik kvadrat şəkil.
                </Typography>
                <Box
                  sx={{
                    border: '2px dashed var(--mui-palette-neutral-300)',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    bgcolor: 'background.default'
                  }}
                >
                  {imageFile ? (
                    <Stack spacing={2} alignItems="center">
                      <Box sx={{ position: 'relative' }}>
                        <img src={URL.createObjectURL(imageFile)} alt="preview" style={{ maxHeight: 180, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          startIcon={<TrashIcon />}
                          onClick={() => setImageFile(null)}
                          sx={{ mt: 1 }}
                        >
                          Sil
                        </Button>
                      </Box>
                    </Stack>
                  ) : (
                    <Stack spacing={1} alignItems="center">
                      <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'primary.alpha10' }}>
                        <UploadIcon size={32} />
                      </Box>
                      <Button variant="outlined" component="label">
                        Kvadrat Şəkil Seç
                        <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, setImageFile)} />
                      </Button>
                    </Stack>
                  )}
                </Box>
              </Grid>

              {/* Cover Sekil */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Arxa Plan (Cover/Banner)</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Səhifənin ən yuxarısında görünəcək geniş örtük şəkli.
                </Typography>
                <Box
                  sx={{
                    border: '2px dashed var(--mui-palette-neutral-300)',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    bgcolor: 'background.default'
                  }}
                >
                  {coverImageFile ? (
                    <Stack spacing={2} alignItems="center">
                      <Box sx={{ width: '100%' }}>
                        <img src={URL.createObjectURL(coverImageFile)} alt="preview" style={{ maxHeight: 180, borderRadius: 12, width: '100%', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          startIcon={<TrashIcon />}
                          onClick={() => setCoverImageFile(null)}
                          sx={{ mt: 1 }}
                        >
                          Sil
                        </Button>
                      </Box>
                    </Stack>
                  ) : (
                    <Stack spacing={1} alignItems="center">
                      <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'primary.alpha10' }}>
                        <UploadIcon size={32} />
                      </Box>
                      <Button variant="outlined" component="label">
                        Örtük Şəkli Seç (Geniş)
                        <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, setCoverImageFile)} />
                      </Button>
                    </Stack>
                  )}
                </Box>
              </Grid>

              {/* Gallery */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Qalereya Şəkilləri</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Region haqqında daha çox görüntü vermək üçün 10-dək şəkil əlavə edə bilərsiniz.
                </Typography>
                <Box
                  sx={{
                    border: '2px dashed var(--mui-palette-neutral-300)',
                    borderRadius: 2,
                    p: 4,
                    bgcolor: 'background.default'
                  }}
                >
                  <Button variant="contained" component="label" startIcon={<UploadIcon />} sx={{ mb: galleryFiles.length > 0 ? 4 : 0 }}>
                    Çoxlu Şəkil Seç
                    <input type="file" hidden multiple accept="image/*" onChange={handleGalleryChange} />
                  </Button>

                  {galleryFiles.length > 0 && (
                    <Grid container spacing={2}>
                      {galleryFiles.map((f, idx) => (
                        <Grid key={idx} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                          <Box sx={{ position: 'relative', pt: '100%', borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <img
                              src={URL.createObjectURL(f)}
                              alt={`gallery-${idx}`}
                              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                bgcolor: 'rgba(255,255,255,0.8)',
                                borderRadius: '50%',
                                '&:hover': { bgcolor: 'white' }
                              }}
                            >
                              <Button
                                color="error"
                                size="small"
                                onClick={() => removeGalleryFile(idx)}
                                sx={{ minWidth: 'auto', p: 0.5 }}
                              >
                                <TrashIcon size={18} />
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Highlights & Attractions */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="3. Əsas Xüsusiyyətlər (Highlights)" subheader="Vergüllə ayıraraq qısa məlumatlar yazın" />
              <Divider />
              <CardContent>
                <TextField
                  value={highlightsRaw}
                  onChange={(e) => setHighlightsRaw(e.target.value)}
                  label="Xüsusiyyətlər"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Qədim memarlıq, Dəniz sahili, Dadlı mətbəx..."
                  helperText="Hər bir mütəxəssisliyi vergüllə ayırın. Səhifədə nişanlar halında görünəcək."
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="4. Görülməli Yerlər (Attractions)" subheader="Hər məkana xüsusi etiket verin" />
              <Divider />
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Məkan adı"
                      fullWidth
                      value={newAttractionName}
                      onChange={(e) => setNewAttractionName(e.target.value)}
                    />
                    <TextField
                      label="Növü"
                      placeholder="Tarixi, Park və s."
                      fullWidth
                      value={newAttractionType}
                      onChange={(e) => setNewAttractionType(e.target.value)}
                    />
                    <Button variant="contained" onClick={addAttraction} sx={{ minWidth: 100 }}>Əlavə Et</Button>
                  </Stack>

                  <Divider />

                  <Stack spacing={1}>
                    {attractions.length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', py: 2 }}>
                        Heç bir məkan əlavə edilməyib.
                      </Typography>
                    )}
                    {attractions.map((attr, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 1.5,
                          bgcolor: 'background.default',
                          borderRadius: 1,
                          border: '1px solid var(--mui-palette-neutral-200)'
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2">{attr.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{attr.type}</Typography>
                        </Box>
                        <Button color="error" size="small" onClick={() => removeAttraction(idx)}>
                          <TrashIcon />
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Location & SEO */}
        <Card>
          <CardHeader title="5. Koordinatlar və SEO" subheader="Xəritədə yerləşmə və axtarış motoru tənzimləmələri" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register('google_maps_url')}
                  label="Google Maps URL"
                  fullWidth
                  helperText="Məs: https://www.google.com/maps/..."
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField {...register('region')} label="Hansi Bölgədə yerləşir?" fullWidth placeholder="Məs: Abşeron" />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  {...register('meta_title')}
                  label="Meta Başlıq (SEO)"
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register('meta_description')}
                  label="Meta Təsvir (SEO)"
                  fullWidth
                  multiline
                  rows={2}
                  helperText="Google axtarışlarında çıxacaq qısa mətn."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader title="6. Status və Parametrlər" />
          <Divider />
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                      label="Saytda göstərilsin (Aktiv)"
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
                      label="Əsas səhifədə göstər (Featured)"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('sort_order')}
                  label="Sıralama nömrəsi"
                  type="number"
                  fullWidth
                  helperText="Kiçik rəqəmlər siyahıda önə keçir."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pb: 4 }}>
          <Button size="large" variant="outlined" onClick={() => router.push(paths.dashboard.cities)}>
            Ləğv et
          </Button>
          <Button size="large" type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Saxlanılır...' : 'Regionu Yadda Saxla'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
