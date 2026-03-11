'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { useDropzone, type DropzoneOptions, type FileRejection } from 'react-dropzone';

export interface FileDropzoneProps extends DropzoneOptions {
  caption?: string;
  onDrop?: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
}

export function FileDropzone({ caption, onDrop, ...props }: FileDropzoneProps): React.JSX.Element {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...props,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        alignItems: 'center',
        border: '1px dashed var(--mui-palette-divider)',
        borderRadius: 1,
        cursor: 'pointer',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        outline: 'none',
        p: 6,
        ...(isDragActive && { bgcolor: 'var(--mui-palette-action-hover)', opacity: 0.5 }),
        '&:hover': { bgcolor: 'var(--mui-palette-action-hover)' },
      }}
    >
      <input {...getInputProps()} />
      <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Avatar
          sx={{
            '--Avatar-size': '64px',
            bgcolor: 'var(--mui-palette-background-paper)',
            boxShadow: 'var(--mui-shadows-1)',
            color: 'var(--mui-palette-text-primary)',
          }}
        >
          <UploadIcon fontSize="var(--icon-fontSize-lg)" />
        </Avatar>
        <Stack spacing={1}>
          <Typography variant="h6">
            <Typography component="span" sx={{ textDecoration: 'underline' }} variant="inherit">
              Click to upload
            </Typography>{' '}
            or drag and drop
          </Typography>
          {caption ? (
            <Typography color="text.secondary" variant="body2">
              {caption}
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
}
