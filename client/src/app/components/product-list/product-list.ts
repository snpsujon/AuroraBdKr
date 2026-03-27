import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-container">
      <header class="header">
        <h1>Aurora Skin Care</h1>
        <p>Premium products for your natural glow</p>
      </header>
      
      <div class="product-grid" *ngIf="products.length > 0; else stateTemplate">
        <div class="product-card" *ngFor="let product of products">
          <div class="image-wrapper">
            <img [src]="product.imageUrl || 'assets/placeholder-skin.jpg'" [alt]="product.name">
            <div class="category-badge">{{product.category}}</div>
          </div>
          <div class="product-info">
            <h3>{{product.name}}</h3>
            <p class="description">{{product.description}}</p>
            <div class="footer">
              <span class="price">\${{product.price}}</span>
              <button class="add-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <ng-template #stateTemplate>
        <div class="loader-container" *ngIf="!errorMessage">
          <div class="loader"></div>
          <p>Discovering premium products...</p>
        </div>
        <div class="error-container" *ngIf="errorMessage">
          <p class="error-msg">{{errorMessage}}</p>
          <button (click)="ngOnInit()" class="retry-btn">Retry Connection</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: `
    .product-container {
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;
      font-family: 'Outfit', sans-serif;
    }
    .header {
      text-align: center;
      margin-bottom: 50px;
    }
    .header h1 {
      font-size: 3rem;
      color: #2d3436;
      margin-bottom: 10px;
      font-weight: 700;
      letter-spacing: -1px;
    }
    .header p {
      color: #636e72;
      font-size: 1.2rem;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
    }
    .product-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    .product-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .image-wrapper {
      position: relative;
      height: 300px;
      overflow: hidden;
    }
    .image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .product-card:hover img {
      transform: scale(1.1);
    }
    .category-badge {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(255, 255, 255, 0.9);
      padding: 5px 15px;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #ff7675;
      backdrop-filter: blur(5px);
    }
    .product-info {
      padding: 25px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .product-info h3 {
      font-size: 1.4rem;
      margin-bottom: 10px;
      color: #2d3436;
    }
    .description {
      color: #636e72;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 20px;
      flex-grow: 1;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }
    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ff7675;
    }
    .add-btn {
      background: #2d3436;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .add-btn:hover {
      background: #ff7675;
    }
    .loader-container, .error-container {
      text-align: center;
      padding: 100px 0;
    }
    .loader {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #ff7675;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 2s linear infinite;
      margin: 0 auto 20px;
    }
    .error-msg {
      color: #ff7675;
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
    .retry-btn {
      background: #ff7675;
      color: white;
      border: none;
      padding: 10px 30px;
      border-radius: 50px;
      cursor: pointer;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
})
export class ProductList implements OnInit {
  products: Product[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        if (data.length === 0) {
          this.errorMessage = 'No products found in the database.';
        }
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.errorMessage = 'Could not connect to the beauty vault. Please check if the backend is running.';
      }
    });
  }
}
