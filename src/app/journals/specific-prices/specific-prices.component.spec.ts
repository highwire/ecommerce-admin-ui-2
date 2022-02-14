import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPricesComponent } from './specific-prices.component';

describe('SpecificPricesComponent', () => {
  let component: SpecificPricesComponent;
  let fixture: ComponentFixture<SpecificPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
