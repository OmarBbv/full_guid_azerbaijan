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
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';
import type { Hostel } from '@/types/hostel';
import { PlaceStatus } from '@/types/restaurant';

const statusColor: Record<PlaceStatus, 'success' | 'warning' | 'error'> = {
  [PlaceStatus.ACTIVE]: 'success',
  [PlaceStatus.PENDING]: 'warning',
  [PlaceStatus.INACTIVE]: 'error',
};

interface HostelsTableProps {
  rows: Hostel[];
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

export function HostelsTable({
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
}: HostelsTableProps): React.JSX.Element {
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
        Hostellər yüklənərkən xəta baş verdi: {error.message}
      </Alert>
    );
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '900px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
                />
              </TableCell>
              <TableCell>Ad</TableCell>
              <TableCell>Dil</TableCell>
              <TableCell>Şəhər</TableCell>
              <TableCell>Növ</TableCell>
              <TableCell>Yataq yeri qiyməti (EUR)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Yaradılıb</TableCell>
              <TableCell align="right">Əməliyyatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Heç bir hostel tapılmadı
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const isSelected = selected?.has(row.id);
                const status = row.place?.status ?? PlaceStatus.PENDING;
                const language = row.place?.language || 'az';
                const languageFlag = language === 'az' ? '🇦🇿' : language === 'en' ? '🇬🇧' : '🇷🇺';

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
                          src={row.place?.thumbnail ?? undefined}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        >
                          {row.place?.title?.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2">{row.place?.title ?? '—'}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {languageFlag} {language.toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.place?.city ?? '—'}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {row.hostel_type?.toLowerCase().replace('_', ' ')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {row.dorm_price_from_eur != null ? `${row.dorm_price_from_eur} EUR` : '—'}
                    </TableCell>
                    <TableCell>
                      <Chip label={status} color={statusColor[status]} size="small" />
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
