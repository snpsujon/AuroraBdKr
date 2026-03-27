import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorLayoutComponent } from '../../shared/components/sector-layout.component';
import { SectorCategory, SectorItem, SectorTestimonial } from '../../shared/models/sector.models';

@Component({
  selector: 'app-skincare',
  standalone: true,
  imports: [CommonModule, SectorLayoutComponent],
  template: `
    <app-sector-layout
      [tag]="'K-Beauty Excellence'"
      [title]="'Premium Korean Skincare'"
      [subtitle]="'Discover the secret to ageless beauty with our curated selection of high-performance dermatology and clinical skincare products directly from Seoul.'"
      [heroImage]="'images/skincare.png'"
      [categories]="skincareCategories"
      [items]="skincareItems"
      [testimonials]="skincareTestimonials"
    ></app-sector-layout>
  `
})
export class SkincareComponent {
  skincareCategories: SectorCategory[] = [
    { icon: 'fas fa-vial', title: 'Clinical Serums', desc: 'Advanced formulas targeting specific skin concerns with precision.' },
    { icon: 'fas fa-leaf', title: 'Organic Range', desc: 'Natural ingredients harvested from the pristine Jeju Island.' },
    { icon: 'fas fa-sun', title: 'UV Protection', desc: 'World-leading sunscreens that provide invisible yet powerful defense.' },
    { icon: 'fas fa-sparkles', title: 'Glass Skin Kits', desc: 'Complete routines to achieve the iconic Korean luminous complexion.' }
  ];

  skincareItems: SectorItem[] = [
    { image: 'images/skincare.png', title: 'Aurora Glow Serum', desc: 'Our signature serum that revitalizes tired skin overnight.', tag: 'Bestseller' },
    { image: 'images/telecom.png', title: 'Jeju Hydra Mist', desc: 'Instant hydration with volcanically filtered mineral water.', tag: 'New' },
    { image: 'images/skincare.png', title: 'Age-Defy Cream', desc: 'Clinical strength anti-aging formula using fermented ginseng.', tag: 'Elite' }
  ];

  skincareTestimonials: SectorTestimonial[] = [
    { name: 'Elena Petrova', role: 'Skincare Influencer', text: 'The results from the Aurora Glow line are unlike anything I have seen in Western pharmacy brands.' },
    { name: 'Dr. Kim Min-ho', role: 'Dermatologist', text: 'I recommend Aurora products to my patients who need post-procedural recovery and deep hydration.' }
  ];
}
