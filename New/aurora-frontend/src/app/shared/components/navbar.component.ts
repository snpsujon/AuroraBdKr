import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Top Bar -->
    <div class="bg-primary-900 text-white py-2 text-center text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block">
      Free shipping on orders over $50 | Use code AURORA20 for 20% off
    </div>

    <!-- Main Navbar -->
    <nav 
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
      [class.shadow-sm]="isScrolled()"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 gap-4">
          
          <!-- Mobile Menu Toggle -->
          <button 
            (click)="toggleMobileMenu()"
            class="lg:hidden p-2 text-primary-900"
          >
            <svg *ngIf="!isMobileMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <svg *ngIf="isMobileMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          <!-- Logo -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="text-2xl sm:text-3xl font-serif font-bold tracking-tighter text-primary-900">
              AURORA<span class="text-gold-500">.</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-8">
            <div *ngFor="let cat of categories" class="relative group py-8">
              <a 
                [routerLink]="['/products']" 
                [queryParams]="{category: cat.slug}"
                class="text-[11px] font-bold tracking-widest uppercase text-primary-900/70 hover:text-primary-900 transition-colors flex items-center gap-1"
              >
                {{ cat.name }}
                <svg *ngIf="cat.sub" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </a>
              
              <!-- Mega Dropdown -->
              <div 
                *ngIf="cat.sub"
                class="absolute top-full left-0 w-64 bg-white shadow-2xl border border-gray-50 py-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0"
              >
                <div class="flex flex-col gap-4">
                  <a 
                    *ngFor="let sub of cat.sub"
                    [routerLink]="['/products']"
                    [queryParams]="{category: sub.slug}"
                    class="px-8 py-2 text-xs font-medium text-gray-500 hover:text-primary-900 hover:bg-primary-50 transition-all border-l-2 border-transparent hover:border-gold-500"
                  >
                    {{ sub.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Search Bar (centered on desktop) -->
          <div class="hidden md:flex flex-1 max-w-md relative group">
            <input 
              type="text" 
              placeholder="Search products, brands..."
              class="w-full bg-gray-50 border-none rounded-full py-2.5 px-6 pr-12 text-sm focus:ring-2 focus:ring-primary-200 transition-all"
              (keyup.enter)="onSearch($event)"
            >
            <button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>

          <!-- Right Icons -->
          <div class="flex items-center gap-2 sm:gap-6">
            <!-- Mobile Search Toggle -->
            <button 
              (click)="toggleSearch()"
              class="md:hidden p-2 text-primary-900"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>

            <!-- Account -->
            <div class="relative group">
              <button class="p-2 text-primary-900 hover:text-gold-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>

              <!-- Account Dropdown -->
              <div class="absolute right-0 top-full mt-2 w-56 bg-white shadow-2xl border border-gray-50 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-xl overflow-hidden">
                <div *ngIf="authService.currentUser() as user; else guestLinks">
                  <div class="px-6 py-3 border-b mb-2">
                    <p class="text-xs text-gray-400 uppercase tracking-widest font-bold">Welcome,</p>
                    <p class="text-sm font-bold text-primary-900 truncate">{{ user.userName }}</p>
                  </div>
                  <a routerLink="/profile" class="block px-6 py-2.5 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-900 transition-all">My Profile</a>
                  <a routerLink="/orders" class="block px-6 py-2.5 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-900 transition-all">Order History</a>
                  <hr class="my-2 border-gray-50">
                  <button (click)="authService.logout()" class="w-full text-left px-6 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all font-medium">Sign Out</button>
                </div>
                <ng-template #guestLinks>
                  <div class="px-6 py-4 space-y-4">
                    <a routerLink="/auth/login" class="block w-full py-2.5 bg-primary-900 text-white text-center rounded-lg text-sm font-bold hover:bg-black transition-all">Sign In</a>
                    <a routerLink="/auth/register" class="block w-full text-center text-sm font-medium text-gray-600 hover:text-primary-900">Create Account</a>
                  </div>
                </ng-template>
              </div>
            </div>

            <!-- Cart -->
            <a routerLink="/cart" class="relative p-2 text-primary-900 hover:text-gold-500 transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span 
                *ngIf="cartService.totalCount() > 0"
                class="absolute top-1 right-0 bg-gold-500 text-white text-[9px] font-black min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 border-2 border-white shadow-sm ring-2 ring-transparent group-hover:ring-gold-500/10 transition-all"
              >
                {{ cartService.totalCount() }}
              </span>
            </a>
          </div>
        </div>
      </div>

      <!-- Mobile Search Bar (visible only on small screens) -->
      <div 
        *ngIf="isSearchOpen()"
        class="md:hidden bg-white border-b px-4 py-3 animate-fade-in"
      >
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search for products..."
            class="w-full bg-gray-50 border-none rounded-lg py-2 px-4 pr-10 text-sm focus:ring-1 focus:ring-primary-200"
            (keyup.enter)="onSearch($event)"
            #mobileSearchInput
          >
          <button 
            (click)="toggleSearch()"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Sidebar -->
      <div 
        *ngIf="isMobileMenuOpen()" 
        class="lg:hidden fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-all"
        (click)="toggleMobileMenu()"
      >
        <div 
          class="absolute top-0 left-0 w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col animate-slide-in-left"
          (click)="$event.stopPropagation()"
        >
          <div class="p-6 border-b flex justify-between items-center">
            <a routerLink="/" (click)="toggleMobileMenu()" class="text-xl font-serif font-bold tracking-tighter text-primary-900">
              AURORA<span class="text-gold-500">.</span>
            </a>
            <button (click)="toggleMobileMenu()" class="p-2 text-gray-400 font-light text-2xl">&times;</button>
          </div>
          
          <div class="flex-1 overflow-y-auto py-6">
             <div *ngFor="let cat of categories" class="px-6 mb-8">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 border-b pb-2">{{ cat.name }}</p>
                <div class="flex flex-col gap-4 ml-2">
                   <a 
                    *ngFor="let sub of cat.sub" 
                    [routerLink]="['/products']"
                    [queryParams]="{category: sub.slug}"
                    (click)="toggleMobileMenu()"
                    class="text-sm font-medium text-primary-900/80 hover:text-primary-900 flex justify-between items-center"
                   >
                     {{ sub.name }}
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                   </a>
                   <a 
                    *ngIf="!cat.sub"
                    [routerLink]="['/products']"
                    [queryParams]="{category: cat.slug}"
                    (click)="toggleMobileMenu()"
                    class="text-sm font-medium text-primary-900/80 hover:text-primary-900"
                   >
                     Shop All {{ cat.name }}
                   </a>
                </div>
             </div>
          </div>

          <div class="p-6 bg-gray-50 border-t">
            <div *ngIf="authService.currentUser() as user; else mobileGuest" class="flex flex-col gap-4">
               <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-900 text-white flex items-center justify-center font-bold">
                    {{ user.userName[0].toUpperCase() }}
                  </div>
                  <div>
                    <p class="text-sm font-bold">{{ user.userName }}</p>
                    <p class="text-[10px] text-gray-400">{{ user.email }}</p>
                  </div>
               </div>
               <a routerLink="/profile" (click)="toggleMobileMenu()" class="text-sm font-medium text-gray-600">My Account</a>
               <button (click)="authService.logout(); toggleMobileMenu()" class="text-sm font-medium text-red-500 text-left">Sign Out</button>
            </div>
            <ng-template #mobileGuest>
               <a routerLink="/auth/login" (click)="toggleMobileMenu()" class="block w-full py-3 bg-primary-900 text-white text-center rounded-lg text-sm font-bold">Sign In</a>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
  router = inject(Router);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isSearchOpen = signal(false);

  categories = [
    {
      name: 'Skincare',
      slug: 'skincare',
      sub: [
        { name: 'Cleansers', slug: 'cleansers' },
        { name: 'Moisturizers', slug: 'moisturizers' },
        { name: 'Serums', slug: 'serums' },
        { name: 'Sun Protection', slug: 'sun-protection' },
        { name: 'Face Masks', slug: 'face-masks' }
      ]
    },
    {
      name: 'Haircare',
      slug: 'haircare',
      sub: [
        { name: 'Shampoo', slug: 'shampoo' },
        { name: 'Conditioner', slug: 'conditioner' },
        { name: 'Hair Oils', slug: 'hair-oils' },
        { name: 'Scalp Care', slug: 'scalp-care' }
      ]
    },
    {
      name: 'Makeup',
      slug: 'makeup',
      sub: [
        { name: 'Face', slug: 'makeup-face' },
        { name: 'Eyes', slug: 'makeup-eyes' },
        { name: 'Lips', slug: 'makeup-lips' }
      ]
    },
    { name: 'Fragrance', slug: 'fragrance' },
    { name: 'Tools', slug: 'tools' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  toggleSearch() {
    this.isSearchOpen.update(v => !v);
  }

  onSearch(event: any) {
    const query = event.target.value;
    if (query) {
      this.router.navigate(['/products'], { queryParams: { search: query } });
      this.isSearchOpen.set(false);
    }
  }
}
