import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMyApplicationsComponent } from './all-my-applications.component';

describe('AllMyApplicationsComponent', () => {
  let component: AllMyApplicationsComponent;
  let fixture: ComponentFixture<AllMyApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMyApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMyApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
