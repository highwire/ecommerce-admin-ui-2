

import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';

import { Observable ,  BehaviorSubject ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Angulartics2 } from 'angulartics2';

import { AuthresolverService } from '../authresolver.service';
import { BrowserModule } from '@angular/platform-browser';
import { BaseService } from '../../services/base.service';
import { AuthGuardService } from '../auth-gaurd.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;


 

  authError: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private angulartics2: Angulartics2,
    private authz: AuthresolverService,
    private base :BaseService,
    public authguard:AuthGuardService
  ) { 
    this.cleardata();
    this.registerForm = this.formBuilder.group({
      user: ['', Validators.required],      
      persistLogin: ['',],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  ngOnInit() {
    
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

    // alert('SUCCESS!! :-)')
    // console.log('value',value);
    // debugger;
    
    // this.registerForm.value;
    this.authError = false;
    this.authz.login(
      this.registerForm.value.user,
      this.registerForm.value.password,
      this.registerForm.value.persistLogin,)
    .subscribe((result:any) => {
        let pubTerms = [];
        let publishers = '';
        if (!result) {
          this.authError = true;
          return;
        }

        // this.angulartics2.eventTrack.next({
        //   action: 'login:user',
        //   properties: {
        //     category: 'authorization',
        //     label: 'user-login',
        //     value: 1,
        //   }
        // })
        // this.authz.publishers.forEach((elem:any) => {
        //   this.angulartics2.eventTrack.next({
        //     action: 'access:publisher',
        //     properties: {
        //       category: 'authorization',
        //       label: elem.term,
        //       value: 1
        //     }
        //   });
        // });
        this.base.openSnackBar(5,'Login successfully.');
        this.router.navigateByUrl('journals/publishers');
      }
      // ,
      // error => {
      //   console.log(`error: ${error}`);
      //   this.authError = true;
      // }
    );
    this.authguard.isLoggedIn = !this.authguard.isLoggedIn
  }
  get loggedIn () {
      return this.authguard.isLoggedIn;
    };

  cleardata(){
    localStorage.setItem('menu','');
    localStorage.setItem('currency','');
    localStorage.setItem('defalut','');
    localStorage.setItem('publisher-label','');
    localStorage.setItem('auth','');
    localStorage.setItem('publisher','');
    localStorage.setItem('hwp-login','');
    localStorage.setItem('siteData','');
  }
}
