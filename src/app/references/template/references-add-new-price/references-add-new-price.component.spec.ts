import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesAddNewPriceComponent } from './references-add-new-price.component';

describe('ReferencesAddNewPriceComponent', () => {
  let component: ReferencesAddNewPriceComponent;
  let fixture: ComponentFixture<ReferencesAddNewPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesAddNewPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesAddNewPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
