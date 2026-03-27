import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ahk-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav 
      class="fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 md:px-12 flex items-center justify-between"
      [ngClass]="isScrolled() ? 'bg-white/95 backdrop-blur-3xl shadow-2xl py-3 border-b border-primary/5' : 'bg-transparent py-8'"
    >
      <!-- Logo & Brand -->
      <div class="flex items-center gap-4 cursor-pointer group" routerLink="/">
        <div class="h-12 w-12 overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 group-hover:shadow-accent/20 group-hover:scale-105 flex items-center justify-center p-2 border border-primary/5">
            <img src="images/logo.png" alt="AHK Logo" class="h-full w-full object-contain">
        </div>
        <div class="flex flex-col">
            <span class="text-primary font-serif font-bold text-xl leading-tight group-hover:text-accent transition-colors tracking-tighter italic">AHK Skincare</span>
            <span class="text-accent text-[9px] tracking-[0.5em] font-bold leading-none uppercase">Aurora Hub</span>
        </div>
      </div>

      <!-- Desktop Links -->
      <div class="hidden lg:flex items-center gap-12 bg-white/10 backdrop-blur-md px-10 py-3 rounded-full border border-white/20 shadow-sm">
        <a routerLink="/" class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-accent transition-all relative group/link whitespace-nowrap">
            Shop
            <span class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-500 group-hover/link:w-full"></span>
        </a>
        <a routerLink="/collections" class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-accent transition-all relative group/link whitespace-nowrap">
            Collections
            <span class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-500 group-hover/link:w-full"></span>
        </a>
        <a routerLink="/rituals" class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-accent transition-all relative group/link whitespace-nowrap">
            The Rituals
            <span class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-500 group-hover/link:w-full"></span>
        </a>
        <a routerLink="/about" class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-accent transition-all relative group/link whitespace-nowrap">
            Our Story
            <span class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-500 group-hover/link:w-full"></span>
        </a>
      </div>

      <!-- Action Icons & Mobile Toggle -->
      <div class="flex items-center gap-4 md:gap-8">
        <div class="hidden md:flex items-center gap-6 pr-6 border-r border-primary/5">
          <button class="text-primary hover:text-accent transition-all hover:scale-110">
              <i class="fas fa-search text-sm"></i>
          </button>
          <button class="text-primary hover:text-accent transition-all hover:scale-110">
              <i class="fas fa-user text-sm"></i>
          </button>
          <button class="relative text-primary hover:text-accent transition-all hover:scale-110">
              <i class="fas fa-shopping-bag text-sm"></i>
              <span class="absolute -top-2 -right-2 bg-accent text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-lg shadow-accent/20">0</span>
          </button>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          (click)="toggleMenu()"
          class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-accent transition-all duration-500 shadow-xl group"
        >
          <div class="space-y-1.5 overflow-hidden">
            <span class="block w-5 h-0.5 bg-white transition-all duration-500" [ngClass]="{'translate-x-full': isMenuOpen()}"></span>
            <span class="block w-5 h-0.5 bg-white transition-all duration-500"></span>
            <span class="block w-5 h-0.5 bg-white transition-all duration-500" [ngClass]="{'-translate-x-full': isMenuOpen()}"></span>
          </div>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div 
        class="fixed inset-0 bg-white/95 backdrop-blur-[80px] z-[100] transition-all duration-700 flex flex-col items-center justify-center p-12 overflow-hidden"
        [ngClass]="isMenuOpen() ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-10'"
      >
          <!-- Background Decorative Elements -->
          <div class="absolute -top-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]"></div>
          <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>

          <button (click)="toggleMenu()" class="absolute top-10 right-10 w-16 h-16 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-500">
            <i class="fas fa-times text-xl"></i>
          </button>

          <div class="flex flex-col items-center gap-12 text-center relative z-10 w-full max-w-md">
            <span class="text-accent uppercase tracking-[0.8em] text-[10px] font-bold italic mb-4">Discover AHK</span>
            
            <a routerLink="/" (click)="toggleMenu()" class="text-4xl md:text-5xl font-serif italic text-primary hover:text-accent transition-all duration-500 hover:tracking-widest relative group">
              Shop
              <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full"></span>
            </a>
            <a routerLink="/collections" (click)="toggleMenu()" class="text-4xl md:text-5xl font-serif italic text-primary hover:text-accent transition-all duration-500 hover:tracking-widest relative group">
              Collections
              <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full"></span>
            </a>
            <a routerLink="/rituals" (click)="toggleMenu()" class="text-4xl md:text-5xl font-serif italic text-primary hover:text-accent transition-all duration-500 hover:tracking-widest relative group">
              The Rituals
              <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full"></span>
            </a>
             <a routerLink="/about" (click)="toggleMenu()" class="text-4xl md:text-5xl font-serif italic text-primary hover:text-accent transition-all duration-500 hover:tracking-widest relative group">
              Our Story
              <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full"></span>
            </a>

            <div class="pt-12 border-t border-primary/5 w-full mt-12 flex justify-center gap-8">
               <a href="#" class="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-500">
                  <i class="fab fa-instagram text-xl"></i>
               </a>
               <a href="#" class="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-500">
                  <i class="fab fa-facebook-f text-xl"></i>
               </a>
               <a href="#" class="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-500">
                  <i class="fab fa-linkedin-in text-xl"></i>
               </a>
            </div>
          </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
