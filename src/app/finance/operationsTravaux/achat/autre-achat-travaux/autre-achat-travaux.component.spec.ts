import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutreAchatTravauxComponent } from './autre-achat-travaux.component';

describe('AutreAchatTravauxComponent', () => {
  let component: AutreAchatTravauxComponent;
  let fixture: ComponentFixture<AutreAchatTravauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutreAchatTravauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreAchatTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
