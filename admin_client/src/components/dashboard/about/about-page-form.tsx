'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, Divider, Grid, Stack, TextField, Typography, Switch, FormControlLabel, MenuItem, Box, IconButton, FormControl, InputLabel, Select } from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Flask as FlaskIcon } from '@phosphor-icons/react/dist/ssr/Flask';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { z as zod } from 'zod';
import { paths } from '@/paths';
import { aboutPageService } from '@/services/about-page.service';
import { toast } from 'sonner';
import type { AboutPage } from '@/types/about-page';

const schema = zod.object({
  title: zod.string().min(1, 'Başlıq mütləqdir'),
  subtitle: zod.string().nullable().optional(),
  slug: zod.string().min(1, 'URL slug mütləqdir'),
  language: zod.string().min(1),
  is_active: zod.boolean(),
  sort_order: zod.number(),
  sections: zod.array(zod.object({
    title: zod.string().optional(),
    content: zod.string().min(1, 'Məzmun mütləqdir'),
  })).optional(),
});

type Values = zod.infer<typeof schema>;

interface AboutPageFormProps {
  initialData?: AboutPage;
}

export function AboutPageForm({ initialData }: AboutPageFormProps): React.JSX.Element {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const isEdit = !!initialData;

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      title: initialData.title,
      subtitle: initialData.subtitle || '',
      slug: initialData.slug,
      language: initialData.language,
      is_active: initialData.is_active,
      sort_order: initialData.sort_order,
      sections: initialData.sections || [],
    } : {
      language: 'az',
      is_active: true,
      sort_order: 0,
      title: '',
      subtitle: '',
      slug: '',
      sections: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "sections"
  });

  const fillTestData = () => {
    setValue('title', 'FGA haqqında');
    setValue('subtitle', 'Fəaliyyətimizin əsasını təşkil edən qırılmaz dəyərlər.');
    setValue('language', 'az');
    setValue('is_active', true);
    setValue('sort_order', 1);
    
    replace([
      { 
        title: 'Bizim Missiyamız', 
        content: 'Missiyamız hər bir səyahətçinin Azərbaycanın gizli incilərini kəşf etməsinə kömək etmək və onlara unudulmaz xatirələr yaşatmaqdır.' 
      },
      { 
        title: 'Niyə Biz?', 
        content: 'Çünki biz yerli ekspertlərdən ibarət komandayıq və sizə ən dəqiq, ən güncəl məlumatları çatdırmağı özümüzə borc bilirik.' 
      }
    ]);
  };

  const fillRussianTestData = () => {
    setValue('title', 'О компании FGA');
    setValue('subtitle', 'Незыблемые ценности, составляющие основу нашей деятельности.');
    setValue('language', 'ru');
    setValue('is_active', true);
    setValue('sort_order', 1);
    
    replace([
      { 
        title: 'Наша миссия', 
        content: 'Наша миссия — помочь каждому путешественнику открыть для себя скрытые жемчужины Азербайджана и подарить им незабываемые воспоминания.' 
      },
      { 
        title: 'Почему мы?', 
        content: 'Потому что мы команда местных экспертов и считаем своим долгом предоставлять вам самую точную и актуальную информацию.' 
      }
    ]);
  };

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      try {
        let pageId = initialData?.id;
        if (isEdit && initialData) {
          await aboutPageService.update(initialData.id, values as any);
        } else {
          const newPage = await aboutPageService.create(values as any);
          pageId = newPage.id;
        }

        if (imageFile && pageId) {
          const formData = new FormData();
          formData.append('image', imageFile);
          await aboutPageService.uploadImage(pageId, formData);
        }

        toast.success(isEdit ? 'Haqqımızda səhifəsi yeniləndi' : 'Haqqımızda səhifəsi yaradıldı');
        router.push(paths.dashboard.about);
        router.refresh();
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Xəta baş verdi');
      } finally {
        setIsPending(false);
      }
    },
    [router, isEdit, initialData, imageFile]
  );

  const title = watch('title');
  React.useEffect(() => {
    if (!isEdit && title) {
      const slug = title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      setValue('slug', slug);
    }
  }, [title, setValue, isEdit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        {/* Header with Back Button */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button 
            startIcon={<ArrowLeftIcon />} 
            variant="text" 
            onClick={() => router.push(paths.dashboard.about)}
            sx={{ fontWeight: 600 }}
          >
            Geri
          </Button>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            {isEdit ? 'Səhifəni Redaktə Et' : 'Yeni Haqqımızda Səhifəsi'}
          </Typography>
          {!isEdit && (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<FlaskIcon />}
                onClick={fillTestData}
                sx={{ fontWeight: 700, borderStyle: 'dashed' }}
              >
                🇦🇿 AZ Test
              </Button>
              <Button
                variant="outlined"
                color="info"
                size="small"
                startIcon={<FlaskIcon />}
                onClick={fillRussianTestData}
                sx={{ fontWeight: 700, borderStyle: 'dashed' }}
              >
                🇷🇺 RU Test
              </Button>
            </Stack>
          )}
        </Stack>

        <Card>
          <CardHeader title="Səhifə Məlumatları" subheader={isEdit ? "Səhifəni redaktə edin" : "Haqqımızda bölməsi üçün yeni alt səhifə"} />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('title')}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  label="Səhifə Başlığı"
                  fullWidth
                  placeholder="Məs: FGA haqqında"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('slug')}
                  error={Boolean(errors.slug)}
                  helperText={errors.slug?.message}
                  label="URL Slug"
                  fullWidth
                  placeholder="fga-haqqinda"
                  InputLabelProps={{ shrink: !!watch('slug') }}
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
              <Grid size={{ xs: 12 }}>
                <TextField
                   {...register('subtitle')}
                   label="Alt Başlıq (Şəkil üzərindəki mətn)"
                   fullWidth
                   multiline
                   rows={2}
                   placeholder="Fəaliyyətimizin əsasını təşkil edən qırılmaz dəyərlər."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Dynamic Sections */}
        <Card>
          <CardHeader 
            title="Səhifə Məzmun Blokları" 
            subheader="Səhifəyə istədiyiniz sayda bölmə əlavə edə bilərsiniz"
            action={
              <Button 
                startIcon={<PlusIcon />} 
                variant="contained" 
                size="small"
                onClick={() => append({ title: '', content: '' })}
              >
                Blok Əlavə Et
              </Button>
            }
          />
          <Divider />
          <CardContent>
            <Stack spacing={3}>
              {fields.map((field, index) => (
                <Box 
                  key={field.id} 
                  sx={{ 
                    p: 3, 
                    border: '1px solid var(--mui-palette-neutral-200)', 
                    borderRadius: 2,
                    position: 'relative',
                    bgcolor: 'background.default'
                  }}
                >
                  <IconButton 
                    color="error" 
                    size="small"
                    onClick={() => remove(index)}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <TrashIcon size={20} />
                  </IconButton>
                  
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        {...register(`sections.${index}.title` as const)}
                        label={`Blok Başlığı #${index + 1}`}
                        fullWidth
                        size="small"
                        placeholder="Məs: Bizim Missiyamız"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        {...register(`sections.${index}.content` as const)}
                        label="Blok Məzmunu"
                        fullWidth
                        multiline
                        rows={4}
                        error={Boolean(errors.sections?.[index]?.content)}
                        helperText={errors.sections?.[index]?.content?.message}
                        placeholder="Mətn burada olacaq..."
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
              
              {fields.length === 0 && (
                <Box 
                  sx={{ 
                    py: 4, 
                    textAlign: 'center', 
                    bgcolor: 'background.default', 
                    borderRadius: 2,
                    border: '1px dashed var(--mui-palette-neutral-300)'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Hələ heç bir əlavə məzmun bloku əlavə edilməyib.
                  </Typography>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Arxa Fon Şəkli" subheader="Səhifənin hero hissəsində görünəcək şəkil" />
          <Divider />
          <CardContent>
            <Box
              sx={{
                border: '2px dashed var(--mui-palette-neutral-300)',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                bgcolor: 'background.default',
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {(imageFile || initialData?.image_url) ? (
                <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
                  <Box sx={{ position: 'relative', maxWidth: 400, width: '100%' }}>
                    <img 
                      src={imageFile ? URL.createObjectURL(imageFile) : (initialData?.image_url?.startsWith('http') ? initialData.image_url : `${process.env.NEXT_PUBLIC_API_URL}${initialData?.image_url}`)} 
                      alt="preview" 
                      style={{ width: '100%', maxHeight: 250, borderRadius: 12, objectFit: 'cover' }} 
                    />
                    <IconButton
                      color="error"
                      onClick={() => setImageFile(null)}
                      sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper', '&:hover': { bgcolor: 'background.paper' } }}
                    >
                      <TrashIcon size={20} />
                    </IconButton>
                  </Box>
                  <Button variant="outlined" component="label">
                    Şəkli Dəyiş
                    <input type="file" hidden accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                  </Button>
                </Stack>
              ) : (
                <Stack spacing={1} alignItems="center">
                  <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'rgba(59, 156, 245, 0.1)' }}>
                    <UploadIcon size={32} color="#3b9cf5" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">Yüksək keyfiyyətli şəkil əlavə edin (Tövsiyə olunan: 1920x1080)</Typography>
                  <Button variant="contained" component="label" sx={{ mt: 1 }}>
                    Şəkil Seç
                    <input type="file" hidden accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                  </Button>
                </Stack>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Tənzimləmələr" />
          <Divider />
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                      label="Aktiv"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register('sort_order', { valueAsNumber: true })}
                  label="Sıralama"
                  type="number"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
           <Button variant="outlined" onClick={() => router.push(paths.dashboard.about)}>Ləğv et</Button>
           <Button variant="contained" type="submit" disabled={isPending}>
             {isPending ? 'Saxlanılır...' : 'Yadda Saxla'}
           </Button>
        </Box>
      </Stack>
    </form>
  );
}
