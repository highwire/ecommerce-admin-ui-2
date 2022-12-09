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

   { path: 'book',
   canActivate:[AuthGuardService],
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule)},
 
    { path: 'references',
   canActivate:[AuthGuardService],
    loadChildren: () => import('./references/references-journals.module').then(m => m.ReferencesModule)},
 
    { path: 'sites',
   canActivate:[AuthGuardService],
    loadChildren: () => import('./sites/sites-journals.module').then(m => m.SitesModule)},

    { path: 'monograph',
    canActivate:[AuthGuardService],
     loadChildren: () => import('./monograph/monograph.module').then(m => m.MonographModule)},
     
 


   { path: 'reports',
   canActivate:[AuthGuardService],
   loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)},
   
   
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
