import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCryptoCurrencyModalComponent } from './buy-crypto-currency-modal.component';

describe('BuyCryptoCurrencyModalComponent', () => {
  let component: BuyCryptoCurrencyModalComponent;
  let fixture: ComponentFixture<BuyCryptoCurrencyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyCryptoCurrencyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyCryptoCurrencyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
