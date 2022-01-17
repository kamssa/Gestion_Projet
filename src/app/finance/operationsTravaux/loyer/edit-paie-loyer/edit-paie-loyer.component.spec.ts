import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaieLoyerComponent } from './edit-paie-loyer.component';

describe('EditPaieLoyerComponent', () => {
  let component: EditPaieLoyerComponent;
  let fixture: ComponentFixture<EditPaieLoyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaieLoyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaieLoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
