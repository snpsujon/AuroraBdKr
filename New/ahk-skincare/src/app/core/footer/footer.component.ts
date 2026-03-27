import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ahk-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-primary pt-24 pb-12 text-white/90">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <!-- Brand and About -->
          <div class="space-y-8">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-accent/30 overflow-hidden">
                <img src="images/logo.png" alt="AHK Logo" class="w-8 h-8 object-contain">
              </div>
              <span class="text-2xl font-serif italic text-accent tracking-tighter">AHK Skincare</span>
            </div>
            <p class="text-white/60 font-light leading-relaxed text-sm">
              Discover the art of Korean beauty. We bring you the most exclusive skincare 
              formulations, blending tradition with modern science for a truly bespoke experience.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="space-y-8">
            <h4 class="text-xs font-bold uppercase tracking-[0.3em] text-accent">The Collection</h4>
            <ul class="space-y-4">
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">Shop All</a></li>
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">Korean Herbology</a></li>
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">Rituals</a></li>
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">Press</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div class="space-y-8">
            <h4 class="text-xs font-bold uppercase tracking-[0.3em] text-accent">Concierge</h4>
            <ul class="space-y-4">
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">Shipping & Returns</a></li>
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">Customer Care</a></li>
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" class="text-sm font-light hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>

          <!-- Contact & Address -->
          <div class="space-y-8">
            <h4 class="text-xs font-bold uppercase tracking-[0.3em] text-accent">Principal HQ</h4>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <i class="fas fa-map-marker-alt text-accent mt-1"></i>
                <div class="text-sm font-light leading-relaxed">
                  PA-67/1, Alatunnesa School Road,<br>
                  Middle Badda, Gulshan,<br>
                  Dhaka-1212, Bangladesh
                </div>
              </div>
              <div class="flex items-center gap-4">
                <i class="fas fa-envelope text-accent"></i>
                <a href="mailto:info@aurorabdkr.com" class="text-sm font-light hover:text-accent transition-colors">info@aurorabdkr.com</a>
              </div>
              <div class="flex items-center gap-4">
                <i class="fas fa-phone-alt text-accent"></i>
                <span class="text-sm font-light">+880 (2) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-[10px] uppercase font-bold tracking-widest text-white/30">
            © {{ currentYear }} AHK Skincare. A member of Aurora Hanguk Global Hub.
          </p>
          <div class="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-white/30">
            <a href="#" class="hover:text-accent transition-colors">Global Presence</a>
            <a href="#" class="hover:text-accent transition-colors">Innovation Lab</a>
            <a href="#" class="hover:text-accent transition-colors">Sustainability</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
