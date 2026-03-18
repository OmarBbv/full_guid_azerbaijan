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

import { createHotelSchema, type CreateHotelFormValues } from './hotel-schema';
import { useHotel, useUpdateHotel, useUploadHotelImages, HOTEL_KEYS } from '@/hooks/use-hotels';
import { HotelType } from '@/types/hotel';
import { paths } from '@/paths';
import { PlaceStatus } from '@/types/restaurant';
import { formatPhoneNumber } from '@/lib/format-phone';

interface HotelEditFormProps {
  id: string;
}

const hotelTypeLabels: Record<HotelType, string> = {
  [HotelType.HOTEL]: 'Otel',
  [HotelType.BOUTIQUE]: 'Butik Otel',
  [HotelType.RESORT]: 'Resort',
  [HotelType.VILLA]: 'Villa',
  [HotelType.APARTMENT]: 'Apart',
};

export function HotelEditForm({ id }: HotelEditFormProps): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: hotel, isLoading: isFetching, isError: isFetchError } = useHotel(id);
  const { mutate: updateHotel, isPending: isUpdating, isError, error } = useUpdateHotel(id);
  const { mutateAsync: uploadImages, isPending: isUploading } = useUploadHotelImages();
  
  const [images, setImages] = React.useState<File[]>([]);
  
  const isPending = isUpdating || isUploading;

  const { control, register, handleSubmit, formState: { errors }, watch, setValue, reset } =
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

  React.useEffect(() => {
    if (hotel && hotel.place) {
      reset({
        title: hotel.place.title || '',
        slug: hotel.place.slug || '',
        short_description: hotel.place.short_description || '',
        whatsapp_number: hotel.place.whatsapp_number || '',
        hotel_type: hotel.hotel_type || HotelType.HOTEL,
        star_rating: hotel.star_rating || 3,
        total_rooms: hotel.total_rooms || undefined,
        price_from_azn: hotel.price_from_azn || undefined,
        price_to_azn: hotel.price_to_azn || undefined,
        check_in_time: hotel.check_in_time || '14:00',
        check_out_time: hotel.check_out_time || '12:00',
        has_wifi: hotel.has_wifi || false,
        has_parking: hotel.has_parking || false,
        has_pool: hotel.has_pool || false,
        has_spa: hotel.has_spa || false,
        has_gym: hotel.has_gym || false,
        has_restaurant: hotel.has_restaurant || false,
        has_room_service: hotel.has_room_service || false,
        has_airport_transfer: hotel.has_airport_transfer || false,
        pets_allowed: hotel.pets_allowed || false,
        accepts_cards: hotel.accepts_cards || false,
        is_featured: hotel.place.is_featured || false,
        address: hotel.place.address || '',
        google_maps_url: (hotel.place as any).google_maps_url || '',
        city: hotel.place.city || '',
        language: (hotel.place as any).language || 'az',
        status: hotel.place.status || PlaceStatus.ACTIVE,
      });
    }
  }, [hotel, reset]);

  const titleValue = watch('title');
  React.useEffect(() => {
    if (titleValue && hotel && titleValue !== hotel.place?.title) {
        const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
        setValue('slug', slug);
    }
  }, [titleValue, hotel, setValue]);

  const handleDeleteExistingImage = async (imageId: string) => {
    try {
      // Need to import apiClient if not imported
      const { apiClient } = await import('@/lib/api-client');
      await apiClient.delete(`/places/images/${imageId}`);
      queryClient.invalidateQueries({ queryKey: HOTEL_KEYS.detail(id) });
    } catch (err) {
      console.error('Failed to delete image', err);
    }
  };

  function onSubmit(values: CreateHotelFormValues) {
    updateHotel(values, {
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
        router.push(paths.dashboard.hotels);
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

  if (isFetchError || !hotel) {
    return <Alert severity="error">Otel tapılmadı və ya xəta baş verdi.</Alert>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.hotels)}>
            Geri
          </Button>
          <Typography variant="h4">Oteli Redaktə Et</Typography>
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
                <TextField {...register('city')} label="Şəhər" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('address')} label="Ünvan" fullWidth />
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
            <Stack spacing={3}>
              {hotel.place?.images && hotel.place.images.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Mövcud Şəkillər</Typography>
                  <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
                    {hotel.place.images.map((img: any) => (
                      <Box key={img.id} sx={{ width: 100, height: 100, borderRadius: 1, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                        <img src={img.url} alt="hotel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
          <Button variant="outlined" onClick={() => router.push(paths.dashboard.hotels)}>Ləğv et</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Saxlanılır...' : 'Dəyişiklikləri Yadda Saxla'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
