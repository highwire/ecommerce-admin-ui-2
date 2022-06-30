import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesAddComponent } from './sites-add.component';

describe('AddComponent', () => {
  let component: SitesAddComponent;
  let fixture: ComponentFixture<SitesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
