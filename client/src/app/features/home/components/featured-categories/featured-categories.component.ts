import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-playfair text-emerald-deep mb-4">Curated Collections</h2>
          <p class="text-emerald-deep/60 font-light tracking-widest uppercase text-xs">Essential rituals for your unique skin</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let cat of categories" 
               class="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer category-card border border-transparent">
            
            <!-- Image Container -->
            <div class="aspect-square rounded-xl overflow-hidden mb-6 bg-nude-soft/30">
              <img [src]="cat.image" 
                   [alt]="cat.name" 
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            </div>

            <!-- Content -->
            <div class="text-center pb-4">
              <h3 class="text-xl font-playfair text-emerald-deep mb-2 font-bold">{{cat.name}}</h3>
              <p class="text-[10px] tracking-[0.3em] uppercase text-gold-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Explore Rituality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .category-card:hover {
      border-color: rgba(212, 175, 55, 0.4);
      box-shadow: 0 0 25px rgba(212, 175, 55, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class FeaturedCategoriesComponent {
  categories = [
    { 
      name: 'Face Care', 
      image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      name: 'Serums', 
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143af7eb?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      name: 'Moisturizers', 
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      name: 'Body Care', 
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600' 
    }
  ];
}
