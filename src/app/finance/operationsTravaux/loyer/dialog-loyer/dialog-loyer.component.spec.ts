import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogLoyerComponent } from './dialog-loyer.component';

describe('DialogLoyerComponent', () => {
  let component: DialogLoyerComponent;
  let fixture: ComponentFixture<DialogLoyerComponent>;

  beforeEach(waitForAsync(() => {
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
