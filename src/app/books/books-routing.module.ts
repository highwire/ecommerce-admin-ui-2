import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{BookPublihserListComponent } from './book-publihser-list/book-publihser-list.component';
import { BookDefaultPricesComponent } from './book-default-prices/book-default-prices.component';
import { BookSpecificPricesComponent } from './book-specific-prices/book-specific-prices.component';
import { BookSettingsComponent } from './book-settings/book-settings.component';
import { BookPromocodeComponent } from './book-promocode/book-promocode.component';
import { BookIncrementDiscountComponent } from './book-increment-discount/book-increment-discount.component';
import { AuthGuardService }  from '../auth/auth-gaurd.service';



const routes: Routes = [
  //  { path: '', redirectTo: '/journals', pathMatch: 'full' },
    {
        path: 'publishers',
        component:BookPublihserListComponent
    },

   {
      path: 'specific',       
      component:BookSpecificPricesComponent
      
  },
   {
      path: 'default',
      component:BookDefaultPricesComponent
    },
   { path: 'promocode', component:BookPromocodeComponent},
   { path: 'increment', component:BookIncrementDiscountComponent},
   { path: 'setting', component:BookSettingsComponent},
   
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
