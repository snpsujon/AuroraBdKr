import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../core/models/api_response.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="group relative bg-white overflow-hidden">
      <div class="aspect-[4/5] overflow-hidden bg-gray-100 rounded-2xl">
        <img 
          [src]="product.thumbnailUrl" 
          [alt]="product.name"
          class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        >
        <div class="absolute top-4 left-4 flex flex-col gap-2">
           <span *ngIf="product.discountPercentage > 0" class="px-3 py-1 bg-primary-900 text-white text-[10px] font-bold tracking-widest uppercase rounded">
             -{{ product.discountPercentage }}%
           </span>
        </div>
        <button class="absolute -bottom-10 group-hover:bottom-4 left-1/2 -translate-x-1/2 premium-btn premium-btn-primary w-[90%] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl">
          Quick Add
        </button>
      </div>
      
      <div class="mt-4 px-2">
        <p class="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{{ product.brandName }}</p>
        <h3 class="mt-1 text-base font-serif font-medium text-gray-900 group-hover:text-gold-500 transition-colors">
          <a [routerLink]="['/products', product.slug]">
            {{ product.name }}
          </a>
        </h3>
        <div class="mt-2 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-gray-900">{{ product.discountPrice || product.price | currency }}</span>
            <span *ngIf="product.discountPrice" class="text-xs text-gray-400 line-through">{{ product.price | currency }}</span>
          </div>
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="text-gold-500"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span class="text-xs font-medium text-gray-500">{{ product.averageRating }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
