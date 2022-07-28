import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class hwValidator {
 URL='';
 PUBLISHER_LIST= environment.apiBase+ '/auth-verify';
 APP_ROLE=  "Intelligent Commerce Pricing and Reporting UI";
 
 slugRe = /^[A-Za-z0-9_.\-]+$/; // use to verify corpus code, slug, vol or iss number, etc.
//  isbnRe = /^(97(8|9))?\d{9}(\d|X)$/; // use for eISBN or ISBN numbers
 isbnRe = /(?=[-0-9 ]{17}|[-0-9X ]{13}|[0-9X]{10})(?:97[89][- ]?)?[0-9]{1,5}[- ]?(?:[0-9]+[- ]?){2}[0-9X]/g;
 atomRe = /^(\/{1})(([A-Za-z0-9_.\-]+)\/{1})*(([A-Za-z0-9_.\-]+)(\.atom){1})$/; // atom URI; e.g. /pnas.atom
 resourceIdRe = /^([A-Za-z0-9_.\-])+(\/{1}[A-Za-z0-9_.\-]+)?(\/{1}[A-Za-z0-9_.\-]+){1}$/; // use for resource id; e.g. 99/1, or 99/1/426, etc.
 pisaRe = /^(([A-Za-z0-9_.\-])+){1};{1}[A-Za-z0-9_.\-]+(\/{1}[A-Za-z0-9_.\-]+)+$/;
 issnRe = /^\d{4}-\d{3}[\dxX]$/;
 // https://www.crossref.org/blog/dois-and-matching-regular-expressions/
 doiA = /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
 doiB = /^10.1002\/[^\s]+$/i;
 doiC = /^10.\d{4}\/\d+-\d+X?(\d+)\d+<[\d\w]+:[\d\w]*>\d+.\d+.\w+;\d$/i;

 PRODUCT_LIST= environment.apiBase+ '/catalogadm/publishers/';
  constructor() { }

  slug(id:any) {
    return this.slugRe.test(id);
  }

  isbn(id:any) {
    return this.isbnRe.test(id);
  };
  getisbn(id:any) {
    return id.match(this.isbnRe);
  };

  


  atomUri(id:any) {
    return this.atomRe.test(id);
  };

  resourceId(id:any) {
    return this.resourceIdRe.test(id);
  };

  pisaId(id:any) {
    return this.pisaRe.test(id);
  };

  issn(id:any) {
    return this.issnRe.test(id);
  };

  doi(id:any) {
    return this.doiA.test(id) || this.doiB.test(id) || this.doiC.test(id);
  }


}
