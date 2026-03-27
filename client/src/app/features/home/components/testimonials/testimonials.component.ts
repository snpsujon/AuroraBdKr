import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-32 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-24">
          <span class="text-gold-accent tracking-[0.4em] uppercase text-[10px] font-bold block mb-6">The Collective Voice</span>
          <h2 class="text-4xl md:text-5xl font-playfair text-emerald-deep leading-tight">Muses of Aurora</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div *ngFor="let t of testimonials" class="bg-nude-soft/10 p-12 rounded-3xl border border-nude-soft relative group hover:bg-emerald-deep transition-all duration-700">
            <!-- Quote Icon -->
            <div class="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg class="w-12 h-12 text-emerald-deep group-hover:text-gold-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56929 13 4.017 13H2.017V21H5.017Z" />
              </svg>
            </div>
            
            <div class="flex items-center space-x-2 mb-8 text-gold-accent transition-all">
              <span *ngFor="let s of [1,2,3,4,5]">★</span>
            </div>

            <p class="text-lg font-playfair italic text-emerald-deep group-hover:text-nude-soft transition-colors duration-700 leading-relaxed mb-10">
              "{{t.quote}}"
            </p>

            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-nude-soft overflow-hidden mr-4 border border-gold-accent/20">
                <img [src]="t.avatar" class="w-full h-full object-cover">
              </div>
              <div>
                <p class="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-deep group-hover:text-white transition-colors">{{t.author}}</p>
                <p class="text-[9px] text-gold-accent tracking-widest uppercase mt-1">{{t.location}}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class TestimonialsComponent {
  testimonials = [
    { 
      quote: "My sensitive skin has finally found its peace. The Serums are weightless yet incredibly transformative.", 
      author: "Elena R.", 
      location: "Paris, FR",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
    },
    { 
      quote: "The Night Ritual is non-negotiable now. I wake up with a texture so refined it feels like silk.", 
      author: "Sophia V.", 
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=100" 
    },
    { 
      quote: "Pure luxury that actually delivers results. The Mineral Quartz Polish is absolute magic for glow.", 
      author: "Jade M.", 
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" 
    }
  ];
}
