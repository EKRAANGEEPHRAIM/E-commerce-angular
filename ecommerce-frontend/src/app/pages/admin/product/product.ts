import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 Essentiel pour [(ngModel)]
import { ProductService } from '../../../services/product/products';

@Component({
  selector: 'app-product',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  isSidePanelVisible: boolean = false;

  // Modèle d'objet produit initial
  productObj: any = {
    productId: 0,
    productSku: '',
    productName: '',
    productPrice: 0,
    productShortName: '',
    productDescription: '',
    createdDate: new Date(),
    deliveryTimeSpan: '', // 💡 Correction de la faute de frappe "delevery"
    productImageUrl: ''
  };


  constructor(private productService: ProductService) {} 
  openSidePanel() {
    this.resetForm(); // Réinitialise les données à l'ouverture
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }

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
      productImageUrl: ''
    };
  }

  onSaveProduct() {
    console.log('Produit à enregistrer :', this.productObj);
    // Ajoutez ici votre appel API via un service (ex: this.productService.save(this.productObj))
    this.closeSidePanel();
  }
}