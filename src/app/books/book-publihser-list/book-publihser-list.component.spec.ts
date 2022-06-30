import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPublihserListComponent } from './book-publihser-list.component';

describe('BookPublihserListComponent', () => {
  let component: BookPublihserListComponent;
  let fixture: ComponentFixture<BookPublihserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPublihserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPublihserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
