import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeSalaireComponent } from './paye-salaire.component';

describe('PayeSalaireComponent', () => {
  let component: PayeSalaireComponent;
  let fixture: ComponentFixture<PayeSalaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayeSalaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
