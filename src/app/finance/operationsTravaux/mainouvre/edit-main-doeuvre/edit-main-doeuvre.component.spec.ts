import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMainDoeuvreComponent } from './edit-main-doeuvre.component';

describe('EditMainDoeuvreComponent', () => {
  let component: EditMainDoeuvreComponent;
  let fixture: ComponentFixture<EditMainDoeuvreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainDoeuvreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainDoeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
