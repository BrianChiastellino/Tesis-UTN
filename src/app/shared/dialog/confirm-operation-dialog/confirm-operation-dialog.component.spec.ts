import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOperationDialogComponent } from './confirm-operation-dialog.component';

describe('ConfirmOperationDialogComponent', () => {
  let component: ConfirmOperationDialogComponent;
  let fixture: ComponentFixture<ConfirmOperationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmOperationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmOperationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
