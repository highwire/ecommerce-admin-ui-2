import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-gaurd.service';



const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login',
   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
   { path: 'journals',
  canActivate:[AuthGuardService],
   loadChildren: () => import('./journals/journals.module').then(m => m.JournalsModule)},
   { path: 'reports',
   canActivate:[AuthGuardService],
   loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)},
   
   
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
