import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/orders';  // Adjust URL as needed

  constructor(private http: HttpClient) {}

  getOrdersByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }
}
