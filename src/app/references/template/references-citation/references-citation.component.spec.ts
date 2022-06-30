import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesCitationComponent } from './references-citation.component';

describe('CitationComponent', () => {
  let component: ReferencesCitationComponent;
  let fixture: ComponentFixture<ReferencesCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
