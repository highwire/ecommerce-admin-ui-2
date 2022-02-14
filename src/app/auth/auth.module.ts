import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { AuthresolverService } from './/authresolver.service';
import { MessageService } from './message.service';
// import { JwtModule } from "@auth0/angular-jwt";
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from './signup/signup.component';
// export function tokenGetter() {
//   return localStorage.getItem("access_token");
// }

    // FormsModule,
// let dev = [];

// if (environment.production) {
//   enableProdMode();
// }

// else {
//   // use to insert dev-only dependencies
// }

// export function tokenGetter() {
//   return localStorage.getItem('hwp-login');
// }
// whitelistedDomains: ['localhost:4300'],
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    
    
    AuthRoutingModule,
    RouterModule,
    
    
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    Angulartics2Module.forRoot(),
    
  ],
  providers:[
    AuthresolverService,
    MessageService
  ]
})
export class AuthModule { }
