'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { MapPin as MapPinIcon } from '@phosphor-icons/react/dist/ssr/MapPin';
import { Star as StarIcon } from '@phosphor-icons/react/dist/ssr/Star';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';
import type { City } from '@/types/city';

interface CitiesTableProps {
  rows: City[];
  count: number;
  page: number;
  rowsPerPage: number;
  isLoading?: boolean;
  error?: Error | null;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function CitiesTable({
  rows,
  count,
  page,
  rowsPerPage,
  isLoading = false,
  error = null,
  onPageChange,
  onRowsPerPageChange,
  onDelete,
  onEdit,
}: CitiesTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => rows.map((r) => r.id), [rows]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  if (isLoading) {
    return (
      <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Şəhərlər yüklənərkən xəta baş verdi: {error.message}
      </Alert>
    );
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
                />
              </TableCell>
              <TableCell>Şəhər</TableCell>
              <TableCell>Slug / Dil</TableCell>
              <TableCell>Bölgə</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Öne çıxan</TableCell>
              <TableCell>Yaradılıb</TableCell>
              <TableCell align="right">Əməliyyatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Heç bir şəhər tapılmadı
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const isSelected = selected?.has(row.id);
                return (
                  <TableRow hover key={row.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => (e.target.checked ? selectOne(row.id) : deselectOne(row.id))}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={row.image_url ?? undefined}
                          variant="rounded"
                          sx={{ width: 44, height: 44 }}
                        >
                          <MapPinIcon size={20} />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{row.name}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                          {row.slug}
                        </Typography>
                        <Chip label={row.language?.toUpperCase() || 'AZ'} size="small" sx={{ width: 'fit-content', mt: 0.5, fontSize: '0.65rem', height: 20 }} />
                      </Stack>
                    </TableCell>
                    <TableCell>{row.region ?? '—'}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.is_active ? 'Aktiv' : 'Deaktiv'}
                        color={row.is_active ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {row.is_featured ? (
                        <StarIcon size={16} weight="fill" color="#f5a623" />
                      ) : (
                        <Typography variant="body2" color="text.disabled">—</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {row.created_at ? dayjs(row.created_at).format('DD MMM YYYY') : '—'}
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Tooltip title="Düzəliş et">
                          <IconButton size="small" onClick={() => onEdit?.(row.id)}>
                            <PencilSimpleIcon size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Sil">
                          <IconButton size="small" color="error" onClick={() => onDelete?.(row.id)}>
                            <TrashIcon size={16} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_e, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
      />
    </Card>
  );
}
