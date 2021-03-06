import { Injectable }       from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import {HTTPService } from '../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import {
    
    ActivatedRouteSnapshot, RouterStateSnapshot
  } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  isLoggedIn: boolean = false;
  constructor(private router: Router,
    public base:BaseService,
    public http:HTTPService
    ) {
  }
 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn) {
      console.log('login successfully')
      return true;
    }
    var currency: any = localStorage.getItem('currency');
    if (currency) {
      currency = JSON.parse(currency);
      return true
    }
    else{
  console.log('please login first') 
  this.router.navigate([''])
  return false
}

    // var promise = new Promise((resolve, reject) => { 
    //     // resolve("Promise Resolved"); 
    //     var currency:any= localStorage.getItem('currency');
    // if(currency){
    //     currency= JSON.parse(currency) ;
    //     resolve(true); 
    // }else{

    //   let publisher = localStorage.getItem('publisher')  ;
    //   // var name =  window.encodeURIComponent(this.basedata.element.name)
    //   let URL= this.base.CURRENCY_LIST+publisher+ '/currencies';
    //   this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
    //   // this.currency  =  res;
    //   localStorage.setItem('currency',JSON.stringify(res));
    //     console.log(res);       
    //     resolve(true); 
    //   })
    // }
    // }) 
    
    // promise.then((success) => { 
    //     console.log()
    //     this.router.navigate(['/journals/specific']);

    //     return false
    // }) 
    
    
  }

  getCurrencyList(){
    var currency:any= localStorage.getItem('currency');
    if(currency){
        currency= JSON.parse(currency) ;
    }else{

      let publisher = localStorage.getItem('publisher')  ;
      // var name =  window.encodeURIComponent(this.basedata.element.name)
      let URL= this.base.CURRENCY_LIST+publisher+ '/currencies';
      this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
      // this.currency  =  res;
      localStorage.setItem('currency',JSON.stringify(res));
        console.log(res);       
      })
    }
  
  }


} 
 