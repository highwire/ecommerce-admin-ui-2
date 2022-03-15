import { Component, OnInit } from '@angular/core';
import {AuthresolverService} from '../auth/authresolver.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hwpUser: any;
  authz= {
    publisherName:''
  }
  constructor(
    public auth: AuthresolverService
  ) { }

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
    }
      

      );

  }

  

}
