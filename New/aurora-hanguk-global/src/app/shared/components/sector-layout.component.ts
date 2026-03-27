import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectorCategory, SectorItem, SectorTestimonial } from '../models/sector.models';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-sector-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="sector-page">
      <!-- 1. Hero Banner -->
      <section class="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img [src]="heroImage" class="w-full h-full object-cover brightness-[0.7] transform scale-105 hero-bg-img" [alt]="title">
          <div class="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/80"></div>
          <div class="absolute inset-0 backdrop-blur-[2px] opacity-30"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10 text-center">
          <span class="text-accent uppercase tracking-[1em] text-[10px] md:text-xs font-bold block mb-8 opacity-0 hero-tag">{{tag}}</span>
          <h1 class="text-6xl md:text-9xl text-white font-serif font-bold italic mb-10 leading-[0.9] tracking-tighter opacity-0 hero-title">
            {{title}}
          </h1>
          <p class="text-white/80 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed opacity-0 hero-subtitle">
            {{subtitle}}
          </p>
        </div>
        
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-0 scroll-hint">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7-7v18" />
          </svg>
        </div>
      </section>

      <!-- 2. Service Categories -->
      <section class="py-32 bg-white relative z-10" *ngIf="categories && categories.length">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div *ngFor="let cat of categories; let i = index" class="category-item group p-8 rounded-[2rem] border border-primary/5 hover:bg-slate-50 transition-all duration-500">
               <div class="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent transition-all duration-500">
                  <i [class]="cat.icon" class="text-white text-xl"></i>
               </div>
               <h3 class="text-primary font-serif font-bold italic text-2xl mb-4">{{cat.title}}</h3>
               <p class="text-primary/60 text-sm font-light leading-relaxed">{{cat.desc}}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Product Grid -->
      <section class="py-32 bg-slate-50 relative overflow-hidden" *ngIf="items && items.length">
        <div class="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div class="max-w-2xl">
              <span class="text-accent uppercase tracking-[0.8em] text-[10px] font-bold block mb-4">Core Portfolio</span>
              <h2 class="text-5xl md:text-6xl text-primary font-bold font-serif leading-tight italic">
                Featured <span class="text-accent underline decoration-accent/20 underline-offset-[10px]">Excellence</span>
              </h2>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div *ngFor="let item of items; let i = index" class="item-card group relative h-[500px] rounded-[3rem] overflow-hidden shadow-xl hover:-translate-y-4 hover:shadow-2xl transition-all duration-700">
               <img [src]="item.image" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" [alt]="item.title">
               <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
               
               <div class="absolute inset-0 p-10 flex flex-col justify-end z-10">
                  <span class="text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-4" *ngIf="item.tag">{{item.tag}}</span>
                  <h4 class="text-white text-3xl font-serif font-bold italic mb-4 leading-tight">{{item.title}}</h4>
                  <p class="text-white/70 text-sm font-light line-clamp-2 transition-all group-hover:line-clamp-none">{{item.desc}}</p>
                  
                  <div class="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 mt-6">
                    <button class="bg-accent text-primary px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">Discover More</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Testimonials -->
      <section class="py-40 bg-white" *ngIf="testimonials && testimonials.length">
        <div class="container mx-auto px-6 text-center">
           <span class="text-accent uppercase tracking-[0.8em] text-[10px] font-bold block mb-8">Client Stories</span>
           <div class="max-w-4xl mx-auto">
              <div *ngFor="let t of testimonials" class="testimonial-item mb-20 last:mb-0">
                 <p class="text-2xl md:text-4xl text-primary font-serif italic font-medium leading-relaxed mb-10">
                    "{{t.text}}"
                 </p>
                 <div class="flex items-center justify-center gap-4">
                    <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                       <img *ngIf="t.avatar" [src]="t.avatar" class="w-full h-full object-cover" [alt]="t.name">
                       <i *ngIf="!t.avatar" class="fas fa-user text-primary/20"></i>
                    </div>
                    <div class="text-left">
                       <h5 class="text-primary font-bold text-sm uppercase tracking-widest">{{t.name}}</h5>
                       <span class="text-accent text-[10px] uppercase tracking-widest font-bold">{{t.role}}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <!-- 5. Contact CTA -->
      <section class="py-40 px-6">
        <div class="container mx-auto max-w-6xl">
           <div class="bg-primary rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl group">
              <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,theme(colors.accent),transparent_70%)] group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div class="relative z-10">
                 <h2 class="text-4xl md:text-7xl text-white font-serif font-bold italic mb-12 leading-tight">Ready to Elevate Your <br> <span class="text-accent underline decoration-accent/20 underline-offset-8">Global Standards?</span></h2>
                 <p class="text-white/60 max-w-xl mx-auto mb-16 font-light leading-relaxed">Connect with our specialized team to tailor a solution that transcends boundaries and delivers excellence to your doorstep.</p>
                 
                 <div class="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button class="bg-white text-primary px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] transition-all hover:bg-accent hover:scale-110 hover:shadow-2xl">Get In Touch</button>
                    <button class="border border-white/20 text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] transition-all hover:border-accent hover:text-accent">Request Quote</button>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    :host { display: block; }
    .hero-bg-img { transition: transform 10s ease-out; }
    .sector-page:hover .hero-bg-img { transform: scale(1.15); }
  `]
})
export class SectorLayoutComponent implements OnInit, AfterViewInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() tag: string = '';
  @Input() heroImage: string = '';
  
  @Input() categories: SectorCategory[] = [];
  @Input() items: SectorItem[] = [];
  @Input() testimonials: SectorTestimonial[] = [];

  ngOnInit() {}

  ngAfterViewInit() {
    this.initAnimations();
  }

  private initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.5 } });
    
    tl.to('.hero-tag', { opacity: 1, y: -20, delay: 0.3 })
      .to('.hero-title', { opacity: 1, y: -20 }, '-=1.2')
      .to('.hero-subtitle', { opacity: 1, y: -20 }, '-=1.1')
      .to('.scroll-hint', { opacity: 1 }, '-=0.8');

    gsap.from('.category-item', {
      scrollTrigger: { trigger: '.category-item', start: 'top 85%' },
      y: 60, opacity: 0, stagger: 0.1, duration: 1.2
    });

    gsap.from('.item-card', {
      scrollTrigger: { trigger: '.item-card', start: 'top 85%' },
      y: 80, opacity: 0, stagger: 0.15, duration: 1.5, ease: 'expo.out'
    });

    gsap.from('.testimonial-item', {
      scrollTrigger: { trigger: '.testimonial-item', start: 'top 80%' },
      scale: 0.95, opacity: 0, duration: 2, ease: 'power2.out'
    });
  }
}
