import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CmsService } from '../../core/services/cms.service';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <!-- Hero Slider -->
    <section class="relative h-[85vh] lg:h-[95vh] overflow-hidden bg-primary-50">
      <div *ngIf="effectiveSliders().length > 0; else fallbackHero" class="h-full relative">
        <div *ngFor="let slider of effectiveSliders(); let i = index" 
             [class.opacity-100]="activeSlider() === i"
             [class.opacity-0]="activeSlider() !== i"
             class="absolute inset-0 transition-opacity duration-1000 flex items-center"
        >
          <img [src]="slider.imageUrl" class="absolute inset-0 w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/20"></div>
          
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 relative">
            <div class="lg:w-3/5 space-y-8" *ngIf="activeSlider() === i">
              <span class="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl text-white text-[10px] font-bold tracking-[0.4em] uppercase border border-white/20 animate-fade-in">
                {{ slider.subTitle }}
              </span>
              <h1 class="text-7xl lg:text-9xl font-serif text-white leading-[1] tracking-tighter drop-shadow-2xl animate-fade-in-up">
                {{ slider.title }}
              </h1>
              <div class="flex items-center gap-6 pt-6 animate-fade-in delay-500">
                <a [routerLink]="slider.linkUrl" class="px-12 py-5 bg-white text-primary-900 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-white transition-all shadow-2xl">
                  Shop Now
                </a>
                <a routerLink="/about" class="px-12 py-5 bg-transparent text-white border border-white/30 backdrop-blur-sm rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
                  Our Story
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Slider Controls -->
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
          <button *ngFor="let s of effectiveSliders(); let i = index" 
            (click)="activeSlider.set(i)"
            class="w-16 h-1 transition-all duration-500 rounded-full"
            [class.bg-white]="activeSlider() === i"
            [class.bg-white/20]="activeSlider() !== i"
          ></button>
        </div>
      </div>
      
      <ng-template #fallbackHero>
        <div class="h-full flex items-center bg-[#fdf8f6] relative overflow-hidden">
           <div class="absolute top-0 right-0 w-2/3 h-full bg-[#f9f2ef] skew-x-[-15deg] translate-x-1/4"></div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
            <div class="lg:w-1/2 space-y-10 animate-fade-in-up">
              <div class="space-y-4">
                 <p class="text-[11px] text-gold-500 font-bold tracking-[0.4em] uppercase">Est. 2026</p>
                 <h1 class="text-7xl lg:text-9xl font-serif text-primary-900 leading-[0.95] tracking-tighter">
                   Reveal Your <br> <span class="text-gold-500 italic">Eternal</span> Glow.
                 </h1>
              </div>
              <p class="text-xl text-gray-500 max-w-lg leading-relaxed font-light">
                Discover the Aurora difference with our fruit-powered science and dermatologist-approved formulations.
              </p>
              <div class="flex gap-6">
                 <a routerLink="/products" class="px-12 py-5 bg-primary-900 text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-gold-500 transition-all shadow-2xl">Shop Collection</a>
              </div>
            </div>
          </div>
          <div class="absolute right-0 top-0 w-1/2 h-full hidden lg:block z-10">
            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200" class="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000">
          </div>
        </div>
      </ng-template>
    </section>

    <!-- Category Grid -->
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <p class="text-[10px] text-gold-500 font-bold tracking-[0.4em] uppercase mb-4">The Ritual</p>
          <h2 class="text-5xl lg:text-6xl font-serif text-primary-900">Shop by Intent</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div *ngFor="let cat of homeCategories" 
               class="group relative h-[500px] overflow-hidden rounded-[2.5rem] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
               [routerLink]="['/products']" [queryParams]="{category: cat.slug}"
          >
            <img [src]="cat.image" [alt]="cat.name" class="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div class="absolute bottom-12 left-12 text-white">
              <span class="text-xs font-bold tracking-[0.3em] uppercase opacity-70 mb-2 block">Collection</span>
              <h3 class="text-4xl font-serif mb-4">{{ cat.name }}</h3>
              <div class="flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 <span class="text-[10px] font-bold tracking-widest uppercase">Explore More</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Products -->
    <section class="py-32 bg-gray-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-16">
          <div>
            <p class="text-[10px] text-gold-500 font-bold tracking-[0.3em] uppercase mb-3">Editor's Choice</p>
            <h2 class="text-5xl lg:text-6xl font-serif text-primary-900">Trending Now</h2>
          </div>
          <a routerLink="/products" class="text-xs font-bold border-b-2 border-primary-900/10 pb-2 hover:border-gold-500 transition-all uppercase tracking-widest">
            View All Collection
          </a>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <app-product-card *ngFor="let product of effectiveTrending()" [product]="product"></app-product-card>
        </div>
      </div>
    </section>

    <!-- Combo Offers Section -->
    <section class="py-32 bg-primary-900 text-white relative overflow-hidden">
       <div class="absolute top-0 left-0 w-full h-full opacity-10">
          <div class="absolute -top-20 -left-20 w-96 h-96 bg-gold-400 rounded-full blur-[120px]"></div>
          <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-400 rounded-full blur-[120px]"></div>
       </div>
       
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div class="space-y-10">
             <div class="space-y-4">
                <p class="text-[10px] text-gold-400 font-bold tracking-[0.5em] uppercase">Limited Edition</p>
                <h2 class="text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tighter">The Complete <br> <span class="text-gold-400 italic">Aurora</span> Routine.</h2>
             </div>
             <p class="text-xl text-primary-200 font-light leading-relaxed max-w-lg">
                Save up to 35% with our curated bundles. Everything your skin needs from dawn to dusk, perfectly matched by our expert dermatologists.
             </p>
             <div class="flex flex-wrap gap-8 pt-4">
                <div class="flex items-center gap-3">
                   <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-gold-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                   </div>
                   <span class="text-xs font-bold tracking-widest uppercase">Cruelty Free</span>
                </div>
                <div class="flex items-center gap-3">
                   <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-gold-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                   </div>
                   <span class="text-xs font-bold tracking-widest uppercase">Dermatologist Tested</span>
                </div>
             </div>
             <a routerLink="/products" [queryParams]="{category: 'combos'}" class="inline-block px-12 py-5 bg-white text-primary-900 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-gold-500 hover:text-white transition-all shadow-2xl">
                Explore Bundles
             </a>
          </div>
          
          <div class="relative group">
             <div class="absolute inset-0 bg-gold-500/10 rounded-[3rem] blur-2xl group-hover:bg-gold-500/20 transition-all duration-700"></div>
             <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800" class="rounded-[3rem] relative z-10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
             <div class="absolute -bottom-10 -right-10 bg-white p-10 rounded-3xl shadow-2xl text-primary-900 border border-gold-100 z-20 animate-bounce-slow">
                <p class="text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">Starter Kit</p>
                <div class="flex items-baseline gap-2">
                   <span class="text-3xl font-serif">$89</span>
                   <span class="text-sm text-gray-400 line-through font-light">$125</span>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Best Sellers -->
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <p class="text-[10px] text-gold-500 font-bold tracking-[0.4em] uppercase mb-4">Most Loved</p>
          <h2 class="text-5xl lg:text-6xl font-serif text-primary-900">Your Favourites</h2>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <app-product-card *ngFor="let product of effectiveBestSellers()" [product]="product"></app-product-card>
        </div>
      </div>
    </section>

    <!-- Brand Showcase -->
    <section class="py-24 border-t border-gray-100 bg-gray-50/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-[11px] text-gray-400 font-bold tracking-[0.5em] uppercase mb-16">Global Partners</p>
        <div class="flex flex-wrap justify-center items-center gap-16 lg:gap-32 opacity-30 hover:opacity-100 transition-opacity duration-700">
           <ng-container *ngIf="brands().length > 0; else fallbackBrands">
              <img *ngFor="let brand of brands()" [src]="brand.imageUrl" [alt]="brand.name" class="h-10 lg:h-14 w-auto grayscale hover:grayscale-0 transition-all cursor-pointer">
           </ng-container>
           <ng-template #fallbackBrands>
              <span class="text-4xl font-serif text-gray-400/50 hover:text-primary-900 transition-colors cursor-pointer tracking-tighter">ELIXIR</span>
              <span class="text-4xl font-serif text-gray-400/50 hover:text-primary-900 transition-colors cursor-pointer tracking-tighter">LUMIÉRE</span>
              <span class="text-4xl font-serif text-gray-400/50 hover:text-primary-900 transition-colors cursor-pointer tracking-tighter">RADIANCE</span>
              <span class="text-4xl font-serif text-gray-400/50 hover:text-primary-900 transition-colors cursor-pointer tracking-tighter">VIVANT</span>
           </ng-template>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-32 bg-primary-50 relative overflow-hidden">
       <div class="max-w-4xl mx-auto px-4 text-center">
          <p class="text-[11px] text-gold-500 font-bold tracking-[0.5em] uppercase mb-6">Newsletter</p>
          <h2 class="text-5xl lg:text-7xl font-serif text-primary-900 mb-8 leading-tight">Join the <br> <span class="text-gold-500">Aurora Circle</span></h2>
          <p class="text-lg text-gray-500 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
             Subscribe for exclusive access to advanced skincare rituals, new collection launches, and private events.
          </p>
          
          <form class="flex flex-col sm:flex-row gap-4 bg-white p-2 rounded-full shadow-2xl border border-primary-100/50 max-w-xl mx-auto">
             <input type="email" placeholder="EMAIL ADDRESS" class="flex-1 px-8 py-4 bg-transparent focus:outline-none text-xs tracking-widest uppercase text-primary-900 placeholder:text-gray-300">
             <button class="px-10 py-4 bg-primary-900 text-white rounded-full font-bold text-xs tracking-widest uppercase hover:bg-gold-500 transition-all">
                Subscribe
             </button>
          </form>
       </div>
    </section>
  `
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cmsService = inject(CmsService);

  activeSlider = signal(0);

  sliders = toSignal(
    this.cmsService.getSliders().pipe(
      map(res => res.data || []),
      catchError(() => of([]))
    ),
    { initialValue: [] }
  );

  trendingProducts = toSignal(
    this.productService.getTrendingProducts().pipe(
      map(res => res.data || []),
      catchError(() => of([]))
    ),
    { initialValue: [] }
  );

  bestSellers = toSignal(
    this.productService.getBestSellingProducts().pipe(
      map(res => res.data || []),
      catchError(() => of([]))
    ),
    { initialValue: [] }
  );

  brands = toSignal(
    this.cmsService.getBrands().pipe(
      map(res => res.data || []),
      catchError(() => of([]))
    ),
    { initialValue: [] }
  );

  homeCategories = [
    { name: 'Pure Cleanse', slug: 'cleansers', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600' },
    { name: 'Deep Treat', slug: 'serums', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600' },
    { name: 'Pure Hydrate', slug: 'moisturizers', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600' }
  ];

  // Effective data combining API and Mocks for WOW factor
  effectiveSliders = () => {
    const apiData = this.sliders();
    if (apiData && apiData.length > 0) return apiData;
    return [
       { 
         title: 'The Eternal Glow Collection', 
         subTitle: 'Spring 2026', 
         imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200', 
         linkUrl: '/products' 
       },
       { 
         title: 'Pure Hydration Rituals', 
         subTitle: 'Bestseller', 
         imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1200', 
         linkUrl: '/products' 
       }
    ];
  };

  effectiveTrending = () => {
    const apiData = this.trendingProducts();
    if (apiData && apiData.length > 0) return apiData;
    return this.mockProducts.slice(0, 4);
  };

  effectiveBestSellers = () => {
    const apiData = this.bestSellers();
    if (apiData && apiData.length > 0) return apiData;
    return this.mockProducts.slice(2, 6);
  };

  private mockProducts = [
    { id: 1, name: 'Vitamin C Brightening Serum', slug: 'vit-c-serum', description: 'Powerful brightening serum', price: 65, stockQuantity: 100, sku: 'AUR-001', thumbnailUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400', categoryName: 'Serums', brandName: 'Aurora', averageRating: 4.9, reviewCount: 124, discountPercentage: 10, discountPrice: 58.5 },
    { id: 2, name: 'Hyaluronic Acid Cloud Cream', slug: 'ha-cream', description: 'Deep hydration cream', price: 45, stockQuantity: 50, sku: 'AUR-002', thumbnailUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400', categoryName: 'Moisturizers', brandName: 'Aurora', averageRating: 4.8, reviewCount: 89, discountPercentage: 0 },
    { id: 3, name: 'Ceramide Barrier Cleanser', slug: 'ceramide-cleanser', description: 'Gentle ceramide cleanser', price: 32, stockQuantity: 200, sku: 'AUR-003', thumbnailUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400', categoryName: 'Cleansers', brandName: 'Aurora', averageRating: 4.7, reviewCount: 215, discountPercentage: 0 },
    { id: 4, name: 'Retinol Renewal Night Oil', slug: 'retinol-oil', description: 'Advanced night treatment', price: 78, stockQuantity: 30, sku: 'AUR-004', thumbnailUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400', categoryName: 'Serums', brandName: 'Aurora', averageRating: 4.9, reviewCount: 156, discountPercentage: 15, discountPrice: 66.3 },
    { id: 5, name: 'Rosewater Balancing Mist', slug: 'rose-mist', description: 'Refreshing facial mist', price: 28, stockQuantity: 150, sku: 'AUR-005', thumbnailUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=400', categoryName: 'Mists', brandName: 'Aurora', averageRating: 4.6, reviewCount: 78, discountPercentage: 0 },
    { id: 6, name: 'Glycolic Resurfacing Mask', slug: 'glycolic-mask', description: 'Brightening peel mask', price: 54, stockQuantity: 40, sku: 'AUR-006', thumbnailUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=400', categoryName: 'Masks', brandName: 'Aurora', averageRating: 4.8, reviewCount: 92, discountPercentage: 20, discountPrice: 43.2 }
  ];

  constructor() {
    setInterval(() => {
      const current = this.activeSlider();
      const sliders = this.effectiveSliders();
      const next = (current + 1) % (sliders.length || 1);
      this.activeSlider.set(next);
    }, 6000);
  }
}
