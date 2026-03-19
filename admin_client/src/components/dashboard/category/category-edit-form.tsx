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
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { categorySchema, CATEGORY_LANGUAGES, type CategoryFormValues } from './category-schema';
import { useCategory, useUpdateCategory, useCategories } from '@/hooks/use-categories';
import { paths } from '@/paths';

interface CategoryEditFormProps {
  id: number;
}

export function CategoryEditForm({ id }: CategoryEditFormProps): React.JSX.Element {
  const router = useRouter();

  const { data: category, isLoading: isFetching, isError: isFetchError } = useCategory(id);
  const { mutate: updateCategory, isPending, isError, error } = useUpdateCategory(id);
  const { data: allCategories = [], isLoading: isLoadingCategories } = useCategories();

  const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as any,
    defaultValues: {
      name: '',
      slug: '',
      icon: '',
      language: 'az',
      parentId: null,
    },
  });

  const selectedLanguage = watch('language');
  const parentCandidates = allCategories.filter(
    (cat) => !cat.parentId && (!cat.language || cat.language === selectedLanguage) && cat.id !== id
  );

  React.useEffect(() => {
    if (category) {
      reset({
        name: category.name || '',
        slug: category.slug || '',
        icon: category.icon || '',
        language: (category.language as any) || 'az',
        parentId: category.parentId || null,
      });
    }
  }, [category, reset]);

  function onSubmit(values: CategoryFormValues) {
    updateCategory(values as any, {
      onSuccess: () => {
        router.push(paths.dashboard.categories);
      },
    });
  }

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isFetchError || !category) {
    return (
      <Alert severity="error">
        Kateqoriya tapılmadı və ya xəta baş verdi.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<ArrowLeftIcon />}
            variant="text"
            onClick={() => router.push(paths.dashboard.categories)}
          >
            Geri
          </Button>
          <Typography variant="h4">Kateqoriya Redaktə</Typography>
        </Stack>

        {isError && (
          <Alert severity="error">
            {(error as any)?.response?.data?.message ?? 'Xəta baş verdi. Yenidən cəhd edin.'}
          </Alert>
        )}

        <Card>
          <CardHeader title="Kateqoriya Məlumatları" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {/* Language selector */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth required>
                      <InputLabel id="lang-label">Dil</InputLabel>
                      <Select labelId="lang-label" {...field} label="Dil">
                        {CATEGORY_LANGUAGES.map((lang) => (
                          <MenuItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Name */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register('name')}
                  label="Kateqoriya adı"
                  fullWidth
                  required
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              </Grid>

              {/* Slug */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register('slug')}
                  label="Slug"
                  fullWidth
                  required
                  error={Boolean(errors.slug)}
                  helperText={errors.slug?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="parentId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="parent-label">Üst Kateqoriya (Opsional)</InputLabel>
                      <Select
                        labelId="parent-label"
                        {...field}
                        label="Üst Kateqoriya (Opsional)"
                        value={field.value || ''}
                        disabled={isLoadingCategories}
                      >
                        <MenuItem value="">Yoxdur (Ana Kateqoriya)</MenuItem>
                        {parentCandidates.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Icon */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register('icon')}
                  label="İkon (opsional — emoji və ya URL)"
                  fullWidth
                  placeholder="🏛️  və ya  https://..."
                  error={Boolean(errors.icon)}
                  helperText={errors.icon?.message}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => router.push(paths.dashboard.categories)}
          >
            Ləğv et
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
          >
            {isPending ? 'Saxlanılır...' : 'Yadda saxla'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
