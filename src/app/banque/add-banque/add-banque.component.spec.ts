import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddBanqueComponent } from './add-banque.component';

describe('AddBanqueComponent', () => {
  let component: AddBanqueComponent;
  let fixture: ComponentFixture<AddBanqueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBanqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
