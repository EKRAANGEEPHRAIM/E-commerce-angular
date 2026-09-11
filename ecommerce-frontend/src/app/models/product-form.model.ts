export interface ProductFormModel {
  productId: number;
  productSku: string;
  productName: string;
  productPrice: number;
  productShortName: string;
  productDescription: string;
  deliveryTimeSpan: string;
  productImageUrl: string;
  categoryId: number;
}

export function createEmptyProductForm(): ProductFormModel {
  return {
    productId: 0,
    productSku: '',
    productName: '',
    productPrice: 0,
    productShortName: '',
    productDescription: '',
    deliveryTimeSpan: '',
    productImageUrl: '',
    categoryId: 0
  };
}