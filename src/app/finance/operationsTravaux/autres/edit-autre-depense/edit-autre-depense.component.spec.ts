import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutreDepenseComponent } from './edit-autre-depense.component';

describe('EditAutreDepenseComponent', () => {
  let component: EditAutreDepenseComponent;
  let fixture: ComponentFixture<EditAutreDepenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAutreDepenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAutreDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
