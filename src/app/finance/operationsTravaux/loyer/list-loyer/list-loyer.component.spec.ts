import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoyerComponent } from './list-loyer.component';

describe('ListLoyerComponent', () => {
  let component: ListLoyerComponent;
  let fixture: ComponentFixture<ListLoyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
