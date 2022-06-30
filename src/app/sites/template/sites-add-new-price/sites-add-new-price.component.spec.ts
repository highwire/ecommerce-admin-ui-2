import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesAddNewPriceComponent } from './sites-add-new-price.component';

describe('AddNewPriceComponent', () => {
  let component: SitesAddNewPriceComponent;
  let fixture: ComponentFixture<SitesAddNewPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitesAddNewPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesAddNewPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
