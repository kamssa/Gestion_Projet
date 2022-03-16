import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutreAchatTravauxComponent } from './edit-autre-achat-travaux.component';

describe('EditAutreAchatTravauxComponent', () => {
  let component: EditAutreAchatTravauxComponent;
  let fixture: ComponentFixture<EditAutreAchatTravauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAutreAchatTravauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAutreAchatTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
