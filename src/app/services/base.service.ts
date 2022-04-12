import { Injectable,Inject } from '@angular/core';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessagepopupComponent } from '../common/messagepopup/messagepopup.component';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  URL='';
  PUBLISHER_LIST= environment.apiBase+ '/auth-verify';
  APP_ROLE=  "Intelligent Commerce Pricing and Reporting UI";
 
  PRODUCT_LIST= environment.apiBase+ '/catalogadm/publishers/';
  SITE_LIST=environment.apiBase+  '/authorized-sites';
  OPEN_URL=  environment.apiBase+ '/openurl/jnl/';
  DELETE_PRICE=  environment.apiBase+ '/catalogadm/publishers/';
  CURRENCY_LIST= environment.apiBase+ '/catalog/publishers/' ;
  DETAILED_REPORT=  environment.apiBase+ '/ecommerceadm/retrieve-report';
  CHART_REPORT=  environment.apiBase+ '/reports/charts/';
  
  MOST_POPULAR= environment.apiBase+ '/reports/product/';
SEND_RECEIPT=  environment.apiBase+   '/report/publishers/';  




// atom/lite/demonews.atom
  LIVE_REPORT='https://ecommerce.highwire.org/api/ecommerceadm/retrieve-report'
  
  
  ATOM_LOOKUP=environment.atomBase+ '/lookup/corpus/';
  ATOM_LITE=environment.atomBase+ '/lite/';
  ATOM_LITE_TWO=environment.atomBase+ '/lite'
 
  // constructor(private _snackBar: MatSnackBar) {}
  constructor(
    
  private _snackBar: MatSnackBar
  ) { }


  openSnackBar(durationInSeconds:any, message:any) {
    this._snackBar.openFromComponent(MessagepopupComponent, {
      duration: durationInSeconds * 1000,
      data:message
    });
  }
}
