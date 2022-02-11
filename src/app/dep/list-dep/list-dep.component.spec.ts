import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListDepComponent } from './list-dep.component';

describe('ListDepComponent', () => {
  let component: ListDepComponent;
  let fixture: ComponentFixture<ListDepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
