import { ProductService } from './../../../services/product/products';
import { CommonModule } from '@angular/common';
import { Component, OnInit , signal , computed , effect } from '@angular/core';


import { ProductList } from './product-list/product-list';
import { ProductFilter } from './product-filter/product-filter';
import { ProductForm } from './product-form/product-form';

import { ProductModel } from '../../../models/product.model';
import { CategoryModel } from '../../../models/category.model';

import {
  createEmptyProductForm,
  ProductFormModel
} from '../../../models/product-form.model';
import { ProductFilterService } from '../../../services/product/product-filter.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    
    ProductList,
    ProductFilter,
    ProductForm
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  isSidePanelVisible = signal(false);
  isLoading = false;
  errorMessage = signal('');
  successMessage = signal('');

  productList = signal<ProductModel[]>([]);

  categoryList: CategoryModel[] = [];

 
  filteredProductList = computed(() => {
  return this.productFilterService.filter(
    this.productList(),
    this.currentSearchTerm(),
    this.currentCategoryId()
  );
});

  currentSearchTerm = signal('');

  currentCategoryId = signal(0);

  productObj: ProductFormModel =
    createEmptyProductForm();

  constructor(
  private productService: ProductService,
  private productFilterService: ProductFilterService
) {
  effect(() => {
    console.log('Recherche :', this.currentSearchTerm());
    console.log('Catégorie :', this.currentCategoryId());
    console.log('Nombre de produits :', this.productList().length);
  });
}

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProducts();
  }

  // =========================
  // GET PRODUCTS
  // =========================

getAllProducts(): void {
  this.isLoading = true;
  this.errorMessage.set('');

  this.productService.getAllProducts().subscribe({
    next: (res) => {
      this.productList.set(res.data);
      this.isLoading = false;
    },

    error: (err) => {
      console.error('Error loading products:', err);

      this.showErrorMessage(
        'Impossible de charger les produits.'
      );

      this.isLoading = false;
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

        this.showErrorMessage("Impossible de charger les catégories.")

      }

    });

  }



  // =========================
  // OPEN PANEL
  // =========================

  openSidePanel() {

    this.resetForm();

    this.isSidePanelVisible.set(true);

  }

  // =========================
  // CLOSE PANEL
  // =========================

  closeSidePanel() {

    this.isSidePanelVisible.set(false);

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

onSaveProduct(form: ProductFormModel): void {
  if (form.productId === 0) {
    this.createProduct(form);
    return;
  }

  this.updateProduct(form);
}

  // =========================
  // EDIT
  // =========================

 onEditProduct(product: ProductModel): void {
  const {
    productId,
    productSku,
    productName,
    productPrice,
    productShortName,
    productDescription,
    deliveryTimeSpan,
    productImageUrl,
    categoryId
  } = product;

  this.productObj = {
    productId,
    productSku,
    productName,
    productPrice,
    productShortName,
    productDescription,
    deliveryTimeSpan,
    productImageUrl,
    categoryId
  };

  this.isSidePanelVisible.set(true);
}

  // =========================
  // DELETE
  // =========================

onDeleteProduct(product: ProductModel): void {

  const confirmDelete = confirm(
    `Are you sure you want to delete "${product.productName}"?`
  );

  if (!confirmDelete) {
    return;
  }

  this.productService
    .deleteProduct(product.productId)
    .subscribe({

      next: (res) => {
      this.showSuccessMessage(
          res.message ?? 'Produit supprimé avec succès.'
        ); 

        this.getAllProducts();
      },

      error: (err) => {
      this.showErrorMessage("Une erreur est survenue lors de la suppression")
      }

    });
}

  // =========================
  // SEARCH
  // =========================

 onSearchChange(searchTerm: string): void {
  this.currentSearchTerm.set(searchTerm);
}

  // =========================
  // CATEGORY
  // =========================

onCategoryChange(categoryId: number): void {
  this.currentCategoryId.set(categoryId);
}





private createProduct(form: ProductFormModel): void {
  const product: ProductModel = {
    ...form,
    createdDate: new Date()
  };

  this.productService.createProduct(product).subscribe({
    next: (res) => {
      console.log(res.message);

    this.showSuccessMessage('Produit créé avec succès.');


      this.afterSave();
    },
    error: (err) => {
this.showErrorMessage("Une erreur est survenue lors de la création")
    }
  });
}







private updateProduct(form: ProductFormModel): void {
  const existingProduct = this.productList().find(
    product => product.productId === form.productId
  );

  if (!existingProduct) {
    console.error('Produit introuvable');
    return;
  }

  const product: ProductModel = {
    ...form,
    createdDate: existingProduct.createdDate
  };

  this.productService.updateProduct(product).subscribe({
    next: (res) => {
            this.showSuccessMessage(
        res.message ?? 'Produit modifié avec succès.'
      );

    

      this.afterSave();
    },
    error: (err) => {
      console.error(
        'Erreur lors de la modification :',
        err
      );
    }
  });
}



private afterSave(): void {
  this.getAllProducts();
  this.resetForm();
  this.closeSidePanel();
}


private showSuccessMessage(message: string): void {
  this.successMessage.set(message);

  setTimeout(() => {
    this.successMessage.set('');
  }, 5000);
}



private showErrorMessage(message: string): void {
  this.errorMessage.set(message);

  setTimeout(() => {
    this.errorMessage.set('');
  }, 5000);
}
}