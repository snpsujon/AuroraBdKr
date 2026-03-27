import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorLayoutComponent } from '../../shared/components/sector-layout.component';
import { SectorCategory, SectorItem, SectorTestimonial } from '../../shared/models/sector.models';

@Component({
  selector: 'app-telecom-travel',
  standalone: true,
  imports: [CommonModule, SectorLayoutComponent],
  template: `
    <app-sector-layout
      [tag]="'Telecom & Travel'"
      [title]="'Global Connectivity & Elite Travel'"
      [subtitle]="'Stay connected across the globe with high-speed networks and premium international travel experiences tailored for the elite traveler.'"
      [heroImage]="'images/telecom.png'"
      [categories]="telecomCategories"
      [items]="telecomItems"
      [testimonials]="telecomTestimonials"
    ></app-sector-layout>
  `
})
export class TelecomTravelComponent {
  telecomCategories: SectorCategory[] = [
    { icon: 'fas fa-sim-card', title: 'Global SIM', desc: 'Unlimited data & crystal clear voice across 150+ countries with no roaming fees.' },
    { icon: 'fas fa-plane-departure', title: 'Elite Travel', desc: 'Curated luxury travel packages focusing on Korea and global premium destinations.' },
    { icon: 'fas fa-shuttle-van', title: 'VIP Transport', desc: 'Secure and stable airport transfers and private chauffeur services for global executives.' },
    { icon: 'fas fa-wifi', title: 'Hyper Connectivity', desc: 'Deploying advanced 5G networks for high-demand business environments.' }
  ];

  telecomItems: SectorItem[] = [
    { image: 'images/telecom.png', title: 'WorldLink SIM', desc: 'Providing ultra-fast connectivity with zero roaming fees. Ideal for digital nomads.', tag: 'Popular' },
    { image: 'images/skincare.png', title: 'Seoul Escape 3.0', desc: '7-day premium experience through the heart of high-tech Korea.', tag: 'Featured' },
    { image: 'images/consultancy.png', title: 'Global Roaming Plus', desc: 'Enterprise-grade roaming solutions for corporate teams navigating the APAC region.', tag: 'Corporate' }
  ];

  telecomTestimonials: SectorTestimonial[] = [
    { name: 'David Park', role: 'CEO, TechNexus', text: 'Aurora provided the most stable connectivity I have ever used during my 3-month business trip to Seoul.' },
    { name: 'Sarah Lee', role: 'Luxury Traveler', text: 'The travel concierge was exceptional. They managed every detail of our family trip with unmatched precision.' }
  ];
}
