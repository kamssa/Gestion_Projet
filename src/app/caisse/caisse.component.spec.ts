import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CaisseComponent } from './caisse.component';

describe('CaisseComponent', () => {
  let component: CaisseComponent;
  let fixture: ComponentFixture<CaisseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
