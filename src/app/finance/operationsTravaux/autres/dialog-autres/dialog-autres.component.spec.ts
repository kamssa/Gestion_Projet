import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAutresComponent } from './dialog-autres.component';

describe('DialogAutresComponent', () => {
  let component: DialogAutresComponent;
  let fixture: ComponentFixture<DialogAutresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAutresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAutresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
