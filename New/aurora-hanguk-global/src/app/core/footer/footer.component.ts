import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-[#051a1b] text-white pt-32 pb-12 px-6 md:px-12 relative overflow-hidden border-t border-accent/10">
      <!-- Decorative Background Orbs -->
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 blur-[150px] rounded-full"></div>
      <div class="absolute top-1/2 -right-40 w-80 h-80 bg-accent/5 blur-[120px] rounded-full"></div>

      <div class="max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 relative z-10 border-b border-white/5 pb-24">
        <!-- Column 1: Aurora -->
        <div class="flex flex-col gap-10">
          <div class="flex items-center gap-3">
            <div class="h-12 flex items-center justify-center transition-transform hover:scale-110 duration-500">
              <img src="images/logo.png" alt="Aurora Logo" class="h-full w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all">
            </div>
            <div class="flex flex-col">
              <span class="text-white font-serif font-bold text-xl leading-tight uppercase tracking-wider">Aurora Hanguk</span>
              <span class="text-accent text-[11px] tracking-[0.3em] font-bold leading-none">GLOBAL</span>
            </div>
          </div>
          <ul class="flex flex-col gap-4 text-sm font-light text-white/50 tracking-wide">
            <li><a routerLink="/about" class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block">About Us</a></li>
            <li><a class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block cursor-pointer">Our Vision</a></li>
            <li><a class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block cursor-pointer">Careers</a></li>
          </ul>
          
          <!-- Social Icons -->
          <div class="flex gap-6 mt-4">
             <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent hover:-translate-y-1 transition-all duration-500">
                <i class="fab fa-facebook-f text-sm"></i>
             </a>
             <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent hover:-translate-y-1 transition-all duration-500">
                <i class="fab fa-instagram text-sm"></i>
             </a>
             <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent hover:-translate-y-1 transition-all duration-500">
                <i class="fab fa-linkedin-in text-sm"></i>
             </a>
             <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent hover:-translate-y-1 transition-all duration-500">
                <i class="fab fa-youtube text-sm"></i>
             </a>
          </div>
        </div>

        <!-- Column 2: Services -->
        <div class="flex flex-col gap-10">
          <h4 class="text-white font-serif text-lg italic font-bold tracking-tight">Services</h4>
          <ul class="flex flex-col gap-4 text-sm font-light text-white/50 tracking-wide">
            <li><a routerLink="/telecom-travel" class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block">Telecom & Travel</a></li>
            <li><a routerLink="/skincare" class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block">Skincare</a></li>
            <li><a routerLink="/global-food" class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block">Global Food</a></li>
            <li><a routerLink="/real-estate" class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block">Real Estate</a></li>
            <li><a routerLink="/consultancy" class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block">Consultancy</a></li>
          </ul>
        </div>

        <!-- Column 3: Support -->
        <div class="flex flex-col gap-10">
          <h4 class="text-white font-serif text-lg italic font-bold tracking-tight">Support</h4>
          <ul class="flex flex-col gap-4 text-sm font-light text-white/50 tracking-wide">
            <li><a routerLink="/contact" class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
            <li><a class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block cursor-pointer">FAQ</a></li>
            <li><a class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block cursor-pointer">Privacy Policy</a></li>
            <li><a class="hover:text-accent transition-all duration-300 hover:translate-x-2 inline-block cursor-pointer">Terms</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact Info -->
        <div class="flex flex-col gap-10">
          <h4 class="text-white font-serif text-lg italic font-bold tracking-tight">Contact Info</h4>
          <ul class="flex flex-col gap-6 text-sm font-light text-white/50 tracking-wide">
            <li class="flex items-start gap-4 group">
              <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div class="flex flex-col">
                 <span class="text-white text-xs font-bold uppercase tracking-widest mb-1">Address</span>
                 <span>PA-67/1, Alatunnesa School Road, Middle Badda, Gulshan, Dhaka-1212</span>
              </div>
            </li>
            <li class="flex items-start gap-4 group cursor-pointer">
              <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div class="flex flex-col">
                 <span class="text-white text-xs font-bold uppercase tracking-widest mb-1">Email</span>
                 <span class="hover:text-accent transition-colors">info@aurorabdkr.com</span>
              </div>
            </li>
            <li class="flex items-start gap-4 group">
              <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div class="flex flex-col">
                 <span class="text-white text-xs font-bold uppercase tracking-widest mb-1">Phone / WhatsApp</span>
                 <span>+82 2-1234-5678</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright Area -->
      <div class="max-w-[1720px] mx-auto mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.4em] text-white/30 uppercase font-bold">
        <p>© 2026 Aurora Hanguk Global. All Rights Reserved.</p>
        <div class="flex items-center gap-10 mt-6 md:mt-0">
           <span class="text-accent underline decoration-accent/20 underline-offset-4 cursor-pointer hover:text-white transition-colors">Seoul</span>
           <span class="cursor-pointer hover:text-white transition-colors">Global Hubs</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FooterComponent {}
