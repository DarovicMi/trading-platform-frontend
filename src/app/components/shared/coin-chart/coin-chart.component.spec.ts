import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinChartComponent } from './coin-chart.component';

describe('CoinChartComponent', () => {
  let component: CoinChartComponent;
  let fixture: ComponentFixture<CoinChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
