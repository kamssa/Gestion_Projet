import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceProjetComponent } from './advance-projet.component';

describe('AdvanceProjetComponent', () => {
  let component: AdvanceProjetComponent;
  let fixture: ComponentFixture<AdvanceProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
