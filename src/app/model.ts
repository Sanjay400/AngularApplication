// models.ts

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    review: string;
    offers: string;
    image: string;
    quantity?: number;  // Optional
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    cart: Product[];
    orderhistory: any[];  // Adjust as needed
  }
  