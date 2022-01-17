import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSiteTravauxOperationComponent } from './liste-site-travaux-operation.component';

describe('ListeSiteTravauxOperationComponent', () => {
  let component: ListeSiteTravauxOperationComponent;
  let fixture: ComponentFixture<ListeSiteTravauxOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeSiteTravauxOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeSiteTravauxOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
