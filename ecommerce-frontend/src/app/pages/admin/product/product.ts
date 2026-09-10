import { ProductService } from './../../../services/product/products';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  isSidePanelVisible: boolean = false;

  productList: any[] = [];

  categoryList: any[] = [];

  // Produit utilisé par le formulaire
  productObj: any = {
    productId: 0,
    productSku: '',
    productName: '',
    productPrice: 0,
    productShortName: '',
    productDescription: '',
    createdDate: new Date(),
    deliveryTimeSpan: '',
    productImageUrl: '',
    categoryId: 0
  };


  constructor(
    private productService: ProductService
  ) {}


  // =========================
  // INITIALISATION
  // =========================

  ngOnInit(): void {

    this.getAllCategory();

    this.getAllProducts();

  }


  // =========================
  // GET PRODUCTS
  // =========================

  getAllProducts() {

    this.productService.getAllProducts().subscribe({

      next: (res: any) => {

        console.log('Products:', res.data);

        this.productList = res.data;

      },

      error: (err) => {

        console.error('Error loading products:', err);

      }

    });

  }


  // =========================
  // GET CATEGORIES
  // =========================

  getAllCategory() {

    this.productService.getCategory().subscribe({

      next: (res: any) => {

        console.log('Categories:', res.data);

        this.categoryList = res.data;

      },

      error: (err) => {

        console.error('Error loading categories:', err);

      }

    });

  }


  // =========================
  // GET CATEGORY NAME
  // =========================

  getCategoryName(categoryId: number): string {

    const category = this.categoryList.find(
      category => category.categoryId === categoryId
    );

    return category?.categoryName ?? 'Unknown';

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

    this.productObj = {

      productId: 0,
      productSku: '',
      productName: '',
      productPrice: 0,
      productShortName: '',
      productDescription: '',
      createdDate: new Date(),
      deliveryTimeSpan: '',
      productImageUrl: '',
      categoryId: 0

    };

  }


  // =========================
  // SAVE PRODUCT
  // =========================

  onSaveProduct() {

    console.log(
      'Produit à enregistrer :',
      this.productObj
    );

  }

}