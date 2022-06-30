import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPromocodeComponent } from './book-promocode.component';

describe('BookPromocodeComponent', () => {
  let component: BookPromocodeComponent;
  let fixture: ComponentFixture<BookPromocodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPromocodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
