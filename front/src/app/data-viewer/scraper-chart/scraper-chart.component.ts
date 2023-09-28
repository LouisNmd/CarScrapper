import { Component, Input, Output, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-scraper-chart',
  templateUrl: './scraper-chart.component.html',
  styleUrls: ['./scraper-chart.component.scss'],
})
export class ScraperChartComponent {
  constructor() {
    Chart.register(Annotation);
  }

  public lineChartType: ChartType = 'line';
  lineChartData: ChartConfiguration['data'] = {
    datasets: [
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
      },
    ],
    labels: [],
  };
  lineChartOption: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  data: any;
  averagePriceList: any[] = [];
  medianPriceList: any[] = [];
  timeList: any[] = [];

  private computeAveragePriceList(data: any[]) {
    return data.map((item) => item?.average_price);
  }

  private computeMedianPriceList(data: any[]) {
    return data.map((item) => item?.median);
  }

  private getTimeList(data: any[]) {
    return data.map((item) => item?.time);
  }

  private updateChart() {
    this.lineChartData.datasets[0].data = this.averagePriceList;
    this.lineChartData.datasets[1].data = this.medianPriceList;
    this.lineChartData.labels = this.timeList;
    this.chart?.update();
  }

  public setData(data: any) {
    this.data = data;
    this.averagePriceList = this.computeAveragePriceList(data);
    this.medianPriceList = this.computeMedianPriceList(data);
    this.timeList = this.getTimeList(data);
    this.updateChart();
  }
}
