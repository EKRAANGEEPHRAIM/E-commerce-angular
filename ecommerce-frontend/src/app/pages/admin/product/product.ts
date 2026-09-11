import { ProductService } from './../../../services/product/products';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductList } from './product-list/product-list';
import { ProductFilter } from './product-filter/product-filter';
import { ProductForm } from './product-form/product-form';

import { ProductModel } from '../../../models/product.model';
import { CategoryModel } from '../../../models/category.model';

import {
  createEmptyProductForm,
  ProductFormModel
} from '../../../models/product-form.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductList,
    ProductFilter,
    ProductForm
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  isSidePanelVisible = false;

  productList: ProductModel[] = [];

  categoryList: CategoryModel[] = [];

  filteredProductList: ProductModel[] = [];

  currentSearchTerm = '';

  currentCategoryId = 0;

  productObj: ProductFormModel =
    createEmptyProductForm();

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProducts();
  }

  // =========================
  // GET PRODUCTS
  // =========================

  getAllProducts() {

    this.productService.getAllProducts().subscribe({

      next: (res) => {

        this.productList = res.data;

        this.filteredProductList = [
          ...this.productList
        ];

      },

      error: (err) => {

        console.error(
          'Error loading products:',
          err
        );

      }

    });

  }

  // =========================
  // GET CATEGORIES
  // =========================

  getAllCategory() {

    this.productService.getCategory().subscribe({

      next: (res) => {

        this.categoryList = res.data;

      },

      error: (err) => {

        console.error(
          'Error loading categories:',
          err
        );

      }

    });

  }

  // =========================
  // FILTER
  // =========================

  filterProducts(
    searchTerm: string,
    categoryId: number
  ) {

    const search =
      searchTerm.toLowerCase().trim();

    this.filteredProductList =
      this.productList.filter(product => {

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

        return matchesSearch &&
               matchesCategory;

      });

  }

  // =========================
  // OPEN PANEL
  // =========================

  openSidePanel() {

    this.resetForm();

    this.isSidePanelVisible = true;

  }

  // =========================
  // CLOSE PANEL
  // =========================

  closeSidePanel() {

    this.isSidePanelVisible = false;

  }

  // =========================
  // RESET FORM
  // =========================

  resetForm() {

    this.productObj =
      createEmptyProductForm();

  }

  // =========================
  // SAVE
  // =========================

  onSaveProduct(form: ProductFormModel) {

    if (form.productId === 0) {

      const product: ProductModel = {
        ...form,
        createdDate: new Date()
      };

      this.productService
        .createProduct(product)
        .subscribe({

          next: (res) => {

            console.log(res.message);

            this.getAllProducts();
            this.resetForm();
            this.closeSidePanel();

          },

          error: (err) => {

            console.error(
              'Erreur lors de la création :',
              err
            );

          }

        });

    } else {

      const existingProduct =
        this.productList.find(
          product =>
            product.productId === form.productId
        );

      if (!existingProduct) {
        return;
      }

      const product: ProductModel = {
        ...form,
        createdDate:
          existingProduct.createdDate
      };

      this.productService
        .updateProduct(product)
        .subscribe({

          next: (res) => {

            console.log(res.message);

            this.getAllProducts();
            this.resetForm();
            this.closeSidePanel();

          },

          error: (err) => {

            console.error(
              'Erreur lors de la modification :',
              err
            );

          }

        });

    }

  }

  // =========================
  // EDIT
  // =========================

  onEditProduct(product: ProductModel) {

    this.productObj = {

      productId: product.productId,
      productSku: product.productSku,
      productName: product.productName,
      productPrice: product.productPrice,
      productShortName: product.productShortName,
      productDescription: product.productDescription,
      deliveryTimeSpan: product.deliveryTimeSpan,
      productImageUrl: product.productImageUrl,
      categoryId: product.categoryId

    };

    this.isSidePanelVisible = true;

  }

  // =========================
  // DELETE
  // =========================

  onDeleteProduct(productId: number) {

    const confirmDelete = confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmDelete) {
      return;
    }

    this.productService
      .deleteProduct(productId)
      .subscribe({

        next: (res) => {

          console.log(res.message);

          this.getAllProducts();

        },

        error: (err) => {

          console.error(
            'Erreur lors de la suppression :',
            err
          );

        }

      });

  }

  // =========================
  // SEARCH
  // =========================

  onSearchChange(searchTerm: string) {

    this.currentSearchTerm = searchTerm;

    this.filterProducts(
      this.currentSearchTerm,
      this.currentCategoryId
    );

  }

  // =========================
  // CATEGORY
  // =========================

  onCategoryChange(categoryId: number) {

    this.currentCategoryId = categoryId;

    this.filterProducts(
      this.currentSearchTerm,
      this.currentCategoryId
    );

  }

}