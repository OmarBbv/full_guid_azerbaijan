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
import { guidePageService } from '@/services/guide-page.service';
import { toast } from 'sonner';
import type { GuidePage } from '@/types/guide-page';

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

interface GuidePageFormProps {
  initialData?: GuidePage;
}

export function GuidePageForm({ initialData }: GuidePageFormProps): React.JSX.Element {
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
    setValue('title', 'Azərbaycan haqqında ümumi məlumat');
    setValue('subtitle', 'Bakıya və Azərbaycana səyahətiniz üçün vacib məlumatlar.');
    setValue('language', 'az');
    setValue('is_active', true);
    setValue('sort_order', 1);
    
    replace([
      { 
        title: 'Viza və Giriş', 
        content: 'Azərbaycana bir çox ölkə vətəndaşları üçün elektron viza (ASAN Viza) tələb olunur. Viza almaq üçün rəsmi saytdan müraciət edə bilərsiniz.' 
      },
      { 
        title: 'Valyuta', 
        content: 'Azərbaycanın rəsmi valyutası Manatdır (AZN). Şəhər mərkəzində çoxlu sayda valyuta dəyişmə məntəqələri və bankomatlar mövcuddur.' 
      }
    ]);
  };

  const fillRussianTestData = () => {
    setValue('title', 'Общая информация об Азербайджане');
    setValue('subtitle', 'Важная информация для вашей поездки в Баку и Азербайджан.');
    setValue('language', 'ru');
    setValue('is_active', true);
    setValue('sort_order', 1);
    
    replace([
      { 
        title: 'Виза и въезд', 
        content: 'Для граждан многих стран требуется электронная виза (ASAN Viza). Вы можете подать заявку через официальный сайт.' 
      },
      { 
        title: 'Валюта', 
        content: 'Официальная валюта Азербайджана — манат (AZN). В центре города много пунктов обмена валюты и банкоматов.' 
      }
    ]);
  };

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      try {
        let pageId = initialData?.id;
        if (isEdit && initialData) {
          await guidePageService.update(initialData.id, values as any);
        } else {
          const newPage = await guidePageService.create(values as any);
          pageId = newPage.id;
        }

        if (imageFile && pageId) {
          const formData = new FormData();
          formData.append('image', imageFile);
          await guidePageService.uploadImage(pageId, formData);
        }

        toast.success(isEdit ? 'Məlumat səhifəsi yeniləndi' : 'Məlumat səhifəsi yaradıldı');
        router.push(paths.dashboard.guide);
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
        <Stack direction="row" spacing={2} alignItems="center">
          <Button 
            startIcon={<ArrowLeftIcon />} 
            variant="text" 
            onClick={() => router.push(paths.dashboard.guide)}
            sx={{ fontWeight: 600 }}
          >
            Geri
          </Button>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            {isEdit ? 'Səhifəni Redaktə Et' : 'Yeni Məlumat Səhifəsi'}
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
          <CardHeader title="Səhifə Məlumatları" subheader="Başlanğıc menyusu üçün məlumat səhifəsi" />
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
                  placeholder="Məs: Hava limanı haqqında"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('slug')}
                  error={Boolean(errors.slug)}
                  helperText={errors.slug?.message}
                  label="URL Slug"
                  fullWidth
                  placeholder="hava-limani"
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
                   placeholder="Bakıya səyahət edərkən bilməli olduğunuz hər şey."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardHeader 
            title="Səhifə Məzmun Blokları" 
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
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Arxa Fon Şəkli" />
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
                      sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
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
                  <UploadIcon size={32} color="#3b9cf5" />
                  <Typography variant="body2" color="text.secondary">Yüksək keyfiyyətli şəkil əlavə edin</Typography>
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
           <Button variant="outlined" onClick={() => router.push(paths.dashboard.guide)}>Ləğv et</Button>
           <Button variant="contained" type="submit" disabled={isPending}>
             {isPending ? 'Saxlanılır...' : 'Yadda Saxla'}
           </Button>
        </Box>
      </Stack>
    </form>
  );
}
