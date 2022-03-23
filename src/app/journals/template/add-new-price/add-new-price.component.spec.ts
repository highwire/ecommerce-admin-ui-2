import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPriceComponent } from './add-new-price.component';

describe('AddNewPriceComponent', () => {
  let component: AddNewPriceComponent;
  let fixture: ComponentFixture<AddNewPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
