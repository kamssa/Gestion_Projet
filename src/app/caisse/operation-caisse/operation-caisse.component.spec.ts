import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OperationCaisseComponent } from './operation-caisse.component';

describe('OperationCaisseComponent', () => {
  let component: OperationCaisseComponent;
  let fixture: ComponentFixture<OperationCaisseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
