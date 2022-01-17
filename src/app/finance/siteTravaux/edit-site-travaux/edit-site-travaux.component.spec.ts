import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSiteTravauxComponent } from './edit-site-travaux.component';

describe('EditSiteTravauxComponent', () => {
  let component: EditSiteTravauxComponent;
  let fixture: ComponentFixture<EditSiteTravauxComponent>;

  beforeEach(async(() => {
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
