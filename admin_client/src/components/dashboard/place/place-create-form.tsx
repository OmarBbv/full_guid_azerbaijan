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

import { createPlaceSchema, type CreatePlaceFormValues } from './place-schema';
import { useCreatePlace, useUploadPlaceImages } from '@/hooks/use-places';
import { PlaceType, PlaceStatus } from '@/types/restaurant';
import { paths } from '@/paths';
import { formatPhoneNumber } from '@/lib/format-phone';

const placeTypeLabels: Record<PlaceType, string> = {
  [PlaceType.RESTAURANT]: 'Restoran',
  [PlaceType.HOTEL]: 'Otel',
  [PlaceType.HOSTEL]: 'Hostel',
  [PlaceType.LANDMARK]: 'Tarixi və Mədəni',
  [PlaceType.NATURE]: 'Təbiət',
  [PlaceType.ENTERTAINMENT]: 'Əyləncə',
  [PlaceType.MUSEUM]: 'Muzey',
  [PlaceType.OTHER]: 'Digər',
};

const selectablePlaceTypes = [
  PlaceType.LANDMARK,
  PlaceType.NATURE,
  PlaceType.ENTERTAINMENT,
  PlaceType.MUSEUM,
  PlaceType.OTHER,
];

export function PlaceCreateForm(): React.JSX.Element {
  const router = useRouter();
  const { mutate: createPlace, isPending, isError, error } = useCreatePlace();
  const { mutateAsync: uploadImages } = useUploadPlaceImages();
  const [images, setImages] = React.useState<File[]>([]);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } =
    useForm<CreatePlaceFormValues>({
      resolver: zodResolver(createPlaceSchema) as any,
      defaultValues: {
        title: '',
        slug: '',
        short_description: '',
        detailed_description: '',
        subtitle: '',
        accent_color: '#3b9cf5',
        whatsapp_number: '',
        phone_number: '',
        email: '',
        city: '',
        address: '',
        google_maps_url: '',
        type: PlaceType.LANDMARK,
        is_featured: false,
        show_in_hero: false,
        language: 'az',
        status: PlaceStatus.ACTIVE,
      },
    });

  const titleValue = watch('title');
  const isHero = watch('show_in_hero');
  React.useEffect(() => {
    const slug = titleValue
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setValue('slug', slug);
  }, [titleValue, setValue]);

  const handleFillTestData = () => {
    setValue('title', 'İçərişəhər');
    setValue('subtitle', 'Bakının Qədim Qəlbi');
    setValue('accent_color', '#e64a19');
    setValue('short_description', 'Bakının mərkəzində yerləşən tarixi-memarlıq qoruğu.');
    setValue('detailed_description', 'İçərişəhər Bakının ən qədim hissəsi olmaqla yanaşı, həm də UNESCO-nun Ümumdünya İrsi siyahısına daxil edilmişdir.');
    setValue('whatsapp_number', '+994 50 123 45 67');
    setValue('phone_number', '+994 12 492 11 62');
    setValue('email', 'info@icherisheher.az');
    setValue('city', 'Bakı');
    setValue('address', 'İçərişəhər, Səbail rayonu');
    setValue('type', PlaceType.LANDMARK);
    setValue('is_featured', true);
    setValue('show_in_hero', true);
  };

  function onSubmit(values: CreatePlaceFormValues) {
    createPlace(values, {
      onSuccess: async (place) => {
        if (images.length > 0) {
          const formData = new FormData();
          images.forEach((image) => formData.append('images', image));
          try {
            await uploadImages({ id: place.id, formData });
          } catch (err) {
            console.error('Image upload error:', err);
          }
        }
        router.push(paths.dashboard.places);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.places)}>
            Geri
          </Button>
          <Typography variant="h4">Yeni Məkan Əlavə Et</Typography>
        </Stack>

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ?? 'Xəta baş verdi. Yenidən cəhd edin.'}
          </Alert>
        )}

        {/* Basic Info */}
        <Card>
          <CardHeader title="Əsas Məlumatlar" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('title')} label="Məkanın adı" fullWidth required error={Boolean(errors.title)} helperText={errors.title?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('slug')} label="Slug (URL)" fullWidth required InputLabelProps={{ shrink: Boolean(watch('slug')) || undefined }} error={Boolean(errors.slug)} helperText={errors.slug?.message ?? 'Avtomatik yaradılır'} />
              </Grid>
              {isHero && (
                <React.Fragment>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField {...register('subtitle')} label="Şüar (Alt Başlıq)" placeholder="Məs: Şərqin Paris'i" fullWidth error={Boolean(errors.subtitle)} helperText={errors.subtitle?.message} InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      name="accent_color"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Vurğu Rəngi (Accent)"
                          fullWidth
                          error={Boolean(errors.accent_color)}
                          helperText={errors.accent_color?.message ?? 'Hero dizaynında işlənəcək'}
                          InputLabelProps={{ shrink: true }}
                          placeholder="#3b9cf5"
                          InputProps={{
                            startAdornment: (
                              <Box
                                component="input"
                                type="color"
                                value={field.value || '#3b9cf5'}
                                onChange={field.onChange}
                                sx={{
                                  width: 32,
                                  height: 32,
                                  p: 0,
                                  border: 'none',
                                  borderRadius: 1,
                                  cursor: 'pointer',
                                  bgcolor: 'transparent',
                                  mr: 1.5,
                                  '&::-webkit-color-swatch-wrapper': { p: 0 },
                                  '&::-webkit-color-swatch': { border: 'none', borderRadius: '4px' }
                                }}
                              />
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                </React.Fragment>
              )}
              <Grid size={{ xs: 12 }}>
                <TextField {...register('short_description')} label="Qısa təsvir" fullWidth required multiline rows={3} error={Boolean(errors.short_description)} helperText={errors.short_description?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('detailed_description')} label="Ətraflı təsvir" fullWidth multiline rows={5} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Categories / Type */}
        <Card>
          <CardHeader title="Məkan Növü və Xüsusiyyətləri" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={Boolean(errors.type)}>
                      <InputLabel>Məkan növü</InputLabel>
                      <Select {...field} label="Məkan növü">
                        {selectablePlaceTypes.map((value) => (
                          <MenuItem key={value} value={value}>{placeTypeLabels[value]}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      label="Seçilmiş (Featured)"
                      sx={{ mt: 1 }}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="show_in_hero"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                      label="Hero-da göstər"
                      sx={{ mt: 1 }}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
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
            </Grid>
          </CardContent>
        </Card>

        {/* Contact & Location */}
        <Card>
          <CardHeader title="Əlaqə və Ünvan Bilgiləri" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="whatsapp_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                      onFocus={(e) => {
                        if (!e.target.value) field.onChange('+994 ');
                      }}
                      label="WhatsApp nömrəsi"
                      fullWidth
                      required
                      placeholder="+994 50 123 45 67"
                      error={Boolean(errors.whatsapp_number)}
                      helperText={errors.whatsapp_number?.message ?? 'Nümunə: +994 xx xxx xx xx'}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                      onFocus={(e) => {
                        if (!e.target.value) field.onChange('+994 ');
                      }}
                      label="Telefon nömrəsi"
                      fullWidth
                      placeholder="+994 50 123 45 67"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('email')} label="E-poçt" type="email" fullWidth error={Boolean(errors.email)} helperText={errors.email?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('city')} label="Şəhər" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('address')} label="Ünvan" fullWidth required error={Boolean(errors.address)} helperText={errors.address?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('google_maps_url')} label="Google Maps URL" fullWidth error={Boolean(errors.google_maps_url)} helperText={errors.google_maps_url?.message} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Images */}
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

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="text" color="info" onClick={handleFillTestData}>Test Məlumatlarını Doldur</Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={() => router.push(paths.dashboard.places)}>Ləğv et</Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? 'Saxlanılır...' : 'Məkanı Yadda Saxla'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </form>
  );
}
