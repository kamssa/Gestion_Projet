import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListeSiteTravauxOperationComponent } from './liste-site-travaux-operation.component';

describe('ListeSiteTravauxOperationComponent', () => {
  let component: ListeSiteTravauxOperationComponent;
  let fixture: ComponentFixture<ListeSiteTravauxOperationComponent>;

  beforeEach(waitForAsync(() => {
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
