import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

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

  @Output() edit = new EventEmitter<ProductModel>();

  @Output() delete = new EventEmitter<ProductModel>();

  onEdit(product: ProductModel): void {
    this.edit.emit(product);
  }

  onDelete(product: ProductModel): void {
    this.delete.emit(product);
  }
}