import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutreAchatComponent } from './list-autre-achat.component';

describe('ListAutreAchatComponent', () => {
  let component: ListAutreAchatComponent;
  let fixture: ComponentFixture<ListAutreAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAutreAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAutreAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
