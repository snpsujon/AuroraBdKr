import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="pt-32 min-h-screen bg-[#FDFDFD]">
      <div class="max-w-7xl mx-auto px-6 mb-40">
        <div class="text-center mb-24 lg:mb-32">
           <span class="text-accent uppercase tracking-[0.8em] text-[10px] md:text-xs font-bold block mb-8">Reach Out To Us</span>
           <h1 class="text-6xl md:text-9xl text-primary font-serif font-bold italic mb-10 leading-[0.9] tracking-tighter">
              Start Your <span class="text-accent underline decoration-accent/20 underline-offset-[12px]">Journey</span>
           </h1>
           <p class="text-primary/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Connect with our global hubs for a personalized solution that transcends boundaries. Our specialized teams in Seoul and abroad are at your service.
           </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
           <!-- Form -->
           <div class="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-primary/5">
              <form class="space-y-10 group">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="relative group/input">
                       <label class="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-3 block">Full Name</label>
                       <input type="text" placeholder="John Aurora" class="w-full bg-slate-50 rounded-2xl p-6 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-primary/20">
                    </div>
                    <div class="relative group/input">
                       <label class="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-3 block">Email Address</label>
                       <input type="email" placeholder="john@aurora.com" class="w-full bg-slate-50 rounded-2xl p-6 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-primary/20">
                    </div>
                 </div>
                 
                 <div class="relative group/input">
                    <label class="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-3 block">Subject Area</label>
                    <select class="w-full bg-slate-50 rounded-2xl p-6 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all appearance-none text-primary/60">
                       <option>Telecom & Travel</option>
                       <option>Skincare</option>
                       <option>Global Food</option>
                       <option>Real Estate</option>
                       <option>Consultancy</option>
                    </select>
                 </div>

                 <div class="relative group/input">
                    <label class="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-3 block">Message</label>
                    <textarea rows="6" placeholder="How can we elevate your standards today?" class="w-full bg-slate-50 rounded-2xl p-6 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-primary/20"></textarea>
                 </div>

                 <button class="bg-primary text-white w-full py-6 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-accent hover:text-primary hover:scale-105 hover:shadow-2xl">
                    Submit Inquiry
                 </button>
              </form>
           </div>

           <!-- Info Cards -->
           <div class="flex flex-col gap-12">
              <div class="bg-primary p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                 <div class="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div class="relative z-10 flex gap-8 items-start">
                    <div class="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center shrink-0">
                       <i class="fas fa-location-dot text-2xl text-accent"></i>
                    </div>
                    <div class="flex flex-col">
                       <span class="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-3">Principal HQ</span>
                       <h4 class="text-3xl font-serif italic mb-4">Dhaka Hub</h4>
                       <p class="text-white/50 font-light text-sm leading-relaxed max-w-[200px]">
                          PA-67/1, Alatunnesa School Road, Middle Badda, Gulshan, Dhaka-1212
                       </p>
                    </div>
                 </div>
              </div>

              <div class="bg-white border border-primary/5 p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden group">
                 <div class="relative z-10 flex gap-8 items-start">
                    <div class="w-16 h-16 bg-accent/5 rounded-3xl flex items-center justify-center shrink-0">
                       <i class="fas fa-envelope-open-text text-2xl text-accent"></i>
                    </div>
                    <div class="flex flex-col">
                       <span class="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-3">Direct Connect</span>
                       <h4 class="text-3xl font-serif italic mb-4 text-primary">Inquiries</h4>
                       <p class="text-primary/50 font-light text-sm leading-relaxed">
                          General: info&#64;aurorabdkr.com <br>
                          Partners: partnerships&#64;aurorabdkr.com
                       </p>
                    </div>
                 </div>
              </div>

              <div class="bg-white border border-primary/5 p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden group">
                 <div class="relative z-10 flex gap-8 items-start">
                    <div class="w-16 h-16 bg-accent/5 rounded-3xl flex items-center justify-center shrink-0">
                       <i class="fas fa-phone-volume text-2xl text-accent"></i>
                    </div>
                    <div class="flex flex-col">
                       <span class="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-3">WhatsApp & Phone</span>
                       <h4 class="text-3xl font-serif italic mb-4 text-primary">+82 2-1234-5678</h4>
                       <p class="text-primary/50 font-light text-sm leading-relaxed">
                          24/7 Premium Concierge Support for Elite Members.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  `
})
export class ContactComponent {}
