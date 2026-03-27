import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorLayoutComponent } from '../../shared/components/sector-layout.component';
import { SectorCategory, SectorItem, SectorTestimonial } from '../../shared/models/sector.models';

@Component({
  selector: 'app-global-food',
  standalone: true,
  imports: [CommonModule, SectorLayoutComponent],
  template: `
    <app-sector-layout
      [tag]="'Authentic K-Food'"
      [title]="'Global Food Distribution'"
      [subtitle]="'From premium Korean snacks to the finest ingredients – Aurora bridges the gastronomic gap with authentic tastes directly from the source.'"
      [heroImage]="'images/food.png'"
      [categories]="foodCategories"
      [items]="foodItems"
      [testimonials]="foodTestimonials"
    ></app-sector-layout>
  `
})
export class GlobalFoodComponent {
  foodCategories: SectorCategory[] = [
    { icon: 'fas fa-box-open', title: 'Premium Snacks', desc: 'A curated selection of the most popular and trendy Korean snacks.' },
    { icon: 'fas fa-wheat-awn', title: 'Fine Grains', desc: 'Premium rice and grains harvested from South Korea\'s fertile valleys.' },
    { icon: 'fas fa-flask', title: 'Secret Sauces', desc: 'Fermented pastes (Gochujang, Doenjang) with traditional depth of flavor.' },
    { icon: 'fas fa-ice-cream', title: 'Frozen Delights', desc: 'Instant K-food meals that retain authentic taste through rapid freezing.' }
  ];

  foodItems: SectorItem[] = [
    { image: 'images/food.png', title: 'Seoul Snack Box', desc: 'Our monthly box of surprise treats and trending candies.', tag: 'Popular' },
    { image: 'images/food.png', title: 'Organically Sourced Rice', desc: 'Triple-A grade short-grain rice for the perfect K-meal.', tag: 'Bestseller' },
    { image: 'images/food.png', title: 'Aged Gochujang', desc: 'Two-year sun-dried chili paste for authentic spicy depth.', tag: 'Artisan' }
  ];

  foodTestimonials: SectorTestimonial[] = [
    { name: 'Chef Mario Rossi', role: 'Restaurateur', text: 'The quality of the ingredients Aurora imports allows my kitchen to reproduce standard Korean dishes perfectly.' },
    { name: 'Jessica Tan', role: 'Home Cook', text: 'I love how fresh the snack box items are. It\'s like being back in Seoul for a moment.' }
  ];
}
