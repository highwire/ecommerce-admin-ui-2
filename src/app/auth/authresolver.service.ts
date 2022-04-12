import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable ,  BehaviorSubject ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Angulartics2 } from 'angulartics2';

// import { AuthMenu } from 'admin-core-ui';

import { AuthorizedSitesResponse } from './authorized-sites-response';
import { Corpus } from './corpus';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';

import { LoginResponse } from './login-response';
import { Subject } from "rxjs";
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthresolverService {
  private loginUrl = environment.loginUrl;
  public role = environment.appRole;
  public username: string | null = null;
  private privs: any = [];
  // public authMenu: BehaviorSubject<AuthMenu> = new BehaviorSubject(null);
  // public hwpUser: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private hwpUser = new Subject<boolean>();
  authMenu = this.hwpUser.asObservable();
  private joural = new Subject<boolean>();
  jouralMenu = this.joural.asObservable();


  public publishers = [];
  public publisherSites = {};
  // public corpusSelection: BehaviorSubject<Corpus> = new BehaviorSubject(null);
  public publisherName: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    public jwtHelper: JwtHelperService,
    private base :BaseService
  ) { }

  login(user: string, password: string, persistLogin: boolean): any {
    return this.http.post<LoginResponse>(this.loginUrl, {
      user: user,
      password: password,
      persistLogin: persistLogin,
      role: "Intelligent Commerce Pricing and Reporting UI"
    })
    .pipe(
      tap(response => {
        // set localstorage token
        if (response && response.token) {
          console.log('response',response);
          this.username = user;
          localStorage.setItem('hwp-login', response.token);
          // todo: need better way to determine internal users from backend servers
          if (this.username === 'ddt' || this.username === 'admin@highwire.org') {
            this.authselect(true);
          }
          else {
            this.authselect(false);
          }
        }

        this.authz();
      }),
      catchError(this.handleError('login', null))
    )
  }

  logout(): void {
    this.username = null;
    this.privs = [];
    this.publishers = [];
    this.publisherName.next('');
    localStorage.clear();
    this.authselect(false);

    this.router.navigate(['/login'], {});
  }
  jouranlselect(parms:any){
    this.joural.next(parms);
    
  }
  authselect(parms:any){
      this.hwpUser.next(parms);
  }
  authz(): boolean {
    const self = this;
    const token = localStorage.getItem('hwp-login');
    if (!token) {
      return false;
    }
    const expired = this.jwtHelper.isTokenExpired(token);
    if (expired) {
      this.publishers = [];
      return false;
    }
    const privs = this.jwtHelper.decodeToken(token);

    if (privs && privs[this.role]) {
      this.publishers = privs[this.role];
      console.log(this.publishers);
      if (privs[this.role][0] && privs[this.role][0].identity) {
        this.username = privs[this.role][0].identity.username;
      }
      else {
        this.username = '';
      }
      // todo: need better way to determine internal users from backend servers
      if (this.username === 'ddt' || this.username === 'admin@highwire.org') {
        this.authselect(true);
      }
      else {
        this.authselect(false);
      }
      if (privs[this.role].length === 1) {
        this.publisherName.next(privs[this.role][0].label);
      }
    }
    // self.authMenu.next({
    //   id: 'auth-menu',
    //   label: this.username,
    //   items: [
    //     {
    //       id: 'logout',
    //       label: 'Logout',
    //       click: () => {
    //         this.username = null;
    //         localStorage.clear();
    //         self.authMenu.next(null);
    //         self.router.navigate(['/login'], {});
    //       }
    //     }
    //   ]
    // })
    return true;
  }

  // sites(publisherId: string): Observable<AuthorizedSitesResponse> {
  //   let ar = this;
  //   if (ar.publisherSites.hasOwnProperty(publisherId)) {
  //     return ar.publisherSites[publisherId];
  //   }
  //   else {
  //     let userId = '';
  //     for (let i = 0; i < ar.publishers.length; i++) {
  //       if (ar.publishers[i].identity && ar.publishers[i].identity.userId &&
  //       ar.publishers[i].term === publisherId) {
  //         userId = ar.publishers[i].identity.userId;
  //       }
  //     }
  //     return ar.http.post<AuthorizedSitesResponse>(`${environment.apiBase}/authorized-sites`, {
  //         pubTerm: publisherId,
  //         userId: userId,
  //         role: ar.role
  //       })
  //       .pipe(
  //         tap(response => {
  //           return response;
  //         }),
  //         catchError(ar.handleError('sites', {
  //           username: ar.username,
  //           email: '',
  //           pub: publisherId,
  //           role: ar.role,
  //           sites: []
  //         })
  //       )
  //     )
  //   }
  // }

  // selectedSite(): BehaviorSubject<Corpus> {
  //   let ar = this;
  //   return ar.corpusSelection;
  // }

  // selectSite(c: Corpus): any {
  //   let ar = this;
  //   ar.corpusSelection.next(c);
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    
    return (error: any): Observable<T> => {
      console.error(error);
      this.base.openSnackBar(5,'Login fail.');
      this.log(`${operation} failed: ${error || error.message}`);
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add('Authresolver: ' + message);
  }
}
