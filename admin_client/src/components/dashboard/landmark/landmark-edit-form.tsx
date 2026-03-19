'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { createLandmarkSchema, type CreateLandmarkFormValues } from './landmark-schema';
import { useLandmark, useUpdateLandmark, useUploadLandmarkImages, LANDMARK_KEYS } from '@/hooks/use-landmarks';
import { paths } from '@/paths';
import { PlaceStatus } from '@/types/restaurant';
import { formatPhoneNumber } from '@/lib/format-phone';
import { CitySelect } from '@/components/core/city-select';

interface LandmarkEditFormProps {
  id: string;
}

export function LandmarkEditForm({ id }: LandmarkEditFormProps): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: landmark, isLoading: isFetching, isError: isFetchError } = useLandmark(id);
  const { mutate: updateLandmark, isPending: isUpdating, isError, error } = useUpdateLandmark(id);
  const { mutateAsync: uploadImages, isPending: isUploading } = useUploadLandmarkImages();
  
  const [images, setImages] = React.useState<File[]>([]);
  
  const isPending = isUpdating || isUploading;

  const { control, register, handleSubmit, formState: { errors }, watch, setValue, reset } =
    useForm<CreateLandmarkFormValues>({
      resolver: zodResolver(createLandmarkSchema) as any,
      defaultValues: {
        title: '',
        slug: '',
        short_description: '',
        detailed_description: '',
        whatsapp_number: '',
        phone_number: '',
        email: '',
        address: '',
        google_maps_url: '',
        city: '',
        thumbnail: '',
        is_featured: false,
        show_in_hero: false,
        language: 'az',
        status: PlaceStatus.ACTIVE,
      },
    });

  React.useEffect(() => {
    if (landmark && landmark.place) {
      reset({
        title: landmark.place.title || '',
        slug: landmark.place.slug || '',
        short_description: landmark.place.short_description || '',
        detailed_description: landmark.place.detailed_description || '',
        whatsapp_number: landmark.place.whatsapp_number || '',
        phone_number: landmark.place.phone_number || '',
        email: landmark.place.email || '',
        address: landmark.place.address || '',
        google_maps_url: (landmark.place as any).google_maps_url || '',
        city: landmark.place.city || '',
        thumbnail: landmark.place.thumbnail || '',
        is_featured: landmark.place.is_featured || false,
        show_in_hero: landmark.place.show_in_hero || false,
        language: (landmark.place as any).language || 'az',
        status: landmark.place.status || PlaceStatus.ACTIVE,
      });
    }
  }, [landmark, reset]);

  const titleValue = watch('title');
  React.useEffect(() => {
    if (titleValue && landmark && titleValue !== landmark.place?.title) {
        const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
        setValue('slug', slug);
    }
  }, [titleValue, landmark, setValue]);

  const handleDeleteExistingImage = async (imageId: string) => {
    try {
      const { apiClient } = await import('@/lib/api-client');
      await apiClient.delete(`/places/images/${imageId}`);
      queryClient.invalidateQueries({ queryKey: LANDMARK_KEYS.detail(id) });
    } catch (err) {
      console.error('Failed to delete image', err);
    }
  };

  function onSubmit(values: CreateLandmarkFormValues) {
    updateLandmark(values, {
      onSuccess: async () => {
        if (images.length > 0) {
          const formData = new FormData();
          images.forEach((image) => formData.append('images', image));
          try {
            await uploadImages({ id, formData });
          } catch (err) {
            console.error('Image upload error:', err);
          }
        }
        router.push(paths.dashboard.landmarks);
      },
    });
  }

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isFetchError || !landmark) {
    return <Alert severity="error">Landmark tapılmadı və ya xəta baş verdi.</Alert>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={() => router.push(paths.dashboard.landmarks)}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h4">Landmarkı Redaktə Et</Typography>
        </Stack>

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ?? 'Xəta baş verdi.'}
          </Alert>
        )}

        <Card>
          <CardHeader title="Əsas Məlumatlar" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('title')} label="Landmark adı" fullWidth required error={Boolean(errors.title)} helperText={errors.title?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('slug')} label="Slug (URL)" fullWidth required InputLabelProps={{ shrink: true }} error={Boolean(errors.slug)} helperText={errors.slug?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Məzmun dili</InputLabel>
                      <Select {...field} label="Məzmun dili" disabled>
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
                <TextField {...register('short_description')} label="Qısa təsvir" fullWidth required multiline rows={2} error={Boolean(errors.short_description)} helperText={errors.short_description?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('detailed_description')} label="Ətraflı təsvir" fullWidth multiline rows={4} error={Boolean(errors.detailed_description)} helperText={errors.detailed_description?.message} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="whatsapp_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                      label="WhatsApp nömrəsi"
                      fullWidth
                      
                      placeholder="+994 50 123 45 67"
                      error={Boolean(errors.whatsapp_number)}
                      helperText={errors.whatsapp_number?.message}
                    />
                  )}
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
                      error={Boolean(errors.city)}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('address')} label="Ünvan" fullWidth required error={Boolean(errors.address)} helperText={errors.address?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('google_maps_url')} label="Google Maps URL" fullWidth error={Boolean(errors.google_maps_url)} helperText={errors.google_maps_url?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select {...field} label="Status">
                        <MenuItem value={PlaceStatus.ACTIVE}>Aktiv</MenuItem>
                        <MenuItem value={PlaceStatus.PENDING}>Gözləmədə</MenuItem>
                        <MenuItem value={PlaceStatus.INACTIVE}>Deaktiv</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Seçimlər" />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="is_featured"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                      label="Seçilmiş Məkan"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="show_in_hero"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                      label="Hero-da Göstər"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Şəkillər" />
          <Divider />
          <CardContent>
            <Stack spacing={3}>
              {landmark.place?.images && landmark.place.images.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Mövcud Şəkillər</Typography>
                  <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
                    {landmark.place.images.map((img: any) => (
                      <Box key={img.id} sx={{ width: 100, height: 100, borderRadius: 1, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                        <img src={img.url} alt="landmark" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <IconButton
                            size="small"
                            onClick={() => handleDeleteExistingImage(img.id)}
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              bgcolor: 'background.paper',
                              width: 20,
                              height: 20,
                              '&:hover': { bgcolor: 'error.main', color: 'white' },
                            }}
                          >
                            <TrashIcon size={12} weight="bold" />
                          </IconButton>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              <Box>
                <Typography variant="subtitle2" gutterBottom>Yeni Şəkillər Əlavə Et</Typography>
                <Button variant="outlined" component="label">
                  Şəkil Seç
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setImages((prev) => [...prev, ...files]);
                      e.target.value = '';
                    }}
                  />
                </Button>
                {images.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">{images.length} yeni şəkil seçildi</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1, overflowX: 'auto', py: 1 }}>
                      {images.map((img, idx) => (
                        <Box key={`${img.name}-${idx}`} sx={{ width: 80, height: 80, borderRadius: 1, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`preview-${idx}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              bgcolor: 'background.paper',
                              width: 20,
                              height: 20,
                              '&:hover': { bgcolor: 'background.paper' },
                            }}
                          >
                            <XIcon size={12} weight="bold" />
                          </IconButton>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={() => router.push(paths.dashboard.landmarks)}>Ləğv et</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Saxlanılır...' : 'Dəyişiklikləri Yadda Saxla'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
