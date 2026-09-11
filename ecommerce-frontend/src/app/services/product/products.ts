import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { ProductModel } from '../../models/product.model';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // =========================
  // CATEGORIES
  // =========================

  private categories: CategoryModel[] = []


  // =========================
  // PRODUCTS
  // =========================

  private products: ProductModel[] = []
  


  // =========================
  // GET CATEGORIES
  // =========================

  getCategory(): Observable<ApiResponse<CategoryModel[]>> {
  return of({
    data: this.categories
  });
}


  // =========================
  // GET PRODUCTS
  // =========================

  getAllProducts(): Observable<ApiResponse<ProductModel[]>> {
  return of({
    data: this.products
  });
}


  // =========================
  // CREATE PRODUCT
  // =========================

createProduct(
  product: ProductModel
): Observable<ApiResponse<ProductModel>> {

  const newProduct: ProductModel = {
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

  updateProduct(
  product: ProductModel
): Observable<ApiResponse<ProductModel>> {

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

  deleteProduct(productId: number): Observable<{
    message: string
  }> {

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