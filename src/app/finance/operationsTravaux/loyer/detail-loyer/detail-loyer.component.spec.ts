import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailLoyerComponent } from './detail-loyer.component';

describe('DetailLoyerComponent', () => {
  let component: DetailLoyerComponent;
  let fixture: ComponentFixture<DetailLoyerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLoyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
