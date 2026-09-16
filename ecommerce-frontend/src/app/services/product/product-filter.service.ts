import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  filter(
    products: ProductModel[],
    searchTerm: string,
    categoryId: number
  ): ProductModel[] {

    const search = searchTerm
      .toLowerCase()
      .trim();

    return products.filter(product => {

      const matchesSearch =
        product.productName
          .toLowerCase()
          .includes(search) ||
        product.productSku
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        categoryId === 0 ||
        product.categoryId === categoryId;

      return matchesSearch && matchesCategory;
    });
  }
}