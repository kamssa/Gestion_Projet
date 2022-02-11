import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditOperationCaisseComponent } from './edit-operation-caisse.component';

describe('EditOperationCaisseComponent', () => {
  let component: EditOperationCaisseComponent;
  let fixture: ComponentFixture<EditOperationCaisseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOperationCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOperationCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
