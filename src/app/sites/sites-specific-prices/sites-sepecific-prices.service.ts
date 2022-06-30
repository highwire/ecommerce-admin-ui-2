// import { Injectable } from '@angular/core';
// import {HTTPService } from '../../services/http.service';
// import { BaseService } from 'src/app/services/base.service';
// import { throwError } from 'rxjs';
// import {hwValidator} from '../../services/hwvalidator.service'
// import { retry, catchError } from 'rxjs/operators';
// import { forkJoin, of, timer } from 'rxjs';

// import {Observable} from 'rxjs';



// @Injectable({
//   providedIn: 'root',
// })
// export class SPriceService {
// model:any;    
// bookList:any;
// SITE_TYPE_SERVICE_POINT = '/atom/site-type';
// AUTH_VERIFY = '/api/auth-verify';
// PRODUCT_TYPES_SP = '/api/catalogadm/producttypes';
// CATALOG_PUBLISHER_SP = '/api/catalogadm/publishers/';
// CATALOG_SITES = '/api/catalogadm/sites/';
//   messages: string[] = [];


// constructor(
//     public http: HTTPService,
//     public hwv:hwValidator,
//     public base: BaseService){
//     }



//     handleError(error :any) {

//         let errorMessage :any= '';
     
//         if (error.error instanceof ErrorEvent) {
     
//           // client-side error
     
//           errorMessage =error.error.message;
     
//         } else {
     
//           // server-side error
     
//           errorMessage =error.message;
     
//         }
     
//         window.alert(errorMessage);
     
//         return throwError(errorMessage);
     
//       }



// catalogModelInit(URL:any , pub:any) {
//     var self= this
    
//      var  bookList:any;

    
//     self.model.publisher = pub;

//     if (typeof self.model.publisher === 'undefined' || !self.model.publisher) {
//       self.model.loading = false;
//       console.log('will not init catalogself.Model');
//        return ('catalogself.Model requires a publisher id on init');
//     }
//     else if (self.model.publisher === '*') {
//       this.http.getDatawithGet(URL,'')
//         .subscribe(function retrieveProductsSuccess(response:any) {
//           if (!response || !response.data) {
//             return response;
//           }
//           if (typeof response.data === 'string') {
//             try {
//               response.data = JSON.parse(response.data);
//             }
//             catch (e) {
//               console.log('2xx but non-JSON response received back from catalogadm');
//               return self.handleError(e)
//             }
//           }
//           self.initProductTypes(response.data);
//           self.model.initialized = true;
//         //   $rootScope.$broadcast('catalogInit');
//           return self.model.publicationTypes;
//         }, function retrieveProductsFailure(response) {
//           self.handleError(response);
//         });
//     }
//     else {
//         this.http.getDatawithGet(URL,'')
//         .subscribe(function retrieveProductTypesSuccess(response:any) {
//           if (!response || !response.data) {
//             return self.handleError(response);
//           }
//           if (typeof response.data === 'string') {
//             try {
//               response.data = JSON.parse(response.data);
//             }
//             catch (e) {
//               console.log('2xx but non-JSON response received back from catalogadm');
//               return self.handleError(e);
//             }
//           }
//           self.initProductTypes(response.data);
//           return self.http.getDatawithGet(URL,'').subscribe((data)=>{
//             self.getCatalog(data);  
//             // return data;
//           });
//         }
//         // , function retrieveProductTypesFailure() {
//         //   return self.handleError('Failed to lookup product types in the service');
//         // })
//         // .then(function retrieveCatalogSuccess(response:any) {
          
//         // }, function retrieveCatalogFailure(response:any) {
//         //   console.log('failed to retrieve catalog for publisher');
//         //   console.log(self.model.publisher);
//         //   console.log(response.status);
//         //   console.log(response.data);
//         //   self.handleError(response);
//         // })
        
//     }

//     return ;
//   }

