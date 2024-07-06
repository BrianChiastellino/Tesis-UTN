import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserDialogComponent } from './show-user-dialog.component';

describe('ShowUserDialogComponent', () => {
  let component: ShowUserDialogComponent;
  let fixture: ComponentFixture<ShowUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowUserDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
