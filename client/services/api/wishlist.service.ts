import { apiClient } from '@/lib/api-client';

export interface WishlistStatus {
  isFavorite: boolean;
}

export interface WishlistEntry {
  id: string;
  userId: string;
  targetId: string;
  targetType: string;
  item: any;
  createdAt: string;
}

class WishlistService {
  private readonly endpoint = '/wishlist';

  async addToWishlist(targetId: string, targetType: string): Promise<WishlistEntry> {
    const response = await apiClient.post<WishlistEntry>(this.endpoint, { targetId, targetType });
    return response.data;
  }

  async removeFromWishlist(targetId: string, targetType: string): Promise<void> {
    await apiClient.delete(this.endpoint, {
      params: { targetId, targetType }
    });
  }

  async getWishlist(): Promise<WishlistEntry[]> {
    const response = await apiClient.get<WishlistEntry[]>(this.endpoint);
    return response.data;
  }

  async getStatus(targetId: string, targetType: string): Promise<WishlistStatus> {
    const response = await apiClient.get<WishlistStatus>(`${this.endpoint}/status`, {
      params: { targetId, targetType }
    });
    return response.data;
  }
}

export const wishlistService = new WishlistService();
