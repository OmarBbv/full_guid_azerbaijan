'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import TablePagination from '@mui/material/TablePagination';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
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
  rows: allCategories,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  isLoading
}: CategoriesTableProps): React.JSX.Element {
  // 1. Grupla: Root (Ana) və Alt kateqoriyalar
  const rootCategories = allCategories.filter(c => c.depth === 0 || !c.parentId);
  const subCategories = allCategories.filter(c => c.depth > 0 || c.parentId);

  // 2. Ana kateqoriyalar üzrə səhifələmə
  const paginatedRoots = rootCategories.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  if (isLoading) {
    return (
      <Stack spacing={2}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
        ))}
      </Stack>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {paginatedRoots.map((root) => {
        const children = subCategories.filter(sub => sub.parentId === root.id);

        return (
          <Accordion 
            key={root.id} 
            expanded={children.length === 0 ? false : undefined}
            sx={{ 
              borderRadius: '12px !important', 
              '&:before': { display: 'none' }, 
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)', 
              border: '1px solid', 
              borderColor: 'divider',
              overflow: 'hidden'
            }}
          >
            <AccordionSummary 
              expandIcon={children.length > 0 ? <CaretDownIcon /> : null} 
              sx={{ 
                px: 3, 
                py: 1,
                cursor: children.length > 0 ? 'pointer' : 'default !important',
                '&:hover': {
                  bgcolor: children.length > 0 ? 'action.hover' : 'inherit'
                }
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center" sx={{ width: '100%' }}>
                <Box sx={{ 
                  fontSize: '1.8rem', 
                  bgcolor: 'primary.light', 
                  width: 48, 
                  height: 48, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  borderRadius: 2, 
                  color: 'primary.contrastText', 
                  opacity: 0.9 
                }}>
                  {root.icon || '📍'}
                </Box>
                <Stack spacing={0.5} sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{root.name}</Typography>
                  <Typography variant="caption" color="text.secondary" fontFamily="monospace">{root.slug}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={`${LANG_FLAGS[root.language] ?? '🌐'} ${root.language?.toUpperCase()}`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                  {children.length > 0 && (
                    <Chip 
                      label={`${children.length} Alt`} 
                      size="small" 
                      color="secondary" 
                      variant="outlined" 
                      sx={{ fontWeight: 700 }} 
                    />
                  )}
                </Stack>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); onEdit(root.id); }} title="Düzəliş et">
                    <PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); onDelete(root.id); }} title="Sil">
                    <TrashIcon fontSize="var(--icon-fontSize-md)" />
                  </IconButton>
                </Stack>
              </Stack>
            </AccordionSummary>
            {children.length > 0 && (
              <AccordionDetails sx={{ bgcolor: 'background.default', borderTop: '1px solid', borderColor: 'divider', p: 0 }}>
                <Stack divider={<Divider />}>
                  {children.map(sub => (
                    <Box 
                      key={sub.id} 
                      sx={{ 
                        py: 1.5, 
                        px: 4, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 3, 
                        '&:hover': { bgcolor: 'action.hover' }, 
                        transition: 'background 0.2s' 
                      }}
                    >
                      <Box sx={{ color: 'text.disabled', fontSize: '1.4rem' }}>↳</Box>
                      <Box sx={{ 
                        fontSize: '1.2rem', 
                        width: 32, 
                        height: 32, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        bgcolor: 'secondary.light', 
                        borderRadius: 1.5, 
                        color: 'secondary.contrastText', 
                        opacity: 0.8 
                      }}>
                        {sub.icon || '🔹'}
                      </Box>
                      <Stack spacing={0.5} sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{sub.name}</Typography>
                        <Typography variant="caption" color="text.secondary" fontFamily="monospace">{sub.slug}</Typography>
                      </Stack>
                      <Chip label={sub.language?.toUpperCase()} size="small" variant="outlined" sx={{ fontSize: '0.65rem' }} />
                      <Stack direction="row" spacing={0.5}>
                        <IconButton size="small" onClick={() => onEdit(sub.id)}>
                          <PencilSimpleIcon fontSize="var(--icon-fontSize-sm)" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => onDelete(sub.id)}>
                          <TrashIcon fontSize="var(--icon-fontSize-sm)" />
                        </IconButton>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            )}
          </Accordion>
        );
      })}

      <Divider sx={{ mt: 2 }} />
      <TablePagination
        component="div"
        count={rootCategories.length}
        onPageChange={(_, p) => onPageChange(p)}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Səhifədə:"
        labelDisplayedRows={({ from, to, count: c }) => `${from}–${to} / ${c}`}
      />
    </Box>
  );
}
