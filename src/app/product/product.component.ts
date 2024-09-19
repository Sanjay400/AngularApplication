import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];  // All products
  filteredProducts: any[] = [];  // Filtered products for display
  categories: string[] = [];  // Categories for filtering
  selectedCategory: string = '';  // Selected filter category
  searchText: string = '';  // Search text input

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch products from db.json or API
    this.http.get<any[]>('http://localhost:5000/products').subscribe(data => {
      this.products = data.map(product => ({ ...product, isInCart: false }));
      this.filteredProducts = [...this.products];
      this.categories = [...new Set(data.map(product => product.category))]; // Get unique categories
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      return (
        (this.selectedCategory === '' || product.category === this.selectedCategory) &&
        (this.searchText === '' || product.name.toLowerCase().includes(this.searchText.toLowerCase()))
      );
    });
  }

  addToCart(product: any): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser.id;

    if (userId) {
      this.http.get<any>(`http://localhost:5000/users/${userId}`).subscribe(user => {
        if (user) {
          const cart = user.cart || [];
          const productExists = cart.find((item: any) => item.id === product.id);

          if (!productExists) {
            cart.push(product);
            this.http.put(`http://localhost:5000/users/${userId}`, { ...user, cart }).subscribe(() => {
              alert('Product added to cart!');
              product.isInCart = true;  // Set flag to true
            });
          } else {
            alert('Product is already in your cart.');
            product.isInCart = true;  // If already in cart, set the flag to true
          }
        } else {
          alert('User not found');
        }
      });
    } else {
      alert('Please log in to add products to your cart.');
    }
  }
}
