import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployePermitionComponent } from './employe-permition.component';

describe('EmployePermitionComponent', () => {
  let component: EmployePermitionComponent;
  let fixture: ComponentFixture<EmployePermitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployePermitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployePermitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
