import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="pt-32 pb-20 bg-white" *ngIf="product() as p">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav class="flex mb-12 text-[10px] font-bold tracking-widest uppercase text-gray-400 gap-2 items-center">
           <a routerLink="/" class="hover:text-gold-500 transition-colors">Home</a>
           <span>/</span>
           <a routerLink="/products" class="hover:text-gold-500 transition-colors">Collections</a>
           <span>/</span>
           <span class="text-primary-900">{{ p.name }}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
           
           <div class="space-y-6">
              <div class="aspect-square bg-gray-100 rounded-[2rem] overflow-hidden group">
                 <img [src]="p.thumbnailUrl" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
              </div>
              <div class="grid grid-cols-4 gap-4">
                 <div class="aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer border-2 border-primary-900">
                    <img [src]="p.thumbnailUrl" class="w-full h-full object-cover">
                 </div>
                 <div class="aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:border-2 border-gray-200" *ngFor="let i of [1,2,3]">
                    <div class="w-full h-full flex items-center justify-center text-gray-300">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    </div>
                 </div>
              </div>
           </div>

           <div class="flex flex-col justify-center">
              <div class="pb-10 border-b">
                 <p class="text-[11px] text-gold-500 font-bold tracking-[0.4em] uppercase mb-4">{{ p.brandName }}</p>
                 <h1 class="text-5xl lg:text-6xl font-serif text-primary-900 mb-6 leading-tight">{{ p.name }}</h1>
                 
                 <div class="flex items-center gap-8 mb-8">
                    <div class="flex items-center gap-3">
                       <span class="text-3xl font-bold text-primary-900">{{ p.discountPrice || p.price | currency }}</span>
                       <span *ngIf="p.discountPrice" class="text-xl text-gray-300 line-through font-light">{{ p.price | currency }}</span>
                    </div>
                    <div class="h-8 w-[1px] bg-primary-100"></div>
                    <div class="flex items-center gap-2">
                       <div class="flex text-gold-500">
                          <svg *ngFor="let i of [1,2,3,4,5]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                       </div>
                       <span class="text-xs font-bold text-gray-400">({{ p.reviewCount }} Reviews)</span>
                    </div>
                 </div>

                 <p class="text-gray-500 font-light leading-relaxed text-lg mb-8">
                    {{ p.description }}
                 </p>
              </div>

              <div class="py-10 space-y-10 border-b">
                 <div class="space-y-4">
                    <label class="text-[10px] font-bold tracking-[0.2em] uppercase text-primary-900">Select Variant</label>
                    <div class="flex gap-3">
                       <button class="px-6 py-2 border-2 border-primary-900 text-xs font-bold rounded-full">STANDARD</button>
                       <button class="px-6 py-2 border-2 border-primary-100 text-gray-400 text-xs font-bold rounded-full hover:border-gold-500 hover:text-gold-500 transition-all">TRAVEL SIZE</button>
                    </div>
                 </div>

                 <div class="flex items-end gap-4">
                    <div class="space-y-4">
                       <label class="text-[10px] font-bold tracking-[0.2em] uppercase text-primary-900">Quantity</label>
                       <div class="flex items-center border-2 border-primary-100 rounded-full h-14 px-4 gap-6">
                          <button class="text-gray-400 hover:text-primary-900 font-bold">-</button>
                          <span class="w-8 text-center text-sm font-bold">1</span>
                          <button class="text-gray-400 hover:text-primary-900 font-bold">+</button>
                       </div>
                    </div>
                    
                    <button class="flex-1 premium-btn premium-btn-primary h-14 text-xs font-bold tracking-[0.2em] uppercase shadow-2xl">
                       ADD TO LUXURY CART
                    </button>
                 </div>
              </div>

              <div class="py-10 space-y-6">
                 <div class="flex justify-between items-center cursor-pointer group">
                    <span class="text-xs font-bold tracking-[0.2em] uppercase text-primary-900 group-hover:text-gold-500 transition-colors">Ingredients</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
                 </div>
                 <hr class="border-primary-50">
                 <div class="flex justify-between items-center cursor-pointer group">
                    <span class="text-xs font-bold tracking-[0.2em] uppercase text-primary-900 group-hover:text-gold-500 transition-colors">How to Use</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
                 </div>
                 <hr class="border-primary-50">
                 <div class="flex justify-between items-center cursor-pointer group">
                    <span class="text-xs font-bold tracking-[0.2em] uppercase text-primary-900 group-hover:text-gold-500 transition-colors">Shipping & Sustainability</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
                 </div>
              </div>

           </div>
        </div>

        <div class="mt-40 border-t pt-40" *ngIf="p.longDescription">
           <div class="max-w-3xl mx-auto text-center">
              <h2 class="text-4xl font-serif text-primary-900 mb-10 italic">The Ritual Behind the Results</h2>
              <div class="prose prose-primary-900 max-w-none text-gray-500 font-light leading-loose text-lg" [innerHTML]="p.longDescription"></div>
           </div>
        </div>

      </div>
    </div>

    <div *ngIf="!product() && !isLoading" class="min-h-screen flex items-center justify-center">
       <div class="text-center">
          <h2 class="text-4xl font-serif text-primary-900 mb-4">Product Not Found</h2>
          <a routerLink="/products" class="text-gold-500 font-bold underline">BACK TO COLLECTIONS</a>
       </div>
    </div>
  `
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  isLoading = true;

  product = toSignal(
    this.route.params.pipe(
      switchMap(params => {
        this.isLoading = true;
        return this.productService.getProductBySlug(params['slug']).pipe(
          map(res => {
            this.isLoading = false;
            return res.data;
          })
        );
      })
    )
  );
}
