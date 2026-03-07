'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { HostelsTable } from '@/components/dashboard/hostel/hostels-table';
import { useHostels, useDeleteHostel } from '@/hooks/use-hostels';
import { paths } from '@/paths';
import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog';

export function HostelsView(): React.JSX.Element {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { data: hostels = [], isLoading, error } = useHostels();
  const { mutate: deleteHostel, isPending: isDeleting } = useDeleteHostel();

  const paginatedRows = hostels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  function handleEdit(id: string) {
    router.push(`${paths.dashboard.hostels}/${id}/edit`);
  }

  function handleDelete(id: string) {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  }

  function handleConfirmDelete() {
    if (selectedId) {
      deleteHostel(selectedId, {
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
          <Typography variant="h4">Hostellər</Typography>
          <Typography variant="body2" color="text.secondary">
            {isLoading ? 'Yüklənir...' : `${hostels.length} hostel`}
          </Typography>
        </Stack>
        <Button
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          onClick={() => router.push(paths.dashboard.hostelsCreate)}
        >
          Yeni Hostel
        </Button>
      </Stack>

      <HostelsTable
        rows={paginatedRows}
        count={hostels.length}
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
        title="Hosteli sil"
        description="Bu hosteli silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz."
      />
    </Stack>
  );
}
