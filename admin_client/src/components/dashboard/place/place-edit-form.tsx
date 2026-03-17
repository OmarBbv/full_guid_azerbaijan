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

import { createPlaceSchema, type CreatePlaceFormValues } from './place-schema';
import { usePlace, useUpdatePlace, useUploadPlaceImages, PLACE_KEYS } from '@/hooks/use-places';
import { PlaceType } from '@/types/restaurant';
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

interface PlaceEditFormProps {
  placeId: string;
}

export function PlaceEditForm({ placeId }: PlaceEditFormProps): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: place, isLoading: isFetching } = usePlace(placeId);
  const { mutate: updatePlace, isPending, isError, error } = useUpdatePlace(placeId);
  const { mutateAsync: uploadImages } = useUploadPlaceImages();

  const [images, setImages] = React.useState<File[]>([]);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue, reset } =
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
      },
    });

  const isHero = watch('show_in_hero');

  React.useEffect(() => {
    if (place) {
      reset({
        title: place.title || '',
        slug: place.slug || '',
        short_description: place.short_description || '',
        detailed_description: place.detailed_description || '',
        subtitle: place.subtitle || '',
        accent_color: place.accent_color || '#3b9cf5',
        type: place.type || PlaceType.LANDMARK,
        whatsapp_number: place.whatsapp_number || '',
        phone_number: place.phone_number || '',
        email: place.email || '',
        city: place.city || '',
        address: place.address || '',
        google_maps_url: (place as any).google_maps_url || '',
        is_featured: place.is_featured || false,
        show_in_hero: place.show_in_hero || false,
      });
    }
  }, [place, reset]);

  const titleValue = watch('title');

  React.useEffect(() => {
    if (!place) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [titleValue, setValue, place]);

  const handleDeleteExistingImage = async (imageId: string) => {
    try {
      const { apiClient } = await import('@/lib/api-client');
      await apiClient.delete(`/places/images/${imageId}`);
      queryClient.invalidateQueries({ queryKey: PLACE_KEYS.detail(placeId) });
    } catch (err) {
      console.error('Failed to delete image', err);
    }
  };

  function onSubmit(values: CreatePlaceFormValues) {
    updatePlace(values, {
      onSuccess: async () => {
        if (images.length > 0) {
          const formData = new FormData();
          images.forEach((image) => formData.append('images', image));
          try {
            await uploadImages({ id: placeId, formData });
          } catch (err) {
            console.error('Image upload error:', err);
          }
        }
        router.push(paths.dashboard.places);
      },
    });
  }

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.places)}>
            Geri
          </Button>
          <Typography variant="h4">Məkana Düzəliş Et</Typography>
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
                <TextField {...register('title')} label="Məkanın adı" fullWidth required error={Boolean(errors.title)} helperText={errors.title?.message} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('slug')} label="Slug (URL)" fullWidth required InputLabelProps={{ shrink: true }} error={Boolean(errors.slug)} helperText={errors.slug?.message} />
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
                <TextField {...register('short_description')} label="Qısa təsvir" fullWidth required multiline rows={3} InputLabelProps={{ shrink: true }} error={Boolean(errors.short_description)} helperText={errors.short_description?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('detailed_description')} label="Ətraflı təsvir" fullWidth multiline rows={5} InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

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
            </Grid>
          </CardContent>
        </Card>

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
                      InputLabelProps={{ shrink: true }}
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
                      InputLabelProps={{ shrink: true }}
                      placeholder="+994 50 123 45 67"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('email')} label="E-poçt" type="email" fullWidth InputLabelProps={{ shrink: true }} error={Boolean(errors.email)} helperText={errors.email?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField {...register('city')} label="Şəhər" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('address')} label="Ünvan" fullWidth required InputLabelProps={{ shrink: true }} error={Boolean(errors.address)} helperText={errors.address?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('google_maps_url')} label="Google Maps URL" fullWidth InputLabelProps={{ shrink: true }} error={Boolean(errors.google_maps_url)} helperText={errors.google_maps_url?.message} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Şəkillər" />
          <Divider />
          <CardContent>
            <Box sx={{ mb: 3 }}>
              {place?.images && place.images.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Cari Şəkillər</Typography>
                  <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
                    {place.images.map((img: any, idx: number) => (
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
                  setImages((prev) => [...prev, ...files]);
                  e.target.value = '';
                }}
              />
            </Button>
            {images.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">{images.length} yeni şəkil seçildi (Göndərildikdə əlavə olunacaq)</Typography>
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
          <Button variant="outlined" onClick={() => router.push(paths.dashboard.places)}>Ləğv et</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Saxlanılır...' : 'Dəyişiklikləri Yadda Saxla'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
