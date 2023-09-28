import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaCentraleComponent } from './data-viewer/la-centrale/la-centrale.component';
import { NgChartsModule } from 'ng2-charts';
import { ScraperChartComponent } from './data-viewer/scraper-chart/scraper-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LaCentraleComponent,
    ScraperChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
