import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoinUserComponent } from './list-coin-user.component';

describe('ListCoinUserComponent', () => {
  let component: ListCoinUserComponent;
  let fixture: ComponentFixture<ListCoinUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCoinUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCoinUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
