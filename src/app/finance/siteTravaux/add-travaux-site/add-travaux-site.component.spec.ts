import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravauxSiteComponent } from './add-travaux-site.component';

describe('AddTravauxSiteComponent', () => {
  let component: AddTravauxSiteComponent;
  let fixture: ComponentFixture<AddTravauxSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTravauxSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTravauxSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
