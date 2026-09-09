import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerOrder } from './cutomer-order';

describe('CutomerOrder', () => {
  let component: CutomerOrder;
  let fixture: ComponentFixture<CutomerOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutomerOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(CutomerOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
