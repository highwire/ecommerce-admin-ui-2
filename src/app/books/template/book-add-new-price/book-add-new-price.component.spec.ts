import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddNewPriceComponent } from './book-add-new-price.component';

describe('BookAddNewPriceComponent', () => {
  let component: BookAddNewPriceComponent;
  let fixture: ComponentFixture<BookAddNewPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAddNewPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddNewPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
