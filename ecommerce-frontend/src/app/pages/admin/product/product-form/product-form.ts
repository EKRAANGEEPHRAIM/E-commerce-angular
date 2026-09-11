import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../../../models/product.model';
import { CategoryModel } from '../../../../models/category.model';
import { createEmptyProductForm, ProductFormModel } from '../../../../models/product-form.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {

  @Input() product: ProductFormModel = createEmptyProductForm()

  @Input() categories: CategoryModel[] = [];

  @Output() save = new EventEmitter<ProductFormModel>();

  @Output() close = new EventEmitter<void>();

  @Output() reset = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.product);
  }

  onClose() {
    this.close.emit();
  }

  onReset() {
    this.reset.emit();
  }
}