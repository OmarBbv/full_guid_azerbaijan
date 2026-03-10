'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
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
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';
import type { BlogPost } from '@/types/blog';

interface BlogTableProps {
  rows: BlogPost[];
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

export function BlogTable({
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
}: BlogTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => rows.map((r) => r.id), [rows]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  if (isLoading) {
    return (
      <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, minHeight: 400 }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Blog yazıları yüklənərkən xəta baş verdi: {error.message}
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
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Başlıq</TableCell>
              <TableCell>Dil</TableCell>
              <TableCell>Kateqoriya</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Oxunma müddəti</TableCell>
              <TableCell>Yaradılıb</TableCell>
              <TableCell align="right">Əməliyyatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Heç bir blog yazısı tapılmadı
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const isSelected = selected?.has(row.id);
                const languageFlag = row.language === 'az' ? '🇦🇿' : row.language === 'en' ? '🇬🇧' : '🇷🇺';

                return (
                  <TableRow hover key={row.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            selectOne(row.id);
                          } else {
                            deselectOne(row.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={row.cover_image_url ?? undefined} variant="rounded" sx={{ width: 40, height: 40 }}>
                          {row.title.charAt(0)}
                        </Avatar>
                        <Box sx={{ maxWidth: 300 }}>
                          <Typography variant="subtitle2" noWrap>{row.title}</Typography>
                          <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                            /{row.slug}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {languageFlag} {row.language.toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {row.category_label && (
                        <Chip
                          label={row.category_label}
                          size="small"
                          sx={{
                            bgcolor: row.category_color ? `${row.category_color}22` : 'action.selected',
                            color: row.category_color ?? 'text.primary',
                            fontWeight: 'bold'
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.is_published ? 'Yayında' : 'Qaralama'}
                        color={row.is_published ? 'success' : 'warning'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {row.read_time_minutes ?? 0} dəq
                      </Typography>
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
