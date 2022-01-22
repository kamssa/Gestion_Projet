import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatEmployeComponent } from './updat-employe.component';

describe('UpdatEmployeComponent', () => {
  let component: UpdatEmployeComponent;
  let fixture: ComponentFixture<UpdatEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
