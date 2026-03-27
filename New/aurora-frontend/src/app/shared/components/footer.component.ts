import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-white border-t border-gray-100 pt-20 pb-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div class="space-y-6">
            <a routerLink="/" class="text-3xl font-serif font-bold tracking-tighter text-primary-900">
              AURORA<span class="text-gold-500">.</span>
            </a>
            <p class="text-sm text-gray-500 leading-relaxed font-light">
              Elevating your skincare ritual through fruit-powered science and dermatologist-approved formulations. Experience the glow of true wellness.
            </p>
            <div class="flex gap-4">
               <a href="#" class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary-900 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
               </a>
               <a href="#" class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary-900 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37a4 4 0 1 1-3.37-3.37 4 4 0 1 1 3.37 3.37Z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
               </a>
               <a href="#" class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary-900 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
               </a>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-bold tracking-widest uppercase text-primary-900 mb-6">Collections</h4>
            <ul class="space-y-4">
              <li><a routerLink="/products" [queryParams]="{category: 'cleansers'}" class="text-sm text-gray-500 hover:text-gold-500 transition-colors">Cleansers</a></li>
              <li><a routerLink="/products" [queryParams]="{category: 'moisturizers'}" class="text-sm text-gray-500 hover:text-gold-500 transition-colors">Moisturizers</a></li>
              <li><a routerLink="/products" [queryParams]="{category: 'serums'}" class="text-sm text-gray-500 hover:text-gold-500 transition-colors">Serums</a></li>
              <li><a routerLink="/products" [queryParams]="{category: 'haircare'}" class="text-sm text-gray-500 hover:text-gold-500 transition-colors">Haircare</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold tracking-widest uppercase text-primary-900 mb-6">Support</h4>
            <ul class="space-y-4">
              <li><a routerLink="/about" class="text-sm text-gray-500 hover:text-gold-500 transition-colors">Our Story</a></li>
              <li><a routerLink="/contact" class="text-sm text-gray-500 hover:text-gold-500 transition-colors">Contact Us</a></li>
              <li><a routerLink="/faq" class="text-sm text-gray-500 hover:text-gold-500 transition-colors">Shipping & Returns</a></li>
              <li><a routerLink="/terms" class="text-sm text-gray-500 hover:text-gold-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold tracking-widest uppercase text-primary-900 mb-6">Experience</h4>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gold-500 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span class="text-sm text-gray-500">123 Beauty Lane, <br>Skincare City, SC 45678</span>
              </li>
              <li class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gold-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span class="text-sm text-gray-500">concierge&#64;aurora.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            &copy; 2026 Aurora Skin Care. All rights reserved.
          </p>
          <div class="flex gap-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" class="h-4 opacity-50 grayscale">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" class="h-4 opacity-50 grayscale">
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="h-4 opacity-50 grayscale">
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
