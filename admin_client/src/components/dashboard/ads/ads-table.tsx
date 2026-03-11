'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog';
import { useAds, useDeleteAd } from '@/hooks/use-ads';

export function AdsTable(): React.JSX.Element {
  const { data: ads = [], isLoading } = useAds();
  const { mutate: deleteAd, isPending: isDeleting } = useDeleteAd();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  function handleDeleteClick(id: string) {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  }

  function handleConfirmDelete() {
    if (selectedId) {
      deleteAd(selectedId, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedId(null);
        },
      });
    }
  }

  if (isLoading) return <Box p={3}>Reklamlar yüklənir...</Box>;

  return (
    <>
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Şəkil</TableCell>
                <TableCell>Başlıq</TableCell>
                <TableCell>Yerləşdirmə</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Yönləndirmə URL</TableCell>
                <TableCell align="right">Əməliyyatlar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ads.map((ad) => (
                <TableRow hover key={ad.id}>
                  <TableCell>
                    <Box sx={{ position: 'relative', width: 60, height: 40, borderRadius: 1, overflow: 'hidden' }}>
                      <Image src={ad.image_url} alt={ad.title} fill style={{ objectFit: 'cover' }} unoptimized />
                    </Box>
                  </TableCell>
                  <TableCell>{ad.title}</TableCell>
                  <TableCell>
                    <Chip size="small" label={ad.position} color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    {ad.is_active ? (
                      <Chip color="success" label="Aktiv" size="small" />
                    ) : (
                      <Chip color="default" label="Deaktiv" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    {ad.redirect_url ? (
                      <Link href={ad.redirect_url} target="_blank" rel="noopener noreferrer">
                        Keçid
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <PencilSimpleIcon weight="bold" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteClick(ad.id)}>
                      <TrashIcon weight="bold" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {ads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    Heç bir reklam tapılmadı. Başlamaq üçün birini yaradın.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
        <Divider />
      </Card>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Reklamı sil"
        description="Bu reklamı silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz."
      />
    </>
  );
}
