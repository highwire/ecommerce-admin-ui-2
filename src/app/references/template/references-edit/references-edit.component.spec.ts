import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesEditComponent } from './references-edit.component';

describe('ReferencesEditComponent', () => {
  let component:ReferencesEditComponent;
  let fixture: ComponentFixture<ReferencesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
