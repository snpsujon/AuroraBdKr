import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ahk-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="bg-[#F8F9FB] min-h-screen pt-12 pb-32">
      <div class="container mx-auto px-6">
        <!-- 1. Split Layout Context -->
        <div class="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-50 flex flex-col lg:flex-row gap-20">
            <!-- Left: Gallery -->
            <div class="w-full lg:w-1/2 space-y-8">
                <div class="aspect-square bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-50 group">
                    <img [src]="mainImage()" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
                </div>
                <div class="flex gap-4">
                    <button *ngFor="let img of thumbnails" (click)="mainImage.set(img)" class="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-50 overflow-hidden hover:border-primary transition-all p-2">
                        <img [src]="img" class="w-full h-full object-cover">
                    </button>
                </div>
            </div>

            <!-- Right: Info -->
            <div class="w-full lg:w-1/2 space-y-12">
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <span class="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest italic">In Stock</span>
                        <span class="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest italic">Reward Points: 38</span>
                    </div>
                    <h1 class="text-4xl lg:text-5xl font-serif font-black italic text-gray-900 leading-tight">3W Clinic Intensive UV Sunblock Cream</h1>
                    <div class="flex items-center gap-6">
                        <div class="flex text-yellow-500 gap-1 italic">
                            <i class="fas fa-star text-sm"></i>
                            <i class="fas fa-star text-sm"></i>
                            <i class="fas fa-star text-sm"></i>
                            <i class="fas fa-star text-sm"></i>
                            <i class="fas fa-star text-sm"></i>
                        </div>
                        <span class="text-xs font-bold text-gray-300 uppercase tracking-widest">1,881 Units Sold</span>
                    </div>
                </div>

                <div class="flex items-baseline gap-6 border-y border-gray-100 py-10">
                    <span class="text-5xl font-serif font-black italic text-primary tracking-tighter">৳378</span>
                    <span class="text-2xl text-gray-300 line-through font-medium">৳390</span>
                    <span class="ml-auto text-secondary font-black text-xl italic uppercase font-serif tracking-widest">3% OFF</span>
                </div>

                <div class="space-y-8">
                    <div class="flex items-center gap-6">
                        <span class="text-xs font-black uppercase tracking-widest text-gray-400 italic">Quantity :</span>
                        <div class="flex items-center bg-gray-50 rounded-2xl p-2 gap-6">
                            <button (click)="qty.set(qty() > 1 ? qty() - 1 : 1)" class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group hover:bg-primary hover:text-white transition-all">
                                <i class="fas fa-minus text-[10px]"></i>
                            </button>
                            <span class="font-black text-lg text-gray-900 w-8 text-center">{{ qty() }}</span>
                            <button (click)="qty.set(qty() + 1)" class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group hover:bg-primary hover:text-white transition-all">
                                <i class="fas fa-plus text-[10px]"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <button class="flex-grow bg-primary text-white py-6 rounded-3xl text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:bg-gray-900 transition-all flex items-center justify-center gap-4 group">
                            <i class="fas fa-shopping-bag group-hover:scale-110 transition-transform"></i>
                            Add To Cart
                        </button>
                        <button class="w-20 h-20 rounded-3xl bg-gray-50 text-gray-300 flex items-center justify-center hover:bg-primary/5 hover:text-primary transition-all">
                            <i class="far fa-heart text-2xl"></i>
                        </button>
                    </div>
                </div>

                <!-- Meta Icons -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-center gap-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                        <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm"><i class="fas fa-check-circle"></i></div>
                        <div>
                            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Authenticity</p>
                            <h4 class="text-xs font-black uppercase tracking-widest text-primary italic">100% Original</h4>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                        <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-secondary shadow-sm"><i class="fas fa-shipping-fast"></i></div>
                        <div>
                            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Fast Delivery</p>
                            <h4 class="text-xs font-black uppercase tracking-widest text-secondary italic">Worldwide</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2. Content Tabs -->
        <div class="mt-24 space-y-12">
            <div class="flex justify-center gap-8 border-b border-gray-100 pb-8">
                <button class="text-xs font-black uppercase tracking-[0.3em] text-primary border-b-2 border-primary pb-8 mb-[-34px] transition-all">Product Details</button>
                <button class="text-xs font-black uppercase tracking-[0.3em] text-gray-300 hover:text-primary transition-all pb-8">Reviews (1)</button>
                <button class="text-xs font-black uppercase tracking-[0.3em] text-gray-300 hover:text-primary transition-all pb-8">Shipping & Delivery</button>
            </div>
            
            <div class="max-w-4xl mx-auto py-12 text-gray-600 leading-loose space-y-8 italic font-medium">
                <p>INTENSIVE UV SUNBLOCK CREAM: <br> 3W Clinic Intensive UV Sunblock Cream is a mild sun protection cream that moisturizes and maintains soft skin with its 100% natural ingredients. It also protects skin from harmful UVA and UVB rays for long hours.</p>
                <ul class="space-y-4 list-disc pl-8 font-bold text-gray-400 uppercase text-[11px] tracking-widest">
                    <li>Long lasting sun protection</li>
                    <li>Highly Moisturizing</li>
                    <li>No White Cast</li>
                    <li>SPF 50+ PA+++</li>
                </ul>
            </div>
        </div>
      </div>
    </main>
  `
})
export class ProductDetailComponent {
  mainImage = signal('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800');
  qty = signal(1);
  thumbnails = [
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800'
  ];
}
