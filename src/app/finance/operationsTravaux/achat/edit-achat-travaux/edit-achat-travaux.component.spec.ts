import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAchatTravauxComponent } from './edit-achat-travaux.component';

describe('EditAchatTravauxComponent', () => {
  let component: EditAchatTravauxComponent;
  let fixture: ComponentFixture<EditAchatTravauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAchatTravauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAchatTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
