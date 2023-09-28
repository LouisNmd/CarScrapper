import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { ApiService } from 'src/app/api.service';

import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { ScraperChartComponent } from '../scraper-chart/scraper-chart.component';

@Component({
  selector: 'la-centrale',
  templateUrl: './la-centrale.component.html',
  styleUrls: ['./la-centrale.component.scss'],
})
export class LaCentraleComponent implements OnInit {
  constructor(private apiService: ApiService) {
    Chart.register(Annotation);
  }

  @Input() brand!: string;
  @Input() model!: string;
  @ViewChild(ScraperChartComponent) chart!: ScraperChartComponent;

  ngOnInit(): void {
    this.apiService
      .getLaCentrale(this.brand, this.model)
      .then((response) => {
        return response.json();
      })
      .then((data) => this.chart.setData(data));
  }
}
