'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { Venue, VenueStatus } from '@/types/venue';

const LANG_FLAGS: Record<string, string> = {
  az: '🇦🇿', en: '🇬🇧', ru: '🇷🇺', tr: '🇹🇷', ar: '🇸🇦', hi: '🇮🇳',
};

const statusColors: Record<VenueStatus, 'success' | 'warning' | 'error' | 'default'> = {
  [VenueStatus.ACTIVE]: 'success',
  [VenueStatus.PENDING]: 'warning',
  [VenueStatus.INACTIVE]: 'error',
};

interface VenuesTableProps {
  rows: Venue[];
  count: number;
  page: number;
  rowsPerPage: number;
  isLoading?: boolean;
  error?: Error | null;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function VenuesTable({
  rows,
  count,
  page,
  rowsPerPage,
  isLoading,
  error,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}: VenuesTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell>Ad</TableCell>
              <TableCell>Kateqoriya</TableCell>
              <TableCell>Şəhər</TableCell>
              <TableCell>Dil</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reytinq</TableCell>
              <TableCell align="right">Əməliyyatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}><Skeleton variant="text" /></TableCell>
                    ))}
                  </TableRow>
                ))
              : rows.map((venue) => (
                  <TableRow hover key={venue.id}>
                    <TableCell sx={{ fontWeight: 500 }}>{venue.name}</TableCell>
                    <TableCell>{venue.category?.name || '—'}</TableCell>
                    <TableCell>{venue.city || '—'}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${LANG_FLAGS[venue.language] ?? '🌐'} ${venue.language?.toUpperCase() ?? '—'}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600, letterSpacing: 0.5 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={venue.status}
                        color={statusColors[venue.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{venue.rating} ({venue.reviewCount})</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => onEdit(venue.id)}>
                        <PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />
                      </IconButton>
                      <IconButton size="small" onClick={() => onDelete(venue.id)} color="error">
                        <TrashIcon fontSize="var(--icon-fontSize-md)" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={(_, p) => onPageChange(p)}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Səhifədə:"
        labelDisplayedRows={({ from, to, count: c }) => `${from}–${to} / ${c}`}
      />
    </Card>
  );
}
