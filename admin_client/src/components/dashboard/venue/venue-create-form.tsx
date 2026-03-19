'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { venueSchema, VENUE_LANGUAGES, type VenueFormValues } from './venue-schema';
import { useCreateVenue } from '@/hooks/use-venues';
import { useCategories } from '@/hooks/use-categories';
import { paths } from '@/paths';
import { VenueStatus } from '@/types/venue';
import { apiClient } from '@/lib/api-client';
import { CitySelect } from '@/components/core/city-select';

export function VenueCreateForm(): React.JSX.Element {
  const router = useRouter();
  const [isUploading, setIsUploading] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const { mutate: createVenue, isPending, isError, error } = useCreateVenue();
  const { data: allCategories = [], isLoading: isLoadingCategories } = useCategories();

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<VenueFormValues>({
    resolver: zodResolver(venueSchema) as any,
    defaultValues: {
      name: '',
      language: 'az',
      description: '',
      categoryId: 0,
      subCategoryId: null,
      address: '',
      city: '',
      googleMapsUrl: '',
      phone: '',
      whatsapp: '',
      website: '',
      thumbnail: '',
      status: VenueStatus.ACTIVE,
    },
  });

  const selectedLanguage = watch('language');
  const selectedCategoryId = watch('categoryId');

  const mainCategories = allCategories.filter(
    (cat) => (!cat.language || cat.language === selectedLanguage) && !cat.parentId
  );

  const subCategories = allCategories.filter(
    (cat) => cat.parentId === selectedCategoryId
  );

  const thumbnailValue = watch('thumbnail');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload immediately
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Content-Type: undefined allows axios to auto-set multipart/form-data with boundary
      const response = await apiClient.post('/upload/image', formData, {
        headers: { 'Content-Type': undefined },
      });
      const resData = response.data;
      // backend returns { status, data: { url } }
      const url = resData?.data?.url ?? resData?.url;
      if (!url) {
        console.error('Upload response unexpected:', resData);
        throw new Error('URL gəlmədi');
      }
      setValue('thumbnail', url);
    } catch (err) {
      console.error('Şəkil yüklənmədi:', err);
      alert('Şəkil yüklənməsində xəta baş verdi');
    } finally {
      setIsUploading(false);
    }
  };

  function onSubmit(values: VenueFormValues) {
    createVenue(values, {
      onSuccess: () => {
        router.push(paths.dashboard.venues);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<ArrowLeftIcon />}
            variant="text"
            onClick={() => router.push(paths.dashboard.venues)}
          >
            Geri
          </Button>
          <Typography variant="h4">Yeni Məkan Əlavə Et</Typography>
        </Stack>

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ?? 'Xəta baş verdi. Yenidən cəhd edin.'}
          </Alert>
        )}

        <Card>
          <CardHeader title="Əsas Məlumatlar" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register('name')}
                  label="Məkanın adı"
                  fullWidth
                  required
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={Boolean(errors.categoryId)}>
                      <InputLabel id="category-label">Kateqoriya</InputLabel>
                      <Select
                        labelId="category-label"
                        {...field}
                        label="Kateqoriya"
                        disabled={isLoadingCategories}
                        onChange={(e) => {
                          field.onChange(e);
                          setValue('subCategoryId', null); // Reset subcategory when category changes
                        }}
                      >
                        <MenuItem value={0} disabled>Seçin</MenuItem>
                        {mainCategories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.categoryId && <FormHelperText>{errors.categoryId.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="subCategoryId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={Boolean(errors.subCategoryId)}>
                      <InputLabel id="subcategory-label">Alt Kateqoriya (Opsiyonel)</InputLabel>
                      <Select
                        labelId="subcategory-label"
                        {...field}
                        label="Alt Kateqoriya (Opsiyonel)"
                        disabled={isLoadingCategories || subCategories.length === 0}
                        value={field.value || ''}
                      >
                        <MenuItem value="">Yoxdur</MenuItem>
                        {subCategories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.subCategoryId && <FormHelperText>{errors.subCategoryId.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register('description')}
                  label="Təsvir"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="language-label">Dil</InputLabel>
                      <Select
                        labelId="language-label"
                        {...field}
                        label="Dil"
                        onChange={(e) => {
                          field.onChange(e);
                          // Reset category when language changes
                          setValue('categoryId', 0);
                        }}
                      >
                        {VENUE_LANGUAGES.map((lang) => (
                          <MenuItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select {...field} label="Status">
                        <MenuItem value={VenueStatus.PENDING}>Gözləmədə (Pending)</MenuItem>
                        <MenuItem value={VenueStatus.ACTIVE}>Aktiv</MenuItem>
                        <MenuItem value={VenueStatus.INACTIVE}>Deaktiv</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Ünvan Məlumatları" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register('address')}
                  label="Ünvan"
                  fullWidth
                  required
                  error={Boolean(errors.address)}
                  helperText={errors.address?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <CitySelect
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      language={watch('language')}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register('googleMapsUrl')}
                  label="Google Maps URL"
                  fullWidth
                  placeholder="https://goo.gl/maps/..."
                  error={Boolean(errors.googleMapsUrl)}
                  helperText={errors.googleMapsUrl?.message}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Əlaqə və Media" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('phone')} label="Telefon" fullWidth placeholder="+994 50 123 45 67" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('whatsapp')} label="WhatsApp nömrəsi" fullWidth placeholder="+994 50 123 45 67" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register('website')}
                  label="Vebsayt"
                  fullWidth
                  error={Boolean(errors.website)}
                  helperText={errors.website?.message}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" gutterBottom>Əsas şəkil (Thumbnail)</Typography>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Yüklənir...' : 'Şəkil seç'}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {previewUrl && (
                    <Box
                      component="img"
                      src={previewUrl}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 1,
                        objectFit: 'cover',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                  )}
                </Stack>
                {errors.thumbnail?.message && (
                  <Typography color="error" variant="caption">
                    {String(errors.thumbnail.message)}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => router.push(paths.dashboard.venues)}
          >
            Ləğv et
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending || isUploading}
          >
            {isPending ? 'Saxlanılır...' : 'Məkanı Yadda Saxla'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
