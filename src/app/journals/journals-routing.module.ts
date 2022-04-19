import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{PublihserListComponent } from './publihser-list/publihser-list.component';
import { DefaultPricesComponent } from './default-prices/default-prices.component';
import { SpecificPricesComponent } from './specific-prices/specific-prices.component';
import { SettingsComponent } from './settings/settings.component';
import { PromocodeComponent } from './promocode/promocode.component';
import { IncrementDiscountComponent } from './increment-discount/increment-discount.component';
import { DefaultPriceComponent } from './default-price/default-price.component';


const routes: Routes = [
  //  { path: '', redirectTo: '/journals', pathMatch: 'full' },
  { path: 'publishers', component:PublihserListComponent},
   { path: 'specific', component:SpecificPricesComponent},
  //  { path: 'default', component:DefaultPricesComponent},
   { path: 'promocode', component:PromocodeComponent},
   { path: 'increment', component:IncrementDiscountComponent},
   { path: 'setting', component:SettingsComponent},
   { path: 'defaults', component:DefaultPriceComponent},  //new component generate 8-4-2022
   
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalsRoutingModule { }
