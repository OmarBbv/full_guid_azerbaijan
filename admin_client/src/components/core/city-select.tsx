'use client';

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useCities } from '@/hooks/use-cities';

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  language?: string;
}

export function CitySelect({
  value,
  onChange,
  error,
  helperText,
  label = 'Şəhər',
  required = false,
  fullWidth = true,
  language,
}: CitySelectProps): React.JSX.Element {
  const { data: cities = [], isLoading } = useCities({ active: true });

  const languageFilteredCities = React.useMemo(() => {
    if (!language) return cities;
    return cities.filter((c) => c.language === language);
  }, [cities, language]);

  const uniqueAndFilteredCities = React.useMemo(() => {
    const seen = new Set<string>();
    return languageFilteredCities.filter((c) => {
      if (seen.has(c.name)) return false;
      seen.add(c.name);
      return true;
    });
  }, [languageFilteredCities]);

  return (
    <FormControl fullWidth={fullWidth} error={error} required={required}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as string)}
        disabled={isLoading}
        endAdornment={
          isLoading ? (
            <CircularProgress size={18} sx={{ mr: 1 }} />
          ) : undefined
        }
      >
        {isLoading ? (
          <MenuItem disabled>
            <em>Yüklənir...</em>
          </MenuItem>
        ) : uniqueAndFilteredCities.length === 0 ? (
          <MenuItem disabled>
            <em>Bu dildə şəhər tapılmadı</em>
          </MenuItem>
        ) : (
          uniqueAndFilteredCities.map((city) => (
            <MenuItem key={city.id} value={city.name}>
              {city.name}
            </MenuItem>
          ))
        )}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
