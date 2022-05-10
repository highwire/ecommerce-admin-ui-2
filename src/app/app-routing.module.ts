import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscriber } from 'rxjs';


const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
   { path: 'journals',
   
   loadChildren: () => import('./journals/journals.module').then(m => m.JournalsModule)},
   { path: 'reports',loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)},
   
   
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
