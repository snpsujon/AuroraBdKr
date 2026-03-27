import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-before-after',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-32 bg-nude-soft/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          <div class="lg:col-span-5">
            <span class="text-gold-accent tracking-[0.4em] uppercase text-[10px] font-bold block mb-6">Proven Radiance</span>
            <h2 class="text-4xl md:text-6xl font-playfair text-emerald-deep leading-tight mb-8">
              Visible <br> Transformation
            </h2>
            <p class="text-emerald-deep/60 font-poppins font-light leading-relaxed mb-10">
              Witness the remarkable journey of our muses. Real skin, unfiltered results, and the undeniable glow of the Aurora ritual after just 28 days.
            </p>
            <div class="flex items-center space-x-8">
              <div class="text-center">
                <p class="text-2xl font-playfair text-emerald-deep">+42%</p>
                <p class="text-[9px] tracking-widest uppercase text-emerald-deep/40 font-bold">Hydration</p>
              </div>
              <div class="w-[1px] h-8 bg-emerald-deep/10"></div>
              <div class="text-center">
                <p class="text-2xl font-playfair text-emerald-deep">94%</p>
                <p class="text-[9px] tracking-widest uppercase text-emerald-deep/40 font-bold">Smoother Texture</p>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-7">
            <div class="relative group h-[500px] rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-white">
              <div class="flex h-full">
                <!-- Before Side -->
                <div class="w-1/2 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800" 
                    class="h-full w-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000"
                    alt="Before Treatment"
                  >
                  <div class="absolute inset-0 bg-emerald-deep/10 transition-opacity opacity-40 group-hover:opacity-0"></div>
                  <div class="absolute top-8 left-8">
                    <span class="px-4 py-1.5 bg-black/30 backdrop-blur-md text-white/80 text-[10px] tracking-[0.3em] uppercase rounded-full border border-white/20">Day 01</span>
                  </div>
                </div>
                
                <!-- After Side -->
                <div class="w-1/2 relative overflow-hidden border-l-[1px] border-white/40">
                  <img 
                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800" 
                    class="h-full w-full object-cover"
                    alt="After Treatment"
                  >
                  <div class="absolute top-8 right-8">
                    <span class="px-4 py-1.5 bg-gold-accent/80 backdrop-blur-md text-white text-[10px] tracking-[0.3em] uppercase rounded-full border border-white/20 shadow-lg">Day 28</span>
                  </div>
                </div>
              </div>

              <!-- Comparison Handle Decor -->
              <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white pointer-events-none">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <svg class="w-4 h-4 text-emerald-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7l4 4-4 4m8-8l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Quote -->
        <div class="max-w-3xl mx-auto text-center border-t border-emerald-deep/5 pt-16">
          <p class="text-xl md:text-2xl font-playfair italic text-emerald-deep leading-relaxed mb-6">
            "My fine lines have visibly softened, but it's the inner luminosity that really surprised me. Aurora isn't just skincare; it's a skin transformation."
          </p>
          <div class="flex items-center justify-center space-x-4">
            <div class="w-8 h-[1px] bg-gold-accent"></div>
            <p class="text-[10px] tracking-[0.4em] uppercase font-bold text-emerald-deep">Isabella K., Verified Muse</p>
            <div class="w-8 h-[1px] bg-gold-accent"></div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class BeforeAfterComponent {}
