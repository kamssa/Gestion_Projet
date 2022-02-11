import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCaisseComponent } from './add-caisse.component';

describe('AddCaisseComponent', () => {
  let component: AddCaisseComponent;
  let fixture: ComponentFixture<AddCaisseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
