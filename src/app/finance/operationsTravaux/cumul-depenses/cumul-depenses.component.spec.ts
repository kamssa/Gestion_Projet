import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulDepensesComponent } from './cumul-depenses.component';

describe('CumulDepensesComponent', () => {
  let component: CumulDepensesComponent;
  let fixture: ComponentFixture<CumulDepensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulDepensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulDepensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
