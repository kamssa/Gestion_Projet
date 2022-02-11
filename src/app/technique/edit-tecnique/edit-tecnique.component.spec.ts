import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditTecniqueComponent } from './edit-tecnique.component';

describe('EditTecniqueComponent', () => {
  let component: EditTecniqueComponent;
  let fixture: ComponentFixture<EditTecniqueComponent>;

  beforeEach(waitForAsync(() => {
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
