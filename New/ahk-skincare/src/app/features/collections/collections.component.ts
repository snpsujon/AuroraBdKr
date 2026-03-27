import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ahk-collections',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="bg-[#F8F9FB] min-h-screen pt-12 pb-32">
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row gap-12">
            <!-- 1. Sidebar Filter -->
            <aside class="w-full lg:w-72 flex-shrink-0 space-y-12">
                <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
                    <h4 class="text-xs font-black uppercase tracking-widest text-primary italic border-b border-gray-50 pb-4 mb-6">Price Range</h4>
                    <div class="space-y-4">
                        <div class="flex gap-4">
                            <input type="number" placeholder="MIN" class="w-full bg-gray-50 border-none rounded-xl p-3 text-[10px] font-bold focus:ring-primary/20">
                            <input type="number" placeholder="MAX" class="w-full bg-gray-50 border-none rounded-xl p-3 text-[10px] font-bold focus:ring-primary/20">
                        </div>
                        <button class="w-full bg-primary text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all">Apply</button>
                    </div>
                </div>

                <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
                    <h4 class="text-xs font-black uppercase tracking-widest text-primary italic border-b border-gray-50 pb-4 mb-6">Categories</h4>
                    <ul class="space-y-4">
                        <li *ngFor="let cat of categories">
                            <button class="flex items-center justify-between w-full group text-[11px] font-bold text-gray-500 hover:text-primary transition-all">
                                <span>{{ cat.name }}</span>
                                <i class="fas fa-chevron-right text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
                            </button>
                        </li>
                    </ul>
                </div>

                <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
                    <h4 class="text-xs font-black uppercase tracking-widest text-primary italic border-b border-gray-50 pb-4 mb-6">Brands</h4>
                    <div class="max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                        <label *ngFor="let brand of brands" class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" class="w-4 h-4 rounded border-gray-200 text-primary focus:ring-primary/20">
                            <span class="text-[11px] font-bold text-gray-500 group-hover:text-primary transition-colors">{{ brand }}</span>
                        </label>
                    </div>
                </div>
            </aside>

            <!-- 2. Main Content -->
            <div class="flex-grow">
                <!-- Sort Bar -->
                <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-wrap items-center justify-between gap-6 mb-12">
                    <div class="flex gap-2">
                        <button class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-primary text-white">Latest</button>
                        <button class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-gray-400 hover:bg-gray-50">Popular</button>
                        <button class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-gray-400 hover:bg-gray-50">Top Sale</button>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort By:</span>
                        <select class="bg-gray-50 border-none rounded-xl text-[10px] font-bold py-2 pl-4 pr-10 focus:ring-primary/20">
                            <option>Price (Low to High)</option>
                            <option>Price (High to Low)</option>
                        </select>
                    </div>
                </div>

                <!-- Product Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    <div *ngFor="let prod of products" class="bg-white p-5 rounded-[2rem] border border-gray-100 group hover:shadow-2xl transition-all duration-700 relative flex flex-col">
                        <div class="absolute top-4 left-4 z-10 px-2 py-1 bg-secondary text-white text-[8px] font-bold uppercase rounded-md tracking-widest">{{ prod.discount }}%</div>
                        <div class="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-6 relative">
                            <img [src]="prod.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        </div>
                        <div class="flex-grow flex flex-col">
                            <h3 class="text-gray-900 font-bold text-xs leading-tight mb-4 group-hover:text-primary h-8 line-clamp-2">{{ prod.name }}</h3>
                            <div class="mt-auto pt-4 border-t border-gray-50">
                                <div class="flex items-baseline gap-2 mb-4">
                                    <span class="text-primary font-black text-base italic">৳{{ prod.price }}</span>
                                    <span class="text-gray-300 line-through text-[10px]">৳{{ prod.oldPrice }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex text-yellow-500 text-[8px] gap-0.5">
                                        <i class="fas fa-star font-bold"></i>
                                        <span class="text-gray-400 font-bold ml-1">{{ prod.rating }}</span>
                                    </div>
                                    <span class="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{{ prod.sold }} Sold</span>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="bg-gray-50 rounded-lg p-2 text-center text-[8px] text-gray-400 font-bold uppercase transition-colors">
                                    Stock: 45
                                </div>
                                <div class="bg-primary/5 rounded-lg p-2 text-center text-[8px] text-primary font-bold uppercase transition-colors">
                                    Points: 12
                                </div>
                            </div>
                        </div>
                        <button class="mt-6 w-full bg-primary text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                            Add To Cart
                        </button>
                    </div>
                </div>

                <!-- Pagination Placeholder -->
                <div class="mt-24 flex items-center justify-center gap-4">
                    <button class="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-primary font-bold shadow-sm hover:bg-primary hover:text-white transition-all">1</button>
                    <button class="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 font-bold shadow-sm hover:bg-primary hover:text-white transition-all">2</button>
                    <button class="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 font-bold shadow-sm hover:bg-primary hover:text-white transition-all"><i class="fas fa-chevron-right text-xs"></i></button>
                </div>
            </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
  `]
})
export class CollectionsComponent {
  categories = [
    { name: 'Skin Care', slug: 'skin' },
    { name: 'Makeup', slug: 'makeup' },
    { name: 'Hair Care', slug: 'hair' },
    { name: 'Oral Care', slug: 'oral' },
    { name: 'Fragrance', slug: 'fragrance' }
  ];

  brands = ['3W Clinic', 'Some By Mi', 'COSRX', 'SKIN1004', 'The Ordinary', 'Innisfree', 'Nature Republic'];

  products = Array(12).fill({
    name: '3W Clinic Intensive UV Sunblock Cream SPF 50+ PA+++ 70ml',
    price: 378,
    oldPrice: 390,
    discount: 3,
    rating: 5.0,
    sold: 7911,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=400'
  });
}
