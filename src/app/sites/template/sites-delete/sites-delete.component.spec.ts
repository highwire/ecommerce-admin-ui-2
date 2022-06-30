import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesDeleteComponent } from './sites-delete.component';

describe('SitesDeleteComponent', () => {
  let component: SitesDeleteComponent;
  let fixture: ComponentFixture<SitesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitesDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
