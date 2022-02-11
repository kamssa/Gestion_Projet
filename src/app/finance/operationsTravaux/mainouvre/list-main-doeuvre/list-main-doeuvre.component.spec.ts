import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListMainDoeuvreComponent } from './list-main-doeuvre.component';

describe('ListMainDoeuvreComponent', () => {
  let component: ListMainDoeuvreComponent;
  let fixture: ComponentFixture<ListMainDoeuvreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMainDoeuvreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMainDoeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
