import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from '../../../shared/components/product-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <div class="pt-32 pb-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-16 fade-in">
           <p class="text-[10px] text-gold-500 font-bold tracking-[0.3em] uppercase mb-4">Aurora Collections</p>
           <h1 class="text-5xl lg:text-6xl font-serif text-primary-900 mb-6">Elevate Your Ritual</h1>
           <p class="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
             Explore our dermatologist-curated range of skincare essentials. From gentle cleansers to potent serums, find the perfect match for your skin's unique needs.
           </p>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center py-8 border-y mb-12 gap-6">
           <div class="flex items-center gap-8 overflow-x-auto w-full md:w-auto no-scrollbar">
              <button class="text-xs font-bold tracking-widest uppercase border-b-2 border-primary-900 pb-1">All Products</button>
              <button class="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-primary-900 transition-colors pb-1 border-b-2 border-transparent">Cleansers</button>
              <button class="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-primary-900 transition-colors pb-1 border-b-2 border-transparent">Moisturizers</button>
              <button class="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-primary-900 transition-colors pb-1 border-b-2 border-transparent">Serums</button>
           </div>
           
           <div class="flex gap-4 items-center">
              <span class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Sort By:</span>
              <select class="text-xs font-bold tracking-widest uppercase bg-transparent focus:outline-none cursor-pointer">
                 <option>Best Selling</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
                 <option>Newest</option>
              </select>
           </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          <app-product-card *ngFor="let product of products()" [product]="product"></app-product-card>
        </div>

        <div *ngIf="products().length === 0" class="py-40 text-center">
           <p class="text-gray-400 font-serif text-2xl italic">No products found in this collection.</p>
        </div>

        <div class="mt-24 flex justify-center gap-4">
           <button class="w-12 h-12 rounded-full border border-primary-100 flex items-center justify-center hover:bg-primary-900 hover:text-white transition-all">1</button>
           <button class="w-12 h-12 rounded-full border border-primary-100 flex items-center justify-center hover:bg-primary-900 hover:text-white transition-all text-gray-400">2</button>
           <button class="w-12 h-12 rounded-full border border-primary-100 flex items-center justify-center hover:bg-primary-900 hover:text-white transition-all text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
           </button>
        </div>
      </div>
    </div>
  `
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  products = toSignal(
    this.route.queryParams.pipe(
      switchMap(params => {
        const catId = params['categoryId'] ? +params['categoryId'] : undefined;
        return this.productService.getProducts(1, 20, undefined, catId).pipe(
          map(res => res.data.items),
          catchError(err => {
            console.error('Failed to load products', err);
            return of([]);
          })
        );
      })
    ),
    { initialValue: [] }
  );
}
