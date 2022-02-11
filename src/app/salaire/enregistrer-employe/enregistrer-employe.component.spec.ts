import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnregistrerEmployeComponent } from './enregistrer-employe.component';

describe('EnregistrerEmployeComponent', () => {
  let component: EnregistrerEmployeComponent;
  let fixture: ComponentFixture<EnregistrerEmployeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
