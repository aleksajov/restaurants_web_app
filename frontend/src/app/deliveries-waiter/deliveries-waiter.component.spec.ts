import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesWaiterComponent } from './deliveries-waiter.component';

describe('DeliveriesWaiterComponent', () => {
  let component: DeliveriesWaiterComponent;
  let fixture: ComponentFixture<DeliveriesWaiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveriesWaiterComponent]
    });
    fixture = TestBed.createComponent(DeliveriesWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
