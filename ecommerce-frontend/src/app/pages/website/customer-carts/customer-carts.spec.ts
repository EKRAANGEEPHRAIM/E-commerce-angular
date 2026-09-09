import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCarts } from './customer-carts';

describe('CustomerCarts', () => {
  let component: CustomerCarts;
  let fixture: ComponentFixture<CustomerCarts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCarts],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCarts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
