import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-products',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {
    name: '',
    category: '',
    price: 0,
    review: '',
    offers: '',
    image: ''
  };
  imagePreview: string | ArrayBuffer | null = null;  // For previewing uploaded images

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  // For handling new product image upload
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result || null;
        this.newProduct.image = this.imagePreview;
      };
      reader.readAsDataURL(file);
    }
  }

  // For editing existing product image upload
  onImageChangeForProduct(event: any, product: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        product.image = e.target?.result || null;  // Save the updated image to the product object
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = { name: '', category: '', price: 0, review: '', offers: '', image: '' };
      this.imagePreview = null;  // Clear the image preview after adding the product
    });
  }

  editProduct(product: any) {
    product.editing = true;
  }

  saveProduct(product: any) {
    product.editing = false;
    this.productService.updateProduct(product.id, product).subscribe(() => {
      this.loadProducts();
    });
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }
}
