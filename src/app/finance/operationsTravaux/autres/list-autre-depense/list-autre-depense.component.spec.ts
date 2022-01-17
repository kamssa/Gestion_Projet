import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutreDepenseComponent } from './list-autre-depense.component';

describe('ListAutreDepenseComponent', () => {
  let component: ListAutreDepenseComponent;
  let fixture: ComponentFixture<ListAutreDepenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAutreDepenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAutreDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
