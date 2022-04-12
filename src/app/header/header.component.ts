import { Component, OnInit } from '@angular/core';
import {AuthresolverService} from '../auth/authresolver.service';
import {HTTPService } from '../services/http.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hwpUser: any;
  jouralslect:any;
  authz= {
    publisherName:''
  }
  constructor(
    public base:BaseService,
    public http:HTTPService,
    public auth: AuthresolverService
  ) { }

  ngOnInit(): void {
    var menu:any= localStorage.getItem('menu');
    if(JSON.parse(menu)){
      this.jouralslect=  true;
    }else{
      this.jouralslect=  false;
    }
    this.auth.authMenu.subscribe((message) => {
      this.hwpUser = message
      localStorage.setItem('auth','true');      
    });
    this.joural();
  }

  joural(){
    this.auth.jouralMenu.subscribe((message) => {
      this.jouralslect = message;
      localStorage.setItem('menu','true');
      this.getCurrencyList();
      this.getDefalutCurrencyList();
    })
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
  
  getDefalutCurrencyList(){
    var currency:any= localStorage.getItem('defalut');
    if(currency){
        currency= JSON.parse(currency) ;
    }else{
      let publisher = localStorage.getItem('publisher')  ;
      
      let URL= this.base.CURRENCY_LIST+publisher+ '/defaultcurrency';
      this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
      // this.currency  =  res;
      localStorage.setItem('defalut',JSON.stringify(res));
        console.log('defalut', res);       
      })
    }  
  }
  

}
