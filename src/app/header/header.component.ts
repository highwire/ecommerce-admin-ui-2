import { Component, OnInit } from '@angular/core';
import {AuthresolverService} from '../auth/authresolver.service';
import {HTTPService } from '../services/http.service';
import { BaseService } from 'src/app/services/base.service';

import {forkJoin,map, of, catchError} from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

// import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  publisher:any;
  hwpUser: any;
  sitedata:any;
  jouralslect:any;
  authz= {
    publisherName:''
  }
  constructor(
    public base:BaseService,
    public http:HTTPService,
    public auth: AuthresolverService,
    public client :HttpClient,
    public router: Router,
  ) { }

  ngOnInit(): void {
    var menu:any= localStorage.getItem('menu');
    if(menu && JSON.parse(menu)){
      this.jouralslect=  true;
    }else{
      this.jouralslect=  false;
    }
    var auth:any= localStorage.getItem('auth');
    if(auth && JSON.parse(auth)){
      this.hwpUser=  true;
    }else{
      this.hwpUser=  false;
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
      this.getSiteData();
      this.publisher= localStorage.getItem('publisher-label');
      
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
  goToLogout(){
  // this.router.navigate('/logout');
  this.router.navigate(['/login/logout'], {});
  localStorage.setItem('menu','');
  localStorage.setItem('currency','');
  localStorage.setItem('defalut','');
  localStorage.setItem('publisher-label','');
  localStorage.setItem('auth','');
  localStorage.setItem('publisher','');
  localStorage.setItem('hwp-login','');
  localStorage.setItem('siteData','');
  
  // auth
  // publisher
  // hwp-login
  this.jouralslect=  false;
  this.hwpUser=  false;
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
      localStorage.setItem('defaultcurrency',JSON.stringify(res));
        console.log('currency', res);       
      })
    }  
  }
  
  apicall(){
    this.requestDataFromMultipleSources().subscribe((responseList:any) => {
      // debugger;
      console.log(responseList);
      localStorage.setItem('siteData',JSON.stringify(responseList));
      
  });
  }
  getSiteData(){

    // var siteData:any= localStorage.getItem('siteData');
    // if(siteData){
      // siteData= JSON.parse(siteData) ;
    // }else{

    let publisher = localStorage.getItem('publisher')  ;
    let URL= this.base.SITE_LIST;
    var data={
      pubTerm: publisher,
      role: "Intelligent Commerce Pricing and Reporting UI",
      userId: "2"
    }
    this.http.getDatawithPost(URL,data).subscribe((data:any)=>{
        console.log('sitedata',data);             
        this.sitedata=  data.sites;
        this.apicall()
    })
  // }
  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    var arr: any[]=[]
    var token= localStorage.getItem('hwp-login');    
    var httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/vnd.hw.citation-ui+json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: 'Bearer '+ token
      })
    }
    
    this.sitedata.forEach((element:any,indx:any) => {
      arr.push ( this.client.get<any[]>(this.base.ATOM_LITE+element.site_code+'.atom' ,httpOptions));
      // if(indx==1)
      // arr.push ( this.client.get<any[]>(this.base.ATOM_LITE+element.site_code+'.atom11' ,httpOptions))
      })
    
    // var ar= arr;
    return forkJoin(arr);
    
  
}

  

}
