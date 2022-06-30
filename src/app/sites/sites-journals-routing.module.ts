import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitesSpecificPricesComponent } from './sites-specific-prices/sites-specific-prices.component';

import { AuthGuardService }  from '../auth/auth-gaurd.service';

const routes: Routes = [    
   {
      path: 'specific',       
      component:SitesSpecificPricesComponent
      
  }      
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalsRoutingModule { }
