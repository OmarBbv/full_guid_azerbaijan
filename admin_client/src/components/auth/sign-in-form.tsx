'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { useAdminLogin } from '@/hooks/use-auth';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  email: zod.string().min(1, { message: 'E-poçt tələb olunur' }).email({ message: 'Düzgün e-poçt daxil edin' }),
  password: zod.string().min(1, { message: 'Şifrə tələb olunur' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'admin@fullguide.az', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const { checkSession } = useUser();
  const adminLogin = useAdminLogin();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      try {
        await adminLogin.mutateAsync({ email: values.email, password: values.password });
      } catch (err: any) {
        const message =
          err?.response?.data?.message ?? err?.message ?? 'Giriş zamanı xəta baş verdi';
        setError('root', { type: 'server', message });
        return;
      }

      // Refresh auth session state so guards pick up the new token
      await checkSession?.();
      router.refresh();
    },
    [adminLogin, checkSession, router, setError]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Admin Girişi</Typography>
        <Typography color="text.secondary" variant="body2">
          Full Guide Azerbaijan İdarəetmə Paneli
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>E-poçt ünvanı</InputLabel>
                <OutlinedInput {...field} label="E-poçt ünvanı" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Şifrə</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  }
                  label="Şifrə"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}

          <Button disabled={adminLogin.isPending} type="submit" variant="contained">
            {adminLogin.isPending ? 'Giriş edilir...' : 'Daxil ol'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
