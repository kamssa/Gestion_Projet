import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMainouvreComponent } from './dialog-mainouvre.component';

describe('DialogMainouvreComponent', () => {
  let component: DialogMainouvreComponent;
  let fixture: ComponentFixture<DialogMainouvreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMainouvreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMainouvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
