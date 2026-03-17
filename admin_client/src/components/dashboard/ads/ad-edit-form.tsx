'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { paths } from '@/paths';
import { FileDropzone } from '@/components/core/file-dropzone';
import { useAd, useUpdateAd, useUploadAdImage } from '@/hooks/use-ads';
import type { AdPosition } from '@/types/ad';

interface AdEditFormProps {
  id: string;
}

export function AdEditForm({ id }: AdEditFormProps): React.JSX.Element {
  const router = useRouter();
  const { data: ad, isLoading, error } = useAd(id);
  const updateAd = useUpdateAd(id);
  const uploadImage = useUploadAdImage();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    title: '',
    position: 'hero_alti',
    redirect_url: '',
    is_active: true,
  });

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (ad) {
      setFormData({
        title: ad.title || '',
        position: ad.position || 'hero_alti',
        redirect_url: ad.redirect_url || '',
        is_active: ad.is_active ?? true,
      });
      setImagePreview(ad.image_url);
    }
  }, [ad]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value as string }));
    }
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, is_active: e.target.checked }));
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleRemoveImage = () => {
    if (imageFile && imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview && !imageFile) {
      alert('Zəhmət olmasa reklam banneri üçün şəkil seçin');
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = ad?.image_url;

      if (imageFile) {
        const uploadResult = await uploadImage.mutateAsync(imageFile);
        imageUrl = uploadResult.url;
      }

      await updateAd.mutateAsync({
        ...formData,
        position: formData.position as any,
        image_url: imageUrl,
      });

      router.push(paths.dashboard.ads);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Reklam yenilənərkən xəta baş verdi. ' + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !ad) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Reklam məlumatları yüklənərkən xəta baş verdi.</Typography>
        <Button onClick={() => router.push(paths.dashboard.ads)}>Geri qayıt</Button>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {/* Header — back button + title */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowLeftIcon />} variant="text" onClick={() => router.push(paths.dashboard.ads)}>
            Geri
          </Button>
          <Typography variant="h4">Reklamı Redaktə Et</Typography>
        </Stack>

        <Card>
          <CardHeader title="Reklam Banneri Məlumatları" />
          <Divider />
          <CardContent>
            <Stack spacing={3}>
              <FormControl fullWidth required>
                <InputLabel>Daxili Başlıq (Reklamı tanımlamaq üçün)</InputLabel>
                <OutlinedInput
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  label="Daxili Başlıq (Reklamı tanımlamaq üçün)"
                />
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Yerləşdirmə</InputLabel>
                <Select name="position" value={formData.position} onChange={handleChange} label="Yerləşdirmə">
                  <MenuItem value="hero_alti">🏠 Ana Səhifə — Hero Altı</MenuItem>
                  <MenuItem value="orta_banner">📋 Ana Səhifə — Orta Banner</MenuItem>
                  <MenuItem value="kateqoriya_ust">🗂️ Kateqoriya Səhifəsi Yuxarısı</MenuItem>
                  <MenuItem value="mekan_sidebar">📍 Məkan Detalı Yan Paneli</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Yönləndirmə URL (İstəyə bağlı)</InputLabel>
                <OutlinedInput
                  name="redirect_url"
                  value={formData.redirect_url}
                  onChange={handleChange}
                  label="Yönləndirmə URL (İstəyə bağlı)"
                  placeholder="https://example.com"
                />
              </FormControl>

              <FormControlLabel
                control={<Switch checked={formData.is_active} onChange={handleSwitchChange} name="is_active" />}
                label="Aktiv (İstifadəçilərə görünür)"
              />

              <div>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Banner Şəkli *
                </Typography>

                {imagePreview ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: 480,
                      borderRadius: 1,
                      overflow: 'hidden',
                      border: '1px solid var(--mui-palette-divider)',
                    }}
                  >
                    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 6' }}>
                      <Image
                        src={imagePreview}
                        alt="Şəkil önizləməsi"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={handleRemoveImage}
                        sx={{
                          bgcolor: 'rgba(0,0,0,0.55)',
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
                        }}
                      >
                        <XIcon weight="bold" />
                      </IconButton>
                    </Box>
                    {imageFile && (
                      <Box sx={{ px: 2, py: 1, bgcolor: 'background.paper' }}>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {imageFile.name} (Yeni)
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <FileDropzone
                    accept={{ 'image/*': [] }}
                    maxFiles={1}
                    onDrop={handleDrop}
                    caption="PNG, JPG, GIF (Maks. 5MB)"
                  />
                )}
              </div>
            </Stack>
          </CardContent>
          <Divider />
          <Stack direction="row" spacing={2} sx={{ p: 2, justifyContent: 'flex-end' }}>
            <Button color="secondary" onClick={() => router.push(paths.dashboard.ads)}>
              Ləğv et
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting || !imagePreview}>
              {isSubmitting ? 'Saxlanılır...' : 'Dəyişiklikləri Saxla'}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </form>
  );
}
