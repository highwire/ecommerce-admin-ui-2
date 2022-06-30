import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSpecificPricesComponent } from './book-specific-prices.component';

describe('BookSpecificPricesComponent', () => {
  let component: BookSpecificPricesComponent;
  let fixture: ComponentFixture<BookSpecificPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSpecificPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSpecificPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
