export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">{title}</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8 text-center text-zinc-500">
        Bu səhifə hələ yaradılmayıb. "{title}" modulu tezliklə bura əlavə ediləcək.
      </div>
    </div>
  );
}
