import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListEmployeComponent } from './list-employe.component';

describe('ListEmployeComponent', () => {
  let component: ListEmployeComponent;
  let fixture: ComponentFixture<ListEmployeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
