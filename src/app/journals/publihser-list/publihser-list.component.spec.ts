import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublihserListComponent } from './publihser-list.component';

describe('PublihserListComponent', () => {
  let component: PublihserListComponent;
  let fixture: ComponentFixture<PublihserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublihserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublihserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
