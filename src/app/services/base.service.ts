import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
 URL='';
 PUBLISHER_LIST= environment.apiBase+ '/auth-verify';
 APP_ROLE=  "Intelligent Commerce Pricing and Reporting UI";

  constructor() { }
}
