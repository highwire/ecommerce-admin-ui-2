import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  
  { path: '', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { 

}









