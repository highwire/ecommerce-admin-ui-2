import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddJournalSubscriptionComponent } from './new-add-journal-subscription.component';

describe('NewAddJournalSubscriptionComponent', () => {
  let component: NewAddJournalSubscriptionComponent;
  let fixture: ComponentFixture<NewAddJournalSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAddJournalSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddJournalSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
