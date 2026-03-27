import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { trigger, transition, query, stagger, style, animate } from '@angular/animations';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  animations: [
    trigger('staggerList', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('100ms', animate('800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <span class="text-gold-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Most Loved Rituals</span>
          <h2 class="text-4xl md:text-5xl font-playfair text-emerald-deep mb-6">Our Best Sellers</h2>
          <div class="w-12 h-[2px] bg-gold-accent mx-auto mb-8"></div>
          <p class="text-emerald-deep/60 font-light max-w-xl mx-auto leading-relaxed">
            Discover our community's most transformative essentials, meticulously crafted for radiant, healthy-looking skin.
          </p>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12" @staggerList>
          <app-product-card *ngFor="let product of displayProducts" [product]="product"></app-product-card>
        </div>

        <!-- Loading State -->
        <div *ngIf="displayProducts.length === 0" class="flex flex-col items-center py-32 space-y-6">
          <div class="w-12 h-12 border-[1px] border-emerald-deep/5 border-t-gold-accent rounded-full animate-spin"></div>
          <p class="text-[10px] tracking-[0.3em] uppercase text-emerald-deep/40 animate-pulse">Preparing the collection...</p>
        </div>

        <!-- View All Link -->
        <div class="mt-20 text-center">
          <a href="#" class="inline-block group border-b border-emerald-deep pb-1 transition-all">
            <span class="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-deep">View All Essentials</span>
            <span class="ml-2 inline-block transform transition-transform group-hover:translate-x-2">⟶</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class BestSellersComponent implements OnInit {
  @Input() products: Product[] = [];
  
  // High-quality placeholder products for consistent luxury aesthetic
  placeholderProducts: Product[] = [
    {
      id: 1,
      name: 'Radiant Glow Serum',
      description: 'A transformative blend of concentrated minerals and rare botanicals for immediate luminosity.',
      price: 85.00,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143af7eb?auto=format&fit=crop&q=80&w=600',
      category: 'Serums',
      stockQuantity: 100
    },
    {
      id: 2,
      name: 'Mineral Quartz Polish',
      description: 'Gently refines skin texture through micro-fine quartz crystals and soothing plant oils.',
      price: 62.00,
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
      category: 'Exfoliants',
      stockQuantity: 100
    },
    {
      id: 3,
      name: 'Hydra-Silk Moisturizer',
      description: 'Deep, weightless hydration that mimics your skin\'s natural Intelligence.',
      price: 74.00,
      imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600',
      category: 'Hydrators',
      stockQuantity: 100
    },
    {
      id: 4,
      name: 'Nocturnal Repair Elixir',
      description: 'Intensive overnight recovery serum targeting fine lines and cellular turnover.',
      price: 98.00,
      imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
      category: 'Overnight Ritual',
      stockQuantity: 100
    }
  ];

  get displayProducts(): Product[] {
    return this.products.length > 0 ? this.products : this.placeholderProducts;
  }

  ngOnInit(): void {}
}
