import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAllApplicationOfAnOfferComponent } from './manage-all-application-of-an-offer.component';

describe('ManageAllApplicationOfAnOfferComponent', () => {
  let component: ManageAllApplicationOfAnOfferComponent;
  let fixture: ComponentFixture<ManageAllApplicationOfAnOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAllApplicationOfAnOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAllApplicationOfAnOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
