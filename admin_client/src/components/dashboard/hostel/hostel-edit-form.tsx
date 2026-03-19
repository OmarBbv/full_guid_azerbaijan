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

import { createHostelSchema, type CreateHostelFormValues } from './hostel-schema';
import { useUpdateHostel, useUploadHostelImages, useHostel, HOSTEL_KEYS } from '@/hooks/use-hostels';
import { HostelType } from '@/types/hostel';
import { paths } from '@/paths';
import { formatPhoneNumber } from '@/lib/format-phone';
import { CitySelect } from '@/components/core/city-select';

const hostelTypeLabels: Record<HostelType, string> = {
  [HostelType.PARTY_HOSTEL]: 'Party Hostel',
  [HostelType.FAMILY_HOSTEL]: 'Ailə Hosteli',
  [HostelType.BOUTIQUE_HOSTEL]: 'Butik Hostel',
  [HostelType.BACKPACKER]: 'Backpacker',
  [HostelType.HISTORIC]: 'Tarixi',
};

export interface HostelEditFormProps {
  hostelId: string;
}

export function HostelEditForm({ hostelId }: HostelEditFormProps): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: hostel, isLoading: isFetching } = useHostel(hostelId);
  const { mutate: updateHostel, isPending, isError, error } = useUpdateHostel(hostelId);
  const { mutateAsync: uploadImages } = useUploadHostelImages();

  const [newImages, setNewImages] = React.useState<File[]>([]);

  const { control, register, handleSubmit, formState: { errors }, reset, watch, setValue } =
    useForm<CreateHostelFormValues>({
      // @ts-expect-error - ignore
      resolver: zodResolver(createHostelSchema),
      defaultValues: {
        title: '',
        slug: '',
        short_description: '',
        whatsapp_number: '',
        google_maps_url: '',
        hostel_type: HostelType.BACKPACKER,
        check_in_time: '14:00',
        check_out_time: '12:00',
        has_wifi: false,
        has_kitchen: false,
        has_common_room: false,
        has_lockers: false,
        has_free_breakfast: false,
        has_bar: false,
        has_laundry: false,
        organizes_tours: false,
        has_24h_security: false,
        is_featured: false,
        language: 'az',
      },
    });

  React.useEffect(() => {
    if (hostel) {
      reset({
        title: hostel.place?.title || '',
        slug: hostel.place?.slug || '',
        short_description: hostel.place?.short_description || '',
        whatsapp_number: hostel.place?.whatsapp_number || '',
        city: hostel.place?.city || '',
        address: hostel.place?.address || '',
        google_maps_url: (hostel.place as any)?.google_maps_url || '',
        hostel_type: hostel.hostel_type || HostelType.BACKPACKER,
        dorm_beds_count: hostel.dorm_beds_count ?? undefined,
        private_rooms_count: hostel.private_rooms_count ?? undefined,
        dorm_price_from_eur: hostel.dorm_price_from_eur ?? undefined,
        private_price_from_eur: hostel.private_price_from_eur ?? undefined,
        check_in_time: hostel.check_in_time || '14:00',
        check_out_time: hostel.check_out_time || '12:00',
        has_wifi: hostel.has_wifi || false,
        has_kitchen: hostel.has_kitchen || false,
        has_common_room: hostel.has_common_room || false,
        has_lockers: hostel.has_lockers || false,
        has_free_breakfast: hostel.has_free_breakfast || false,
        has_bar: hostel.has_bar || false,
        has_laundry: hostel.has_laundry || false,
        organizes_tours: hostel.organizes_tours || false,
        has_24h_security: hostel.has_24h_security || false,
        is_featured: hostel.place?.is_featured || false,
        language: (hostel.place as any)?.language || 'az',
      });
    }
  }, [hostel, reset]);

  const handleDeleteExistingImage = async (imageId: string) => {
    try {
      // Need to import apiClient if not imported
      const { apiClient } = await import('@/lib/api-client');
      await apiClient.delete(`/places/images/${imageId}`);
      queryClient.invalidateQueries({ queryKey: HOSTEL_KEYS.detail(hostelId) });
    } catch (err) {
      console.error('Failed to delete image', err);
    }
  };

  function onSubmit(values: CreateHostelFormValues) {
    updateHostel(values, {
      onSuccess: async () => {
        if (newImages.length > 0) {
          const formData = new FormData();
          newImages.forEach((image) => formData.append('images', image));
          try {
            await uploadImages({ id: hostelId, formData });
          } catch (err) {
            console.error('Image upload error:', err);
          }
        }
        router.push(paths.dashboard.hostels);
      },
    });
  }

  if (isFetching || !hostel) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const existingImages = hostel.place?.images || [];

  return (
    // @ts-expect-error - useform issues
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.hostels)}>
            Geri
          </Button>
          <Typography variant="h4">Hostel Məlumatlarını Yenilə</Typography>
        </Stack>

        {isError && (
          <Alert severity="error">
            {/* @ts-expect-error - unknown axios error object format */}
            {error?.response?.data?.message ?? 'Xəta baş verdi.'}
          </Alert>
        )}

        <Card>
          <CardHeader title="Əsas Məlumatlar" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('title')} label="Hostelin adı" fullWidth required error={Boolean(errors.title)} helperText={errors.title?.message} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('slug')} label="Slug (URL)" fullWidth required InputLabelProps={{ shrink: true }} error={Boolean(errors.slug)} />
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
                <TextField {...register('short_description')} label="Qısa təsvir" fullWidth required multiline rows={3} error={Boolean(errors.short_description)} helperText={errors.short_description?.message} InputLabelProps={{ shrink: true }} />
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
                      InputLabelProps={{ shrink: true }}
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
                <TextField {...register('address')} label="Ünvan" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('google_maps_url')} label="Google Maps URL" fullWidth InputLabelProps={{ shrink: true }} error={Boolean(errors.google_maps_url)} helperText={errors.google_maps_url?.message} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Hostel Details */}
        <Card>
          <CardHeader title="Hostel Xüsusiyyətləri" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="hostel_type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Hostel növü</InputLabel>
                      <Select {...field} label="Hostel növü">
                        {Object.entries(hostelTypeLabels).map(([v, l]) => (
                          <MenuItem key={v} value={v}>{l}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('dorm_beds_count')} label="Yataq yeri sayı" type="number" fullWidth inputProps={{ min: 1 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('private_rooms_count')} label="Xüsusi otaq sayı" type="number" fullWidth inputProps={{ min: 0 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('dorm_price_from_eur')} label="Yataq yeri qiyməti (EUR)" type="number" fullWidth inputProps={{ min: 0 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('private_price_from_eur')} label="Xüsusi otaq qiyməti (EUR)" type="number" fullWidth inputProps={{ min: 0 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <TextField {...register('check_in_time')} label="Check-in" type="time" fullWidth InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }} />
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <TextField {...register('check_out_time')} label="Check-out" type="time" fullWidth InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }} />
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
                  { name: 'has_kitchen' as const, label: 'Mətbəx' },
                  { name: 'has_common_room' as const, label: 'Ümumi otaq' },
                  { name: 'has_lockers' as const, label: 'Kilit qutusu' },
                  { name: 'has_free_breakfast' as const, label: 'Pulsuz səhər yeməyi' },
                  { name: 'has_bar' as const, label: 'Bar' },
                  { name: 'has_laundry' as const, label: 'Camaşırxana' },
                  { name: 'organizes_tours' as const, label: 'Turlar təşkil edir' },
                  { name: 'has_24h_security' as const, label: '24 saat təhlükəsizlik' },
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
            <Box sx={{ mb: 3 }}>
              {existingImages.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Cari Şəkillər</Typography>
                  <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
                    {existingImages.map((img, idx: number) => (
                      <Box key={img.id || idx} sx={{ width: 80, height: 80, borderRadius: 1, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                        <img
                          src={img.url}
                          alt={`existing-${idx}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
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
                </>
              )}
            </Box>

            <Button variant="outlined" component="label">
              Yeni Şəkil Əlavə Et
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setNewImages((prev) => [...prev, ...files]);
                  e.target.value = '';
                }}
              />
            </Button>

            {newImages.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">{newImages.length} yeni şəkil seçildi</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1, overflowX: 'auto', py: 1 }}>
                  {newImages.map((img, idx) => (
                    <Box key={`${img.name}-${idx}`} sx={{ width: 80, height: 80, borderRadius: 1, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`preview-${idx}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => setNewImages((prev) => prev.filter((_, i) => i !== idx))}
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
          <Button variant="outlined" onClick={() => router.push(paths.dashboard.hostels)}>Ləğv et</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Saxlanılır...' : 'Məlumatları Yenilə'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
