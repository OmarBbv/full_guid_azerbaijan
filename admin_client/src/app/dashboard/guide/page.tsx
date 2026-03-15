'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { toast } from 'sonner';

import { guidePageService } from '@/services/guide-page.service';
import { paths } from '@/paths';
import type { GuidePage } from '@/types/guide-page';
import { GuideTable } from '@/components/dashboard/guide/guide-table';
import { DeleteConfirmationDialog } from '@/components/core/delete-confirmation-dialog';

export default function Page(): React.JSX.Element {
  const router = useRouter();
  const [pages, setPages] = React.useState<GuidePage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [language, setLanguage] = React.useState<string>('all');
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const fetchPages = React.useCallback(async (lang?: string) => {
    setIsLoading(true);
    try {
      const params = lang && lang !== 'all' ? { language: lang } : undefined;
      const data = await guidePageService.getAll(params);
      setPages(data);
    } catch (error) {
      toast.error('Məlumatlar yüklənərkən xəta baş verdi');
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPages(language);
  }, [fetchPages, language]);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      await guidePageService.remove(selectedId);
      toast.success('Səhifə silindi');
      fetchPages(language);
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Silinərkən xəta baş verdi');
    } finally {
      setIsDeleting(false);
      setSelectedId(null);
    }
  };

  const paginatedRows = React.useMemo(() => {
    return pages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [pages, page, rowsPerPage]);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Stack spacing={0.5} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Başlanğıc Məlumatları</Typography>
          <Typography variant="body2" color="text.secondary">
            {isLoading ? 'Yüklənir...' : `${pages.length} səhifə`}
          </Typography>
        </Stack>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Dil filtri</InputLabel>
          <Select
            value={language}
            label="Dil filtri"
            onChange={(e) => {
              setLanguage(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="all">🌐 Hamısı</MenuItem>
            <MenuItem value="az">🇦🇿 Azərbaycan</MenuItem>
            <MenuItem value="en">🇬🇧 English</MenuItem>
            <MenuItem value="ru">🇷🇺 Русский</MenuItem>
            <MenuItem value="tr">🇹🇷 Türkçe</MenuItem>
            <MenuItem value="ar">🇸🇦 العربية</MenuItem>
            <MenuItem value="hi">🇮🇳 हिन्दी</MenuItem>
          </Select>
        </FormControl>

        <Button
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          onClick={() => router.push(paths.dashboard.guideCreate)}
        >
          Yeni Səhifə
        </Button>
      </Stack>

      <GuideTable
        rows={paginatedRows}
        count={pages.length}
        page={page}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        onPageChange={setPage}
        onRowsPerPageChange={(rpp) => {
          setRowsPerPage(rpp);
          setPage(0);
        }}
        onEdit={(id) => router.push(paths.dashboard.guideEdit(id))}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Səhifəni sil"
        description="Bu məlumat səhifəsini silmək istədiyinizə əminsiniz?"
      />
    </Stack>
  );
}
