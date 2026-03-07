'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { PlacesTable } from '@/components/dashboard/place/places-table';
import { usePlaces, useDeletePlace } from '@/hooks/use-places';
import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog';
import { paths } from '@/paths';

export function PlacesView(): React.JSX.Element {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { data: places = [], isLoading, error } = usePlaces();
  const { mutate: deletePlace, isPending: isDeleting } = useDeletePlace();

  const paginatedRows = places.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  function handleEdit(id: string) {
    router.push(`${paths.dashboard.places}/${id}/edit`);
  }

  function handleDelete(id: string) {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  }

  function handleConfirmDelete() {
    if (selectedId) {
      deletePlace(selectedId, {
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
          <Typography variant="h4">Məkanlar</Typography>
          <Typography variant="body2" color="text.secondary">
            {isLoading ? 'Yüklənir...' : `${places.length} məkan`}
          </Typography>
        </Stack>
        <Button
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          onClick={() => router.push(paths.dashboard.placesCreate)}
        >
          Yeni Məkan
        </Button>
      </Stack>

      <PlacesTable
        rows={paginatedRows}
        count={places.length}
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
        title="Məkanı sil"
        description="Bu məkanı silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz."
      />
    </Stack>
  );
}
