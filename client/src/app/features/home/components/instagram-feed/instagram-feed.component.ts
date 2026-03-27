import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instagram-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-32 bg-nude-soft/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div class="mb-20">
          <span class="text-gold-accent tracking-[0.4em] uppercase text-[10px] font-bold block mb-6">Our Visual Journal</span>
          <h2 class="text-4xl md:text-5xl font-playfair text-emerald-deep mb-4">#TheAuroraGlow</h2>
          <p class="text-emerald-deep/50 text-sm font-poppins font-light tracking-wide italic">Join our community of luminous souls on Instagram</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <div *ngFor="let post of posts" class="relative group aspect-square overflow-hidden bg-white cursor-pointer shadow-sm">
            <img 
              [src]="post" 
              class="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-125 group-hover:rotate-3"
              alt="Aurora Skincare Lifestyle"
            >
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-emerald-deep/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
              <div class="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-[10px] tracking-[0.3em] font-bold uppercase">View Ritual</span>
              </div>
            </div>
            
            <!-- Video Icon Badge (Simulated) -->
            <div *ngIf="isEven(post)" class="absolute top-4 right-4 text-white opacity-80 group-hover:opacity-0 transition-opacity">
              <svg class="w-4 h-4 shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </div>
          </div>
        </div>

        <div class="mt-20">
          <a href="#" class="btn-primary inline-flex items-center space-x-6 px-12 rounded-full py-4 text-[10px]">
            <span>Explore the Community</span>
            <span class="w-8 h-[1px] bg-white opacity-40"></span>
          </a>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class InstagramFeedComponent {
  posts = [
    'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1620916566398-39f1143af7eb?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1620917670357-194cc2e8d890?auto=format&fit=crop&q=80&w=600'
  ];

  isEven(url: string) {
    return this.posts.indexOf(url) % 2 === 0;
  }
}
