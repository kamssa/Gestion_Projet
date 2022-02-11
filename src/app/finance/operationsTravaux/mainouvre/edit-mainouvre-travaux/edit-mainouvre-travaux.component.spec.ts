import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditMainouvreTravauxComponent } from './edit-mainouvre-travaux.component';

describe('EditMainouvreTravauxComponent', () => {
  let component: EditMainouvreTravauxComponent;
  let fixture: ComponentFixture<EditMainouvreTravauxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainouvreTravauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainouvreTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
