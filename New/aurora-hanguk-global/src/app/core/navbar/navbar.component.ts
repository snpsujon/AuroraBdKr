import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav 
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 flex items-center justify-between"
      [ngClass]="isScrolled() ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2' : 'bg-white/50 backdrop-blur-md py-6'"
    >
      <!-- Left: Logo -->
      <div class="flex items-center gap-3 cursor-pointer group" routerLink="/">
        <div class="h-10 md:h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <img src="images/logo.png" alt="Aurora Logo" class="h-full w-auto object-contain">
        </div>
        <div class="flex flex-col">
            <span class="text-primary font-serif font-bold text-lg md:text-xl leading-tight uppercase tracking-wider transition-colors duration-500">Aurora Hanguk</span>
            <span class="text-accent text-[10px] md:text-[11px] tracking-[0.3em] font-bold leading-none">GLOBAL</span>
        </div>
      </div>

      <!-- Center: Menu Items -->
      <div class="hidden lg:flex items-center gap-6 xl:gap-8">
        <a routerLink="/" routerLinkActive="text-accent" [routerLinkActiveOptions]="{exact: true}" class="text-primary font-medium text-[13px] tracking-[0.15em] uppercase transition-all duration-300 relative py-2 mb-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:transform after:scale-x-0 after:transition-transform after:duration-500 after:origin-right hover:after:scale-x-100 hover:after:origin-left">Home</a>
        
        <!-- Sectors Mega Menu -->
        <div class="relative group py-2">
            <button class="text-primary font-medium text-[13px] tracking-[0.15em] uppercase transition-all duration-300 relative py-2 mb-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:transform after:scale-x-0 after:transition-transform after:duration-500 after:origin-right hover:after:scale-x-100 hover:after:origin-left flex items-center gap-1 group-hover:text-accent">
                Sectors
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            <!-- Mega Dropdown -->
            <div class="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl rounded-2xl p-8 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto border border-accent/10">
                <div class="grid grid-cols-3 gap-8 text-left border-none">
                    <!-- Telecom & Travel -->
                    <div>
                        <h4 class="text-accent font-serif font-bold text-sm uppercase tracking-widest mb-4">Telecom & Travel</h4>
                        <ul class="space-y-2">
                            <li><a routerLink="/telecom-travel" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">Global SIM</a></li>
                            <li><a routerLink="/telecom-travel" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">International Roaming</a></li>
                            <li><a routerLink="/telecom-travel" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">Travel Packages</a></li>
                        </ul>
                    </div>
                    <!-- Skincare -->
                    <div>
                        <h4 class="text-accent font-serif font-bold text-sm uppercase tracking-widest mb-4">Skincare</h4>
                        <ul class="space-y-2">
                            <li><a routerLink="/skincare" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">Korean Skincare</a></li>
                            <li><a routerLink="/skincare" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">Face Care</a></li>
                            <li><a routerLink="/skincare" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">Serums</a></li>
                            <li><a routerLink="/skincare" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">Body Care</a></li>
                        </ul>
                    </div>
                    <!-- Global Food -->
                    <div>
                        <h4 class="text-accent font-serif font-bold text-sm uppercase tracking-widest mb-4">Global Food</h4>
                        <ul class="space-y-2">
                            <li><a routerLink="/global-food" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">Korean Food</a></li>
                            <li><a routerLink="/global-food" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">Imported Snacks</a></li>
                            <li><a routerLink="/global-food" class="text-primary/60 hover:text-accent font-sans text-sm block py-1 transition-all duration-300 transform hover:translate-x-2">Frozen Items</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <a routerLink="/real-estate" routerLinkActive="text-accent" class="text-primary font-medium text-[13px] tracking-[0.15em] uppercase transition-all duration-300 relative py-2 mb-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:transform after:scale-x-0 after:transition-transform after:duration-500 after:origin-right hover:after:scale-x-100 hover:after:origin-left">Real Estate</a>
        <a routerLink="/consultancy" routerLinkActive="text-accent" class="text-primary font-medium text-[13px] tracking-[0.15em] uppercase transition-all duration-300 relative py-2 mb-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:transform after:scale-x-0 after:transition-transform after:duration-500 after:origin-right hover:after:scale-x-100 hover:after:origin-left">Consultancy</a>
        <a routerLink="/about" routerLinkActive="text-accent" class="text-primary font-medium text-[13px] tracking-[0.15em] uppercase transition-all duration-300 relative py-2 mb-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:transform after:scale-x-0 after:transition-transform after:duration-500 after:origin-right hover:after:scale-x-100 hover:after:origin-left">About</a>
        <a routerLink="/contact" routerLinkActive="text-accent" class="text-primary font-medium text-[13px] tracking-[0.15em] uppercase transition-all duration-300 relative py-2 mb-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:transform after:scale-x-0 after:transition-transform after:duration-500 after:origin-right hover:after:scale-x-100 hover:after:origin-left">Contact</a>
      </div>

      <!-- Right Side: Icons & Actions -->
      <div class="flex items-center gap-4 md:gap-6">
        <button class="text-primary hover:text-accent transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
        </button>
        <button class="text-primary hover:text-accent transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
           </svg>
        </button>
        <div class="hidden md:flex items-center gap-1 cursor-pointer group">
            <span class="text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-accent text-primary">EN</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 group-hover:text-accent transition-colors text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>

        <!-- Mobile Menu Toggle -->
        <button (click)="toggleMenu()" class="lg:hidden text-primary p-2">
            <svg *ngIf="!isMenuOpen()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg *ngIf="isMenuOpen()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div 
        class="lg:hidden fixed top-0 left-0 w-full h-[100dvh] bg-white/95 backdrop-blur-[80px] -webkit-backdrop-blur-[80px] z-[60] transition-transform duration-700 ease-soft-expo p-10 flex flex-col justify-center"
        [style.transform]="isMenuOpen() ? 'translateY(0)' : 'translateY(-100%)'"
      >
        <!-- Explicit Close Button for Mobile -->
        <button (click)="toggleMenu()" class="absolute top-8 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent shadow-xl active:scale-95 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div class="flex flex-col gap-10 text-center">
            <a routerLink="/" (click)="toggleMenu()" class="text-4xl font-serif text-primary italic font-bold hover:text-accent transition-colors tracking-tight">Home</a>
            
            <div class="py-4">
                <span class="text-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-8 block">Our Sectors</span>
                <div class="flex flex-col gap-6 font-serif text-2xl italic text-primary/80">
                    <a routerLink="/telecom-travel" (click)="toggleMenu()" class="hover:text-accent transition-all hover:scale-105">Telecom & Travel</a>
                    <a routerLink="/skincare" (click)="toggleMenu()" class="hover:text-accent transition-all hover:scale-105">Skincare</a>
                    <a routerLink="/global-food" (click)="toggleMenu()" class="hover:text-accent transition-all hover:scale-105">Global Food</a>
                    <a routerLink="/real-estate" (click)="toggleMenu()" class="hover:text-accent transition-all hover:scale-105">Real Estate</a>
                    <a routerLink="/consultancy" (click)="toggleMenu()" class="hover:text-accent transition-all hover:scale-105">Consultancy</a>
                </div>
            </div>

            <div class="flex flex-col gap-6 border-t border-primary/5 pt-10">
                <a routerLink="/about" (click)="toggleMenu()" class="text-2xl font-serif text-primary italic hover:text-accent transition-colors">About Us</a>
                <a routerLink="/contact" (click)="toggleMenu()" class="text-2xl font-serif text-primary italic hover:text-accent transition-colors">Connect</a>
            </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
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
  }
}