//   getCatalog(response:any){
//       var self=  this;
//     if (!response || !response.data) {
//         return self.handleError(response);
//       }
//       return self.processCatalog(response.data);

//   }
//   processcatelogAfter(){
//     var self= this;
//         self.model.loading = false;
//         self.model.initialized = true;
//     //   $rootScope.$broadcast('catalogInit');
//       return self.http.getDatawithPost(self.SITE_TYPE_SERVICE_POINT, {
//         publisher: self.model.publisher,
//         siteType: 'BookGroup'
//       }).subscribe((data:any)=>{
//         self.bookSiteLookup(data);
//       });
//     }
//     // , function processCatalogFailure(results:any) {
//     //   console.log('failed to init catalogModel');
//     //   self.model.loading = false;
//     //   self.handleError(results);
//     // })
    
// //   }

//   bookSiteLookup(response:any){
//       var self= this;
// var bookList:any;
    
//         if (!response || !response.data) {
//           console.log('unexpected response back from atom browse; assuming publisher has no book sites');
//           response = {
//             data: {feed: null}
//           };
//         }
//         else if (!response.data instanceof Object) {
//           try {
//             response.data = JSON.parse(response.data);
//           }
//           catch (e) {
//             console.log('Non-JSON response back from atom browse service');
//             console.log('Assuming publisher has no book sites');
//             console.log(response.data);
//             response.data = null;
//           }
//         }
//         if (!response.data.feed ||
//           typeof response.data.feed === 'undefined') {
//             console.log('unexpected response back from atom browse; assuming publisher has no book sites');
//             console.log(typeof response.data);
//             console.log(response.data);
//         }
//         else if (Array.isArray(response.data.feed)) {
//           // multiple book sites
//           self.model.bookSites = response.data.feed.map(function extractEntryObjects(elem) {
//             return elem.entry;
//           });
//           self.model.bookSiteTypes.folio = true;
//           self.model.productWhitelist.push('edition');
//           self.model.productWhitelist.push('section');
//         }
//         else if (angular.isObject(response.data.feed) && typeof response.data.feed.entry !== 'undefined') {
//           // single result
//           self.model.bookSites = [response.data.feed.entry];
//           self.model.bookSiteTypes.folio = true;
//           self.model.productWhitelist.push('edition');
//           self.model.productWhitelist.push('section');
//         }
//         else {
//           console.log('unexpected response format; assuming publisher has no book sites');
//           console.log(response.data);
//           console.log(typeof response.data);
//         }
  
//         if (self.model.bookSites.length > 0) {
//           self.bookList = self.model.bookSites.map(function extractCodes(elem:any) {
//             return elem.corpus;
//           });
//           self.model.journalSites = atomBrowseModel.corpusList
//             .filter(function removeBookSites(elem:any) {
//               return bookList.indexOf(elem.corpus) < 0;
//           });
//         }
//         else {
//           bookList = [];
//           // self.model.journalSites = atomBrowseModel.corpusList;
//         }
//         //deferred.resolve(model.allPrices);
//         return self.http.getDatawithPost(self.SITE_TYPE_SERVICE_POINT, {
//           publisher:self.model.publisher,
//           siteType: 'ItemSet'
//         }).subscribe((data)=>{
//             self.itemSetLookupSuccess(data);

//         });
//     //   }, function bookSiteLookupFailure(error:any) {
//     //     self.handleError(error);
//     //   })
      
