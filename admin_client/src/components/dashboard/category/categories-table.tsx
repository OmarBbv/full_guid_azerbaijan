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
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { Category } from '@/types/category';

const LANG_FLAGS: Record<string, string> = {
  az: '🇦🇿',
  en: '🇬🇧',
  ru: '🇷🇺',
  tr: '🇹🇷',
  ar: '🇸🇦',
  hi: '🇮🇳',
};

interface CategoriesTableProps {
  rows: Category[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export function CategoriesTable({
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  isLoading
}: CategoriesTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ad</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>İkon</TableCell>
              <TableCell>Dil</TableCell>
              <TableCell align="right">Əməliyyatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}><Skeleton variant="text" /></TableCell>
                    ))}
                  </TableRow>
                ))
              : rows.map((category) => (
                  <TableRow hover key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{category.name}</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                      {category.slug}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.4rem' }}>
                      {category.icon || '—'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${LANG_FLAGS[category.language] ?? '🌐'} ${category.language?.toUpperCase() ?? '—'}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600, letterSpacing: 0.5 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => onEdit(category.id)}>
                        <PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />
                      </IconButton>
                      <IconButton size="small" onClick={() => onDelete(category.id)} color="error">
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
