import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-40 relative bg-emerald-deep overflow-hidden">
      <!-- Background Patterns -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-white opacity-[0.02] -skew-x-12 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 border-[0.5px] border-gold-accent opacity-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <span class="text-gold-accent tracking-[0.6em] uppercase text-[10px] font-bold block mb-10">Exclusive Invitation</span>
        <h2 class="text-4xl md:text-6xl font-playfair text-nude-soft mb-8 leading-tight">
          Join the <br> <span class="text-gold-accent italic">Inner Circle</span>
        </h2>
        <p class="text-nude-soft/60 font-poppins font-light mb-16 max-w-xl mx-auto leading-relaxed italic">
          Subscribe to receive our latest skin rituals, mineral discoveries, and exclusive early access to rare botanical releases.
        </p>

        <form class="relative max-w-lg mx-auto group">
          <input 
            type="email" 
            placeholder="Your Email Address" 
            class="w-full bg-transparent border-b-[0.5px] border-nude-soft/30 px-0 py-6 text-xl text-nude-soft placeholder:text-nude-soft/20 focus:outline-none focus:border-gold-accent transition-all duration-700 font-playfair text-center"
          >
          <button class="mt-12 group flex items-center justify-center space-x-6 mx-auto">
            <span class="text-[10px] tracking-[0.5em] uppercase font-bold text-nude-soft group-hover:text-gold-accent transition-colors">Apply for Access</span>
            <span class="w-12 h-[1px] bg-gold-accent transform transition-transform group-hover:translate-x-4"></span>
          </button>
        </form>
        
        <div class="mt-24 flex justify-center space-x-12 opacity-20 grayscale group hover:grayscale-0 transition-all duration-1000">
           <p class="text-[9px] font-bold tracking-[0.3em] uppercase text-white">Ethical Sourcing</p>
           <p class="text-[9px] font-bold tracking-[0.3em] uppercase text-white">Carbon Neutral</p>
           <p class="text-[9px] font-bold tracking-[0.3em] uppercase text-white">Bio-Identical</p>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class NewsletterComponent {}
