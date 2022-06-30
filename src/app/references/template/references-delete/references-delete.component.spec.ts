import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesDeleteComponent } from './references-delete.component';

describe('ReferencesDeleteComponent', () => {
  let component: ReferencesDeleteComponent;
  let fixture: ComponentFixture<ReferencesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
