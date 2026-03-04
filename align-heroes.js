const fs = require('fs');

const files = [
  'client/app/[locale]/about/fga/page.tsx',
  'client/app/[locale]/about/principles/page.tsx',
  'client/app/[locale]/about/transparency/page.tsx',
  'client/app/[locale]/info/airport/page.tsx',
  'client/app/[locale]/info/baku/page.tsx',
  'client/app/[locale]/places/hostels/page.tsx',
  'client/app/[locale]/places/hotels/page.tsx',
  'client/app/[locale]/places/landmarks/page.tsx',
  'client/app/[locale]/places/restaurants/page.tsx',
  'client/app/[locale]/transport/public/page.tsx',
  'client/app/[locale]/transport/taxi/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Outer wrapper: remove pt-28 and min-h-screen
  content = content.replace(/className="min-h-screen bg-background pb-20 pt-28"/g, 'className="bg-background pb-20"');

  // Hero: change to h-[100dvh] and remove max-w, rounded, margin, shadows
  content = content.replace(/className="relative w-full h-\[.*?\] min-h-\[.*?\][^>]+mb-16[^>]*"/, 'className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden xl:mb-20 mb-10"');

  // Inner content wrapper: add pt-20
  content = content.replace(/className="relative z-20 text-center px-4 max-w-/g, 'className="relative z-20 text-center px-4 pt-20 max-w-');

  fs.writeFileSync(file, content);
  console.log('Fixed', file);
});
