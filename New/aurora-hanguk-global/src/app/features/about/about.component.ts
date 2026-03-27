import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="pt-32 min-h-screen bg-white">
      <!-- 1. Mission & Vision -->
      <section class="max-w-7xl mx-auto px-6 mb-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div>
              <span class="text-accent uppercase tracking-[0.8em] text-xs font-bold block mb-8">Our Legacy</span>
              <h1 class="text-6xl md:text-8xl font-serif font-bold italic text-primary leading-[0.9] mb-12 tracking-tighter">
                Transcend <span class="text-accent underline decoration-accent/20 underline-offset-[10px]">Boundaries</span>
              </h1>
              <p class="text-primary/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
                 Founded in the heart of Seoul, Aurora Hanguk Global was born from a single vision: to bridge the gap between high-level Korean innovation and global lifestyle standards.
              </p>
              <p class="text-primary/60 text-lg font-light leading-relaxed max-w-xl">
                 Today, we operation as a multi-sector conglomerate, delivering excellence in telecommunications, skincare, food, real estate, and strategic consultancy across the globe.
              </p>
           </div>
           
           <div class="relative group">
              <div class="absolute -inset-4 bg-accent/5 rounded-[4rem] blur-2xl group-hover:bg-accent/10 transition-all duration-1000"></div>
              <img src="images/consultancy.png" class="relative rounded-[3rem] w-full h-[600px] object-cover shadow-2xl transition-transform duration-1000 group-hover:scale-105" alt="Seoul Headquarters">
              
              <!-- Floating Card -->
              <div class="absolute -bottom-10 -left-10 bg-primary p-12 rounded-[2rem] shadow-2xl max-w-sm hidden md:block">
                 <h3 class="text-white font-serif italic text-3xl mb-4">Elite Standards</h3>
                 <p class="text-white/50 text-sm font-light leading-relaxed">We don't just provide services; we curate experiences that define the new global standard of Aurora excellence.</p>
              </div>
           </div>
        </div>
      </section>

      <!-- 2. Core Pillars -->
      <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="container mx-auto px-6">
           <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div class="text-center group">
                 <div class="text-accent text-6xl font-serif italic mb-8 opacity-20 group-hover:opacity-100 transition-opacity">01</div>
                 <h4 class="text-primary font-bold text-xl uppercase tracking-widest mb-6">Integrity</h4>
                 <p class="text-primary/50 text-sm font-light leading-relaxed">Absolute transparency in our global distribution and real estate dealings.</p>
              </div>
              <div class="text-center group">
                 <div class="text-accent text-6xl font-serif italic mb-8 opacity-20 group-hover:opacity-100 transition-opacity">02</div>
                 <h4 class="text-primary font-bold text-xl uppercase tracking-widest mb-6">Innovation</h4>
                 <p class="text-primary/50 text-sm font-light leading-relaxed">Leveraging the latest K-tech to improve global connectivity and skincare results.</p>
              </div>
              <div class="text-center group">
                 <div class="text-accent text-6xl font-serif italic mb-8 opacity-20 group-hover:opacity-100 transition-opacity">03</div>
                 <h4 class="text-primary font-bold text-xl uppercase tracking-widest mb-6">Inspiration</h4>
                 <p class="text-primary/50 text-sm font-light leading-relaxed">Building the future of academic and cultural exchange for the youth.</p>
              </div>
           </div>
        </div>
      </section>
    </main>
  `
})
export class AboutComponent {}
