import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoyerComponent } from './dialog-loyer.component';

describe('DialogLoyerComponent', () => {
  let component: DialogLoyerComponent;
  let fixture: ComponentFixture<DialogLoyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLoyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