//   }
//   itemSetLookupSuccess(response:any){
//       var self= this
//     // .then(function itemSetLookupSuccess(response:any) {
//         var itemSites = [];
//         if (!response || !response.data) {
//           console.log('unexpected response back from itemSet site lookup; assuming publisher has no book sites');
//           response = {
//             data: {feed: null}
//           };
//         }
//         else if (!angular.isObject(response.data)) {
//           try {
//             response.data = JSON.parse(response.data);
//           }
//           catch (e) {
//             console.log('Non-JSON response back from atom browse service');
//             console.log('Assuming publisher has no book sites');
//             console.log(response.data);
//             response.data = null;
//           }
//         }
//         if (!response.data.feed ||
//           typeof response.data.feed === 'undefined') {
//             console.log('unexpected response back from itemSet lookup; assuming publisher has no book sites');
//             console.log(typeof response.data);
//             console.log(response.data);
//         }
//         else if (Array.isArray(response.data.feed)) {
//           // multiple book sites
//           itemSites = response.data.feed.map(function extractEntryObjects(elem:any) {
//             return elem.entry;
//           });
//           self.model.bookSiteTypes.itemSet = true;
//           self.model.productWhitelist.push('ebook');
//           self.model.productWhitelist.push('chapter');
//         }
//         else if (Array.isObject(response.data.feed) && typeof response.data.feed.entry !== 'undefined') {
//           // single result
//           itemSites = [response.data.feed.entry];
//           self.model.bookSiteTypes.itemSet = true;
//           self.model.productWhitelist.push('ebook');
//           self.model.productWhitelist.push('chapter');
//         }
//         else {
//           console.log('unexpected response format for itemSites; assuming publisher has no book sites');
//           console.log(response.data);
//           console.log(typeof response.data);
//         }
//         console.log('checking itemSites');
//         console.log(itemSites);
//         if (itemSites.length > 0) {
//           bookList = bookList.concat(itemSites.map(function extractCodes(elem:any) {
//             return elem.corpus;
//           }));
//           self.model.journalSites = self.model.journalSites
//             .filter(function removeBookSites(elem:any) {
//               return bookList.indexOf(elem.corpus) < 0;
//           });
//           self.model.bookSites =self. model.bookSites.concat(itemSites);
//         }
//         else {
//           // self.model.journalSites = self.model.journalSites;
//         }
//         return self.http.getDatawithGet(self.CATALOG_SITES + self.model.publisher,'').subscribe((data)=>{
//             self.booksitegetdata(data);
//         })
//       }

  
// booksitegetdata(response:any){
//     var self= this
//     // .then(function catalogSitesSuccess(response:any) {
//         console.log('catalogSites request success');
//         console.log(response);
//         console.log(self.CATALOG_SITES + self.model.publisher);
//         if (response && response.data && Array.isArray(response.data)) {
//           self.model.sites = response.data;
//         };
//         console.log('catalogModel initialized');
//         console.log(self.model);
//         return self.model.allPrices;
//     //   }, function catalogSitesFailure(response:any) {
//     //     self.handleError(response);
//     //   });
// }

//   processCatalog(catalog:any) {
//       var self= this;
//     // var deferred = $q.defer();
//     console.log('processing catalog...');
//     console.log(typeof catalog);
//     console.log(catalog);

//     self.model.catalog = catalog;
    

//     Observable.forkJoin([self.model.catalog])(function extractAll(elem:any, idx:any) {
//       return self.extractEntry(elem, idx);
//     })
//       .subscribe(function extractionSuccess(results:any) {
//         console.log('catalog extraction success');
//         self.model.productTypes.forEach(function setupProduct(product:any) {
//           self.model.publicationTypes[product.type].pages = self.generatePages(self.model.publicationTypes[product.type].prices, PAGE_SIZE);
//           self.model.publicationTypes[product.type].totalResults = self.model.publicationTypes[product.type].prices.length;
//           self.model.publicationTypes[product.type].totalPages = self.model.publicationTypes[product.type].pages.length;
//           // set default view to all prices
//           self.model.publicationTypes[product.type].viewPrices = self.model.publicationTypes[product.type].prices;
//           self.model.publicationTypes[product.type].viewTotalItems = self.model.publicationTypes[product.type].viewPrices.length;
//           self.model.publicationTypes[product.type].viewPages = self.model.publicationTypes[product.type].pages;
//           self.model.publicationTypes[product.type].subtypes = product.subtypes;
//           for (var i = 0; i < product.subtypes.length; i++) {
//             self.model.publicationTypes[product.type][product.subtypes[i] + 'Pages'] =
//             self.generatePages(self.model.publicationTypes[product.type][product.subtypes[i] + 'Prices'], PAGE_SIZE);
//           }
//         });

