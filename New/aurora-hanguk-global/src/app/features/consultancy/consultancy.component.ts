import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorLayoutComponent } from '../../shared/components/sector-layout.component';
import { SectorCategory, SectorItem, SectorTestimonial } from '../../shared/models/sector.models';

@Component({
  selector: 'app-consultancy',
  standalone: true,
  imports: [CommonModule, SectorLayoutComponent],
  template: `
    <app-sector-layout
      [tag]="'Strategic Growth'"
      [title]="'Global Strategy & Consultancy'"
      [subtitle]="'Expert guidance for international expansion, Korean market entry, and elite academic planning for the next generation.' "
      [heroImage]="'images/consultancy.png'"
      [categories]="consultancyCategories"
      [items]="consultancyItems"
      [testimonials]="consultancyTestimonials"
    ></app-sector-layout>
  `
})
export class ConsultancyComponent {
  consultancyCategories: SectorCategory[] = [
    { icon: 'fas fa-graduation-cap', title: 'Study Abroad', desc: 'Personalized academic planning for prestige SKY universities.' },
    { icon: 'fas fa-landmark', title: 'Market Entry', desc: 'Expert strategy for global businesses entering the South Korean market.' },
    { icon: 'fas fa-scale-balanced', title: 'Legal & Compliance', desc: 'Navigating Korean business regulations with local expertise.' },
    { icon: 'fas fa-users-gear', title: 'Culture Training', desc: 'Helping global teams understand the unique Korean corporate mindset.' }
  ];

  consultancyItems: SectorItem[] = [
    { image: 'images/consultancy.png', title: 'SKY Prep Program', desc: 'Intensive guide for international students aiming for elite Korean colleges.', tag: 'Academic' },
    { image: 'images/consultancy.png', title: 'APAC Expansion Strategy', desc: 'Roadmap for scaling your business across Asia using Seoul as a hub.', tag: 'Corporate' },
    { image: 'images/consultancy.png', title: 'Business Visa Assist', desc: 'End-to-end management of complicated D-8/D-9 visa processes.', tag: 'Operational' }
  ];

  consultancyTestimonials: SectorTestimonial[] = [
    { name: 'Dr. James Lim', role: 'Education Consultant', text: 'Their success rate for international student placement into SNU/Yonsei is second to none.' },
    { name: 'M. Chevalier', role: 'COO, Lumière Global', text: 'The Korean market is unique, and Aurora provided the cultural bridge we needed for our launch.' }
  ];
}
