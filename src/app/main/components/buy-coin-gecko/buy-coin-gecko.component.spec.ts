import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCoinGeckoComponent } from './buy-coin-gecko.component';

describe('BuyCoinGeckoComponent', () => {
  let component: BuyCoinGeckoComponent;
  let fixture: ComponentFixture<BuyCoinGeckoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyCoinGeckoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyCoinGeckoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
