import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { AgChartsAngular } from 'ag-charts-angular';
import { GridComponent } from './grid/grid.component';
import { SalesShareComponent } from './sales-share/sales-share.component';
import { SalesDevelopmentComponent } from './sales-development/sales-development.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SalesShareComponent,
    SalesDevelopmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridAngular,
    AgChartsAngular,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
