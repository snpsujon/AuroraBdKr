import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-emerald-deep text-nude-soft pt-24 pb-12 border-t border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <!-- Logo & Info -->
          <div class="space-y-8">
            <h2 class="text-3xl font-playfair font-bold tracking-tighter text-white">AURORA</h2>
            <p class="font-poppins text-sm leading-relaxed text-nude-soft/60 italic">
              Empowering your skin’s natural intelligence through the purity of minerals and nature.
            </p>
            <div class="flex space-x-6">
               <a href="#" class="hover:text-gold-accent transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
               <a href="#" class="hover:text-gold-accent transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-xs font-bold tracking-[0.3em] uppercase text-white mb-8">Shop</h4>
            <ul class="space-y-4 text-sm text-nude-soft/60">
              <li><a href="#" class="hover:text-gold-accent transition-colors">Mineral Serums</a></li>
              <li><a href="#" class="hover:text-gold-accent transition-colors">Organic Cleansers</a></li>
              <li><a href="#" class="hover:text-gold-accent transition-colors">The Night Ritual</a></li>
              <li><a href="#" class="hover:text-gold-accent transition-colors">Gift Curations</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-bold tracking-[0.3em] uppercase text-white mb-8">Company</h4>
            <ul class="space-y-4 text-sm text-nude-soft/60">
              <li><a href="#" class="hover:text-gold-accent transition-colors">Our Story</a></li>
              <li><a href="#" class="hover:text-gold-accent transition-colors">Sustainability</a></li>
              <li><a href="#" class="hover:text-gold-accent transition-colors">Journal</a></li>
              <li><a href="#" class="hover:text-gold-accent transition-colors">Stockists</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-bold tracking-[0.3em] uppercase text-white mb-8">Support</h4>
            <ul class="space-y-4 text-sm text-nude-soft/60">
              <li><a href="#" class="hover:text-gold-accent transition-colors">Shipping & Returns</a></li>
              <li><a href="#" class="hover:text-gold-accent transition-colors">Skin Concierge</a></li>
              <li><a href="#" class="hover:text-gold-accent transition-colors">FAQ</a></li>
              <li><a href="#" class="hover:text-gold-accent transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] tracking-widest uppercase text-nude-soft/30">
          <p>&copy; 2026 Aurora. Crafted with devotion.</p>
          <div class="flex space-x-8">
            <a href="#" class="hover:text-gold-accent transition-colors">Privacy</a>
            <a href="#" class="hover:text-gold-accent transition-colors">Terms</a>
            <a href="#" class="hover:text-gold-accent transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}
