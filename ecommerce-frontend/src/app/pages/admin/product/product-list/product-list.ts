import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  @Input() products: ProductModel[] = [];

  @Output() edit = new EventEmitter<any>();

  @Output() delete = new EventEmitter<ProductModel>();

  onEdit(product: ProductModel) {
    this.edit.emit(product);
  }

  onDelete(product: ProductModel) {
    this.delete.emit(product);
  }
}