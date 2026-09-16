import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CategoryModel } from '../../../../models/category.model';
import { ProductFormModel } from '../../../../models/product-form.model';

type ProductFormControls = {
  productSku: FormControl<string>;
  productName: FormControl<string>;
  categoryId: FormControl<number>;
  productShortName: FormControl<string>;
  productPrice: FormControl<number>;
  deliveryTimeSpan: FormControl<string>;
  productImageUrl: FormControl<string>;
  productDescription: FormControl<string>;
};

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit, OnChanges {

  @Input() product: ProductFormModel = {} as ProductFormModel;
  @Input() categories: CategoryModel[] = [];

  @Output() save = new EventEmitter<ProductFormModel>();
  @Output() close = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  form!: FormGroup<ProductFormControls>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.patchForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.form) {
      this.patchForm();
    }
  }

  private createForm() {
    this.form = this.fb.group<ProductFormControls>({

      productSku: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3)
        ]
      }),

      productName: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3)
        ]
      }),

      categoryId: new FormControl(0, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(1)
        ]
      }),

      productShortName: new FormControl('', {
        nonNullable: true
      }),

      productPrice: new FormControl(0, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(0)
        ]
      }),

      deliveryTimeSpan: new FormControl('', {
        nonNullable: true
      }),

      productImageUrl: new FormControl('', {
        nonNullable: true
      }),

      productDescription: new FormControl('', {
        nonNullable: true
      })

    });
  }

  private patchForm() {
    this.form.patchValue({
      productSku: this.product.productSku ?? '',
      productName: this.product.productName ?? '',
      categoryId: this.product.categoryId ?? 0,
      productShortName: this.product.productShortName ?? '',
      productPrice: this.product.productPrice ?? 0,
      deliveryTimeSpan: this.product.deliveryTimeSpan ?? '',
      productImageUrl: this.product.productImageUrl ?? '',
      productDescription: this.product.productDescription ?? ''
    });
  }

  // Getters
  get sku() {
    return this.form.controls.productSku;
  }

  get name() {
    return this.form.controls.productName;
  }

  get category() {
    return this.form.controls.categoryId;
  }

  get price() {
    return this.form.controls.productPrice;
  }

  onSave() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue: ProductFormModel = {
      productId: this.product.productId,
      ...this.form.getRawValue()
    };

    this.save.emit(formValue);
  }

  onClose() {
    this.close.emit();
  }

  onReset() {

    this.form.reset({
      productSku: '',
      productName: '',
      categoryId: 0,
      productShortName: '',
      productPrice: 0,
      deliveryTimeSpan: '',
      productImageUrl: '',
      productDescription: ''
    });

    this.reset.emit();
  }
}