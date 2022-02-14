import { Component, OnInit } from '@angular/core';
import {HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
@Component({
  selector: 'app-publihser-list',
  templateUrl: './publihser-list.component.html',
  styleUrls: ['./publihser-list.component.css']
})
export class PublihserListComponent implements OnInit {
publihserlist: any;
  constructor(
    public http: HTTPService,
    public base: BaseService
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
    })

  }

}
