import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWalletDialogComponent } from './show-wallet-dialog.component';

describe('ShowWalletDialogComponent', () => {
  let component: ShowWalletDialogComponent;
  let fixture: ComponentFixture<ShowWalletDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowWalletDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowWalletDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
