import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorLayoutComponent } from '../../shared/components/sector-layout.component';
import { SectorCategory, SectorItem, SectorTestimonial } from '../../shared/models/sector.models';

@Component({
  selector: 'app-real-estate',
  standalone: true,
  imports: [CommonModule, SectorLayoutComponent],
  template: `
    <app-sector-layout
      [tag]="'Luxury Living'"
      [title]="'Premium Real Estate'"
      [subtitle]="realEstateSubtitle"
      [heroImage]="'images/realestate.png'"
      [categories]="realEstateCategories"
      [items]="realEstateItems"
      [testimonials]="realEstateTestimonials"
    ></app-sector-layout>
  `
})
export class RealEstateComponent {
  realEstateSubtitle = "Bespoke living solutions in South Korea's most elite neighborhoods. We find the most stable and luxury apartments for global residents and investors.";
  realEstateCategories: SectorCategory[] = [
    { icon: 'fas fa-building', title: 'Gangnam Elite', desc: 'Secure, high-tech apartments in the heart of Seoul\'s luxury district.' },
    { icon: 'fas fa-mountain-sun', title: 'Songdo Global', desc: 'Futuristic living in Korea\'s premier smart-city with global amenities.' },
    { icon: 'fas fa-hotel', title: 'Serviced Stays', desc: 'Monthly premium penthouse stays for executives and digital nomads.' },
    { icon: 'fas fa-chart-line', title: 'Asset Invest', desc: 'Strategic residential investment opportunities in growing Korean hubs.' }
  ];

  realEstateItems: SectorItem[] = [
    { image: 'images/realestate.png', title: 'Apt. Cloud Nine', desc: 'A 50th floor Gangnam penthouse with 360-degree Seoul views.', tag: 'Elite' },
    { image: 'images/realestate.png', title: 'Songdo Tech Park Res.', desc: 'Fully automated IoT smart home in the center of Songdo City.', tag: 'Smart Living' },
    { image: 'images/realestate.png', title: 'Jeju Ocean Villa', desc: 'A luxury retreat on Jeju Island for long-term remote workers.', tag: 'Retreat' }
  ];

  realEstateTestimonials: SectorTestimonial[] = [
    { name: 'John Smith', role: 'Global Tech Exec', text: 'Finding a home in Korea can be intimidating, but Aurora handled everything from legality to the internet setup.' },
    { name: 'Dr. Anna Muller', role: 'Investor', text: 'The capital growth on the properties Aurora recommended in Songdo has exceeded all my expectations.' }
  ];
}
