import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-nude-soft/30 flex flex-col h-full">
      <!-- Image Container -->
      <div class="aspect-[4/5] overflow-hidden relative bg-nude-soft/20">
        <img 
          [src]="product.imageUrl || 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600'" 
          [alt]="product.name"
          class="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
        >
        
        <!-- Badge -->
        <div class="absolute top-4 left-4 z-10">
          <span class="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase text-emerald-deep shadow-sm">
            {{product.category || 'Luxury'}}
          </span>
        </div>

        <!-- Add to Cart Overlay Button -->
        <div class="absolute inset-x-0 bottom-6 px-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <button class="w-full bg-emerald-deep text-white text-[10px] font-bold tracking-[0.3em] uppercase py-4 rounded-full hover:bg-gold-accent transition-colors shadow-xl shadow-emerald-deep/20">
            Add to Cart
          </button>
        </div>

        <!-- Subtle Gradient Overlay on Hover -->
        <div class="absolute inset-0 bg-gradient-to-t from-emerald-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <!-- Content -->
      <div class="p-8 flex flex-col flex-grow text-center">
        <!-- Rating -->
        <div class="flex justify-center mb-3 text-gold-accent text-xs">
          <span class="mx-0.5">★</span>
          <span class="mx-0.5">★</span>
          <span class="mx-0.5">★</span>
          <span class="mx-0.5">★</span>
          <span class="mx-0.5 text-gold-accent/30">★</span>
        </div>

        <h3 class="text-xl font-playfair text-emerald-deep mb-2 font-bold leading-tight group-hover:text-gold-accent transition-colors">
          {{product.name}}
        </h3>
        
        <p class="text-xs text-emerald-deep/50 font-poppins mb-6 line-clamp-2 leading-relaxed italic px-2">
          {{product.description}}
        </p>
        
        <div class="mt-auto">
          <span class="text-lg font-bold tracking-widest text-emerald-deep">
            {{product.price | currency}}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductCardComponent {
  @Input() product!: Product;
}
