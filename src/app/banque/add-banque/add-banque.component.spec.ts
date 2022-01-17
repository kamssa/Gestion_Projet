import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBanqueComponent } from './add-banque.component';

describe('AddBanqueComponent', () => {
  let component: AddBanqueComponent;
  let fixture: ComponentFixture<AddBanqueComponent>;

  beforeEach(async(() => {
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