//         return results;
//       }, function extractionFailure(results:any) {
//         console.log('failed to extract catalog entries to model');
//         console.log(results);
//         return results;
//       });

    
//   }

//   generatePages(valLists:any, pageSize:any) {
//     var retVal = [];
//     for (var i = 0; i < valLists.length; i++) {
//       if (i % pageSize === 0) {
//         retVal[Math.floor(i / pageSize)] = [valLists[i]];
//       } else {
//         retVal[Math.floor(i / pageSize)].push(valLists[i]);
//       }
//     }
//     return retVal;
//   }





// extractEntry(entry:any, catalogIndex:any) {
//     var self= this;
//     var deferred = $q.defer();
//     // note an isbn/eisbn will also validate as a slug, so you must check
//     // isbn before slug
//     entry.catalogIndex = catalogIndex;
//     if (typeof self.model.ptypeRootIndex[entry.productType] !== 'undefined') {
//       entry.entryType = self.model.ptypeRootIndex[entry.productType];
//     }
//     else {
//       entry.entryType = entry.type || entry.productType;
//     }
//     if (entry.entryType === 'site') {
//         self.initSubProduct(entry);
//       deferred.resolve(self.catalogIndex[entry.name]);
//     }
//     else if (entry.entryType === 'atomcollection') {
//         self.model.initCollectionProduct(entry)
//         .then(function initCollectionSuccess() {
//           deferred.resolve(entry);
//         }, function initCollectionFailure(error:any) {
//           console.log('error initializing collection product');
//           console.log(error);
//           console.log(entry);
//           deferred.reject(error);
//         })
//     }
//     else if (this.hwv.doi(entry.name) || this.hwv.pisaId(entry.name) ||
//     this.hwv.isbn(entry.name) || this.hwv.resourceId(entry.name)) {
//       // volume, issue, or article
//       self.model.initSubProduct(entry);
//       deferred.resolve(self.model.catalogIndex[entry.name]);
//     }
//     else if (this.hwv.issn(entry.name)) {
//       // corpus identified by issn
//       self.model.initIssnProduct(entry)
//         .then(function initIssnSuccess() {
//           deferred.resolve(entry);
//         }, function initIssnFailure(error:any) {
//           console.log('error initializing corpus by issn');
//           console.log(error);
//           console.log(entry);
//           deferred.reject(error);
//         });
//     }
//     else if (this.hwv.slug(entry.name)) {
//       // corpus
//       self.model.initCorpusProduct(entry)
//         .then(function initCorpusSuccess() {
//           deferred.resolve(entry);
//         }, function initCorpusFailure(error:any) {
//           console.log('error initializing corpus');
//           console.log(error);
//           console.log(entry);
//           deferred.reject(error);
//         });
//     }
//     else {
//       // unknown identifier type; assume not a corpus
//       self.model.initSubProduct(entry);

//       deferred.resolve(self.model.catalogIndex[entry.name]);
//     }

//     return deferred.promise;
//   }

//   initSubProduct(entry:any) {
//       var self= this;
//     entry.prices.forEach(function initializePrices(price:any, idx:any) {
//       self.initPriceModel(price, entry, false, idx);
//       self. model.allPrices.push(price);
//     });

//     self.model.catalogIndex[entry.name] = entry;
//   };

