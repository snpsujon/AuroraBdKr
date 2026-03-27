import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeaturedCategoriesComponent } from './components/featured-categories/featured-categories.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { BeforeAfterComponent } from './components/before-after/before-after.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { InstagramFeedComponent } from './components/instagram-feed/instagram-feed.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent,
    HeroSectionComponent,
    FeaturedCategoriesComponent,
    BestSellersComponent,
    WhyChooseUsComponent,
    BeforeAfterComponent,
    TestimonialsComponent,
    InstagramFeedComponent,
    NewsletterComponent,
    FooterComponent
  ],
  template: `
    <app-navbar></app-navbar>

    <main class="overflow-x-hidden">
      <app-hero-section></app-hero-section>
      
      <app-featured-categories></app-featured-categories>
      
      <app-best-sellers [products]="products"></app-best-sellers>
      
      <app-why-choose-us></app-why-choose-us>
      
      <app-before-after></app-before-after>
      
      <app-testimonials></app-testimonials>
      
      <app-instagram-feed></app-instagram-feed>
      
      <app-newsletter></app-newsletter>
      
      <app-footer></app-footer>
    </main>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('API connection failed', err);
        this.errorMessage = 'Connection lost';
      }
    });
  }
}
