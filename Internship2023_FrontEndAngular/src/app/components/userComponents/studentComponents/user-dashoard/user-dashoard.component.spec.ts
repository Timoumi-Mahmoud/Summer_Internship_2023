import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashoardComponent } from './user-dashoard.component';

describe('UserDashoardComponent', () => {
  let component: UserDashoardComponent;
  let fixture: ComponentFixture<UserDashoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
