import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddSiteSubscriptionComponent } from './new-add-site-subscription.component';

describe('NewAddSiteSubscriptionComponent', () => {
  let component: NewAddSiteSubscriptionComponent;
  let fixture: ComponentFixture<NewAddSiteSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAddSiteSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddSiteSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
