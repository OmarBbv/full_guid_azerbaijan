import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Save, Info, MapPin, Phone, Settings } from 'lucide-react';
import api from '../../api/axios';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';

const hotelSchema = z.object({
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
  website_url: z.string().url('Düzgün URL daxil edin').optional().or(z.literal('')),
  latitude: z.number().optional(),
  longitude: z.number().optional(),

  // Hotel fields
  star_rating: z.number().min(1).max(5),
  hotel_type: z.enum(['HOTEL', 'BOUTIQUE', 'RESORT', 'VILLA', 'APARTMENT']),
  price_from_azn: z.number().optional(),
  price_to_azn: z.number().optional(),
  total_rooms: z.number().optional(),
  total_floors: z.number().optional(),
  check_in_time: z.string(),
  check_out_time: z.string(),
  free_cancellation_days: z.number(),

  // Boolean amenities
  has_wifi: z.boolean(),
  has_parking: z.boolean(),
  has_pool: z.boolean(),
  has_spa: z.boolean(),
  has_gym: z.boolean(),
  has_restaurant: z.boolean(),
  has_room_service: z.boolean(),
  has_airport_transfer: z.boolean(),
  pets_allowed: z.boolean(),
  accepts_cards: z.boolean(),
  is_featured: z.boolean(),
});

type HotelFormData = z.infer<typeof hotelSchema>;

export default function AddHotel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      star_rating: 3,
      hotel_type: 'HOTEL',
      check_in_time: '14:00',
      check_out_time: '12:00',
      has_wifi: true,
      has_parking: false,
      has_pool: false,
      has_spa: false,
      has_gym: false,
      has_restaurant: false,
      has_room_service: false,
      has_airport_transfer: false,
      pets_allowed: false,
      accepts_cards: false,
      is_featured: false,
    }
  });

  const mutation = useMutation({
    mutationFn: (data: HotelFormData) => api.post('/hotels', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      navigate('/hotels');
    },
  });

  const onSubmit = (data: HotelFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hotels')}
            className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Yeni Otel</h1>
            <p className="text-sm text-zinc-500 mt-1">Sistemə tam otel məlumatlarını əlavə edin</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
            <Info size={18} className="text-blue-500" />
            <h2 className="font-bold text-zinc-900">Əsas Məlumatlar</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Başlıq" placeholder="Hilton Baku" {...register('title')} error={errors.title?.message} />
              <Input label="Slug" placeholder="hilton-baku" {...register('slug')} error={errors.slug?.message} />
              <Select
                label="Otel Növü"
                options={[
                  { value: 'HOTEL', label: 'Otel' },
                  { value: 'BOUTIQUE', label: 'Butik Otel' },
                  { value: 'RESORT', label: 'Resort' },
                  { value: 'VILLA', label: 'Villa' },
                  { value: 'APARTMENT', label: 'Apartment' },
                ]}
                {...register('hotel_type')}
                error={errors.hotel_type?.message}
              />
              <Input label="Ulduz Sayı" type="number" min="1" max="5" {...register('star_rating', { valueAsNumber: true })} error={errors.star_rating?.message} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">Qısa Təsvir</label>
              <textarea
                className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all duration-200 border-zinc-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm h-24 ${errors.short_description ? 'border-red-500' : ''}`}
                {...register('short_description')}
              />
              {errors.short_description && <p className="text-xs text-red-500 font-medium">{errors.short_description.message}</p>}
            </div>
          </div>
        </section>

        {/* Location Info */}
        <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
            <MapPin size={18} className="text-red-500" />
            <h2 className="font-bold text-zinc-900">Yerləşmə</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Şəhər"
                options={[
                  { value: '', label: 'Şəhər seçin' },
                  { value: 'Baku', label: 'Bakı' },
                  { value: 'Gabala', label: 'Qəbələ' },
                  { value: 'Ganja', label: 'Gəncə' },
                  { value: 'Sheki', label: 'Şəki' },
                ]}
                {...register('city')}
                error={errors.city?.message}
              />
              <Input label="Ünvan" placeholder="Azadlıq pr. 1" {...register('address')} error={errors.address?.message} />
              <Input label="Enlik (Latitude)" type="number" step="any" {...register('latitude', { valueAsNumber: true })} error={errors.latitude?.message} />
              <Input label="Uzunluq (Longitude)" type="number" step="any" {...register('longitude', { valueAsNumber: true })} error={errors.longitude?.message} />
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
            <Phone size={18} className="text-green-500" />
            <h2 className="font-bold text-zinc-900">Əlaqə</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input label="WhatsApp" placeholder="994XXXXXXXXX" {...register('whatsapp_number')} error={errors.whatsapp_number?.message} />
              <Input label="Telefon" placeholder="+994XXXXXXXXX" {...register('phone_number')} error={errors.phone_number?.message} />
              <Input label="Email" type="email" placeholder="hotel@info.az" {...register('email')} error={errors.email?.message} />
            </div>
            <Input label="Vebsayt" placeholder="https://example.com" {...register('website_url')} error={errors.website_url?.message} />
          </div>
        </section>

        {/* Details & Amenities */}
        <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
            <Settings size={18} className="text-indigo-500" />
            <h2 className="font-bold text-zinc-900">Detallar ve İmkanlar</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Input label="Min Qiymət (AZN)" type="number" {...register('price_from_azn', { valueAsNumber: true })} error={errors.price_from_azn?.message} />
              <Input label="Max Qiymət (AZN)" type="number" {...register('price_to_azn', { valueAsNumber: true })} error={errors.price_to_azn?.message} />
              <Input label="Otaq Sayı" type="number" {...register('total_rooms', { valueAsNumber: true })} error={errors.total_rooms?.message} />
              <Input label="Mərtəbə Sayı" type="number" {...register('total_floors', { valueAsNumber: true })} error={errors.total_floors?.message} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-50 pt-6">
              <Input label="Giriş Vaxtı" type="time" {...register('check_in_time')} error={errors.check_in_time?.message} />
              <Input label="Çıxış Vaxtı" type="time" {...register('check_out_time')} error={errors.check_out_time?.message} />
              <Input label="Pulsuz Ləğv (Gün)" type="number" {...register('free_cancellation_days', { valueAsNumber: true })} error={errors.free_cancellation_days?.message} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-zinc-50 pt-6">
              <Checkbox label="Wi-Fi" {...register('has_wifi')} />
              <Checkbox label="Parking" {...register('has_parking')} />
              <Checkbox label="Baseyn" {...register('has_pool')} />
              <Checkbox label="SPA" {...register('has_spa')} />
              <Checkbox label="İdman zalı" {...register('has_gym')} />
              <Checkbox label="Restoran" {...register('has_restaurant')} />
              <Checkbox label="Otaq Xidməti" {...register('has_room_service')} />
              <Checkbox label="Transfer" {...register('has_airport_transfer')} />
              <Checkbox label="Heyvanlara İcazə" {...register('pets_allowed')} />
              <Checkbox label="Kartla Ödəniş" {...register('accepts_cards')} />
              <Checkbox label="Seçilmiş (Featured)" {...register('is_featured')} />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/hotels')}>Ləğv Et</Button>
          <Button type="submit" isLoading={mutation.isPending} className="px-12 gap-2 text-lg h-14">
            <Save size={20} />
            Yadda Saxla
          </Button>
        </div>
      </form>
    </div>
  );
}
