import { Component, OnInit } from '@angular/core';
import {HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthresolverService } from 'src/app/auth/authresolver.service';
@Component({
  selector: 'app-publihser-list',
  templateUrl: './publihser-list.component.html',
  styleUrls: ['./publihser-list.component.css']
})
export class PublihserListComponent implements OnInit {
// private journalslect= new Subject<boolean>();
// authMenu
  // private hwp = new Subject<boolean>();
  // authMenu = this.hwpUser.asObservable();
publihserlist: any;
  constructor(
    public http: HTTPService,
    public base: BaseService,
    public router:Router,
    public auth: AuthresolverService,
  ) {

   }
  lead=  '';
  sublead= '';
  loadingMessage='';
  label='';
  authorizedLogins= ['abc1','abc2','abc3'];
  ngOnInit(): void {
    this.selectAllPublishers();
    localStorage.setItem('currency','');
  }
  selectAllPublishers(){
    
    this.http.getDatawithPost(this.base.PUBLISHER_LIST,'').subscribe((data:any)=>{
        console.log(data);
        this.publihserlist= data[this.base.APP_ROLE];
        let field= 'label'
        this.publihserlist.sort((a:any, b:any) => (a[field] || "").toString().localeCompare((b[field] || "").toString()))    
    })

  }
  selectPublishers(item:any){
    debugger;
    console.log('fdsfds');
    if(item=='*'){
      localStorage.setItem('publisher','*')
      localStorage.setItem('publisher-label','All Publishers')
    }else{
      localStorage.setItem('publisher',item.term)
    localStorage.setItem('publisher-label',item.label)
    

    }
    this.getDefalutCurrencyList();
    this.auth.jouranlselect(true);
    console.log(item);
    
    
  }
  getDefalutCurrencyList(){
    var currency:any= localStorage.getItem('defalut');
    if(currency){
        currency= JSON.parse(currency) ;
        this.getCurrencyList()
    }else{
      let publisher = localStorage.getItem('publisher')  ;
      
      let URL= this.base.CURRENCY_LIST+publisher+ '/defaultcurrency';
      this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
      // this.currency  =  res;
      localStorage.setItem('defaultcurrency',JSON.stringify(res));
        console.log('currency', res);     
        this.getCurrencyList();  
      })
    }  
  }

  getCurrencyList(){
    var currency:any= localStorage.getItem('currency');
    if(currency){
        currency= JSON.parse(currency) ;
        this.router.navigateByUrl('journals/specific');
    }else{

      let publisher = localStorage.getItem('publisher')  ;
      // var name =  window.encodeURIComponent(this.basedata.element.name)
      let URL= this.base.CURRENCY_LIST+publisher+ '/currencies';
      this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
      // this.currency  =  res;
      localStorage.setItem('currency',JSON.stringify(res));
        console.log(res); 
        if(res.length==0){
          var local=localStorage.getItem('defaultcurrency')+'';
          local= JSON.parse(local).currency;
          localStorage.setItem('currency',JSON.stringify([local]));
        }      
        
        this.router.navigateByUrl('journals/specific');
      })
    }
  
  }

}
