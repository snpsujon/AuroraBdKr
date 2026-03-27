import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  items = computed(() => this.cartItems());
  totalCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  subTotal = computed(() => this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  addToCart(item: CartItem) {
    this.cartItems.update(prev => {
      const existing = prev.find(i => i.productId === item.productId);
      if (existing) {
        return prev.map(i => i.productId === item.productId 
          ? { ...i, quantity: i.quantity + item.quantity } 
          : i);
      }
      return [...prev, item];
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update(prev => prev.filter(i => i.productId !== productId));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
