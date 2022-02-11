import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddDepComponent } from './add-dep.component';

describe('AddDepComponent', () => {
  let component: AddDepComponent;
  let fixture: ComponentFixture<AddDepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
