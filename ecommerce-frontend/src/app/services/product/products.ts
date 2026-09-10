import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // =========================
  // CATEGORIES
  // =========================

  private categories = [
    {
      categoryId: 1,
      categoryName: 'Electronics'
    },
    {
      categoryId: 2,
      categoryName: 'Clothing'
    },
    {
      categoryId: 3,
      categoryName: 'Books'
    },
    {
      categoryId: 4,
      categoryName: 'Home'
    }
  ];


  // =========================
  // PRODUCTS
  // =========================

  private products: any[] = [
    {
      productId: 1,
      productSku: 'ELEC-001',
      productName: 'Wireless Headphones',
      productShortName: 'Headphones',
      productPrice: 59.99,
      productDescription: 'Wireless Bluetooth headphones',
      createdDate: new Date(),
      deliveryTimeSpan: '3-5 days',
      productImageUrl: '',
      categoryId: 1
    },

    {
      productId: 2,
      productSku: 'BOOK-001',
      productName: 'JavaScript Guide',
      productShortName: 'JS Guide',
      productPrice: 29.99,
      productDescription: 'Complete JavaScript guide for beginners',
      createdDate: new Date(),
      deliveryTimeSpan: '2-4 days',
      productImageUrl: '',
      categoryId: 3
    }
  ];


  // =========================
  // GET CATEGORIES
  // =========================

  getCategory(): Observable<any> {

    return of({
      data: this.categories
    });

  }


  // =========================
  // GET PRODUCTS
  // =========================

  getAllProducts(): Observable<any> {

    return of({
      data: this.products
    });

  }


  // =========================
  // CREATE PRODUCT
  // =========================

  createProduct(product: any): Observable<any> {

    const newProduct = {
      ...product,

      productId: this.getNextProductId(),

      createdDate: new Date()
    };

    this.products.push(newProduct);

    return of({
      data: newProduct,
      message: 'Product created successfully'
    });

  }


  // =========================
  // UPDATE PRODUCT
  // =========================

  updateProduct(product: any): Observable<any> {

    const index = this.products.findIndex(
      p => p.productId === product.productId
    );

    if (index !== -1) {

      this.products[index] = {
        ...product
      };

    }

    return of({
      data: product,
      message: 'Product updated successfully'
    });

  }


  // =========================
  // DELETE PRODUCT
  // =========================

  deleteProduct(productId: number): Observable<any> {

    this.products = this.products.filter(
      p => p.productId !== productId
    );

    return of({
      message: 'Product deleted successfully'
    });

  }


  // =========================
  // GENERATE ID
  // =========================

  private getNextProductId(): number {

    if (this.products.length === 0) {
      return 1;
    }

    return Math.max(
      ...this.products.map(p => p.productId)
    ) + 1;

  }

}