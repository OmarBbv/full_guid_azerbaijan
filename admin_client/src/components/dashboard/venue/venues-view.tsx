'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useRouter } from 'next/navigation';
import { useVenues, useDeleteVenue } from '@/hooks/use-venues';
import { paths } from '@/paths';
import { VenuesTable } from './venues-table';
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

export function VenuesView(): React.JSX.Element {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [language, setLanguage] = React.useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const { data, isLoading, error } = useVenues({
    page: page + 1,
    limit,
    ...(language !== 'all' ? { language } : {}),
  });

  const { mutate: deleteVenue, isPending: isDeleting } = useDeleteVenue();

  const handleEdit = (id: number) => {
    router.push(`${paths.dashboard.venues}/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      deleteVenue(selectedId, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedId(null);
        },
      });
    }
  };

  const totalCount = data?.meta?.total ?? 0;

  return (
    <Stack spacing={3}>
      {/* Header Row */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Stack spacing={0.5} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Məkanlar (Venues)</Typography>
          <Typography variant="body2" color="text.secondary">
            {isLoading
              ? 'Yüklənir...'
              : `${totalCount} məkan${language !== 'all' ? ` (${LANGUAGES.find(l => l.value === language)?.label})` : ''}`
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
          onClick={() => router.push(paths.dashboard.venuesCreate)}
        >
          Yeni Məkan
        </Button>
      </Stack>

      <VenuesTable
        rows={data?.data || []}
        count={totalCount}
        page={page}
        rowsPerPage={limit}
        isLoading={isLoading}
        error={error as Error | null}
        onPageChange={(p) => setPage(p)}
        onRowsPerPageChange={(rpp) => { setLimit(rpp); setPage(0); }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Məkanı sil"
        description="Bu məkanı silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz."
      />
    </Stack>
  );
}
