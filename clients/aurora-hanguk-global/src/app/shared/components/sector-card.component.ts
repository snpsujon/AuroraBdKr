import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sector-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div 
      class="group relative h-[380px] w-full rounded-[2rem] overflow-hidden transition-all duration-700 cursor-pointer perspective-1000"
      [routerLink]="link"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave()"
      [style.transform]="tiltTransform"
    >
      <!-- Light Glass Background (Visible by default) -->
      <div class="absolute inset-0 bg-slate-50/80 backdrop-blur-md border border-slate-100 transition-all duration-700 group-hover:bg-primary group-hover:border-primary group-hover:shadow-2xl"></div>
      
      <!-- Gradient Glow (Interactive) -->
      <div 
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        [style.background]="'radial-gradient(circle at ' + mouseX + 'px ' + mouseY + 'px, rgba(212, 175, 55, 0.2), transparent 80%)'"
      ></div>

      <!-- Icon/Index -->
      <div class="absolute top-6 left-6 text-primary/5 text-7xl font-serif italic group-hover:text-white/10 transition-colors duration-700 select-none leading-none">
        0{{index + 1}}
      </div>

      <!-- Content -->
      <div class="relative z-10 h-full p-8 flex flex-col justify-end">
        <div class="mb-4 transform transition-all duration-700 group-hover:-translate-y-2">
            <h3 class="text-2xl font-serif font-bold text-primary group-hover:text-white transition-colors duration-500 italic mb-3">{{title}}</h3>
            <div class="w-12 h-[2px] bg-accent transition-all duration-700 group-hover:w-full"></div>
        </div>

        <p class="text-primary/70 text-xs font-light leading-relaxed mb-6 transition-all duration-700 group-hover:text-white/80">
            {{description}}
        </p>

        <div class="flex items-center justify-between transition-all duration-700 group-hover:translate-x-2">
            <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Explore Strategy</span>
            <div class="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:border-white/20 group-hover:text-white group-hover:bg-accent transition-all duration-500 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .perspective-1000 {
      perspective: 1000px;
    }
  `]
})
export class SectorCardComponent {
  @Input() index: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() link: string = '';

  tiltTransform = 'rotateX(0deg) rotateY(0deg)';
  mouseX = 0;
  mouseY = 0;

  onMouseMove(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.mouseX = x;
    this.mouseY = y;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;

    this.tiltTransform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  onMouseLeave() {
    this.tiltTransform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}
