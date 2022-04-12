
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable ,  BehaviorSubject ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
// import { HttpHeaders } from '@angular/common/http';

import jwt_decode from "jwt-decode";
@Injectable({
    providedIn: 'root'
  })
export class HTTPService {
  private loginUrl = environment.loginUrl;
  public role = environment.appRole;

  constructor(
    private http: HttpClient,
    
    private router: Router,
    public jwtHelper: JwtHelperService
  ) { }


  getConfig() {
    // return this.http.get<Config>(this.configUrl);
  }
  getDatawithPost(URL:any, data:any) {
    var token:any= localStorage.getItem('hwp-login');
    
 

    var decodedHeader = jwt_decode(token, { header: true });
    console.log(decodedHeader);
    // var token= localStorage.getItem('hwp-login');    
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer '+ token
      })
    }
    return this.http.post(URL,data,httpOptions);
  }

  getDatawithPut(URL:any, data:any) {
    var token= localStorage.getItem('hwp-login');    
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer '+ token
      })
    }
    return this.http.put(URL,data,httpOptions);
  }

  

  getDatawithGet(URL:any, data:any, header?:any) {
    var token:any= localStorage.getItem('hwp-login');
    
 

    // var decodedHeader = jwt_decode(token, { header: true });
    // console.log(decodedHeader);
    var httpOptions:any;
    if(header)
     httpOptions = {
      headers: new HttpHeaders(header)
    }
    else{
       httpOptions = {
        headers: new HttpHeaders(
          {
          'Content-Type':  'application/json',
          Authorization: 'Bearer '+ token
        }
        )
      } 
    }
    
    return this.http.get(URL,httpOptions);
  
  }


  getDatawithDelete(URL:any, data:any) {


    var token= localStorage.getItem('hwp-login');
    
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer '+ token
      })
    }

    return this.http.delete(URL,httpOptions);
  
  }




}

//   user: user,
//       password: password,
//       persistLogin: persistLogin,
//       role: "Intelligent Commerce Pricing and Reporting UI"