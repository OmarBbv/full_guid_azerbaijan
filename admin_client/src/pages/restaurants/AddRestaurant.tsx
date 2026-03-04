import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Save, Info, MapPin, Utensils } from 'lucide-react';
import api from '../../api/axios';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';

const restaurantSchema = z.object({
  // Place fields
  title: z.string().min(3, 'Başlıq ən az 3 simvol olmalıdır'),
  slug: z.string().min(3, 'Slug ən az 3 simvol olmalıdır'),
  short_description: z.string().min(10, 'Qısa təsvir ən az 10 simvol olmalıdır'),
  detailed_description: z.string().optional(),
  city: z.string().min(1, 'Şəhər seçilməlidir'),
  address: z.string().min(5, 'Ünvan ən az 5 simvol olmalıdır'),
  whatsapp_number: z.string().min(7, 'WhatsApp nömrəsi düzgün deyil'),
  phone_number: z.string().optional(),
  email: z.string().email('Düzgün email daxil edin').optional().or(z.literal('')),
  latitude: z.number().optional(),
  longitude: z.number().optional(),

  // Restaurant fields
  cuisine_type: z.enum(['AZERBAIJANI', 'TURKISH', 'EUROPEAN', 'ITALIAN', 'SEAFOOD', 'ASIAN', 'GEORGIAN', 'MIXED', 'OTHER']),
  dining_style: z.enum(['CASUAL', 'FINE_DINING', 'CAFE', 'FAST_FOOD', 'BUFFET', 'MUSEUM_STYLE']),
  price_range: z.enum(['BUDGET', 'MID', 'UPSCALE', 'LUXURY']),
  avg_bill_per_person_azn: z.number().optional(),
  seating_capacity: z.number().optional(),

  // Amenities
  has_wifi: z.boolean(),
  has_parking: z.boolean(),
  has_outdoor_seating: z.boolean(),
  has_live_music: z.boolean(),
  is_halal_certified: z.boolean(),
  is_vegetarian_friendly: z.boolean(),
  has_private_rooms: z.boolean(),
  accepts_cards: z.boolean(),
  is_featured: z.boolean(),
});

type RestaurantFormData = z.infer<typeof restaurantSchema>;

export default function AddRestaurant() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      cuisine_type: 'AZERBAIJANI',
      dining_style: 'CASUAL',
      price_range: 'MID',
      has_wifi: true,
      has_parking: false,
      has_outdoor_seating: false,
      has_live_music: false,
      is_halal_certified: false,
      is_vegetarian_friendly: false,
      has_private_rooms: false,
      accepts_cards: false,
      is_featured: false,
    }
  });

  const mutation = useMutation({
    mutationFn: (data: RestaurantFormData) => api.post('/restaurants', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      navigate('/restaurants');
    },
  });

  const onSubmit = (data: RestaurantFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/restaurants')}
            className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Yeni Restoran</h1>
            <p className="text-sm text-zinc-500 mt-1">Sistemə tam restoran məlumatlarını əlavə edin</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
            <Info size={18} className="text-blue-500" />
            <h2 className="font-bold text-zinc-900">Əsas Məlumatlar</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Başlıq" placeholder="Manqal Restaurant" {...register('title')} error={errors.title?.message} />
              <Input label="Slug" placeholder="manqal-restaurant" {...register('slug')} error={errors.slug?.message} />
              <Select
                label="Mətbəx Növü"
                options={[
                  { value: 'AZERBAIJANI', label: 'Azərbaycan' },
                  { value: 'TURKISH', label: 'Türk' },
                  { value: 'EUROPEAN', label: 'Avropa' },
                  { value: 'ITALIAN', label: 'İtalyan' },
                  { value: 'SEAFOOD', label: 'Dəniz məhsulları' },
                  { value: 'ASIAN', label: 'Asiya' },
                  { value: 'GEORGIAN', label: 'Gürcü' },
                  { value: 'MIXED', label: 'Qarışıq' },
                  { value: 'OTHER', label: 'Digər' },
                ]}
                {...register('cuisine_type')}
                error={errors.cuisine_type?.message}
              />
              <Select
                label="Yemək Stili"
                options={[
                  { value: 'CASUAL', label: 'Casual' },
                  { value: 'FINE_DINING', label: 'Fine Dining' },
                  { value: 'CAFE', label: 'Kafe' },
                  { value: 'FAST_FOOD', label: 'Fast Food' },
                  { value: 'BUFFET', label: 'Buffet' },
                  { value: 'MUSEUM_STYLE', label: 'Museum Style' },
                ]}
                {...register('dining_style')}
                error={errors.dining_style?.message}
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
            <MapPin size={18} className="text-red-500" />
            <h2 className="font-bold text-zinc-900">Yerləşmə ve Əlaqə</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Şəhər"
                options={[
                  { value: '', label: 'Şəhər seçin' },
                  { value: 'Baku', label: 'Bakı' },
                  { value: 'Sheki', label: 'Şəki' },
                ]}
                {...register('city')}
                error={errors.city?.message}
              />
              <Input label="Ünvan" placeholder="İçərişəhər, Qala küç." {...register('address')} error={errors.address?.message} />
              <Input label="WhatsApp" placeholder="994XXXXXXXXX" {...register('whatsapp_number')} />
              <Input label="Telefon" placeholder="+994XXXXXXXXX" {...register('phone_number')} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
            <Utensils size={18} className="text-orange-500" />
            <h2 className="font-bold text-zinc-900">Restoran Detalları</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select
                label="Qiymət Aralığı"
                options={[
                  { value: 'BUDGET', label: '$ (Budget)' },
                  { value: 'MID', label: '$$ (Mid)' },
                  { value: 'UPSCALE', label: '$$$ (Upscale)' },
                  { value: 'LUXURY', label: '$$$$ (Luxury)' },
                ]}
                {...register('price_range')}
              />
              <Input label="Ortalama Hesab (AZN)" type="number" {...register('avg_bill_per_person_azn', { valueAsNumber: true })} />
              <Input label="Oturacaq Sayı" type="number" {...register('seating_capacity', { valueAsNumber: true })} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-zinc-50">
              <Checkbox label="Wi-Fi" {...register('has_wifi')} />
              <Checkbox label="Parking" {...register('has_parking')} />
              <Checkbox label="Açıq Hava" {...register('has_outdoor_seating')} />
              <Checkbox label="Canlı Musiqi" {...register('has_live_music')} />
              <Checkbox label="Halal Sertifikatı" {...register('is_halal_certified')} />
              <Checkbox label="Vegetarian dostu" {...register('is_vegetarian_friendly')} />
              <Checkbox label="Özəl Otaqlar" {...register('has_private_rooms')} />
              <Checkbox label="Kartla Ödəniş" {...register('accepts_cards')} />
              <Checkbox label="Seçilmiş" {...register('is_featured')} />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/restaurants')}>Ləğv Et</Button>
          <Button type="submit" isLoading={mutation.isPending} className="px-12 gap-2 text-lg h-14">
            <Save size={20} />
            Yadda Saxla
          </Button>
        </div>
      </form>
    </div>
  );
}
