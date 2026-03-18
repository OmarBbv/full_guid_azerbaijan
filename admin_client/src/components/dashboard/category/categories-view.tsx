'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useRouter } from 'next/navigation';
import { useCategories, useDeleteCategory } from '@/hooks/use-categories';
import { paths } from '@/paths';
import { CategoriesTable } from './categories-table';
import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog';

const LANGUAGES = [
  { value: 'all', label: '🌐 Hamısı' },
  { value: 'az',  label: '🇦🇿 Azərbaycan' },
  { value: 'en',  label: '🇬🇧 English' },
  { value: 'ru',  label: '🇷🇺 Русский' },
  { value: 'tr',  label: '🇹🇷 Türkçe' },
  { value: 'ar',  label: '🇸🇦 العربية' },
  { value: 'hi',  label: '🇮🇳 हिन्दी' },
];

export function CategoriesView(): React.JSX.Element {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [language, setLanguage] = React.useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const { data: categories = [], isLoading } = useCategories(
    language === 'all' ? undefined : language
  );
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const handleEdit = (id: number) => {
    router.push(`${paths.dashboard.categories}/${id}`);
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      deleteCategory(selectedId, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedId(null);
        },
      });
    }
  };

  const paginatedRows = categories.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Stack spacing={3}>
      {/* Header Row */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Stack spacing={0.5} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Kateqoriyalar</Typography>
          <Typography variant="body2" color="text.secondary">
            {isLoading
              ? 'Yüklənir...'
              : `${categories.length} kateqoriya${language !== 'all' ? ` (${LANGUAGES.find(l => l.value === language)?.label})` : ''}`
            }
          </Typography>
        </Stack>

        {/* Language Filter — same as Restaurants */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Dil filtri</InputLabel>
          <Select
            value={language}
            label="Dil filtri"
            onChange={(e) => { setLanguage(e.target.value); setPage(0); }}
          >
            {LANGUAGES.map((lang) => (
              <MenuItem key={lang.value} value={lang.value}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          startIcon={<PlusIcon />}
          variant="contained"
          onClick={() => router.push(paths.dashboard.categories + '/create')}
        >
          Yeni Kateqoriya
        </Button>
      </Stack>

      <CategoriesTable
        rows={paginatedRows}
        count={categories.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Kateqoriyanı sil"
        description="Bu kateqoriyanı silmək istədiyinizə əminsiniz? Bağlı məkanlar kateqoriyasız qalacaq."
      />
    </Stack>
  );
}
