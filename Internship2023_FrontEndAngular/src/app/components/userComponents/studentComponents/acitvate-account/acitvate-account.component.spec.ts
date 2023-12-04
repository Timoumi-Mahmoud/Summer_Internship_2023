import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcitvateAccountComponent } from './acitvate-account.component';

describe('AcitvateAccountComponent', () => {
  let component: AcitvateAccountComponent;
  let fixture: ComponentFixture<AcitvateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcitvateAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcitvateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
