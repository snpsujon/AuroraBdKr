import { Component, signal, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  protected readonly title = signal('Aurora Swadesh AF');

  sliderImages = [
    'assets/sliderImage/1stslider.png',
    'assets/sliderImage/2ndslider.jpeg',
    'assets/sliderImage/3rdslider.jpeg'
  ];
  currentSlide = 0;
  private slideInterval: any;

  ngOnInit() {
    this.startSlider();
  }

  ngOnDestroy() {
    this.stopSlider();
  }

  startSlider() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopSlider() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.sliderImages.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.sliderImages.length) % this.sliderImages.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Reset interval when user manually navigates
    this.stopSlider();
    this.startSlider();
  }

  categories = [
    { name: 'Oil & Ghee', image: 'assets/featurecategory/1st.png' },
    { name: 'Organic', image: 'assets/featurecategory/2nd.jpg' },
    { name: 'Honey', image: 'assets/featurecategory/3rd.jpg' },
    { name: 'Dates', image: 'assets/featurecategory/4th.jpg' },
    { name: 'Spices', image: 'assets/featurecategory/5th.jpg' },
    { name: 'Nuts & Seeds', image: 'assets/featurecategory/6th.jpg' },
    { name: 'Beverage', image: 'assets/featurecategory/7th.jpg' },
    { name: 'Rice', image: 'assets/featurecategory/8th.jpg' },
    { name: 'Flours & Lentils', image: 'assets/featurecategory/9th.jpg' },
    { name: 'Functional Food', image: 'assets/featurecategory/10th.jpg' }
  ];

   topSellingProducts = [
    { id: 1, name: 'Deshi Mustard Oil 5 liter', price: 1470, oldPrice: 1550, discount: 80, image: 'assets/topselling/1st.jpg', badge: 'Best Selling' },
    { id: 2, name: 'Sundarban Honey 1kg', price: 2200, oldPrice: 2500, discount: 300, image: 'assets/topselling/2nd.jpg', badge: 'Offered Items' },
    { id: 3, name: 'Gawa Ghee 1kg', price: 1710, oldPrice: 1800, discount: 90, image: 'assets/topselling/3rd.jpg', badge: 'Best Selling' },
    { id: 4, name: 'Lachcha Semai 1kg', price: 1400, oldPrice: 1500, discount: 100, image: 'assets/topselling/4th.jpeg', badge: 'Best Selling' }
  ];


  honeyProducts = [
    { id: 5, name: 'Black Seed Honey 1kg', price: 1440, oldPrice: 1600, discount: '10%', image: 'assets/naturalhoney/1st.jpg', badge: 'Offered Item' },
    { id: 6, name: 'Crystal Honey 1kg', price: 1000, oldPrice: 1100, discount: '9%', image: 'assets/naturalhoney/2nd.jpg', badge: 'Save 9%' },
    { id: 7, name: 'Lichu Flower Honey 1kg', price: 1140, oldPrice: 1200, discount: '5%', image: 'assets/naturalhoney/3rd.jpg', badge: 'Save 5%' },
    { id: 8, name: 'African Organic Wild Honey 1kg', price: 2375, oldPrice: 2400, discount: '5%', image: 'assets/naturalhoney/4th.jpg', badge: 'Save 5%' },
    { id: 9, name: 'Sundarban Honey 1kg', price: 2200, oldPrice: 2500, discount: '12%', image: 'assets/naturalhoney/5th.jpg', badge: 'Offered Item' }
  ];

  premiumDates = [
    { id: 10, name: 'Egyptian Medjool Medium 1kg', price: '1,900', oldPrice: '2,000', discount: '6%', image: 'assets/premiumdates/1th.jpg', badge: 'Save 6%' },
    { id: 11, name: 'Egyptian Medjool Large 1kg', price: '2,090', oldPrice: '2,200', discount: '6%', image: 'assets/premiumdates/2nd.jpg', badge: 'Save 6%' },
    { id: 12, name: 'Ajwa Premium Dates Large 1kg', price: '2,090', oldPrice: '2,200', discount: '6%', image: 'assets/premiumdates/2nd.jpg', badge: 'Save 6%' },
    { id: 13, name: 'Sukkari Mufattal Malaki Dates 1kg', price: '1,425', oldPrice: '1,500', discount: '5%', image: 'assets/premiumdates/2nd.jpg', badge: 'Save 5%' },
    { id: 14, name: 'Egyptian Medjool Dates 1kg (Jumbo)', price: '2,375', oldPrice: '2,500', discount: '6%', image: 'assets/premiumdates/2nd.jpg', badge: 'Save 6%' }
  ];

  cookingEssentials = [
    { id: 15, name: 'Gawa Ghee 500gm', price: '855', oldPrice: '900', discount: '5%', image: 'assets/cookieessestials/1st.jpg', badge: '' },
    { id: 16, name: 'Deshi Mustard Oil 2 liter', price: '585', oldPrice: '620', discount: '6%', image: 'assets/cookieessestials/2nd.jpg', badge: '' },
    { id: 17, name: 'Masoor Dal 1 Kg', price: '160', oldPrice: '170', discount: '6%', image: 'assets/cookieessestials/3rd.jpg', badge: '' },
    { id: 18, name: 'Chili (Morich) Powder 500g', price: '380', oldPrice: '400', discount: '5%', image: 'assets/cookieessestials/4th.jpg', badge: '' },
    { id: 19, name: 'Shahi Masala Combo', price: '1,615', oldPrice: '1,700', discount: '5%', image: 'assets/cookieessestials/5th.jpg', badge: '' }
  ];

  justForYouProducts = [
    { id: 20, name: 'Egyptian Medjool Medium 1kg', price: '1,900', oldPrice: '2,000', discount: '5%', image: 'assets/justforyou/1st.jpg', badge: '' },
    { id: 21, name: 'Gawa Ghee 1kg', price: '1,710', oldPrice: '1,800', discount: '5%', image: 'assets/justforyou/2nd.jpg', badge: '' },
    { id: 22, name: 'Sundarban Honey 1kg', price: '2,200', oldPrice: '2,500', discount: '10%', image: 'assets/justforyou/3rd.jpg', badge: 'Offered Items' },
    { id: 23, name: 'Crystal Honey 1kg', price: '1,000', oldPrice: '1,100', discount: '9%', image: 'assets/justforyou/4th.jpg', badge: '' },
    { id: 24, name: 'African Organic Wild Honey 1kg', price: '2,375', oldPrice: '2,500', discount: '5%', image: 'assets/justforyou/5th.jpg', badge: '' }
  ];

  organicProducts = [
    { id: 10, name: 'African Organic Wild Honey 1kg', price: 2375, oldPrice: 2400, discount: '5%', image: 'assets/organic/1st.jpg', badge: 'Save 5%' },
    { id: 11, name: 'Organic Spirulina Powder 250 gm', price: 1140, oldPrice: 1200, discount: '5%', image: 'assets/organic/2nd.jpg', badge: 'New Arrival' },
    { id: 12, name: 'Ceylon Organic Coconut Milk (C) 400ml', price: 335, oldPrice: 350, discount: '4%', image: 'assets/organic/3rd.jpg', badge: 'New Arrival' },
    { id: 13, name: 'Ceylon Organic Coconut Sugar (SI) 200g', price: 650, oldPrice: 0, discount: '0%', image: 'assets/organic/4th.jpg', badge: 'Organic' },
    { id: 14, name: 'Discovery Organic Apple Cider Vinegar (500ml)', price: 710, oldPrice: 750, discount: '5%', image: 'assets/organic/5th.jpg', badge: 'Save 5%' }
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
    { name: 'Ghorer Bazar', image: 'assets/ourbrand/1st.png' },
    { name: 'Glarvest', image: 'assets/ourbrand/2nd.png' },
    { name: 'Khejuri', image: 'assets/ourbrand/3rd.png' },
    { name: 'Shosti', image: 'assets/ourbrand/4th.png' }
  ];

  ngAfterViewInit() {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      
      tl.from('header', { y: -50, opacity: 0 })
        .from('.container > div', { scale: 0.95, opacity: 0 }, '-=0.5')
        .from('h2', { x: -20, opacity: 0, stagger: 0.2 }, '-=0.3')
        .fromTo('.ghorer-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, clearProps: 'all' }, '-=0.5')
        .fromTo('.bg-white.group:not(.ghorer-card)', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1, clearProps: 'all' }, '-=0.8');
    });
  }
}
