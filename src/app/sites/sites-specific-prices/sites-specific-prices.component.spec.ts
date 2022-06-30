import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesSpecificPricesComponent } from './sites-specific-prices.component';

describe('SitesSpecificPricesComponent', () => {
  let component: SitesSpecificPricesComponent;
  let fixture: ComponentFixture<SitesSpecificPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitesSpecificPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesSpecificPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
