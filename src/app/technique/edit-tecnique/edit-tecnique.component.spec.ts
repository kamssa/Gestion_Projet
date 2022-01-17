import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTecniqueComponent } from './edit-tecnique.component';

describe('EditTecniqueComponent', () => {
  let component: EditTecniqueComponent;
  let fixture: ComponentFixture<EditTecniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTecniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTecniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
