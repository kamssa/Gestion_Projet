import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditSiteTravauxComponent } from './edit-site-travaux.component';

describe('EditSiteTravauxComponent', () => {
  let component: EditSiteTravauxComponent;
  let fixture: ComponentFixture<EditSiteTravauxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSiteTravauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSiteTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
