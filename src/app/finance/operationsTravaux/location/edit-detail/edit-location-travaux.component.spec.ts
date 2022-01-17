import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationTravauxComponent } from './edit-location-travaux.component';

describe('EditLocationTravauxComponent', () => {
  let component: EditLocationTravauxComponent;
  let fixture: ComponentFixture<EditLocationTravauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLocationTravauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocationTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
