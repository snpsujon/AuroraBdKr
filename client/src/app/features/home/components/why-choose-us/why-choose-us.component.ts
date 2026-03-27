import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-32 bg-emerald-deep text-nude-soft relative overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute top-0 right-0 w-1/2 h-full bg-black/10 -skew-x-12 translate-x-1/4"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <!-- Image Column -->
          <div class="relative order-2 lg:order-1">
            <div class="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800" 
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Natural Luxury Skincare Ingredients"
              >
              <div class="absolute inset-0 bg-emerald-deep/20"></div>
            </div>
            
            <!-- Floating Achievement Card -->
            <div class="absolute -top-10 -right-10 bg-white p-8 rounded-2xl shadow-xl border border-nude-soft hidden md:block">
              <div class="text-gold-accent font-playfair text-4xl mb-2 italic">98%</div>
              <p class="text-emerald-deep text-[10px] font-bold tracking-widest uppercase leading-tight">
                Natural <br> Ingredients
              </p>
            </div>
          </div>

          <!-- Content Column -->
          <div class="space-y-12 order-1 lg:order-2">
            <div>
              <span class="text-gold-accent tracking-[0.4em] uppercase text-[10px] font-bold block mb-6">The Aurora Philosophy</span>
              <h2 class="text-4xl md:text-6xl font-playfair leading-tight mb-8">
                Harmony Between <br> <span class="text-gold-accent italic">Nature & Science</span>
              </h2>
              <p class="text-nude-soft/60 font-poppins font-light leading-relaxed max-w-lg">
                We believe that true beauty is cultivated at the intersection of botanical wisdom and clinical precision. Each formula is a testament to our three core pillars.
              </p>
            </div>

            <div class="space-y-12">
              <div *ngFor="let item of pillars" class="flex items-start group">
                <div class="mr-8 pt-1">
                  <div class="w-12 h-12 rounded-full border border-gold-accent/30 flex items-center justify-center transition-all duration-500 group-hover:bg-gold-accent group-hover:border-gold-accent">
                    <span class="text-gold-accent group-hover:text-emerald-deep text-lg font-playfair italic">{{item.number}}</span>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-playfair mb-3 text-white">{{item.title}}</h3>
                  <p class="text-nude-soft/50 font-poppins font-light text-sm leading-relaxed max-w-sm">{{item.desc}}</p>
                </div>
              </div>
            </div>

            <div class="pt-8">
               <button class="flex items-center space-x-4 group">
                 <span class="w-12 h-[1px] bg-gold-accent group-hover:w-20 transition-all duration-500"></span>
                 <span class="text-[10px] tracking-[0.5em] uppercase font-bold text-gold-accent">Discover Our Story</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class WhyChooseUsComponent {
  pillars = [
    { 
      number: '01', 
      title: 'Botanical Intelligence', 
      desc: 'Sourcing the rarest extracts from sustainable micro-climates where plants thrive in their most potent state.' 
    },
    { 
      number: '02', 
      title: 'Clinical Precision', 
      desc: 'Formulated with bio-identical minerals that your skin recognizes, ensuring path-of-least-resistance absorption.' 
    },
    { 
      number: '03', 
      title: 'Circular Commitment', 
      desc: 'Our luxury is conscious. From seed to skin, we maintain a zero-waste philosophy and carbon-neutral footprint.' 
    }
  ];
}
