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
import FormHelperText from '@mui/material/FormHelperText';
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
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { createRestaurantSchema, type CreateRestaurantFormValues } from './restaurant-schema';
import { useRestaurant, useUpdateRestaurant, useUploadRestaurantImages, RESTAURANT_KEYS } from '@/hooks/use-restaurants';
import { CuisineType, DiningStyle, PriceRange, PlaceStatus } from '@/types/restaurant';
import { paths } from '@/paths';
import { formatPhoneNumber } from '@/lib/format-phone';
import { apiClient } from '@/lib/api-client';

// ─── Enum labels ──────────────────────────────────────────────────────────────

const cuisineTypeLabels: Record<CuisineType, string> = {
  [CuisineType.AZERBAIJANI]: 'Azərbaycan',
  [CuisineType.TURKISH]: 'Türk',
  [CuisineType.EUROPEAN]: 'Avropa',
  [CuisineType.ITALIAN]: 'İtalyan',
  [CuisineType.SEAFOOD]: 'Dəniz məhsulları',
  [CuisineType.ASIAN]: 'Asiya',
  [CuisineType.GEORGIAN]: 'Gürcü',
  [CuisineType.MIXED]: 'Qarışıq',
  [CuisineType.OTHER]: 'Digər',
};

const diningStyleLabels: Record<DiningStyle, string> = {
  [DiningStyle.CASUAL]: 'Gündəlik',
  [DiningStyle.FINE_DINING]: 'Elit',
  [DiningStyle.CAFE]: 'Kafe',
  [DiningStyle.FAST_FOOD]: 'Fast Food',
  [DiningStyle.BUFFET]: 'Büfe',
  [DiningStyle.MUSEUM_STYLE]: 'Muzey Stili',
};

