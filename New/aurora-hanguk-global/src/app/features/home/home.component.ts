import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectorCardComponent } from '../../shared/components/sector-card.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SectorCardComponent],
  template: `
    <main class="relative overflow-hidden w-full min-h-screen">
        <!-- 3D Hero Background -->
        <div #canvasContainer class="fixed inset-0 pointer-events-none z-0 bg-white"></div>

        <!-- Hero Section -->
        <section class="hero-section relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden z-10 pt-36 md:pt-48 bg-transparent">
            <!-- Premium Ultra-Thin Blurry Overlay -->
            <div class="absolute inset-0 bg-white/[0.03] backdrop-blur-[2px] pointer-events-none z-0"></div>
            
            <!-- Ultra-soft gradient for subtle contrast -->
            <div class="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/70 pointer-events-none z-0"></div>
            
            <div class="max-w-5xl mx-auto relative z-20 hero-wrapper">
                <div class="overflow-hidden mb-6">
                    <span class="hero-tag inline-block text-accent uppercase tracking-[0.6em] text-[10px] font-bold font-sans translate-y-full">Global Connectivity Excellence</span>
                </div>
                
                <h1 class="hero-title text-6xl md:text-9xl text-primary font-bold font-serif leading-[1.1] mb-8 tracking-tighter italic">
                    Aurora <br class="md:hidden"> Hanguk <br> <span class="text-accent not-italic">Global</span>
                </h1>
                
                <p class="hero-subtitle text-lg md:text-2xl text-primary/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    Connecting <span class="text-primary font-medium italic underline decoration-accent/30 underline-offset-8">lifestyle</span>, business and global opportunities through elite Korean innovation.
                </p>
                
                <div class="hero-btns flex flex-col md:flex-row items-center justify-center gap-6">
                    <button class="w-full md:w-auto bg-primary text-white border border-accent/20 px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-primary transition-all duration-500 shadow-xl hover:-translate-y-1">
                        Explore Our Services
                    </button>
                    <button class="w-full md:w-auto group flex items-center gap-3 px-12 py-5 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-primary hover:border-accent transition-all duration-700 hover:-translate-y-1">
                        Discover Aurora
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Floating Scroll Indicator -->
            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 scroll-indicator">
                <div class="w-[1px] h-20 bg-gradient-to-b from-accent to-transparent"></div>
                <span class="text-[10px] text-accent uppercase tracking-[0.5em] font-bold rotate-90 translate-y-10">Scroll</span>
            </div>
        </section>

        <!-- Global Influence Statistics Section -->
        <section class="stats-section py-20 bg-white relative z-20">
            <div class="container mx-auto px-6">
                <div class="bg-primary rounded-[3.5rem] p-12 md:p-20 shadow-2xl relative overflow-hidden border border-white/10 group">
                    <!-- Particle Background Effect -->
                    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,theme(colors.accent),transparent_50%)]"></div>
                    
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative z-10">
                        <div *ngFor="let stat of statistics" class="stat-item text-center">
                            <div class="flex flex-col items-center">
                                <div class="text-4xl md:text-6xl text-white font-serif font-bold italic mb-4 flex items-center gap-1">
                                    <span class="count-up" [attr.data-target]="stat.value">0</span>
                                    <span class="text-accent text-2xl md:text-3xl">+</span>
                                </div>
                                <div class="w-8 h-[2px] bg-accent/30 mb-6 group-hover:w-16 transition-all duration-700"></div>
                                <span class="text-white/50 uppercase tracking-[0.4em] text-[10px] md:text-[11px] font-bold">{{stat.label}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Gateway Section -->
        <section class="gateway-section relative py-60 z-30 bg-white flex items-center justify-center">
            <div class="max-w-[1920px] mx-auto w-full px-6 md:px-12 xl:px-20">
                <div class="text-center mb-40 section-header">
                    <span class="text-accent uppercase tracking-[1em] text-[10px] font-bold block mb-8">Business Sectors</span>
                    <h2 class="text-5xl md:text-8xl text-primary font-bold font-serif leading-[0.95] tracking-tighter italic">
                        The Global <span class="italic text-accent underline decoration-accent/20 underline-offset-[20px]">Gateway</span>
                    </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-center justify-center px-4 overflow-visible">
                     <ng-container *ngFor="let sector of sectorData; let i = index">
                        <app-sector-card [index]="i" [title]="sector.title" [description]="sector.description" [link]="sector.link" class="sector-card-item block"></app-sector-card>
                     </ng-container>
                </div>
            </div>
        </section>

        <!-- Featured Services Section -->
        <section class="services-section py-32 bg-slate-50 relative">
            <!-- Decorative Background Element -->
            <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

            <div class="container mx-auto px-6 relative z-10">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 services-header">
                    <div class="max-w-2xl">
                        <span class="text-accent uppercase tracking-[0.8em] text-[10px] font-bold block mb-6">Elite Services</span>
                        <h2 class="text-5xl md:text-7xl text-primary font-bold font-serif leading-[0.95] tracking-tighter italic">
                            Curated <span class="italic text-accent underline decoration-accent/20 underline-offset-[20px]">Excellence</span>
                        </h2>
                    </div>
                    <p class="text-primary/60 max-w-sm font-light leading-relaxed">
                        Discover our selection of premium services designed to bridge the gap between Korean innovation and global lifestyle.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 xl:gap-6">
                    <div *ngFor="let service of featuredServices; let i = index" 
                         class="service-card group relative h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(15,61,62,0.3)] will-change-transform">
                        
                        <!-- Background Image -->
                        <div class="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                            <img [src]="service.image" [alt]="service.title" 
                                 class="w-full h-full object-cover object-center brightness-[0.9] group-hover:brightness-[1.05] transition-all duration-700">
                            <!-- Clean High-Contrast Bottom Overlay -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                        </div>

                        <!-- Content -->
                        <div class="absolute inset-0 p-8 flex flex-col justify-end z-20">
                            <span class="text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-4">
                                0{{i + 1}}. {{service.tag}}
                            </span>
                            <h3 class="text-white text-2xl font-serif font-bold italic mb-4 leading-tight transition-transform duration-700 group-hover:-translate-y-1">
                                {{service.title}}
                            </h3>
                            <p class="text-white/90 text-xs font-light leading-relaxed mb-6 transition-all duration-700">
                                {{service.desc}}
                            </p>
                            
                            <!-- Action -->
                            <div class="flex items-center gap-3">
                                <button class="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                                <span class="text-[9px] text-white font-bold uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100">Explore</span>
                            </div>
                        </div>

                        <!-- Inner Border Reveal -->
                        <div class="absolute inset-0 border border-white/10 rounded-[2.5rem] pointer-events-none group-hover:border-accent/30 transition-colors duration-700"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="about-section py-40 bg-white relative overflow-hidden">
            <div class="container mx-auto px-6 relative z-10">
                <div class="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
                    <!-- Left: High Quality Image -->
                    <div class="w-full lg:w-1/2 about-image-container relative">
                        <div class="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(15,61,62,0.15)] group">
                            <img src="images/about-network.png" alt="Global Business Network" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                            <!-- Subtle Grain Overlay -->
                            <div class="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
                        </div>
                        <!-- Abstract Gold Accents -->
                        <div class="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 blur-3xl rounded-full"></div>
                        <div class="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 blur-3xl rounded-full"></div>
                    </div>

                    <!-- Right: Text Content -->
                    <div class="w-full lg:w-1/2 about-content">
                        <span class="text-accent uppercase tracking-[0.8em] text-[10px] font-bold block mb-8">Established Legacy</span>
                        <h2 class="text-5xl md:text-7xl text-primary font-bold font-serif leading-[1.1] tracking-tighter italic mb-10">
                            About <span class="not-italic text-accent underline decoration-accent/20 underline-offset-[15px]">Aurora</span> <br> Hanguk Global
                        </h2>
                        <div class="space-y-8 text-primary/70 font-light leading-relaxed mb-12 max-w-xl text-lg">
                            <p>
                                <span class="text-primary font-serif italic font-bold">Aurora Hanguk Global</span> acts as a premier strategic nexus, seamlessly integrating diverse vertical markets to serve a sophisticated global clientele.
                            </p>
                            <p>
                                We unify <span class="text-primary font-medium italic underline decoration-accent/10 underline-offset-4">telecommunications</span>, luxury travel, advanced clinical <span class="text-primary font-medium italic underline decoration-accent/10 underline-offset-4">skincare</span>, curated international <span class="text-primary font-medium italic underline decoration-accent/10 underline-offset-4">food</span>, elite real estate, and expert <span class="text-primary font-medium italic underline decoration-accent/10 underline-offset-4">consultancy</span> under one emblem of excellence.
                            </p>
                        </div>
                        <button class="group relative px-12 py-5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(15,61,62,0.3)]">
                            <span class="relative z-10">Learn More</span>
                            <div class="absolute inset-0 bg-accent translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Partner Brands Section -->
        <section class="partners-section py-32 bg-slate-50 relative overflow-hidden border-t border-slate-100">
            <div class="container mx-auto px-6 mb-16 text-center">
                <span class="text-accent uppercase tracking-[0.8em] text-[10px] font-bold block mb-4">Strategic Alliances</span>
                <h2 class="text-3xl font-serif italic text-primary font-bold">Industry Leading <span class="text-accent">Partners</span></h2>
            </div>

            <!-- Horizontal Marquee -->
            <div class="marquee-wrapper relative overflow-hidden flex whitespace-nowrap py-10">
                <div class="marquee-content flex items-center gap-20 px-10">
                    <ng-container *ngFor="let brand of partnerBrands; let i = index">
                        <div class="brand-logo group flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                            <div class="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center bg-white group-hover:border-accent group-hover:bg-accent/5">
                                <span class="text-primary font-serif font-bold italic text-sm group-hover:text-accent">{{brand.initial}}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-primary font-serif font-bold text-lg leading-none uppercase tracking-widest">{{brand.name}}</span>
                                <span class="text-accent text-[8px] tracking-[0.2em] font-bold uppercase">{{brand.category}}</span>
                            </div>
                        </div>
                    </ng-container>
                    <!-- Duplicated for infinite scroll -->
                    <ng-container *ngFor="let brand of partnerBrands; let i = index">
                        <div class="brand-logo group flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                            <div class="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center bg-white group-hover:border-accent group-hover:bg-accent/5">
                                <span class="text-primary font-serif font-bold italic text-sm group-hover:text-accent">{{brand.initial}}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-primary font-serif font-bold text-lg leading-none uppercase tracking-widest">{{brand.name}}</span>
                                <span class="text-accent text-[8px] tracking-[0.2em] font-bold uppercase">{{brand.category}}</span>
                            </div>
                        </div>
                    </ng-container>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section py-48 px-10 relative z-30 overflow-hidden">
            <!-- Premium Emerald Gradient Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary via-[#0a2e2f] to-primary"></div>
            
            <!-- Animated Light Orbs -->
            <div class="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full animate-pulse"></div>
                <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/40 blur-[150px] rounded-full"></div>
            </div>

            <div class="max-w-4xl mx-auto text-center relative z-20 cta-wrapper">
                <span class="text-accent uppercase tracking-[1em] text-[10px] font-bold block mb-12 opacity-0 cta-tag">The Final Frontier</span>
                <h2 class="text-white text-5xl md:text-8xl font-serif italic font-bold mb-16 leading-[1.1] tracking-tighter opacity-0 cta-title-new">
                    Start Your Journey <br> <span class="text-accent underline decoration-accent/20 underline-offset-[20px]">With Aurora</span>
                </h2>
                
                <div class="flex flex-col md:flex-row items-center justify-center gap-8 opacity-0 cta-btns">
                    <button class="w-full md:w-auto bg-white text-primary px-16 py-6 rounded-full text-xs font-bold uppercase tracking-[0.3em] transition-all duration-700 hover:scale-110 hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] hover:bg-accent hover:text-primary">
                        Explore Services
                    </button>
                    <button class="w-full md:w-auto group flex items-center gap-4 px-16 py-6 border border-white/20 rounded-full text-xs font-bold uppercase tracking-[0.3em] text-white hover:border-accent hover:text-accent transition-all duration-700">
                        Contact Us
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    </main>
  `,
  styles: [`
    :host {
      display: block;
    }
    .hero-wrapper { perspective: 1000px; }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef;

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private globeGroup?: THREE.Group;
  private animationId?: number;

  sectorData = [
    { title: 'Telecom & Travel', description: 'Global SIM cards and international travel services powered by elite tech.', link: '/telecom-travel' },
    { title: 'Skincare', description: 'Premium Korean beauty research and advanced clinical skincare formulations.', link: '/skincare' },
    { title: 'Global Food', description: 'Curated distribution of imported Korean and international food products.', link: '/global-food' },
    { title: 'Real Estate', description: 'Innovative property investment and housing solutions in elite markets.', link: '/real-estate' },
    { title: 'Consultancy', description: 'Professional visa, study abroad and global business strategic consulting.', link: '/consultancy' }
  ];

  statistics = [
    { label: 'Countries Connected', value: 156 },
    { label: 'Happy Clients', value: 2480 },
    { label: 'Products Delivered', value: 92400 },
    { label: 'Global Partners', value: 420 }
  ];

  featuredServices = [
    { 
        title: 'International SIM', 
        tag: 'Connect',
        desc: 'Elite connectivity with 5G speed across 150+ countries. Zero roaming fees, pure speed.',
        image: 'images/telecom.png' 
    },
    { 
        title: 'Korean Skincare', 
        tag: 'Beauty',
        desc: 'Strategic dermatology and clinical beauty products directly from Seoul high-performance labs.',
        image: 'images/skincare.png' 
    },
    { 
        title: 'Imported Food', 
        tag: 'Living',
        desc: 'Pure authentic tastes curated from Koreas most prestigious growers and producers.',
        image: 'images/food.png' 
    },
    { 
        title: 'Apartment Listings', 
        tag: 'Luxury',
        desc: 'Exclusive access to Gangnam and elite Seoul residential properties for global investors.',
        image: 'images/realestate.png' 
    },
    { 
        title: 'Study Abroad', 
        tag: 'Consultancy',
        desc: 'Strategic academic planning for Koreas top SKY universities and global elite institutions.',
        image: 'images/consultancy.png' 
    }
  ];

  partnerBrands = [
    { name: 'GlobalLink', initial: 'G', category: 'Telecom' },
    { name: 'ConnectPlus', initial: 'C', category: 'Telecom' },
    { name: 'SkyNetworks', initial: 'S', category: 'Telecom' },
    { name: 'SeoulGlow', initial: 'S', category: 'Skincare' },
    { name: 'PureK-Beauty', initial: 'P', category: 'Skincare' },
    { name: 'DermaZen', initial: 'D', category: 'Skincare' },
    { name: 'K-Taste', initial: 'K', category: 'Food' },
    { name: 'NatureCured', initial: 'N', category: 'Food' },
    { name: 'FreshOrigin', initial: 'F', category: 'Food' },
    { name: 'UrbanElite', initial: 'U', category: 'Real Estate' },
    { name: 'SeoulVista', initial: 'S', category: 'Real Estate' },
    { name: 'PrimeHoldings', initial: 'P', category: 'Real Estate' }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
        this.initThree();
        this.initGSAP();
    }, 500);
  }

  ngOnDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.renderer) {
        this.renderer.dispose();
        this.renderer.forceContextLoss();
    }
    window.removeEventListener('resize', this.onWindowResize);
  }

  private initThree() {
    if (!this.canvasContainer) return;
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 4;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.canvasContainer.nativeElement.innerHTML = '';
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    this.globeGroup = new THREE.Group();
    const globeRadius = 1.35;
    
    // Points
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMaterial = new THREE.PointsMaterial({
      color: 0x0F3D3E,
      size: 0.015,
      transparent: true,
      opacity: 0.8
    });
    const points = new THREE.Points(globeGeometry, globeMaterial);
    this.globeGroup.add(points);

    // Wired connection look
    const wireframeGeometry = new THREE.SphereGeometry(globeRadius + 0.02, 24, 24);
    const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0xD4AF37,
        transparent: true,
        opacity: 0.2
    });
    const lines = new THREE.LineSegments(new THREE.WireframeGeometry(wireframeGeometry), wireframeMaterial);
    this.globeGroup.add(lines);
    
    this.scene.add(this.globeGroup);

    // Ambient Light
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      if (this.globeGroup) this.globeGroup.rotation.y += 0.0015;
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };
    animate();
    window.addEventListener('resize', this.onWindowResize);
  }

  private onWindowResize = () => {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private initGSAP() {
    gsap.set(['.hero-tag', '.hero-title', '.hero-subtitle', '.hero-btns', '.scroll-indicator'], { opacity: 0, y: 30 });
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.5 } });

    tl.to('.hero-tag', { opacity: 1, y: 0, delay: 0.2 })
      .to('.hero-title', { opacity: 1, y: 0 }, '-=1.2')
      .to('.hero-subtitle', { opacity: 1, y: 0 }, '-=1.1')
      .to('.hero-btns', { opacity: 1, y: 0 }, '-=1')
      .to('.scroll-indicator', { opacity: 1, y: 0 }, '-=0.8');

    if (this.scene) {
        gsap.from(this.scene.position, { z: -2, duration: 4, ease: 'expo.out' });
    }

    gsap.from('.section-header', {
        scrollTrigger: { trigger: '.section-header', start: 'top 85%' },
        y: 40, opacity: 0, duration: 1.2
    });

    gsap.from('.sector-card-item', {
        scrollTrigger: { trigger: '.gateway-section', start: 'top 80%' },
        y: 60, opacity: 0, stagger: 0.1, duration: 1.5, ease: 'power2.out'
    });

    // Stats Count Up
    gsap.utils.toArray('.count-up').forEach((el: any) => {
        const target = parseInt(el.getAttribute('data-target') || '0');
        gsap.to(el, {
            scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 80%',
            },
            textContent: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function(this: any) {
                if (target > 999) {
                    const currentVal = Math.floor(this['targets']()[0].textContent);
                    el.textContent = currentVal.toLocaleString();
                }
            }
        });
    });
    
    gsap.from('.services-header', {
        scrollTrigger: { trigger: '.services-header', start: 'top 85%' },
        y: 40, opacity: 0, duration: 1.2
    });

    gsap.from('.service-card', {
        scrollTrigger: { trigger: '.services-section', start: 'top 95%' },
        y: 50, 
        opacity: 0.3, 
        scale: 0.98,
        stagger: 0.1, 
        duration: 1.5, 
        ease: 'power2.out'
    });
    
    // CTA Section Animation
    const ctaTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
        }
    });

    ctaTl.to('.cta-tag', { opacity: 1, y: 0, duration: 1 })
         .to('.cta-title-new', { opacity: 1, y: 0, duration: 1 }, '-=0.7')
         .to('.cta-btns', { opacity: 1, y: 0, duration: 1 }, '-=0.7');

    // Subtle Floating Animation for CTA Content
    gsap.to('.cta-wrapper', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
    });

    // About Section Animation
    gsap.from('.about-image-container', {
        scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
        x: -100, opacity: 0, duration: 2, ease: 'power4.out'
    });
    
    gsap.from('.about-content', {
        scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
        x: 100, opacity: 0, duration: 2, ease: 'power4.out'
    });

    // Marquee Animation
    const marqueeContent = document.querySelector('.marquee-content') as HTMLElement;
    if (marqueeContent) {
        const totalWidth = marqueeContent.scrollWidth / 2;
        const marqueeTween = gsap.to('.marquee-content', {
            x: -totalWidth,
            duration: 30,
            ease: 'none',
            repeat: -1
        });

        marqueeContent.addEventListener('mouseenter', () => marqueeTween.pause());
        marqueeContent.addEventListener('mouseleave', () => marqueeTween.play());
    }
  }
}
