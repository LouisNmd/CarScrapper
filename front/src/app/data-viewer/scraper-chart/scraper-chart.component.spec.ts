import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScraperChartComponent } from './scraper-chart.component';

describe('ScraperChartComponent', () => {
  let component: ScraperChartComponent;
  let fixture: ComponentFixture<ScraperChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScraperChartComponent]
    });
    fixture = TestBed.createComponent(ScraperChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
