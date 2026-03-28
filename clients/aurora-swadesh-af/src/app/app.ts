import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('Aurora Swadesh AF');

  categories = [
    { name: 'Oil & Ghee', icon: '🛢️' },
    { name: 'Organic', icon: '🌿' },
    { name: 'Honey', icon: '🍯' },
    { name: 'Dates', icon: '🌴' },
    { name: 'Spices', icon: '🥣' },
    { name: 'Nuts & Seeds', icon: '🥜' },
    { name: 'Beverage', icon: '☕' },
    { name: 'Rice', icon: '🌾' },
    { name: 'Flours & Lentils', icon: '🍲' },
    { name: 'Functional Food', icon: '🛒' }
  ];

  topSellingProducts = [
    { id: 1, name: 'Deshi Mustard Oil 5 liter', price: 1470, oldPrice: 1550, discount: 80, image: 'https://placehold.co/300x400/fff/f37021?text=Mustard+Oil', badge: 'Best Selling' },
    { id: 2, name: 'Sundarban Honey 1kg', price: 2200, oldPrice: 2500, discount: 300, image: 'https://placehold.co/300x400/fff/f37021?text=Honey', badge: 'Offered Items' },
    { id: 3, name: 'Gawa Ghee 1kg', price: 1710, oldPrice: 1800, discount: 90, image: 'https://placehold.co/300x400/fff/f37021?text=Gawa+Ghee', badge: 'Best Selling' },
    { id: 4, name: 'Lachcha Semai 1kg', price: 1400, oldPrice: 1500, discount: 100, image: 'https://placehold.co/300x400/fff/f37021?text=Lachcha+Semai', badge: 'Best Selling' }
  ];

  honeyProducts = [
    { id: 5, name: 'Black Seed Honey 1kg', price: 1440, oldPrice: 1600, discount: '10%', image: 'https://placehold.co/300x400/fff/f37021?text=Black+Seed+Honey', badge: 'Offered Item' },
    { id: 6, name: 'Crystal Honey 1kg', price: 1000, oldPrice: 1100, discount: '9%', image: 'https://placehold.co/300x400/fff/f37021?text=Crystal+Honey', badge: 'Save 9%' },
    { id: 7, name: 'Lichu Flower Honey 1kg', price: 1140, oldPrice: 1200, discount: '5%', image: 'https://placehold.co/300x400/fff/f37021?text=Lichu+Honey', badge: 'Save 5%' },
    { id: 8, name: 'African Organic Wild Honey 1kg', price: 2375, oldPrice: 2400, discount: '5%', image: 'https://placehold.co/300x400/fff/f37021?text=African+Honey', badge: 'Save 5%' },
    { id: 9, name: 'Sundarban Honey 1kg', price: 2200, oldPrice: 2500, discount: '12%', image: 'https://placehold.co/300x400/fff/f37021?text=Sundarban+Honey', badge: 'Offered Item' }
  ];

  organicProducts = [
    { id: 10, name: 'African Organic Wild Honey 1kg', price: 2375, oldPrice: 2400, discount: '5%', image: 'https://placehold.co/300x400/fff/f37021?text=Wild+Honey', badge: 'Save 5%' },
    { id: 11, name: 'Organic Spirulina Powder 250 gm', price: 1140, oldPrice: 1200, discount: '5%', image: 'https://placehold.co/300x400/fff/f37021?text=Spirulina', badge: 'New Arrival' },
    { id: 12, name: 'Ceylon Organic Coconut Milk (C) 400ml', price: 335, oldPrice: 350, discount: '4%', image: 'https://placehold.co/300x400/fff/f37021?text=Coconut+Milk', badge: 'New Arrival' },
    { id: 13, name: 'Ceylon Organic Coconut Sugar (SI) 200g', price: 650, oldPrice: 0, discount: '0%', image: 'https://placehold.co/300x400/fff/f37021?text=Coconut+Sugar', badge: 'Organic' },
    { id: 14, name: 'Discovery Organic Apple Cider Vinegar (500ml)', price: 710, oldPrice: 750, discount: '5%', image: 'https://placehold.co/300x400/fff/f37021?text=ACV', badge: 'Save 5%' }
  ];

  testimonials = [
    { 
       name: 'Fariha Akter Tumpa', 
       role: 'Entrepreneur', 
       comment: 'এই অবিশ্বাস্য জগতে আস্থাশীল একটি প্রতিষ্ঠান ঘরের বাজার।', 
       avatar: 'https://i.pravatar.cc/150?u=fariha' 
    },
    { 
       name: 'Shahriar Khan Abir', 
       role: 'Service Holder', 
       comment: 'I don\'t like ghee, but my father really loves it. So I bought some ghee for him. He said this ghee is the best he has ever had', 
       avatar: 'https://i.pravatar.cc/150?u=abir' 
    },
    { 
       name: 'Ahmed Al Kamran', 
       role: 'Student', 
       comment: 'আমি একজন ঘরের বাজারের নিয়মিত কাস্টমার। আমি শুধু ঘরের বাজার থেকে এই যে প্রোডাক্ট গুলো কিনি এমন নয়। আমি অনেক জায়গা থেকে এই প্রোডাক্ট গুলো কিনেছি। তবে আমার মতে ঘরের বাজার সেরা।', 
       avatar: 'https://i.pravatar.cc/150?u=ahmed' 
    }
  ];

  brandLogos = [
    { name: 'GLARVEST', image: 'https://placehold.co/150x80/fff/111?text=GLARVEST' },
    { name: 'Khejuri', image: 'https://placehold.co/150x80/fff/111?text=Khejuri' },
    { name: 'Shosti', image: 'https://placehold.co/150x80/fff/111?text=Shosti' },
    { name: 'Honeyraj', image: 'https://placehold.co/150x80/fff/111?text=Honeyraj' }
  ];

  ngAfterViewInit() {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      
      tl.from('header', { y: -50, opacity: 0 })
        .from('.container > div', { scale: 0.95, opacity: 0 }, '-=0.5')
        .from('h2', { x: -20, opacity: 0, stagger: 0.2 }, '-=0.3')
        .from('.ghorer-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=0.5')
        .from('.bg-white.group', { y: 30, opacity: 0, stagger: 0.1, duration: 1 }, '-=0.8');
    });
  }
}
