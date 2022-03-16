import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAutreAchatTravauxComponent } from './dialog-autre-achat-travaux.component';

describe('DialogAutreAchatTravauxComponent', () => {
  let component: DialogAutreAchatTravauxComponent;
  let fixture: ComponentFixture<DialogAutreAchatTravauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAutreAchatTravauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAutreAchatTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