//   initPriceModel(price:any, entry:any, skipLists:any, priceIdx:any) {
//     var self= this;
//     var priceType, priceTypeArray, publicationTypeArray;
//     if (typeof self.model.ptypeRootIndex[entry.productType] !== 'undefined') {
//       price.entryType = self.model.ptypeRootIndex[entry.productType];
//     }
//     else {
//       price.entryType = entry.type || entry.productType;
//     }
//     priceType = price.name.replace('-price', '');
//     if (priceType === price.entryType && !self.hwv.issn(entry.name)) {
//       // top level price, e.g. journal level price
//     }
//     else if (!self.model.publicationTypes[price.entryType] ||
//       !self.model.publicationTypes[price.entryType][priceType + 'Prices']) {
//       return;
//     }
//     price.entryIdx = entry.catalogIndex;
//     price.priceIdx = priceIdx;
//     price.entryName = entry.name;
//     price.entryIdentifier = entry.identifier;
//     price.entryDescription = entry.description;
//     price.entryVolume = entry.volume;
//     price.entryIssue = entry.issue;
//     price.entryLastUpdated = entry.lastUpdated;
//     if (entry.topLevelCorpus) {
//       price.serviceProps = true;
//     }
//     if (price.amount === -1) {
//       price.forSale = false;
//     }
//     else {
//       price.forSale = true;
//     }
//     if (price.amount === 0) {
//       price.free = true;
//     }
//     else {
//       price.free = false;
//     }
//     price.priceType = priceType;
//     price[priceType + 'Price'] = this.formatAmountDisplay(price.amount);
//     price[priceType + 'AccessPeriod'] = price.interval;
//     price[priceType + 'AccessPeriodLabel'] = this.formatIntervalDisplay(price.interval);
//     price.intervalSort = price.interval === -1 ? 99999 : price.interval;
//     priceTypeArray = self.model.publicationTypes[price.entryType][priceType + 'Prices'];
//     publicationTypeArray = self.model.publicationTypes[entry.entryType].prices;

//     // if price is not saved yet, we want to initialize the ui properties, but
//     // let the user edit the price and save the price
//     // before we add it to the client side model.
//     if (skipLists) {
//       return price;
//     }

//     if (priceTypeArray) {
//       priceTypeArray.push(price);
//     }
//     else {
//     console.log('falsy priceTypeArray:');
//     console.log(priceTypeArray);
//     console.log(priceType);
//     console.log(self.model.publicationTypes[entry.entryType]);
//     }

//     if (publicationTypeArray && priceType !== 'journal') {
//       publicationTypeArray.push(price);
//     }

//     return price;
//   }
//   formatAmountDisplay(amount:any) {
//     if (amount === -1) {
//       return this.model.notForSaleLabel;
//     }
//     else if (amount === 0) {
//       return this.model.freeLabel;
//     }
//     return amount;
//   }


//   formatIntervalDisplay(interval:any) {
//     if (typeof this.model.accessPeriodMapping[interval] !== 'undefined') {
//       return this.model.accessPeriodMapping[interval];
//     }
//     else {
//       return interval;
//     }
//   }



// initProductTypes(productTypes:any) {
//     var self= this;
//     var baseUrlRe = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\/{1}/;
//     // var pub = authResolver.publisherId;
//     let pub = localStorage.getItem('publisher')  ;

//     productTypes.forEach(function processType(elem:any) {
//       var root = self.model.topLevelParent(elem);

