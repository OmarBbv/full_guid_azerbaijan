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
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { categorySchema, CATEGORY_LANGUAGES, type CategoryFormValues } from './category-schema';
import { useCreateCategory } from '@/hooks/use-categories';
import { paths } from '@/paths';

export function CategoryCreateForm(): React.JSX.Element {
  const router = useRouter();
  const { mutate: createCategory, isPending, isError, error } = useCreateCategory();

  const { register, handleSubmit, control, formState: { errors } } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as any,
    defaultValues: {
      name: '',
      slug: '',
      icon: '',
      language: 'az',
    },
  });

  function onSubmit(values: CategoryFormValues) {
    createCategory(values as any, {
      onSuccess: () => {
        router.push(paths.dashboard.categories);
      },
    });
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
          <Typography variant="h4">Yeni Kateqoriya</Typography>
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
