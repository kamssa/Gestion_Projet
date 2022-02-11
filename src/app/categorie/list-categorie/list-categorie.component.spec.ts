import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCategorieComponent } from './list-categorie.component';

describe('ListCategorieComponent', () => {
  let component: ListCategorieComponent;
  let fixture: ComponentFixture<ListCategorieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
