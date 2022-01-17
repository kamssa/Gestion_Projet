import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAutresComponent } from './dialog-autres.component';

describe('DialogAutresComponent', () => {
  let component: DialogAutresComponent;
  let fixture: ComponentFixture<DialogAutresComponent>;

  beforeEach(async(() => {
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
