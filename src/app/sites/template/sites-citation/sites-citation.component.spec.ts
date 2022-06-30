import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesCitationComponent } from './sites-citation.component';

describe('CitationComponent', () => {
  let component: SitesCitationComponent;
  let fixture: ComponentFixture<SitesCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitesCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
