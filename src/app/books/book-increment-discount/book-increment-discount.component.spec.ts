import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIncrementDiscountComponent } from './book-increment-discount.component';

describe('BookIncrementDiscountComponent', () => {
  let component: BookIncrementDiscountComponent;
  let fixture: ComponentFixture<BookIncrementDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookIncrementDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookIncrementDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
