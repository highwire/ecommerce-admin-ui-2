import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalSubscriptionsComponent } from './journal-subscriptions.component';

describe('JournalSubscriptionsComponent', () => {
  let component: JournalSubscriptionsComponent;
  let fixture: ComponentFixture<JournalSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
