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

import { blogPostSchema, type BlogPostFormValues } from './blog-schema';
import { useCreateBlogPost, useUploadBlogCover } from '@/hooks/use-blog';
import { paths } from '@/paths';

const CATEGORY_OPTIONS = [
  { id: 'guide', label: 'Səyahət Bələdçisi', color: '#3b9cf5' },
  { id: 'culture', label: 'Mədəniyyət', color: '#f59e0b' },
  { id: 'nature', label: 'Təbiət & Ekstrim', color: '#10b981' },
];

export function BlogCreateForm(): React.JSX.Element {
  const router = useRouter();
  const { mutate: createPost, isPending, isError, error } = useCreateBlogPost();
  const { mutateAsync: uploadCover } = useUploadBlogCover();
  const [coverFile, setCoverFile] = React.useState<File | null>(null);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } =
    useForm<BlogPostFormValues>({
      resolver: zodResolver(blogPostSchema) as any,
      defaultValues: {
        title: '',
        slug: '',
        language: 'az',
        excerpt: '',
        content_html: '',
        category: CATEGORY_OPTIONS[0].id,
        category_label: CATEGORY_OPTIONS[0].label,
        category_color: CATEGORY_OPTIONS[0].color,
        author_name: 'Admin',
        read_time_minutes: 5,
        is_featured: false,
        is_pinned: false,
        is_published: true,
      },
    });

  // Auto-generate slug from title
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

  const handleFillTestData = () => {
    setValue('title', 'Azərbaycanın Gizli Cənnəti: Qax');
    setValue('excerpt', 'Qax rayonunun füsunkar təbiəti, qədim kəndləri və şəlalələri haqqında ətraflı bələdçi.');
    setValue('content_html', 'Qax rayonu Azərbaycanın ən maraqlı turizm bölgələrindən biridir. Burada İlisu kəndi, Kürmük məbədi və qədim qala divarları yerləşir. Təbiəti sevənlər üçün buradakı şəlalələr və meşə yolları əvəzedilməzdir. Həmçinin bölgənin mətbəxi, xüsusilə də sürhüllü yeməyi çox məşhurdur.');
    const guideCat = CATEGORY_OPTIONS.find(c => c.id === 'guide')!;
    setValue('category', guideCat.id);
    setValue('category_label', guideCat.label);
    setValue('category_color', guideCat.color);
    setValue('author_name', 'Omar Babayev');
    setValue('read_time_minutes', 8);
    setValue('is_featured', true);
    setValue('is_published', true);
  };

  const handleCategoryChange = (catId: string) => {
    const option = CATEGORY_OPTIONS.find(o => o.id === catId);
    if (option) {
      setValue('category', option.id);
      setValue('category_label', option.label);
      setValue('category_color', option.color);
    }
  };

  function onSubmit(values: BlogPostFormValues) {
    createPost(values as any, {
      onSuccess: async (post) => {
        if (coverFile) {
          const formData = new FormData();
          formData.append('images', coverFile); // Backend uses 'images' key
          try {
            await uploadCover({ id: post.id, formData });
          } catch (err) {
            console.error('Cover upload error:', err);
          }
        }
        router.push(paths.dashboard.blog);
      },
    });
  }

  const currentCategory = watch('category');
  const currentColor = watch('category_color');

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.blog)}>
            Geri
          </Button>
          <Typography variant="h4">Yeni Blog Yazısı</Typography>
        </Stack>

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ?? 'Xəta baş verdi. Yenidən cəhd edin.'}
          </Alert>
        )}

        {/* Basic Info */}
        <Card>
          <CardHeader title="Məqalə Məlumatları" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField {...register('title')} label="Başlıq" fullWidth required error={Boolean(errors.title)} helperText={errors.title?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Dil</InputLabel>
                      <Select {...field} label="Dil">
                        <MenuItem value="az">🇦🇿 Azərbaycan</MenuItem>
                        <MenuItem value="en">🇬🇧 English</MenuItem>
                        <MenuItem value="ru">🇷🇺 Русский</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('slug')} label="Slug (URL)" fullWidth required InputLabelProps={{ shrink: true }} error={Boolean(errors.slug)} helperText={errors.slug?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('excerpt')} label="Qısa təsvir" fullWidth required multiline rows={3} error={Boolean(errors.excerpt)} helperText={errors.excerpt?.message} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField {...register('content_html')} label="Məzmun" fullWidth multiline rows={12} placeholder="Məqalənin tam mətnini buraya yazın..." error={Boolean(errors.content_html)} helperText={errors.content_html?.message} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card>
          <CardHeader title="Kateqoriya və Müəllif" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Kateqoriya</InputLabel>
                  <Select
                    value={currentCategory}
                    label="Kateqoriya"
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    {...register('category_color')}
                    label="Kateqoriya Rəngi"
                    fullWidth
                    placeholder="#hexcode"
                  />
                  <input
                    type="color"
                    value={currentColor || '#000000'}
                    onChange={(e) => setValue('category_color', e.target.value.toUpperCase())}
                    style={{
                      width: 45,
                      height: 45,
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      padding: 0,
                      backgroundColor: 'transparent'
                    }}
                  />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register('read_time_minutes', { valueAsNumber: true })}
                  label="Oxuma müddəti (dəq)"
                  type="number"
                  fullWidth
                  error={Boolean(errors.read_time_minutes)}
                  helperText={errors.read_time_minutes?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField {...register('author_name')} label="Müəllif" fullWidth error={Boolean(errors.author_name)} helperText={errors.author_name?.message} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Status and Cover */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Statuslar" />
              <Divider />
              <CardContent>
                <Stack spacing={1}>
                  <Controller
                    name="is_published"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                        label="Dərhal dərc et"
                      />
                    )}
                  />
                  <Controller
                    name="is_featured"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                        label="Günün seçimi"
                      />
                    )}
                  />
                  <Controller
                    name="is_pinned"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                        label="Yuxarı daxil et (Pin)"
                      />
                    )}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Qapaq Şəkli" />
              <Divider />
              <CardContent>
                <Button variant="outlined" component="label">
                  Şəkil Seç
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setCoverFile(file);
                    }}
                  />
                </Button>
                {coverFile && (
                  <Box sx={{ mt: 2, position: 'relative', width: 200, height: 120, borderRadius: 2, overflow: 'hidden' }}>
                    <img
                      src={URL.createObjectURL(coverFile)}
                      alt="Cover preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => setCoverFile(null)}
                      sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'background.paper' }}
                    >
                      <XIcon size={14} />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="text" color="info" onClick={handleFillTestData}>Test Məlumatlarını Doldur</Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={() => router.push(paths.dashboard.blog)}>Ləğv et</Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? 'Saxlanılır...' : 'Məqaləni Əlavə Et'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </form>
  );
}
