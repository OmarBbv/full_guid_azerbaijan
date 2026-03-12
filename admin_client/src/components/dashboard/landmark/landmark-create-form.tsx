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
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { createLandmarkSchema, type CreateLandmarkFormValues } from './landmark-schema';
import { useCreateLandmark, useUploadLandmarkImages } from '@/hooks/use-landmarks';
import { paths } from '@/paths';
import { formatPhoneNumber } from '@/lib/format-phone';

export function LandmarkCreateForm(): React.JSX.Element {
  const router = useRouter();
  const { mutate: createLandmark, isPending, isError, error } = useCreateLandmark();
  const { mutateAsync: uploadImages } = useUploadLandmarkImages();
  const [images, setImages] = React.useState<File[]>([]);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } =
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
        city: '',
        thumbnail: '',
        is_featured: false,
        show_in_hero: false,
        language: 'az',
      },
    });

  const titleValue = watch('title');
  React.useEffect(() => {
    if (titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [titleValue, setValue]);

  const handleFillTestData = async () => {
    setValue('title', 'Qız Qalası');
    setValue('short_description', 'Bakının ən qədim və sirli memarlıq abidəsi, UNESCO Ümumdünya İrs siyahısına daxil edilmişdir.');
    setValue('detailed_description', 'Qız Qalası (Bakı qalası) — Bakının dənizkənarı hissəsində, İçərişəhərdə yerləşən qədim qala divarları ilə əhatə olunmuş unikal memarlıq abidəsidir. Hündürlüyü 28 metrdir.');
    setValue('whatsapp_number', '994501234567');
    setValue('city', 'Bakı');
    setValue('address', 'İçərişəhər, Səbail rayonu');
    setValue('is_featured', true);
    setValue('show_in_hero', true);

    try {
      const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      const response = await fetch(`data:image/png;base64,${base64}`);
      const blob = await response.blob();
      const file = new File([blob], 'maiden-tower.png', { type: 'image/png' });
      setImages([file]);
    } catch (e) {
      console.error(e);
    }
  };

  function onSubmit(values: CreateLandmarkFormValues) {
    createLandmark(values as any, {
      onSuccess: async (landmark: any) => {
        if (images.length > 0) {
          const formData = new FormData();
          images.forEach((image) => formData.append('images', image));
          try {
            await uploadImages({ id: landmark.id, formData });
          } catch (err) {
            console.error('Image upload error:', err);
          }
        }
        router.push(paths.dashboard.landmarks);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={() => router.push(paths.dashboard.landmarks)}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h4">Yeni Landmark Əlavə Et</Typography>
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
                <TextField {...register('slug')} label="Slug (URL)" fullWidth required error={Boolean(errors.slug)} helperText={errors.slug?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Məzmun dili</InputLabel>
                      <Select {...field} label="Məzmun dili">
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
                      required
                      placeholder="+994 50 123 45 67"
                      error={Boolean(errors.whatsapp_number)}
                      helperText={errors.whatsapp_number?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('city')} label="Şəhər" fullWidth error={Boolean(errors.city)} helperText={errors.city?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('address')} label="Ünvan" fullWidth required error={Boolean(errors.address)} helperText={errors.address?.message} />
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
                <Typography variant="body2">{images.length} şəkil seçildi</Typography>
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
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="text" color="info" onClick={handleFillTestData}>Test Məlumatlarını Doldur</Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={() => router.push(paths.dashboard.landmarks)}>Ləğv et</Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? 'Saxlanılır...' : 'Landmark Əlavə Et'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </form>
  );
}
