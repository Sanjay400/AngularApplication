import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/products'; // Assuming JSON server
  private cartUrl = 'http://localhost:5000/cart'; // Assuming separate URL for cart

  constructor(private http: HttpClient) {}

  // Fetch products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add product to cart
  addToCart(product: any): Observable<any> {
    return this.http.post(this.cartUrl, product);
  }
}
