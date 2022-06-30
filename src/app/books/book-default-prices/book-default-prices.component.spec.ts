import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDefaultPricesComponent } from './book-default-prices.component';

describe('DefaultPricesComponent', () => {
  let component: BookDefaultPricesComponent;
  let fixture: ComponentFixture<BookDefaultPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDefaultPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDefaultPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
