import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('1000ms 200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('1200ms 400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  template: `
    <section class="relative min-h-screen pt-20 flex items-center bg-gradient-to-br from-nude-soft via-white to-nude-soft overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 w-1/3 h-full bg-emerald-deep/5 -skew-x-12 transform origin-top-right"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-gold-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <!-- Left Content -->
          <div class="z-10 text-center lg:text-left" @fadeInLeft>
            <span class="inline-block text-gold-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-6">
              Divine Radiance Collection
            </span>
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-playfair text-emerald-deep leading-[1.1] mb-8 font-bold">
              Glow Naturally <br> <span class="text-gold-accent italic font-normal">with Aurora</span>
            </h1>
            <p class="text-lg md:text-xl text-emerald-deep/70 font-poppins mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Premium skincare powered by nature & science. Meticulously formulated to unveil your skin's most luminous potential through crystalline minerals and rare botanicals.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <button class="px-10 py-4 bg-emerald-deep text-white font-bold rounded-full hover:bg-gold-accent transition-all duration-500 tracking-widest text-xs uppercase shadow-xl shadow-emerald-deep/20">
                Shop Now
              </button>
              <button class="px-10 py-4 border-2 border-emerald-deep text-emerald-deep font-bold rounded-full hover:bg-emerald-deep hover:text-white transition-all duration-500 tracking-widest text-xs uppercase">
                Explore Collection
              </button>
            </div>

            <!-- Trust Badges -->
            <div class="mt-16 flex items-center justify-center lg:justify-start space-x-12 opacity-40 grayscale group hover:grayscale-0 transition-all">
               <div class="text-center">
                 <p class="text-[10px] font-bold tracking-widest text-emerald-deep uppercase">100% Organic</p>
               </div>
               <div class="text-center">
                 <p class="text-[10px] font-bold tracking-widest text-emerald-deep uppercase">Cruelty Free</p>
               </div>
               <div class="text-center">
                 <p class="text-[10px] font-bold tracking-widest text-emerald-deep uppercase">Vegan</p>
               </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative hidden lg:block" @fadeInRight>
            <div class="relative z-10 floating">
              <div class="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000" 
                  class="w-full h-full object-cover"
                  alt="Luxury Skin Care Model"
                >
              </div>
              
              <!-- Floating accent card -->
              <div class="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-nude-soft z-20 max-w-[200px]">
                <div class="flex items-center space-x-2 mb-2 text-gold-accent">
                   <div class="flex">
                     <span *ngFor="let s of [1,2,3,4,5]">★</span>
                   </div>
                </div>
                <p class="text-[10px] italic text-emerald-deep/60 leading-tight">
                  "My skin has never looked more calm and clear."
                </p>
                <p class="text-[9px] font-bold uppercase tracking-widest text-emerald-deep mt-2">— Elena R.</p>
              </div>
            </div>

            <!-- Absolute decorative arcs -->
            <div class="absolute -top-10 -right-10 w-64 h-64 border-[1px] border-gold-accent/20 rounded-full pointer-events-none"></div>
            <div class="absolute top-20 -right-20 w-80 h-80 border-[1px] border-gold-accent/10 rounded-full pointer-events-none"></div>
          </div>

        </div>
      </div>

      <!-- Bottom Line -->
      <div class="absolute bottom-10 left-0 w-full px-8 flex justify-between items-center opacity-25">
        <div class="h-[1px] flex-grow bg-emerald-deep/20"></div>
        <div class="mx-8 flex space-x-4">
           <div class="w-1.5 h-1.5 rounded-full bg-emerald-deep"></div>
           <div class="w-1.5 h-1.5 rounded-full bg-emerald-deep/40"></div>
           <div class="w-1.5 h-1.5 rounded-full bg-emerald-deep/40"></div>
        </div>
        <div class="h-[1px] flex-grow bg-emerald-deep/20"></div>
      </div>
    </section>
  `,
  styles: [`
    .floating {
      animation: float 6s ease-in-out infinite;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
  `]
})
export class HeroSectionComponent {}
