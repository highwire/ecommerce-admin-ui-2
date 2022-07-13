import { Component, OnInit } from '@angular/core';
import {AuthresolverService} from '../auth/authresolver.service';
import {HTTPService } from '../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import {hwValidator} from '../services/hwvalidator.service'
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
  
  model = {
    subscriptions: false,
    refwork: false,
    site: false
  };
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
    public hwv :hwValidator,
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
      this.selectAllPublishers();   
    });
    this.joural();
    this.selectAllPublishers();
    
  }

  joural(){
    this.auth.jouralMenu.subscribe((message) => {
      this.jouralslect = message;
      localStorage.setItem('menu','true');
      // this.getCurrencyList();
      this.getDefalutCurrencyList();
      this.getSiteData();
      this.publisher= localStorage.getItem('publisher-label');
      this.selectAllPublishers();
      // this.catalogOptsFactory();
    })
  }



  getCurrencyList(){
    var currency:any= localStorage.getItem('currency');
    if(currency){
        // currency= JSON.parse(currency) ;
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


selectAllPublishers(){
  let publisher = localStorage.getItem('publisher')  ;
  let URL= this.base.PRODUCT_LIST+ publisher+'/products';
  this.http.getDatawithGet(URL,publisher).subscribe((data:any)=>{
      console.log(data);
      this.filterDOI(data);
     
  })
}
filterDOI(data:any){
  var self= this
  this.model = {
    subscriptions: false,
    refwork: false,
    site: false
  };
  data= data.filter((entry:any)=>{
    
    return( self.hwv.doi(entry.name) || self.hwv.pisaId(entry.name) ||self.hwv.isbn(entry.name) || self.hwv.resourceId(entry.name) ||entry.name=='site_bundle')
  });
  data.forEach((element:any) => {
    // console.log(element);
    if(element.prices && Array.isArray(element.prices)  &&
     (element.productType=='ebook' || element.productType=='edition') ){
      this.model.subscriptions = true;

    }
     
    if(element.prices && Array.isArray(element.prices)  && element.productType=='refwork'){
      this.model.refwork = true;

    } 
    console.log('element.productType',element.productType);
    if(element.prices && Array.isArray(element.prices)  && element.productType=='site'){
      
      this.model.site = true;
    }
    
    
    
    
    })
  
}

catalogOptsFactory() {
  this.model = {
    subscriptions: false,
    refwork: false,
    site: false
  };
  
  let publisher = localStorage.getItem('publisher')  ;
  if(!publisher)return ;
  
  
  let URL= this.base.CATALOG_CHECK+publisher;
  
  this.http.getDatawithGet(URL,'').subscribe((response:any)=>{
    

    console.log('response',response);
        var opts:any = {};
        if (response ) {
          opts = response;
        }
        if (opts['highwire.ecommercesvc.journal.subscriptions.enabled'] &&
        opts['highwire.ecommercesvc.journal.subscriptions.enabled'] !== 'false') {
          this.model.subscriptions = true;
        }
        if (opts['highwire.ecommercesvc.refwork.enabled'] &&
        opts['highwire.ecommercesvc.refwork.enabled'] !== 'false') {
          this.model.refwork = true;
        }
        if (opts['highwire.ecommercesvc.site.subscriptions.enabled'] &&
        opts['highwire.ecommercesvc.site.subscriptions.enabled'] !== 'false') {
          this.model.site = true;
        }
        
      
  
      })


  
    }
}
