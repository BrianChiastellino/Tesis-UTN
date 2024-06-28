import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCoinGeckoComponent } from './sell-coin-gecko.component';

describe('SellCoinGeckoComponent', () => {
  let component: SellCoinGeckoComponent;
  let fixture: ComponentFixture<SellCoinGeckoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellCoinGeckoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellCoinGeckoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
