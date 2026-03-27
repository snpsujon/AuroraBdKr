import { Component, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'ahk-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="bg-[#F8F9FB] min-h-screen">
      <!-- 1. Hero Slider Section -->
      <section class="relative container mx-auto px-6 pt-8 pb-12">
        <div class="rounded-[2.5rem] overflow-hidden aspect-[21/9] relative group">
            <div class="absolute inset-0 bg-[#E5E5E0] flex items-center justify-center">
                <!-- Placeholder for actual banner -->
                <div class="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1596462502278-27ec82030c7a?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover">
            </div>
            <div class="absolute inset-0 z-20 flex flex-col justify-center px-12 lg:px-24 text-white">
                <span class="text-xs font-bold uppercase tracking-[0.4em] mb-4 hero-tag opacity-0">Eid Beauty Must Haves</span>
                <h1 class="text-5xl lg:text-7xl font-serif font-black italic mb-8 leading-tight hero-title opacity-0">Up to 40% OFF <br> On Korean Care</h1>
                <button class="bg-primary text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest w-fit hover:bg-white hover:text-primary transition-all hero-cta opacity-0">Explore Deals</button>
            </div>
            
            <!-- Slider Controls -->
            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                <div class="w-2 h-2 rounded-full bg-white transition-all w-8"></div>
                <div class="w-2 h-2 rounded-full bg-white/40"></div>
                <div class="w-2 h-2 rounded-full bg-white/40"></div>
            </div>
        </div>
      </section>

      <!-- 2. Mega Deals Grid -->
      <section class="container mx-auto px-6 pb-24">
        <div class="flex items-center justify-between mb-12">
            <h2 class="text-2xl font-serif font-black italic text-gray-900 flex items-center gap-4">
                Mega Deals
                <span class="w-12 h-[2px] bg-primary/20"></span>
            </h2>
            <a href="#" class="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">See All →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div *ngFor="let deal of promoBanners" class="group relative overflow-hidden rounded-3xl aspect-square shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer">
                <img [src]="deal.image" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <span class="text-accent text-[9px] font-bold uppercase tracking-widest mb-2">{{ deal.tag }}</span>
                    <h3 class="text-white text-xl font-serif italic">{{ deal.title }}</h3>
                </div>
            </div>
        </div>
      </section>

      <!-- 3. Weekly Ranking (Horizontal Scroll) -->
      <section class="bg-white py-24">
         <div class="container mx-auto px-6">
            <div class="flex items-center justify-between mb-16">
                <div>
                   <h2 class="text-3xl font-serif font-black italic text-gray-900 mb-2">Weekly Ranking</h2>
                   <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold italic">Bestsellers based on customer choices</p>
                </div>
                <a href="#" class="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">See All →</a>
            </div>

            <div class="flex gap-8 overflow-x-auto pb-12 scrollbar-none snap-x">
                <div *ngFor="let prod of rankingProducts; let i = index" class="min-w-[300px] snap-start">
                    <div class="bg-gray-50 rounded-[2.5rem] p-6 border border-gray-100 relative group hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-500">
                        <!-- Ranking Badge -->
                        <div class="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-serif font-black italic text-sm shadow-xl z-20">
                            0{{ i + 1 }}
                        </div>
                        <!-- Discount Badge -->
                        <div class="absolute top-6 left-6 px-3 py-1 rounded-full bg-secondary text-white text-[9px] font-bold uppercase tracking-widest z-20">
                            {{ prod.discount }}% OFF
                        </div>

                        <div class="aspect-square rounded-2xl overflow-hidden mb-8 relative">
                            <img [src]="prod.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                            <button class="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <span class="bg-white text-primary px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Quick View</span>
                            </button>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-gray-900 font-bold text-sm tracking-tight line-clamp-2 h-10 group-hover:text-primary transition-colors">{{ prod.name }}</h3>
                            <div class="flex items-baseline gap-3">
                                <span class="text-primary font-black text-lg italic">৳{{ prod.price }}</span>
                                <span class="text-gray-300 line-through text-xs font-medium">৳{{ prod.oldPrice }}</span>
                            </div>
                            <!-- Meta Specs -->
                            <div class="flex items-center justify-between text-[10px] font-bold pt-4 border-t border-gray-100">
                                <div class="flex items-center gap-2 text-yellow-500">
                                    <i class="fas fa-star"></i>
                                    <span class="text-gray-600">{{ prod.rating }}</span>
                                    <span class="text-gray-300">({{ prod.sold }} Sold)</span>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-2 mt-4">
                                <div class="bg-gray-100 rounded-lg p-2 text-center text-[9px] text-gray-500 font-bold uppercase group-hover:bg-primary/5 transition-colors">
                                    Stock: {{ prod.stock }}
                                </div>
                                <div class="bg-primary/5 rounded-lg p-2 text-center text-[9px] text-primary font-bold uppercase group-hover:bg-primary group-hover:text-white transition-colors">
                                    Points: {{ prod.points }}
                                </div>
                            </div>
                            <button class="w-full bg-primary text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-gray-900 transition-all translate-y-2 group-hover:translate-y-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 mt-4">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      <!-- 4. Categories Carousel -->
      <section class="py-24 container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div *ngFor="let cat of quickCategories" class="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-gray-50">
                <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110">
                    <i class="fas {{ cat.icon }} text-2xl"></i>
                </div>
                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 group-hover:text-primary transition-colors">{{ cat.name }}</span>
            </div>
        </div>
      </section>

      <!-- 5. All Products Grid -->
      <section class="py-24 container mx-auto px-6">
          <div class="flex items-center justify-between mb-16">
              <h2 class="text-3xl font-serif font-black italic text-gray-900">Recommended For You</h2>
              <div class="flex gap-4">
                  <button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><i class="fas fa-chevron-left text-xs"></i></button>
                  <button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><i class="fas fa-chevron-right text-xs"></i></button>
              </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div *ngFor="let prod of gridProducts" class="bg-white p-5 rounded-[2rem] border border-gray-100 group hover:shadow-2xl transition-all duration-700 relative flex flex-col">
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
                  </div>
                  <button class="mt-6 w-full bg-primary text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      Add To Cart
                  </button>
              </div>
          </div>
      </section>

      <!-- Sticky Mobile Quick Menu -->
      <div class="lg:hidden fixed bottom-6 left-6 z-[100]">
          <button class="w-16 h-16 rounded-3xl bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all">
              <i class="fas fa-th-large text-xl"></i>
          </button>
      </div>
    </main>
  `,
  styles: [`
    ::-webkit-scrollbar { display: none; }
    .snap-x { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class HomeComponent implements AfterViewInit {
  promoBanners = [
    { title: 'Happiness Through Wellness', tag: 'Up to 50% Off', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800' },
    { title: 'Eid Beauty Must Haves', tag: 'Up to 40% Off', image: 'https://images.unsplash.com/photo-1556228578-8c7c2f10667e?auto=format&fit=crop&q=80&w=800' },
    { title: 'Flat 15% Skin Safe', tag: 'Discounted', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800' },
    { title: 'B1G1 Deals', tag: 'Limited Offer', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800' }
  ];

  rankingProducts = [
    { name: 'Kaveri Mehendi Cone 25g', price: 27, oldPrice: 50, discount: 46, rating: 5.0, sold: 4517, stock: 208, points: 3, image: 'https://images.unsplash.com/photo-1627633212184-72262bc68224?auto=format&fit=crop&q=80&w=400' },
    { name: 'Beauty Glazed Nose Pore Strips', price: 17, oldPrice: 70, discount: 75, rating: 5.0, sold: 8178, stock: 543, points: 2, image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&q=80&w=400' },
    { name: 'Pond\'s Super Light Gel Oil-Free Moisturizer', price: 139, oldPrice: 200, discount: 30, rating: 0, sold: 200, stock: 0, points: 14, image: 'https://images.unsplash.com/photo-1556228578-00cce9081e3a?auto=format&fit=crop&q=80&w=400' },
    { name: 'skinO Care and Repair Sunscreen Cream SPF-50 40ml', price: 378, oldPrice: 390, discount: 3, rating: 5.0, sold: 414, stock: 'Free', points: 38, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=400' }
  ];

  quickCategories = [
    { name: 'Skin Care', icon: 'fa-pump-soap' },
    { name: 'Makeup', icon: 'fa-paint-brush' },
    { name: 'Hair Care', icon: 'fa-cut' },
    { name: 'Body Care', icon: 'fa-hand-holding-heart' },
    { name: 'Fragrance', icon: 'fa-spray-can' },
    { name: 'Men Care', icon: 'fa-user-tie' }
  ];

  gridProducts = Array(10).fill({
    name: 'iUNIK Centella Mild Cleansing Foam 120ml',
    price: 1450,
    oldPrice: 1650,
    discount: 12,
    rating: 4.8,
    sold: 342,
    image: 'https://images.unsplash.com/photo-1556228578-8c7c2f10667e?auto=format&fit=crop&q=80&w=400'
  });

  ngAfterViewInit() {
    this.initGSAP();
  }

  private initGSAP() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });
    tl.to('.hero-tag', { opacity: 1, y: -10, delay: 0.5 })
      .to('.hero-title', { opacity: 1, y: -10 }, '-=1.2')
      .to('.hero-cta', { opacity: 1, y: -10 }, '-=1.0');
  }
}
