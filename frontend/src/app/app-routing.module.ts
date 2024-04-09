import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { SalesShareComponent } from './sales-share/sales-share.component';
import { SalesDevelopmentComponent } from './sales-development/sales-development.component';

const routes: Routes = [
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  { path: 'data', component: GridComponent },
  { path: 'sales-share/:customer', component: SalesShareComponent },
  { path: 'sales-development/:customer', component: SalesDevelopmentComponent },
  { path: '**', redirectTo: '/data' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