//       if (typeof self.model.publicationTypes[root.name] === 'undefined') {
//         self.model.publicationTypes[root.name] = {};
//         self.model.publicationTypes[root.name].totalResults = null;
//         self.model.publicationTypes[root.name].totalPages = null;
//         self.model.publicationTypes[root.name].currentPage = 1;
//         self.model.publicationTypes[root.name].prices = [];
//         self.model.publicationTypes[root.name].pages = [];
//         self.model.publicationTypes[root.name].viewPrices = [];
//         self.model.publicationTypes[root.name].viewPages = [];
//         self.model.publicationTypes[root.name][root.name + 'Prices'] = [];
//         self.model.publicationTypes[root.name][root.name + 'Pages'] = [];
//         self.model.publicationTypes[root.name].selectablePages = [];
//         self.model.publicationTypes[root.name].defaults = {};
//         self.model.publicationTypes[root.name].subtypes = [];
//         self.model.publicationTypes[root.name].roleTypes = [];
//         self.model.publicationTypes[root.name].search = {
//           idType: null,
//           searchText: null,
//           sort: null
//         };
//         self.model.productTypes.push({
//           type: root.name,
//           subtypes: self.model.publicationTypes[root.name].subtypes
//         });
//         if (root.name === 'journal') {
//           // special handling for issn vs corpus products; ECOMSUITE-1057
//           self.model.publicationTypes[root.name][root.name + 'Prices'] = [];
//           self.model.publicationTypes[root.name][root.name + 'Pages'] = [];
//         }
//         if (!root.xmltype) {
//           self.model.ptypeIndex[root.name] = root.name;
//         }
//         else if (baseUrlRe.test(root.xmltype)) {
//           self.model.ptypeIndex[root.xmltype.replace(baseUrlRe, '')] = root.name;
//           self.model.ptypeIndex[root.xmltype.replace(baseUrlRe, '').toLowerCase()] = root.name;
//         }
//         else {
//           self.model.ptypeIndex[root.xmltype] = root.name;
//         }
//       }

//       if (root.name !== elem.name) {
//         self.model.publicationTypes[root.name][elem.name + 'Prices'] = [];
//         self.model.publicationTypes[root.name][elem.name + 'Pages'] = [];
//         self.model.publicationTypes[root.name].subtypes.push(elem.name);
//         if (!elem.xmltype) {
//           self.model.ptypeIndex[elem.name] = elem.name;
//         }
//         else if (baseUrlRe.test(elem.xmltype)) {
//           self.model.ptypeIndex[elem.xmltype.replace(baseUrlRe, '')] = elem.name;
//           self.model.ptypeIndex[elem.xmltype.replace(baseUrlRe, '').toLowerCase()] = elem.name;
//         }
//         else {
//           self.model.ptypeIndex[elem.xmltype] = elem.name;
//         }
//         self.model.ptypeRootIndex[elem.name] = root.name;
//       }
//       if (elem.roleType && typeof elem.roleType !== 'undefined') {
//         self.model.publicationTypes[root.name].roleTypes.push(elem.roleType)
//       }
//     });
//     // handle overrides
//     if (typeof catalogOverrides.publisher[pub] !== 'undefined') {
//       Object.keys(catalogOverrides.publisher[pub]).forEach(function pr(ptype) {
//         if (typeof self.model.publicationTypes[ptype] !== 'undefined' &&
//         angular.isObject(catalogOverrides.publisher[pub][ptype])) {
//           Object.keys(catalogOverrides.publisher[pub][ptype]).forEach(function ptk(prop) {
//             if (typeof self.model.publicationTypes[ptype][prop] !== 'undefined') {
//               console.log(self.model.publicationTypes[ptype][prop]);
//               self.model.publicationTypes[ptype][prop] = catalogOverrides.publisher[pub][ptype][prop];
//               console.log(self.model.publicationTypes[ptype][prop]);
//             }
//           })
//         }
//         if (typeof self.model.priceTypes[ptype] !== 'undefined' &&
//         catalogOverrides.publisher[pub][ptype] &&
//         Array.isArray(catalogOverrides.publisher[pub][ptype].subtypes)) {
//           self.model.priceTypes[ptype] = catalogOverrides.publisher[pub][ptype].subtypes;
//           self.model.productTypes.forEach(function overrideType(elem) {
//             if (elem.type === ptype) {
//               elem.subtypes = catalogOverrides.publisher[pub][ptype].subtypes;
//             }
//           });
//         }
//       });

//     console.log('completed catalog overrides');
//     }
//   };



//   topLevelParent(product:any) {
//     var root;

//     function checkParent(item:any) {
//       if (!item.parent) {
//         root = item;
//       }
//       else {
//         checkParent(item.parent);
//       }
//     }

//     checkParent(product);

//     return root;
//   };



// }
