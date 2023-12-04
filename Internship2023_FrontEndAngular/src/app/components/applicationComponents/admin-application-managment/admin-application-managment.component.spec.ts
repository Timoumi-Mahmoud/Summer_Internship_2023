import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationManagmentComponent } from './admin-application-managment.component';

describe('AdminApplicationManagmentComponent', () => {
  let component: AdminApplicationManagmentComponent;
  let fixture: ComponentFixture<AdminApplicationManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApplicationManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApplicationManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
