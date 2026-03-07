'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { HotelsTable } from '@/components/dashboard/hotel/hotels-table';
import { useHotels, useDeleteHotel } from '@/hooks/use-hotels';
import { paths } from '@/paths';
import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog';

export function HotelsView(): React.JSX.Element {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [language, setLanguage] = React.useState<string>('all');

  const { data: hotels = [], isLoading, error } = useHotels(language === 'all' ? undefined : language);
  const { mutate: deleteHotel, isPending: isDeleting } = useDeleteHotel();

  const paginatedRows = hotels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  function handleEdit(id: string) {
    router.push(`${paths.dashboard.hotels}/${id}/edit`);
  }

  function handleDelete(id: string) {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  }

  function handleConfirmDelete() {
    if (selectedId) {
      deleteHotel(selectedId, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedId(null);
        },
      });
    }
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Stack spacing={0.5} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Otellər</Typography>
          <Typography variant="body2" color="text.secondary">
            {isLoading ? 'Yüklənir...' : `${hotels.length} otel`}
          </Typography>
        </Stack>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Dil filtri</InputLabel>
          <Select
            value={language}
            label="Dil filtri"
            onChange={(e) => { setLanguage(e.target.value); setPage(0); }}
          >
            <MenuItem value="all">🌐 Hamısı</MenuItem>
            <MenuItem value="az">🇦🇿 Azərbaycan</MenuItem>
            <MenuItem value="en">🇬🇧 English</MenuItem>
            <MenuItem value="ru">🇷🇺 Русский</MenuItem>
          </Select>
        </FormControl>

        <Button
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          onClick={() => router.push(paths.dashboard.hotelsCreate)}
        >
          Yeni Otel
        </Button>
      </Stack>

      <HotelsTable
        rows={paginatedRows}
        count={hotels.length}
        page={page}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        error={error as Error | null}
        onPageChange={setPage}
        onRowsPerPageChange={(rpp) => {
          setRowsPerPage(rpp);
          setPage(0);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Oteli sil"
        description="Bu oteli silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz."
      />
    </Stack>
  );
}
