import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTranspTravauxComponent } from './edit-transp-travaux.component';

describe('EditTranspTravauxComponent', () => {
  let component: EditTranspTravauxComponent;
  let fixture: ComponentFixture<EditTranspTravauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTranspTravauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTranspTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
