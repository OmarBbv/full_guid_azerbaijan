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
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { blogPostSchema, type BlogPostFormValues } from './blog-schema';
import { useBlogPost, useUpdateBlogPost, useUploadBlogCover } from '@/hooks/use-blog';
import { paths } from '@/paths';

const CATEGORY_OPTIONS = [
  { id: 'guide', label: 'Səyahət Bələdçisi', color: '#3b9cf5' },
  { id: 'culture', label: 'Mədəniyyət', color: '#f59e0b' },
  { id: 'nature', label: 'Təbiət & Ekstrim', color: '#10b981' },
];

interface BlogEditFormProps {
  id: string;
}

export function BlogEditForm({ id }: BlogEditFormProps): React.JSX.Element {
  const router = useRouter();
  const { data: post, isLoading: isLoadingPost, error: fetchError } = useBlogPost(id);
  const { mutate: updatePost, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateBlogPost(id);
  const { mutateAsync: uploadCover } = useUploadBlogCover();
  const [coverFile, setCoverFile] = React.useState<File | null>(null);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue, reset } =
    useForm<BlogPostFormValues>({
      resolver: zodResolver(blogPostSchema) as any,
    });

  // Populate form with existing data
  React.useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        language: post.language as "az" | "en" | "ru" | "tr" | "ar" | "hi",
        excerpt: post.excerpt,
        content_html: post.content_html || '',
        category: post.category || CATEGORY_OPTIONS[0].id,
        category_label: post.category_label || CATEGORY_OPTIONS[0].label,
        category_color: post.category_color || CATEGORY_OPTIONS[0].color,
        author_name: post.author_name || 'Admin',
        read_time_minutes: post.read_time_minutes || 5,
        is_featured: post.is_featured,
        is_pinned: post.is_pinned,
        is_published: post.is_published,
      });
    }
  }, [post, reset]);

  const handleCategoryChange = (catId: string) => {
    const option = CATEGORY_OPTIONS.find(o => o.id === catId);
    if (option) {
      setValue('category', option.id);
      setValue('category_label', option.label);
      setValue('category_color', option.color);
    }
  };

  function onSubmit(values: BlogPostFormValues) {
    updatePost(values as any, {
      onSuccess: async () => {
        if (coverFile) {
          const formData = new FormData();
          formData.append('images', coverFile);
          try {
            await uploadCover({ id, formData });
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

  if (isLoadingPost) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Blog yazısı yüklənərkən xəta baş verdi.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.blog)}>
            Geri
          </Button>
          <Typography variant="h4">Yazını Redaktə Et</Typography>
        </Stack>

        {isUpdateError && (
          <Alert severity="error">
            {(updateError as any)?.response?.data?.message ?? 'Xəta baş verdi. Yenidən cəhd edin.'}
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
                        <MenuItem value="tr">🇹🇷 Türkçe</MenuItem>
                        <MenuItem value="ar">🇸🇦 العربية</MenuItem>
                        <MenuItem value="hi">🇮🇳 हिन्दी</MenuItem>
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
                    value={currentCategory || ''}
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
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  <Box>
                    <Button variant="outlined" component="label">
                      Yeni Şəkil Seç
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
                    <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                      Əgər şəkli dəyişmək istəmirsinizsə, boş buraxın.
                    </Typography>
                  </Box>

                  {/* Current or Preview Image */}
                  {(coverFile || post?.cover_image_url) && (
                    <Box sx={{ position: 'relative', width: 240, height: 140, borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
                      <img
                        src={coverFile ? URL.createObjectURL(coverFile) : post?.cover_image_url || ''}
                        alt="Cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {coverFile && (
                        <IconButton
                          size="small"
                          onClick={() => setCoverFile(null)}
                          sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'background.paper' }}
                        >
                          <XIcon size={14} />
                        </IconButton>
                      )}
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pb: 4 }}>
          <Button variant="outlined" onClick={() => router.push(paths.dashboard.blog)}>Ləğv et</Button>
          <Button type="submit" variant="contained" disabled={isUpdating}>
            {isUpdating ? 'Saxlanılır...' : 'Yadda Saxla'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
