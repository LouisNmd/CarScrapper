import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { ApiService } from 'src/app/api.service';

import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'la-centrale',
  templateUrl: './la-centrale.component.html',
  styleUrls: ['./la-centrale.component.scss']
})
export class LaCentraleComponent implements OnInit {

  constructor(private apiService: ApiService) {
    Chart.register(Annotation);
  }
  
  public lineChartType: ChartType = 'line';
  lineChartData: ChartConfiguration['data'] = {
    datasets:[
      {
        data: [],
        label: 'Prix moyen',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Prix médian',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [1, 2, 3, 4, 5],
  };
  lineChartOption: ChartConfiguration['options'] = {
    responsive:true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() brand!: string;
  @Input() model!: string;
  data: any;
  averagePriceList: any[] = []
  medianPriceList: any[] = []

  ngOnInit(): void {
    this.apiService.getLaCentrale(this.brand, this.model).then(response => {
      return response.json();
    }).then(data => {
      this.data = data;
      this.averagePriceList = this.computeAveragePriceList(data);
      this.medianPriceList = this.computeMedianPriceList(data);
      this.updateChart();
    });
  }

  computeAveragePriceList(data: any[]) {
    return data.map(item => item?.average_price)
  }

  computeMedianPriceList(data: any[]) {
    return data.map(item => item?.median)
  }

  updateChart() {
    this.lineChartData.datasets[0].data = this.averagePriceList;
    this.lineChartData.datasets[1].data = this.medianPriceList;
    this.lineChartData.labels?.push(
      `labels ${this.lineChartData.labels.length}`
    );
    this.chart?.update();
  }
}
