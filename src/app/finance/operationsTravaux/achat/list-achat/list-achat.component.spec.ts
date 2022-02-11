import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListAchatComponent } from './list-achat.component';

describe('ListAchatComponent', () => {
  let component: ListAchatComponent;
  let fixture: ComponentFixture<ListAchatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
