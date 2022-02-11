import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCaisseComponent } from './list-caisse.component';

describe('ListCaisseComponent', () => {
  let component: ListCaisseComponent;
  let fixture: ComponentFixture<ListCaisseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
