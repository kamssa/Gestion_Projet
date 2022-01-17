import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatailAchatDialogComponent } from './datail-achat-dialog.component';

describe('DatailAchatDialogComponent', () => {
  let component: DatailAchatDialogComponent;
  let fixture: ComponentFixture<DatailAchatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatailAchatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatailAchatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
