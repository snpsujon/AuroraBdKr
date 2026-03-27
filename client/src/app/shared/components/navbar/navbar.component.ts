import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav 
      class="fixed top-0 left-0 w-full z-50 transition-all duration-700"
      [class.bg-white/90]="isScrolled"
      [class.backdrop-blur-lg]="isScrolled"
      [class.py-4]="isScrolled"
      [class.py-8]="!isScrolled"
      [class.border-b]="isScrolled"
      [class.border-nude-soft]="isScrolled"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center relative">
          
          <!-- Left Links -->
          <div class="hidden lg:flex items-center space-x-10 flex-1">
            <a routerLink="/" class="nav-link group overflow-hidden relative">
              <span class="block transition-transform duration-500 group-hover:-translate-y-full">Collection</span>
              <span class="absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full text-gold-accent">Collection</span>
            </a>
            <a href="#" class="nav-link group overflow-hidden relative">
              <span class="block transition-transform duration-500 group-hover:-translate-y-full">Our Story</span>
              <span class="absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full text-gold-accent">Our Story</span>
            </a>
          </div>

          <!-- Centered Logo -->
          <div class="flex-shrink-0 flex flex-col items-center">
            <a routerLink="/" class="text-3xl md:text-5xl font-playfair font-bold tracking-tighter text-emerald-deep leading-none hover:text-gold-accent transition-colors duration-500">
              AURORA
            </a>
            <span class="text-[8px] tracking-[0.6em] uppercase text-gold-accent mt-2 font-bold opacity-0 transition-opacity duration-700" [class.opacity-100]="!isScrolled">Skin Care</span>
          </div>

          <!-- Right Links/Icons -->
          <div class="flex items-center justify-end space-x-8 lg:space-x-10 flex-1">
            <a href="#" class="hidden lg:block nav-link group overflow-hidden relative">
              <span class="block transition-transform duration-500 group-hover:-translate-y-full">Journal</span>
              <span class="absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full text-gold-accent">Journal</span>
            </a>
            
            <div class="flex items-center space-x-6">
              <button class="text-emerald-deep hover:text-gold-accent transition-all duration-500 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button class="text-emerald-deep hover:text-gold-accent transition-all duration-500 transform hover:scale-110 relative group">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span class="absolute -top-1 -right-1 bg-gold-accent text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-link {
      @apply text-[11px] font-bold tracking-[0.3em] text-emerald-deep uppercase;
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
