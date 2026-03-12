'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { useUsers } from '@/hooks/use-users';
import { CustomersFilters } from './customers-filters';
import { CustomersTable, type Customer } from './customers-table';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function CustomersView(): React.JSX.Element {
  const { data: users, isLoading, error } = useUsers();
  const page = 0;
  const rowsPerPage = 25;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Gözlənilməz xəta baş verdi.</Typography>
      </Box>
    );
  }

  const customers: Customer[] = (users || []).map((user) => ({
    id: user.id,
    name: user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'İstifadəçi',
    avatar: '',
    email: user.email,
    phone: '',
    address: { city: '', state: '', country: '', street: '' },
    createdAt: new Date(user.createdAt),
  }));

  const paginatedCustomers = customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">İstifadəçilər</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              İdxal et
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              İxrac et
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={customers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}