const priceRangeLabels: Record<PriceRange, string> = {
  [PriceRange.BUDGET]: 'Büdcəli (5-15 AZN/nəfər)',
  [PriceRange.MID]: 'Orta (15-40 AZN/nəfər)',
  [PriceRange.UPSCALE]: 'Yüksək (40-100 AZN/nəfər)',
  [PriceRange.LUXURY]: 'Lüks (100+ AZN/nəfər)',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface RestaurantEditFormProps {
  id: string;
}

export function RestaurantEditForm({ id }: RestaurantEditFormProps): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: restaurant, isLoading: isLoadingRestaurant, isError: isLoadError } = useRestaurant(id);
  const { mutate: updateRestaurant, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateRestaurant(id);
  const { mutateAsync: uploadImages } = useUploadRestaurantImages();

  const [images, setImages] = React.useState<File[]>([]);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue, reset } =
    useForm<CreateRestaurantFormValues>({
      resolver: zodResolver(createRestaurantSchema) as any,
      defaultValues: {
        title: '',
        slug: '',
        short_description: '',
        detailed_description: '',
        whatsapp_number: '',
        phone_number: '',
        email: '',
        city: '',
        address: '',
        google_maps_url: '',
        thumbnail: '',
        cuisine_type: CuisineType.AZERBAIJANI,
        dining_style: DiningStyle.CASUAL,
        price_range: PriceRange.MID,
        avg_bill_per_person_azn: 0,
        seating_capacity: 0,
        has_wifi: false,
        has_parking: false,
        has_outdoor_seating: false,
        has_live_music: false,
        is_halal_certified: false,
        is_vegetarian_friendly: false,
        has_private_rooms: false,
        accepts_cards: false,
        is_featured: false,
        language: 'az',
        status: PlaceStatus.ACTIVE,
      },
    });

  React.useEffect(() => {
    if (restaurant && restaurant.place) {
      const { place } = restaurant;
      reset({
        title: place.title || '',
        slug: place.slug || '',
        short_description: place.short_description || '',
        detailed_description: place.detailed_description || '',
        whatsapp_number: place.whatsapp_number || '',
        phone_number: place.phone_number || '',
        email: place.email || '',
        city: place.city || '',
        address: place.address || '',
        google_maps_url: (place as any).google_maps_url || '',
        thumbnail: place.thumbnail || '',
        cuisine_type: restaurant.cuisine_type || CuisineType.AZERBAIJANI,
        dining_style: restaurant.dining_style || DiningStyle.CASUAL,
        price_range: restaurant.price_range || PriceRange.MID,
        avg_bill_per_person_azn: restaurant.avg_bill_per_person_azn || 0,
        seating_capacity: restaurant.seating_capacity || 0,
        has_wifi: restaurant.has_wifi || false,
        has_parking: restaurant.has_parking || false,
        has_outdoor_seating: restaurant.has_outdoor_seating || false,
        has_live_music: restaurant.has_live_music || false,
        is_halal_certified: restaurant.is_halal_certified || false,
        is_vegetarian_friendly: restaurant.is_vegetarian_friendly || false,
        has_private_rooms: restaurant.has_private_rooms || false,
        accepts_cards: restaurant.accepts_cards || false,
        is_featured: place.is_featured || false,
        language: (place as any).language || 'az',
        status: place.status || PlaceStatus.ACTIVE,
      });
      if (place.thumbnail) {
        setPreviewUrl(place.thumbnail);
      }
    }
  }, [restaurant, reset]);

  const handleDeleteExistingImage = async (imageId: string) => {
    try {
      await apiClient.delete(`/places/images/${imageId}`);
      queryClient.invalidateQueries({ queryKey: RESTAURANT_KEYS.detail(id) });
    } catch (err) {
      console.error('Failed to delete image', err);
    }
  };

  const handleThumbnailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload immediately
    setIsUploadingThumbnail(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/upload/image', formData, {
        headers: { 'Content-Type': undefined },
      });
      const resData = response.data;
      const url = resData?.data?.url ?? resData?.url;
      if (!url) {
        throw new Error('URL gəlmədi');
      }
      setValue('thumbnail', url);
    } catch (err) {
      console.error('Şəkil yüklənmədi:', err);
      alert('Şəkil yüklənməsində xəta baş verdi');
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  async function onSubmit(values: CreateRestaurantFormValues) {
    updateRestaurant(values, {
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
        router.push(paths.dashboard.restaurants);
      },
    });
  }

  if (isLoadingRestaurant) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isLoadError) {
    return (
      <Alert severity="error">
        Restoran məlumatlarını yükləyərkən xəta baş verdi.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.restaurants)}>
            Geri
          </Button>
          <Typography variant="h4">Restoranı Redaktə Et</Typography>
        </Stack>

        {isUpdateError && (
          <Alert severity="error">
            {(updateError as any)?.response?.data?.message ?? 'Xəta baş verdi. Yenidən cəhd edin.'}
          </Alert>
        )}

        {/* Basic Info */}
        <Card>
          <CardHeader title="Əsas Məlumatlar" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('title')} label="Restoranın adı" fullWidth required error={Boolean(errors.title)} helperText={errors.title?.message} />
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
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select {...field} label="Status">
                        <MenuItem value={PlaceStatus.ACTIVE}>Aktiv</MenuItem>
                        <MenuItem value={PlaceStatus.INACTIVE}>Deaktiv</MenuItem>
                        <MenuItem value={PlaceStatus.PENDING}>Gözləmədə</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('short_description')} label="Qısa təsvir" fullWidth required multiline rows={3} error={Boolean(errors.short_description)} helperText={errors.short_description?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('detailed_description')} label="Ətraflı təsvir" fullWidth multiline rows={5} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader title="Əlaqə Məlumatları" />
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
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
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
                <TextField {...register('address')} label="Ünvan" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('google_maps_url')} label="Google Maps URL" fullWidth InputLabelProps={{ shrink: true }} error={Boolean(errors.google_maps_url)} helperText={errors.google_maps_url?.message} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Restaurant Details */}
        <Card>
          <CardHeader title="Restoran Xüsusiyyətləri" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="cuisine_type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={Boolean(errors.cuisine_type)}>
                      <InputLabel>Mətbəx növü</InputLabel>
                      <Select {...field} label="Mətbəx növü">
                        {Object.entries(cuisineTypeLabels).map(([value, label]) => (
                          <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                      </Select>
                      {errors.cuisine_type && <FormHelperText>{errors.cuisine_type.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="dining_style"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Xidmət stili</InputLabel>
                      <Select {...field} label="Xidmət stili">
                        {Object.entries(diningStyleLabels).map(([value, label]) => (
                          <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="price_range"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Qiymət aralığı</InputLabel>
                      <Select {...field} label="Qiymət aralığı">
                        {Object.entries(priceRangeLabels).map(([value, label]) => (
                          <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('avg_bill_per_person_azn')} label="Ortalama hesab (AZN/nəfər)" type="number" fullWidth inputProps={{ min: 0 }} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('seating_capacity')} label="Oturma yeri (nəfər)" type="number" fullWidth inputProps={{ min: 1 }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader title="İmkanlar və Xüsusiyyətlər" />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              {(
                [
                  { name: 'has_wifi' as const, label: 'Wi-Fi' },
                  { name: 'has_parking' as const, label: 'Dayanacaq' },
                  { name: 'has_outdoor_seating' as const, label: 'Açıq oturma yeri' },
                  { name: 'has_live_music' as const, label: 'Canlı musiqi' },
                  { name: 'is_halal_certified' as const, label: 'Halal sertifikatlı' },
                  { name: 'is_vegetarian_friendly' as const, label: 'Vegetarian dostu' },
                  { name: 'has_private_rooms' as const, label: 'Xüsusi otaqlar' },
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

        {/* Thumbnail */}
        <Card>
          <CardHeader title="Əsas Şəkil (Thumbnail)" />
          <Divider />
          <CardContent>
            <Stack direction="row" spacing={3} alignItems="center">
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                disabled={isUploadingThumbnail}
              >
                {isUploadingThumbnail ? 'Yüklənir...' : 'Şəkli dəyiş'}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleThumbnailChange}
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
              <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                {String(errors.thumbnail.message)}
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Gallery Images */}
        <Card>
          <CardHeader title="Qalereya Şəkilləri" />
          <Divider />
          <CardContent>
            {restaurant?.place?.images && restaurant.place.images.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Mövcud şəkillər:</Typography>
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
                  {restaurant.place.images.map((img: any) => (
                    <Box key={img.id} sx={{ width: 80, height: 80, borderRadius: 1, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                      <img src={img.url} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

            <Button variant="outlined" component="label">
              Yeni Şəkillər Seç
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
          </CardContent>
        </Card>

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={() => router.push(paths.dashboard.restaurants)}>Ləğv et</Button>
          <Button type="submit" variant="contained" disabled={isUpdating || isUploadingThumbnail}>
            {isUpdating ? 'Saxlanılır...' : 'Məlumatları Yenilə'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
