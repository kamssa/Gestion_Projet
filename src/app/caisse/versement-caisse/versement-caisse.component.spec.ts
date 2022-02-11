import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VersementCaisseComponent } from './versement-caisse.component';

describe('VersementCaisseComponent', () => {
  let component: VersementCaisseComponent;
  let fixture: ComponentFixture<VersementCaisseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VersementCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersementCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
