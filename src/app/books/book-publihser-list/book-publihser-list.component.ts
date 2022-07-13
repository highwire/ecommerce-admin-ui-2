import { Component, OnInit } from '@angular/core';
import {HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthresolverService } from 'src/app/auth/authresolver.service';
// import { debug } from 'console';
@Component({
  selector: 'app-book-publihser-list',
  templateUrl: './book-publihser-list.component.html',
  styleUrls: ['./book-publihser-list.component.css']
})
export class BookPublihserListComponent implements OnInit {
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
    if(item=='*'){
      localStorage.setItem('publisher','*')
      localStorage.setItem('publisher-label','All Publishers')
    }else{
      localStorage.setItem('publisher',item.term)
    localStorage.setItem('publisher-label',item.label)
    

    }
    this.getCurrencyList();
    this.auth.jouranlselect(true);
    console.log(item);
    
    
  }

  getCurrencyList(){
    debugger;
    var currency:any= localStorage.getItem('currency');
    if(currency){
      // this.currency= JSON.parse(currency) ;
        this.router.navigateByUrl('journals/specific');
    }else{

      let publisher = localStorage.getItem('publisher')  ;
      // var name =  window.encodeURIComponent(this.basedata.element.name)
      let URL= this.base.CURRENCY_LIST+publisher+ '/currencies';
      this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
      // this.currency  =  res;
      localStorage.setItem('currency',JSON.stringify(res));
        console.log(res);       
        this.router.navigateByUrl('journals/specific');
      })
    }
  
  }

}
