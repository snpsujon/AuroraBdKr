import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ahk-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="w-full z-[100] relative">
      <!-- 1. Top Utility Bar -->
      <div class="bg-gray-50 border-b border-gray-100 py-2 hidden lg:block">
        <div class="container mx-auto px-6 flex justify-between items-center text-[11px] font-medium text-gray-500 uppercase tracking-widest">
            <div class="flex items-center gap-6">
                <a href="tel:+8801790-270066" class="hover:text-primary transition-colors flex items-center gap-2">
                    <i class="fas fa-phone-alt text-primary/70"></i>
                    Call: +8801790-270066
                </a>
                <div class="flex items-center gap-4 border-l border-gray-200 pl-6">
                    <span class="text-gray-400 capitalize normal-case font-normal italic">Follow us on</span>
                    <a href="#" class="hover:text-primary transition-colors"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="hover:text-primary transition-colors"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="hover:text-primary transition-colors"><i class="fab fa-youtube"></i></a>
                    <a href="#" class="hover:text-primary transition-colors"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>
            <div class="flex items-center gap-6">
                <a href="#" class="hover:text-primary transition-colors flex items-center gap-2">
                    <i class="far fa-question-circle"></i> FAQ
                </a>
                <div class="h-3 w-[1px] bg-gray-300"></div>
                <a href="#" class="hover:text-primary transition-colors flex items-center gap-2">
                    <i class="far fa-user"></i> Sign In
                </a>
            </div>
        </div>
      </div>

      <!-- 2. Main Header (Action Bar) -->
      <div class="bg-white py-6 border-b border-gray-50 sticky top-0 lg:static z-50 shadow-sm lg:shadow-none">
        <div class="container mx-auto px-6 flex items-center justify-between gap-8">
            <!-- Logo -->
            <a routerLink="/" class="flex-shrink-0 flex items-center gap-3 group">
                <div class="h-14 w-14 bg-primary/5 rounded-2xl flex items-center justify-center p-2 group-hover:bg-primary transition-all duration-500">
                    <img src="images/logo.png" alt="AHK Logo" class="h-full w-full object-contain filter group-hover:brightness-0 group-hover:invert transition-all">
                </div>
                <div class="flex flex-col">
                    <span class="text-2xl font-serif font-black italic tracking-tighter text-gray-900 group-hover:text-primary transition-colors">Chardike</span>
                    <span class="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400 -mt-1">K-Beauty Professional</span>
                </div>
            </a>

            <!-- Search Bar (Centered) -->
            <div class="hidden lg:flex flex-grow max-w-2xl relative group">
                <input 
                    type="text" 
                    placeholder="What are you looking for?" 
                    class="w-full bg-gray-50 border border-gray-100 px-8 py-4 rounded-full text-sm focus:outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                >
                <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center pr-4">
                    <button class="w-10 h-10 bg-primary/5 text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                        <i class="fas fa-search text-xs"></i>
                    </button>
                </div>
            </div>

            <!-- Header Actions -->
            <div class="flex items-center gap-4 lg:gap-8">
                <div class="hidden md:flex flex-col items-end gap-1">
                    <span class="text-[9px] uppercase tracking-widest font-black text-primary italic leading-none">Deals</span>
                    <i class="fas fa-bolt text-yellow-400 text-sm"></i>
                </div>
                
                <button class="relative w-12 h-12 flex items-center justify-center text-gray-700 hover:text-primary transition-all group">
                    <i class="far fa-heart text-xl group-hover:scale-110"></i>
                    <span class="absolute top-1 right-1 bg-primary text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/20">0</span>
                </button>

                <button class="relative w-12 h-12 flex items-center justify-center text-gray-700 hover:text-primary transition-all group">
                    <i class="fas fa-shopping-bag text-xl group-hover:scale-110"></i>
                    <span class="absolute top-1 right-1 bg-primary text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">৳0</span>
                </button>

                <!-- Mobile Menu Button -->
                <button (click)="isMenuOpen.set(true)" class="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 group">
                    <span class="w-6 h-0.5 bg-gray-900 rounded-full group-hover:bg-primary transition-all"></span>
                    <span class="w-6 h-0.5 bg-gray-900 rounded-full group-hover:bg-primary transition-all"></span>
                    <span class="w-4 h-0.5 bg-gray-900 rounded-full group-hover:bg-primary self-start ml-3.5 transition-all"></span>
                </button>
            </div>
        </div>
      </div>

      <!-- 3. Navigation Bar & Mega Menu Overlay -->
      <nav class="bg-white border-b border-gray-100 hidden lg:block sticky top-0 z-40 shadow-sm" [ngClass]="isScrolled() ? 'fixed inset-x-0' : ''">
        <div class="container mx-auto px-6">
            <ul class="flex items-center justify-center gap-10">
                <li *ngFor="let cat of categories" class="group relative py-4">
                    <a [routerLink]="['/collections', cat.slug]" class="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-primary transition-all flex items-center gap-2">
                        {{ cat.name }}
                    </a>
                    
                    <!-- Mega Menu Content -->
                    <div class="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-white shadow-2xl rounded-b-[2rem] border border-gray-100 p-12 grid grid-cols-4 gap-12 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div *ngFor="let col of cat.columns" class="space-y-6">
                            <h4 class="text-xs font-black uppercase tracking-widest text-primary italic border-b border-primary/5 pb-4">{{ col.title }}</h4>
                            <ul class="space-y-4">
                                <li *ngFor="let item of col.items">
                                    <a href="#" class="text-[11px] text-gray-500 hover:text-primary transition-colors flex items-center gap-3">
                                        <div class="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary"></div>
                                        {{ item }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!-- Featured Ad/Banner inside Menu -->
                        <div class="col-span-1 bg-primary/5 rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group/ad">
                            <i class="fas fa-sparkles absolute -top-4 -right-4 text-primary/10 text-8xl"></i>
                            <span class="text-accent text-[9px] font-bold uppercase tracking-widest block mb-2">New Season</span>
                            <h4 class="text-xl font-serif font-black italic text-primary leading-tight">Glow & Care Rituals</h4>
                            <button class="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary border-b border-primary/20 pb-1 w-fit hover:border-primary transition-all">See All →</button>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#" class="text-[11px] font-black uppercase tracking-[0.2em] px-6 py-2 bg-secondary/10 text-secondary rounded-full hover:bg-secondary hover:text-white transition-all">
                        Buy One Get One
                    </a>
                </li>
                <li>
                    <a href="#" class="text-[11px] font-black uppercase tracking-[0.2em] px-6 py-2 bg-accent/10 text-accent rounded-full hover:bg-accent hover:text-white transition-all">
                        Brands
                    </a>
                </li>
            </ul>
        </div>
      </nav>

      <!-- Sticky Static Search for Scrolled State -->
      <div *ngIf="isScrolled()" class="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-4 pointer-events-none translate-y-[-10px]">
          <div class="bg-white/80 backdrop-blur-xl shadow-2xl rounded-full p-2 border border-white/50 pointer-events-auto">
              <div class="flex items-center gap-4 px-4 py-2">
                  <i class="fas fa-search text-gray-400"></i>
                  <input type="text" placeholder="Quick Search..." class="bg-transparent border-none text-xs focus:ring-0 w-full font-medium italic">
              </div>
          </div>
      </div>
    </header>

    <!-- Mobile Navigation Overlay (Side Panel Style) -->
    <div 
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] transition-all duration-500"
        [ngClass]="isMenuOpen() ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        (click)="isMenuOpen.set(false)"
    >
        <div 
            class="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-all duration-700 p-8 flex flex-col items-center"
            [ngClass]="isMenuOpen() ? 'translate-x-0' : 'translate-x-full'"
            (click)="$event.stopPropagation()"
        >
            <button (click)="isMenuOpen.set(false)" class="absolute top-6 left-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary transition-all">
                <i class="fas fa-times"></i>
            </button>
            <div class="mt-16 w-full space-y-12 overflow-y-auto pb-12">
                <div class="text-center">
                    <h2 class="text-3xl font-serif font-black italic tracking-tighter text-gray-900 mb-2">Chardike</h2>
                    <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold italic">The Korean Edit</p>
                </div>
                
                <ul class="space-y-6">
                    <li *ngFor="let cat of categories">
                        <button class="flex items-center justify-between w-full group">
                            <span class="text-xl font-bold text-gray-900 group-hover:text-primary transition-all">{{ cat.name }}</span>
                            <i class="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-primary transition-all"></i>
                        </button>
                    </li>
                </ul>

                <div class="pt-8 border-t border-gray-100">
                    <div class="flex flex-col gap-6">
                        <a href="#" class="text-sm font-bold text-gray-700 flex items-center gap-4 hover:text-primary transition-all">
                            <div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center"><i class="far fa-user"></i></div>
                            Account & Orders
                        </a>
                        <a href="#" class="text-sm font-bold text-gray-700 flex items-center gap-4 hover:text-primary transition-colors">
                            <div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-yellow-500"><i class="fas fa-bolt"></i></div>
                            Exclusive Deals
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isScrolled = signal(false);

  categories = [
    { 
      name: 'Skin', 
      slug: 'skin-care',
      columns: [
        { title: 'Cleansing', items: ['Cleansing Foam', 'Cleansing Oil', 'Facewash', 'Micellar Water'] },
        { title: 'Toning', items: ['Toners', 'Mists', 'Peeling Pads'] },
        { title: 'Serum & Essence', items: ['Vitamin C', 'Hyaluronic Acid', 'Retinol', 'Ampoules'] }
      ]
    },
    { 
      name: 'Health & Hygiene', 
      slug: 'health-hygiene',
      columns: [
        { title: 'Oral Care', items: ['Toothpaste', 'Toothbrush', 'Mouthwash'] },
        { title: 'Body Care', items: ['Body Wash', 'Lotions', 'Hand Care'] }
      ]
    },
    { name: 'Makeup', slug: 'makeup', columns: [] },
    { name: 'Hair', slug: 'hair-care', columns: [] },
    { name: 'Fragrance', slug: 'fragrance', columns: [] }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 200);
  }
}
