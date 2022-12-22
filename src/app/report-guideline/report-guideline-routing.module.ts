import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportGuidelineSpecificPricesComponent } from './report-guideline-specific-prices/report-guideline-specific-prices.component';
// import { MonographSpecificPricesComponent } from './monograph-specific-prices/monograph-specific-prices.component';



const routes: Routes = [
  //  { path: '', redirectTo: '/journals', pathMatch: 'full' },
    // {
    //     path: 'publishers',
    //     component:MonographAddComponent
    // },

   {
      path: 'specific',       
      component:ReportGuidelineSpecificPricesComponent
      
  },
  //  {
  //     path: 'default',
  //     component:mono
  //   },
  //  { path: 'promocode', component:BookPromocodeComponent},
  //  { path: 'increment', component:BookIncrementDiscountComponent},
  //  { path: 'setting', component:BookSettingsComponent},
   
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportGuidelineRoutingModule { }
