import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetraitComponent } from './retrait.component';

describe('RetraitComponent', () => {
  let component: RetraitComponent;
  let fixture: ComponentFixture<RetraitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
