import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalSubscriptionComponent } from './add-journal-subscription.component';

describe('AddJournalSubscriptionComponent', () => {
  let component: AddJournalSubscriptionComponent;
  let fixture: ComponentFixture<AddJournalSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJournalSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJournalSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
