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

import { createHostelSchema, type CreateHostelFormValues } from './hostel-schema';
import { useCreateHostel, useUploadHostelImages } from '@/hooks/use-hostels';
import { HostelType } from '@/types/hostel';
import { paths } from '@/paths';
import { PlaceStatus } from '@/types/restaurant';
import { formatPhoneNumber } from '@/lib/format-phone';

const hostelTypeLabels: Record<HostelType, string> = {
  [HostelType.PARTY_HOSTEL]: 'Party Hostel',
  [HostelType.FAMILY_HOSTEL]: 'Ailə Hosteli',
  [HostelType.BOUTIQUE_HOSTEL]: 'Butik Hostel',
  [HostelType.BACKPACKER]: 'Backpacker',
  [HostelType.HISTORIC]: 'Tarixi',
};

export function HostelCreateForm(): React.JSX.Element {
  const router = useRouter();
  const { mutate: createHostel, isPending, isError, error } = useCreateHostel();
  const { mutateAsync: uploadImages } = useUploadHostelImages();
  const [images, setImages] = React.useState<File[]>([]);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } =
    useForm<CreateHostelFormValues>({
      resolver: zodResolver(createHostelSchema) as any,
      defaultValues: {
        title: '',
        slug: '',
        short_description: '',
        whatsapp_number: '',
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

  const handleFillTestData = async () => {
    setValue('title', 'Sahil Hostel & Hotel');
    setValue('short_description', 'Bakının mərkəzində yerləşən, rahat və təmiz otaqları olan müasir hostel. Səyahətçilər üçün ideal seçimdir.');
    setValue('whatsapp_number', '994501234567');
    setValue('city', 'Bakı');
    setValue('address', 'Zərifə Əliyeva küçəsi 27');
    setValue('hostel_type', HostelType.BACKPACKER);
    setValue('dorm_beds_count', 24);
    setValue('private_rooms_count', 5);
    setValue('dorm_price_from_eur', 15);
    setValue('private_price_from_eur', 45);
    setValue('check_in_time', '14:00');
    setValue('check_out_time', '12:00');
    setValue('has_wifi', true);
    setValue('has_kitchen', true);
    setValue('has_common_room', true);
    setValue('has_lockers', true);
    setValue('has_free_breakfast', false);
    setValue('has_bar', true);
    setValue('has_laundry', true);
    setValue('organizes_tours', true);
    setValue('has_24h_security', true);
    setValue('is_featured', true);

    try {
      const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      const blob = await (await fetch(`data:image/png;base64,${base64}`)).blob();
      const file = new File([blob], 'test-hostel.png', { type: 'image/png' });
      setImages([file]);
    } catch (e) {
      console.error(e);
    }
  };

  function onSubmit(values: CreateHostelFormValues) {
    createHostel(values, {
      onSuccess: async (hostel) => {
        if (images.length > 0) {
          const formData = new FormData();
          images.forEach((image) => formData.append('images', image));
          try {
            await uploadImages({ id: hostel.id, formData });
          } catch (err) {
            console.error('Image upload error:', err);
          }
        }
        router.push(paths.dashboard.hostels);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.hostels)}>
            Geri
          </Button>
          <Typography variant="h4">Yeni Hostel Əlavə Et</Typography>
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
                <TextField {...register('title')} label="Hostelin adı" fullWidth required error={Boolean(errors.title)} helperText={errors.title?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('slug')} label="Slug (URL)" fullWidth required InputLabelProps={{ shrink: Boolean(watch('slug')) || undefined }} error={Boolean(errors.slug)} helperText={errors.slug?.message ?? 'Avtomatik yaradılır'} />
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
                <TextField {...register('city')} label="Şəhər" fullWidth />
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
                <TextField {...register('dorm_beds_count')} label="Yataq yeri sayı" type="number" fullWidth inputProps={{ min: 1 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('private_rooms_count')} label="Xüsusi otaq sayı" type="number" fullWidth inputProps={{ min: 0 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('dorm_price_from_eur')} label="Yataq yeri qiyməti (EUR)" type="number" fullWidth inputProps={{ min: 0 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField {...register('private_price_from_eur')} label="Xüsusi otaq qiyməti (EUR)" type="number" fullWidth inputProps={{ min: 0 }} onWheel={(e) => (e.target as HTMLInputElement).blur()} />
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
            <Button variant="outlined" onClick={() => router.push(paths.dashboard.hostels)}>Ləğv et</Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? 'Saxlanılır...' : 'Hostel Əlavə Et'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </form>
  );
}
