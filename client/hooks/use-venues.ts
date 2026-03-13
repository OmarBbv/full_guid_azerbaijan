import { useQuery } from '@tanstack/react-query';
import { venueService } from '../services/api/venue.service';

export function useVenues(params?: any) {
  return useQuery({
    queryKey: ['venues', params],
    queryFn: () => venueService.getAll(params),
  });
}
