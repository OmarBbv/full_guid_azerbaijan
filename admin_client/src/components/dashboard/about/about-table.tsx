'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { FileText as FileTextIcon } from '@phosphor-icons/react/dist/ssr/FileText';
import dayjs from 'dayjs';

import type { AboutPage } from '@/types/about-page';

interface AboutTableProps {
  rows: AboutPage[];
  count: number;
  page: number;
  rowsPerPage: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function AboutTable({
  rows,
  count,
  page,
  rowsPerPage,
  isLoading = false,
  onPageChange,
  onRowsPerPageChange,
  onDelete,
  onEdit,
}: AboutTableProps): React.JSX.Element {
  if (isLoading) {
    return (
      <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Səhifə</TableCell>
              <TableCell>Slug / Dil</TableCell>
              <TableCell>Bloklar</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Yaradılıb</TableCell>
              <TableCell align="right">Əməliyyatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Heç bir səhifə tapılmadı
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={row.image_url ? (row.image_url.startsWith('http') ? row.image_url : `${process.env.NEXT_PUBLIC_API_URL}${row.image_url}`) : undefined}
                        variant="rounded"
                        sx={{ width: 44, height: 44 }}
                      >
                        <FileTextIcon size={20} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{row.title}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {row.subtitle || 'Alt başlıq yoxdur'}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                        {row.slug}
                      </Typography>
                      <Chip 
                        label={row.language?.toUpperCase() || 'AZ'} 
                        size="small" 
                        sx={{ width: 'fit-content', mt: 0.5, fontSize: '0.65rem', height: 20 }} 
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={`${row.sections?.length || 0} blok`} 
                      variant="outlined" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.is_active ? 'Aktiv' : 'Deaktiv'}
                      color={row.is_active ? 'success' : 'error'}
                      size="small"
                    />
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
              ))
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
