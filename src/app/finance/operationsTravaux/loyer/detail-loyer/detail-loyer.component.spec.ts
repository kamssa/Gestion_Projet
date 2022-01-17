import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLoyerComponent } from './detail-loyer.component';

describe('DetailLoyerComponent', () => {
  let component: DetailLoyerComponent;
  let fixture: ComponentFixture<DetailLoyerComponent>;

  beforeEach(async(() => {
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
