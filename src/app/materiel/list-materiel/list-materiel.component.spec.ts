import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListMaterielComponent } from './list-materiel.component';

describe('ListMaterielComponent', () => {
  let component: ListMaterielComponent;
  let fixture: ComponentFixture<ListMaterielComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMaterielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
