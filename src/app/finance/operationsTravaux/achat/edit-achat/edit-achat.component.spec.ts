import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditAchatComponent } from './edit-achat.component';

describe('EditAchatComponent', () => {
  let component: EditAchatComponent;
  let fixture: ComponentFixture<EditAchatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
