'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { RestaurantsTable } from '@/components/dashboard/restaurant/restaurants-table';
import { useRestaurants, useDeleteRestaurant } from '@/hooks/use-restaurants';
import { paths } from '@/paths';
import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog';

export function RestaurantsView(): React.JSX.Element {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { data: restaurants = [], isLoading, error } = useRestaurants();
  const { mutate: deleteRestaurant, isPending: isDeleting } = useDeleteRestaurant();

  const paginatedRows = restaurants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  function handleEdit(id: string) {
    router.push(`${paths.dashboard.restaurants}/${id}/edit`);
  }

  function handleDelete(id: string) {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  }

  function handleConfirmDelete() {
    if (selectedId) {
      deleteRestaurant(selectedId, {
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
          <Typography variant="h4">Restoranlar</Typography>
          <Typography variant="body2" color="text.secondary">
            {isLoading ? 'Yüklənir...' : `${restaurants.length} restoran`}
          </Typography>
        </Stack>
        <Button
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          onClick={() => router.push(paths.dashboard.restaurantsCreate)}
        >
          Yeni Restoran
        </Button>
      </Stack>

      <RestaurantsTable
        rows={paginatedRows}
        count={restaurants.length}
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
        title="Restoranı sil"
        description="Bu restoranı silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz."
      />
    </Stack>
  );
}
