import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetraitCaisseComponent } from './retrait-caisse.component';

describe('RetraitCaisseComponent', () => {
  let component: RetraitCaisseComponent;
  let fixture: ComponentFixture<RetraitCaisseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetraitCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetraitCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
