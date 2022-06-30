import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesSpecificPricesComponent } from './references-specific-prices.component';

describe('ReferencesSpecificPricesComponent', () => {
  let component: ReferencesSpecificPricesComponent;
  let fixture: ComponentFixture<ReferencesSpecificPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesSpecificPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesSpecificPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
