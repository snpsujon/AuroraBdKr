import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ahk-sticky-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed right-8 top-1/2 -translate-y-1/2 z-[1000] hidden lg:flex flex-col gap-4">
        <!-- Sticky Cart Icon -->
        <button class="bg-primary text-white w-14 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl hover:scale-110 transition-all border border-white/20 group relative">
            <i class="fas fa-shopping-bag text-xl mb-2 group-hover:animate-bounce"></i>
            <span class="text-[10px] font-black uppercase tracking-tighter italic">৳0</span>
            <div class="absolute -top-1 -right-1 bg-secondary text-white text-[8px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white">0</div>
        </button>

        <!-- Chat / We Are Here Icon -->
        <button class="bg-secondary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border border-white/10 group relative">
            <i class="fas fa-comment-dots text-xl group-hover:scale-110"></i>
            <span class="absolute -top-10 right-0 bg-white text-secondary text-[8px] font-black px-4 py-1.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap uppercase tracking-widest border border-secondary/10 translate-y-2 group-hover:translate-y-0">We Are Here!</span>
        </button>
    </div>
  `
})
export class StickyCartComponent {}
