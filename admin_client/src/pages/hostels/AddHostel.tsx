import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Save, Info, MapPin, Settings, Users } from 'lucide-react';
import api from '../../api/axios';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';

const hostelSchema = z.object({
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

  // Hostel fields
  hostel_type: z.enum(['PARTY_HOSTEL', 'FAMILY_HOSTEL', 'BOUTIQUE_HOSTEL', 'BACKPACKER', 'HISTORIC']),
  dorm_beds_count: z.number().optional(),
  private_rooms_count: z.number().optional(),
  max_dorm_size: z.number().optional(),
  available_dorm_gender: z.enum(['MIXED', 'FEMALE', 'MALE']),
  dorm_price_from_eur: z.number().optional(),
  private_price_from_eur: z.number().optional(),
  check_in_time: z.string(),
  check_out_time: z.string(),

  // Amenities
  has_wifi: z.boolean(),
  has_kitchen: z.boolean(),
  has_common_room: z.boolean(),
  has_lockers: z.boolean(),
  has_free_breakfast: z.boolean(),
  has_bar: z.boolean(),
  has_laundry: z.boolean(),
  has_luggage_storage: z.boolean(),
  has_24h_reception: z.boolean(),
  organizes_tours: z.boolean(),
  has_24h_security: z.boolean(),
  is_featured: z.boolean(),
});

type HostelFormData = z.infer<typeof hostelSchema>;

export default function AddHostel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HostelFormData>({
    resolver: zodResolver(hostelSchema),
    defaultValues: {
      hostel_type: 'BACKPACKER',
      available_dorm_gender: 'MIXED',
      check_in_time: '14:00',
      check_out_time: '12:00',
      has_wifi: true,
      has_kitchen: false,
      has_common_room: false,
      has_lockers: false,
      has_free_breakfast: false,
      has_bar: false,
      has_laundry: false,
      has_luggage_storage: false,
      has_24h_reception: false,
      organizes_tours: false,
      has_24h_security: false,
      is_featured: false,
    }
  });

  const mutation = useMutation({
    mutationFn: (data: HostelFormData) => api.post('/hostels', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hostels'] });
      navigate('/hostels');
    },
  });

  const onSubmit = (data: HostelFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hostels')}
            className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Yeni Hostel</h1>
            <p className="text-sm text-zinc-500 mt-1">Sistemə tam hostel məlumatlarını əlavə edin</p>
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
              <Input label="Başlıq" placeholder="Sahil Hostel" {...register('title')} error={errors.title?.message} />
              <Input label="Slug" placeholder="sahil-hostel" {...register('slug')} error={errors.slug?.message} />
              <Select
                label="Hostel Növü"
                options={[
                  { value: 'BACKPACKER', label: 'Backpacker' },
                  { value: 'PARTY_HOSTEL', label: 'Party' },
                  { value: 'FAMILY_HOSTEL', label: 'Family' },
                  { value: 'BOUTIQUE_HOSTEL', label: 'Boutique' },
                  { value: 'HISTORIC', label: 'Historic' },
                ]}
                {...register('hostel_type')}
                error={errors.hostel_type?.message}
              />
              <Select
                label="Dorm Cins"
                options={[
                  { value: 'MIXED', label: 'Qarışıq (Mixed)' },
                  { value: 'FEMALE', label: 'Yalnız Qadınlar' },
                  { value: 'MALE', label: 'Yalnız Kişilər' },
                ]}
                {...register('available_dorm_gender')}
                error={errors.available_dorm_gender?.message}
              />
            </div>
          </div>
        </section>

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
                  { value: 'Ganja', label: 'Gəncə' },
                ]}
                {...register('city')}
                error={errors.city?.message}
              />
              <Input label="Ünvan" placeholder="Nizami küç. 10" {...register('address')} error={errors.address?.message} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
            <Users size={18} className="text-orange-500" />
            <h2 className="font-bold text-zinc-900">Kapasitə və Qiymət</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input label="Dorm Yataq Sayı" type="number" {...register('dorm_beds_count', { valueAsNumber: true })} />
              <Input label="Özəl Otaq Sayı" type="number" {...register('private_rooms_count', { valueAsNumber: true })} />
              <Input label="Max Dorm Ölçüsü" type="number" {...register('max_dorm_size', { valueAsNumber: true })} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Input label="Dorm Qiyməti (€)" type="number" step="0.01" {...register('dorm_price_from_eur', { valueAsNumber: true })} />
              <Input label="Özəl Otaq Qiyməti (€)" type="number" step="0.01" {...register('private_price_from_eur', { valueAsNumber: true })} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center gap-2">
            <Settings size={18} className="text-indigo-500" />
            <h2 className="font-bold text-zinc-900">İmkanlar</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Checkbox label="Wi-Fi" {...register('has_wifi')} />
              <Checkbox label="Mətbəx" {...register('has_kitchen')} />
              <Checkbox label="Ümumi Otaq" {...register('has_common_room')} />
              <Checkbox label="Şkaflar (Lockers)" {...register('has_lockers')} />
              <Checkbox label="Pulsuz Səhər Yeməyi" {...register('has_free_breakfast')} />
              <Checkbox label="Bar" {...register('has_bar')} />
              <Checkbox label="Paltaryuyan" {...register('has_laundry')} />
              <Checkbox label="Baqaş Saxlama" {...register('has_luggage_storage')} />
              <Checkbox label="24s Resepsiyon" {...register('has_24h_reception')} />
              <Checkbox label="Turlar" {...register('organizes_tours')} />
              <Checkbox label="24s Mühafizə" {...register('has_24h_security')} />
              <Checkbox label="Seçilmiş" {...register('is_featured')} />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/hostels')}>Ləğv Et</Button>
          <Button type="submit" isLoading={mutation.isPending} className="px-12 gap-2 text-lg h-14">
            <Save size={20} />
            Yadda Saxla
          </Button>
        </div>
      </form>
    </div>
  );
}
