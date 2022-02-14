import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";

import {  FormsModule,ReactiveFormsModule } from '@angular/forms';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";
    
export function tokenGetter() {
  return localStorage.getItem('hwp-login');
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
   
   
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    // FormsModule,
    // ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
   
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
