import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementDiscountComponent } from './increment-discount.component';

describe('IncrementDiscountComponent', () => {
  let component: IncrementDiscountComponent;
  let fixture: ComponentFixture<IncrementDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncrementDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
