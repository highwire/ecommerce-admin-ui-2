import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferencesSpecificPricesComponent } from './references-specific-prices/references-specific-prices.component';
import { AuthGuardService }  from '../auth/auth-gaurd.service';



const routes: Routes = [
  //  { path: '', redirectTo: '/journals', pathMatch: 'full' },

   {
      path: 'specific',       
      component:ReferencesSpecificPricesComponent
      
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferencesRoutingModule { }
