import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ahk-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="pt-32 bg-[#FAFAF8]">
      <section class="container mx-auto px-6 py-24">
        <div class="max-w-4xl mx-auto space-y-12">
          <span class="text-accent uppercase tracking-[1em] text-[10px] font-bold block mb-4 italic">Our Heritage</span>
          <h1 class="text-6xl md:text-8xl text-primary font-serif font-bold italic tracking-tighter leading-tight">
            Craftsmanship <br> In Every <span class="text-accent">Drop.</span>
          </h1>
          <p class="text-primary/70 text-xl font-light leading-relaxed">
            At AHK Skincare, we believe that beauty is not merely about surface-level transformation. It's about a deep, cellular harmony between your skin and the environment.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-16 pt-12">
            <div class="space-y-6">
              <h3 class="text-3xl text-primary font-serif italic">The Seoul Lab</h3>
              <p class="text-primary/60 leading-relaxed font-light">
                Our research and development center in Seoul combines centuries-old Korean herbology with modern bio-fermentation techniques. Each formula is tested for months to ensure maximum efficacy.
              </p>
            </div>
            <div class="space-y-6">
              <h3 class="text-3xl text-primary font-serif italic">Ethical Sourcing</h3>
              <p class="text-primary/60 leading-relaxed font-light">
                We partner only with sustainable farms that respect the soil and the seasons. Our ingredients are harvested at the peak of their potency, ensuring that every drop of serum carries the full power of nature.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `
})
export class AboutComponent {}
