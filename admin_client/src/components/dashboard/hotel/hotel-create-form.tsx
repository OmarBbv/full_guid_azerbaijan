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

import { createHotelSchema, type CreateHotelFormValues } from './hotel-schema';
import { useCreateHotel, useUploadHotelImages } from '@/hooks/use-hotels';
import { HotelType } from '@/types/hotel';
import { paths } from '@/paths';
import { PlaceStatus } from '@/types/restaurant';
import { formatPhoneNumber } from '@/lib/format-phone';
import { CitySelect } from '@/components/core/city-select';

const hotelTypeLabels: Record<HotelType, string> = {
  [HotelType.HOTEL]: 'Otel',
  [HotelType.BOUTIQUE]: 'Butik Otel',
  [HotelType.RESORT]: 'Resort',
  [HotelType.VILLA]: 'Villa',
  [HotelType.APARTMENT]: 'Apart',
};

export function HotelCreateForm(): React.JSX.Element {
  const router = useRouter();
  const { mutate: createHotel, isPending, isError, error } = useCreateHotel();
  const { mutateAsync: uploadImages } = useUploadHotelImages();
  const [images, setImages] = React.useState<File[]>([]);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } =
    useForm<CreateHotelFormValues>({
      resolver: zodResolver(createHotelSchema) as any,
      defaultValues: {
        title: '',
        slug: '',
        short_description: '',
        whatsapp_number: '',
        hotel_type: HotelType.HOTEL,
        star_rating: 3,
        check_in_time: '14:00',
        check_out_time: '12:00',
        has_wifi: false,
        has_parking: false,
        has_pool: false,
        has_spa: false,
        has_gym: false,
        has_restaurant: false,
        has_room_service: false,
        has_airport_transfer: false,
        pets_allowed: false,
        accepts_cards: true,
        is_featured: false,
        address: '',
        google_maps_url: '',
        language: 'az',
        status: PlaceStatus.ACTIVE,
      },
    });

  const titleValue = watch('title');
  React.useEffect(() => {
    const slug = titleValue
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setValue('slug', slug);
  }, [titleValue, setValue]);

  function fillTestData() {
    const langs = ['az', 'en', 'ru', 'tr', 'ar', 'hi'] as const;
    const lang = langs[Math.floor(Math.random() * langs.length)];
    const names = [
      'Baku Palace Hotel', 'Caspian Grand Resort', 'Old City Boutique Hotel',
      'Abseron Hotel Baku', 'Four Seasons Baku', 'Hilton Baku', 'JW Marriott Baku'
    ];
    const name = names[Math.floor(Math.random() * names.length)];
    setValue('title', name);
    setValue('short_description', 'Hər zəvqə uyğun məkanlar, premium xidmət və unutulmaz təcrübə ilə Bakının mərkəzində yerləşən lüks oteli.');
    setValue('whatsapp_number', '+994 50 123 45 67');
    setValue('city', 'Bakı');
    setValue('address', 'İstiqaliyyət küçəsi 1, Bakı, Azərbaycan');
    setValue('hotel_type', HotelType.HOTEL);
    setValue('star_rating', 5);
    setValue('total_rooms', 120);
    setValue('price_from_azn', 150);
    setValue('price_to_azn', 450);
    setValue('check_in_time', '14:00');
    setValue('check_out_time', '12:00');
    setValue('has_wifi', true);
    setValue('has_parking', true);
    setValue('has_pool', true);
    setValue('has_spa', true);
    setValue('has_gym', true);
    setValue('has_restaurant', true);
    setValue('has_room_service', true);
    setValue('has_airport_transfer', true);
    setValue('pets_allowed', false);
    setValue('accepts_cards', true);
    setValue('is_featured', true);
    setValue('language', lang);
  }

  function onSubmit(values: CreateHotelFormValues) {
    createHotel(values, {
      onSuccess: async (hotel) => {
        if (images.length > 0) {
          const formData = new FormData();
          images.forEach((image) => formData.append('images', image));
          try {
            await uploadImages({ id: hotel.id, formData });
          } catch (err) {
            console.error('Image upload error:', err);
          }
        }
        router.push(paths.dashboard.hotels);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.hotels)}>
            Geri
          </Button>
          <Typography variant="h4">Yeni Otel Əlavə Et</Typography>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={fillTestData}
            sx={{ fontWeight: 700, borderStyle: 'dashed' }}
          >
            🧪 Test Məlumatlarını Doldur
          </Button>
        </Stack>

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ?? 'Xəta baş verdi.'}
          </Alert>
        )}

        {/* Basic Info */}
        <Card>
          <CardHeader title="Əsas Məlumatlar" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('title')} label="Otelin adı" fullWidth required error={Boolean(errors.title)} helperText={errors.title?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('slug')} label="Slug (URL)" fullWidth required InputLabelProps={{ shrink: Boolean(watch('slug')) || undefined }} error={Boolean(errors.slug)} helperText={errors.slug?.message ?? 'Avtomatik yaranılır'} />
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
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('short_description')} label="Qısa təsvir" fullWidth required multiline rows={3} error={Boolean(errors.short_description)} helperText={errors.short_description?.message} />
              </Grid>
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
                      placeholder="+994 50 123 45 67"
                      error={Boolean(errors.whatsapp_number)}
                      helperText={errors.whatsapp_number?.message ?? 'Nümunə: +994 xx xxx xx xx'}
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
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('address')} label="Ünvan" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('google_maps_url')} label="Google Maps URL" fullWidth error={Boolean(errors.google_maps_url)} helperText={errors.google_maps_url?.message} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Hotel Details */}
        <Card>
          <CardHeader title="Otel Xüsusiyyətləri" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="hotel_type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Otel növü</InputLabel>
                      <Select {...field} label="Otel növü">
                        {Object.entries(hotelTypeLabels).map(([v, l]) => (
                          <MenuItem key={v} value={v}>{l}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('star_rating')} label="Ulduz sayı (1-5)" type="number" fullWidth inputProps={{ min: 1, max: 5 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} error={Boolean(errors.star_rating)} helperText={errors.star_rating?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('total_rooms')} label="Otaq sayı" type="number" fullWidth inputProps={{ min: 1 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField {...register('price_from_azn')} label="Qiymət (min AZN)" type="number" fullWidth inputProps={{ min: 0 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField {...register('price_to_azn')} label="Qiymət (max AZN)" type="number" fullWidth inputProps={{ min: 0 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField {...register('check_in_time')} label="Check-in vaxtı" type="time" fullWidth InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField {...register('check_out_time')} label="Check-out vaxtı" type="time" fullWidth InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader title="İmkanlar" />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              {(
                [
                  { name: 'has_wifi' as const, label: 'Wi-Fi' },
                  { name: 'has_parking' as const, label: 'Dayanacaq' },
                  { name: 'has_pool' as const, label: 'Hovuz' },
                  { name: 'has_spa' as const, label: 'SPA' },
                  { name: 'has_gym' as const, label: 'İdman salonu' },
                  { name: 'has_restaurant' as const, label: 'Restoran' },
                  { name: 'has_room_service' as const, label: 'Otaq xidməti' },
                  { name: 'has_airport_transfer' as const, label: 'Hava limanı transferi' },
                  { name: 'pets_allowed' as const, label: 'Ev heyvanları qəbul edilir' },
                  { name: 'accepts_cards' as const, label: 'Kart qəbul edir' },
                  { name: 'is_featured' as const, label: 'Seçilmiş (featured)' },
                ]
              ).map(({ name, label }) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={name}>
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                        label={label}
                      />
                    )}
                  />
                </Grid>
              ))}
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
                  // Reset the input value so the same file can be selected again if it's removed
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={() => router.push(paths.dashboard.hotels)}>Ləğv et</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Saxlanılır...' : 'Otel Əlavə Et'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
