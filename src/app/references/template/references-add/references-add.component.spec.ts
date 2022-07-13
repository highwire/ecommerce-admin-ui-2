import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesAddComponent } from './references-add.component';

describe('ReferencesAddComponent', () => {
  let component: ReferencesAddComponent;
  let fixture: ComponentFixture<ReferencesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
