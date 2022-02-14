import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { DetailedComponent } from './detailed/detailed.component';

const routes: Routes = [
  // { path: '', redirectTo: '/charts', pathMatch: 'full' },
 { path: 'charts', component:ChartsComponent},
  { path: 'mostpopular', component:MostPopularComponent},
  { path: 'detailed', component:DetailedComponent},

  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
