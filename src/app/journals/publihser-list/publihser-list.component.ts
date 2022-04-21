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
    localStorage.setItem('publisher',item.term)
    localStorage.setItem('publisher-label',item.label)
    
    this.router.navigateByUrl('journals/specific');
    this.auth.jouranlselect(true);
    console.log(item);
  }

}
