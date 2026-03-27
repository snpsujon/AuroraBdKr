import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="scrollToTop()"
      class="fixed bottom-10 right-10 w-14 h-14 bg-primary text-accent rounded-full shadow-2xl z-[100] transition-all duration-500 flex items-center justify-center border border-accent/20 group overflow-hidden"
      [ngClass]="isVisible() ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'"
    >
      <div class="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      <i class="fas fa-chevron-up relative z-10 transition-colors duration-500 group-hover:text-primary"></i>
    </button>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ScrollTopComponent {
  isVisible = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isVisible.set(window.scrollY > 400);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
