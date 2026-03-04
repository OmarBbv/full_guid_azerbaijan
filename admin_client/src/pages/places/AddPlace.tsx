import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Save, Info, MapPin } from 'lucide-react';
import api from '../../api/axios';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';

const placeSchema = z.object({
  title: z.string().min(3, 'Başlıq ən az 3 simvol olmalıdır'),
  slug: z.string().min(3, 'Slug ən az 3 simvol olmalıdır'),
  short_description: z.string().min(10, 'Qısa təsvir ən az 10 simvol olmalıdır'),
  detailed_description: z.string().optional(),
  type: z.enum(['RESTAURANT', 'HOTEL', 'HOSTEL', 'LANDMARK', 'OTHER']),
  city: z.string().min(1, 'Şəhər seçilməlidir'),
  address: z.string().min(5, 'Ünvan ən az 5 simvol olmalıdır'),
  whatsapp_number: z.string().min(7, 'WhatsApp nömrəsi düzgün deyil'),
  phone_number: z.string().optional(),
  email: z.string().email('Düzgün email daxil edin').optional().or(z.literal('')),
  website_url: z.string().url('Düzgün URL daxil edin').optional().or(z.literal('')),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  is_featured: z.boolean(),
});

type PlaceFormData = z.infer<typeof placeSchema>;

export default function AddPlace() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlaceFormData>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      type: 'LANDMARK',
      is_featured: false,
    }
  });

  const mutation = useMutation({
    mutationFn: (data: PlaceFormData) => api.post('/places', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
      navigate('/places');
    },
  });

  const onSubmit = (data: PlaceFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/places')}
            className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Yeni Məkan</h1>
            <p className="text-sm text-zinc-500 mt-1">Sistemə yeni bir ümumi məkan əlavə edin</p>
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
              <Input label="Başlıq" placeholder="Maiden Tower" {...register('title')} error={errors.title?.message} />
              <Input label="Slug" placeholder="maiden-tower" {...register('slug')} error={errors.slug?.message} />
              <Select
                label="Məkan Növü"
                options={[
                  { value: 'LANDMARK', label: 'Görməli Yer' },
                  { value: 'HOTEL', label: 'Otel' },
                  { value: 'RESTAURANT', label: 'Restoran' },
                  { value: 'HOSTEL', label: 'Hostel' },
                  { value: 'OTHER', label: 'Digər' },
                ]}
                {...register('type')}
                error={errors.type?.message}
              />
              <Checkbox label="Seçilmiş Məkan" {...register('is_featured')} />
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
                  { value: 'Shusha', label: 'Şuşa' },
                  { value: 'Ganja', label: 'Gəncə' },
                ]}
                {...register('city')}
                error={errors.city?.message}
              />
              <Input label="Ünvan" placeholder="İçərişəhər" {...register('address')} error={errors.address?.message} />
              <Input label="WhatsApp" placeholder="994XXXXXXXXX" {...register('whatsapp_number')} />
              <Input label="Telefon" placeholder="+994XXXXXXXXX" {...register('phone_number')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Enlik (Lat)" type="number" step="any" {...register('latitude', { valueAsNumber: true })} />
              <Input label="Uzunluq (Lng)" type="number" step="any" {...register('longitude', { valueAsNumber: true })} />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/places')}>Ləğv Et</Button>
          <Button type="submit" isLoading={mutation.isPending} className="px-12 gap-2 text-lg h-14">
            <Save size={20} />
            Yadda Saxla
          </Button>
        </div>
      </form>
    </div>
  );
}
