import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCategorieComponent } from './add-categorie.component';

describe('AddCategorieComponent', () => {
  let component: AddCategorieComponent;
  let fixture: ComponentFixture<AddCategorieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
