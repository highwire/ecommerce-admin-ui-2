import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalsRoutingModule } from './journals-routing.module';
import { DefaultPricesComponent } from './default-prices/default-prices.component';
import { SpecificPricesComponent } from './specific-prices/specific-prices.component';
import { SettingsComponent } from './settings/settings.component';
import { PromocodeComponent } from './promocode/promocode.component';
import { IncrementDiscountComponent } from './increment-discount/increment-discount.component';
// import { FormsModule } from '@angular/forms';
 // <--- JavaScript import from Angular

import {PublihserListComponent} from './publihser-list/publihser-list.component';

@NgModule({
  declarations: [
    DefaultPricesComponent,
    SpecificPricesComponent,
    SettingsComponent,
    PromocodeComponent,
    IncrementDiscountComponent,
    PublihserListComponent
  ],
  imports: [
    
    CommonModule,
    JournalsRoutingModule
  ]
})
export class JournalsModule { }
