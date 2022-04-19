import { Component, OnInit } from '@angular/core';
import {AuthresolverService} from '../auth/authresolver.service';
import {HTTPService } from '../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { state } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hwpUser: any;
  authz= {
    publisherName:""
  }
  // LoginStatus$ = new BehaviorSubject<boolean>(true)
  // Username$! :Observable<string>

  


  constructor(
    public base:BaseService,
    public http:HTTPService,
    public auth: AuthresolverService,
    public router:Router
  ) {}

  ngOnInit(): void {
var auth:any= localStorage.getItem('auth');

if(JSON.parse(auth)){
  this.hwpUser=  true;
}else{
  this.hwpUser=  false;
}

    this.auth.authMenu.subscribe((message) => {
      this.hwpUser = message
      localStorage.setItem('auth','true');
      this.getCurrencyList();
    });

// this.auth.authMenu.subscribe(state =>{
//   this.LoginStatus$.next(state)
// })
//   this.Username$ = this.auth.publisherName

  }

  getCurrencyList(){
    var currency:any= localStorage.getItem('currency');
    if(currency){
      currency= JSON.parse(currency)  ;
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

 
  display:boolean=true
  hidemenu(){
    this.display = !this.display;
  }
  
  

}
