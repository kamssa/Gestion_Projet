import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListAutreDepenseComponent } from './list-autre-depense.component';

describe('ListAutreDepenseComponent', () => {
  let component: ListAutreDepenseComponent;
  let fixture: ComponentFixture<ListAutreDepenseComponent>;

  beforeEach(waitForAsync(() => {
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
