import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryModel } from '../../../../models/category.model';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css'
})
export class ProductFilter {

  @Input() categories: CategoryModel[] = [];

  @Output() searchChange = new EventEmitter<string>();

  @Output() categoryChange = new EventEmitter<number>();

  searchTerm = '';

  selectedCategoryId = 0;

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }

  onCategoryChange() {
    this.categoryChange.emit(this.selectedCategoryId);
  }
}