import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditAutredepenseTravauxComponent } from './edit-autredepense-travaux.component';

describe('EditAutredepenseTravauxComponent', () => {
  let component: EditAutredepenseTravauxComponent;
  let fixture: ComponentFixture<EditAutredepenseTravauxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAutredepenseTravauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAutredepenseTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
