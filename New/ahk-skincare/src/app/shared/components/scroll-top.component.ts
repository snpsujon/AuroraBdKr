import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ahk-scroll-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="scrollToTop()"
            class="fixed bottom-10 right-10 w-12 h-12 rounded-full shadow-2xl z-50 transition-all duration-500 flex items-center justify-center transform group"
            [class.translate-y-24]="!isVisible()"
            [class.opacity-0]="!isVisible()"
            [class.translate-y-0]="isVisible()"
            [class.opacity-100]="isVisible()"
            [class.bg-primary]="true"
            aria-label="Scroll back to top">
      <div class="absolute inset-0 rounded-full border border-accent/20 scale-110 group-hover:scale-125 transition-transform duration-500 opacity-50 group-hover:opacity-100 group-hover:bg-accent/10"></div>
      <i class="fas fa-chevron-up text-white group-hover:text-accent transition-colors"></i>
    </button>
  `,
  styles: [`
    button {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
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
