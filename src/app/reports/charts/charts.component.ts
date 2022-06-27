import { Component, NgModule, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FormControl, FormGroup } from '@angular/forms';
import { HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { __values } from 'tslib';
// declare var moment: any;
// import moment from 'moment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chartinstan:any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  myControl = new FormControl();
  showdrop: any = false;
  masterData: any;
  currency:any[] = []
  pricearray: any;
  displayedColumns: string[] = ['name', 'description', 'options', 'productType', 'price_interval', 'price_amount','date'];
  freeLabel = 'Free';
  notForSaleLabel = 'Not for Sale';
  clickedRows = new Set<any>();
  products: any;
  isLoading = false;
  sitedata: any; 
  selectedCurrency:any= '  All Currencies';	
  masterdata:any 
  myChart: any;
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(
    public http: HTTPService,
    public base: BaseService,

  ) { }

  ngOnInit(): void {

    this.dateRange.patchValue({
      start: "2022-05-16T06:01:48.070Z",
      end: "2022-05-25T06:23:52.070Z"
   });

    this.selectAllPublishers();
    this.selectAllListPublishers();
    var curr= localStorage.getItem('currency')+'';
    if(curr)
    this.currency=  JSON.parse(curr);

    
    // let myChart=null
    this.myChart = document.getElementById("myChart");
    
    // myChart = new Chart(ctx,config)
    
    Chart.register(...registerables);
    //this.loadChart();
    this.getChartData();
    
    this.selectedItems = [

    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'corpus',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,

      closeDropDownOnSelection: true
    };

  }
  //////////////////
  onItemSelect(item: any) {
    this.extractPrice(this.masterData, item.corpus);
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  currencySelect(currency:any){	
    debugger	
    this.selectedCurrency= currency	
    console.log(currency);	
    this.extractPrice(this.masterdata, currency=='Currencies' ? '':currency, '');	
  }	

  selectAllListPublishers(){
    let publisher = localStorage.getItem('publisher')  ;
    let URL= this.base.PRODUCT_LIST+ publisher+'/products';
    this.http.getDatawithGet(URL,publisher).subscribe((data:any)=>{
        console.log(data);
        this.filterDOI(data);
       
    })
  }

  onSelectionChange(event:any){
    console.log('onSelectionChange called', event.option.value);

    this.sitedata.forEach((element:any) => {
      if(event.option.value==  element.corpus){
        this.myControl.setValue(element.title);
      }

    });
    this.extractPrice(this.masterData, event.option.value);
  }

  selectAllPublishers(){
    // let publisher = localStorage.getItem('publisher')  ;
    // let URL= this.base.SITE_LIST;
    // var data={
    //   pubTerm: publisher,
    //   role: "Intelligent Commerce Pricing and Reporting UI",
    //   userId: "2"
    // }
    // this.http.getDatawithPost(URL,data).subscribe((data:any)=>{
    //     console.log(data);             
    //     this.sitedata =  data.sites;
    // })


    var site:any= localStorage.getItem('siteData');
    if(site){
      this.sitedata= JSON.parse(site) ;
      console.log('this.sitedata ${this.sitedata}')
    }

  }
  formatAmountDisplay(amount:any) {
    if (amount === -1) {
      return this.notForSaleLabel;
    }
    else if (amount === 0) {
      return this.freeLabel;
    }
    return amount;
  }
  filterDOI(data:any)
  {    
    this.masterData= data
  

}
dropDownChange(value:any){
  console.log(value.values);
  this.extractPrice(this.masterData, value.value);

}

extractPrice(data:any, pub:any, currencies?:any){
  
  var self= this;
  var pricearray:any= [];
  data.forEach((element:any) => {
    // console.log(element);
    if(element.prices && Array.isArray(element.prices) && element.name==pub ){
      element.prices.forEach((elements:any) => {   
        // if(elements.name=='chapter-price'  || elements.name=='edition-price' )
      // (entry.productType=='ebook' && entry.name=='edition-price' )
        pricearray.push({
          // name: element.name,
          // productType:element.productType,
          // description:element.description,      
          // identifier: element.identifier,
          price_amount: self.formatAmountDisplay (elements.amount),
          // price_currency:elements.currency,
          // price_interval:elements.interval,
          // price_name:elements.name
        })  
      });      
    }
    else if( currencies){	
      if(element.currency.toUpperCase()==currencies)	
      pricearray.push(element)  	
    }else{	
      pricearray.push(element)  	
  }	



  this.pricearray=  pricearray;
  console.log('this.pricearray',this.pricearray);


})}


  getChartData() {
    debugger
    let publisher = localStorage.getItem('publisher');
    let URL = this.base.CHART_REPORT + publisher;
    var data = {
      "options":
      {
        "end": this.dateRange.value.end,
      
        "start": this.dateRange.value.start,
        "dateFormat": this.dateFormat(this.dateRange),
        "bookSites": [],
        "publications": []
      }
    }
    // this.dateFormat(this.dateRange)
    // let DATA= {
    //   // "endDate": this.dateRange.value.s
    //   "endDate": this.dateRange.value.end,
    //   "pub": publisher,
    //   "startDate": this.dateRange.value.start


    // }
    this.http.getDatawithPost(URL, data).subscribe((data: any) => {
      
      console.log('chart data', data.result);
      
     
      this.genratechartdata(data.result,data.range);
      // var reports = this.extractChartsReport(data);
      // console.log('    data            ', reports);
    })
  }

  genratechartdata(data1: any,daterange:any) {
    var Currency = 'USD';
    var amountsArray:any=[];
    let siteData:any=  localStorage.getItem('siteData') 
    if(siteData){
      siteData= JSON.parse(siteData);
      siteData.forEach((element:any) => {
        if(data1[element.corpus] && data1[element.corpus]!== undefined){
          var obj:any={};
          obj['amount']=[];
          obj['date']=[]
            data1[element.corpus][Currency].values.forEach((element:any) => {          
              obj['amount'].push(element.amount) ,
              obj['date'].push(moment(element.date).format('D MMM YYYY') )               
            });            
            obj['articel']= element.title;
            amountsArray.push(obj);
          }      
      });     
      console.log('amountsArray',amountsArray);
    }
    let data =data1. $all[Currency].values  
    var amounts: any = [];
    var dates: any = [];
    data.forEach((element: any) => {
      amounts.push(element.amount);
      dates.push( moment(element.date).format('D MMM YYYY') );          
    });

    let datesrages:any= [];
    daterange.forEach((element:any) => {
      console.log(element.date);
      datesrages.push(moment(element.date).format('D MMM YYYY') ) 
    });
    this.loadChart(amounts, dates,amountsArray,datesrages);
    console.log(amounts);
  }
  random(number:any){
    return Math.floor(Math.random()*number);;
}

random_rgba(){
  // random_rgba() {
    // var o = Math.round, r = Math.random, s = 255;
    // return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    return 'rgb('+this.random(255)+','+this.random(255)+','+this.random(255)+')';    

}
 
loadChart(amounts: any, dates: any, amountsArray:any,datesrages:any): void {   
    if (this.chartinstan != undefined) {
      this.chartinstan.destroy();
    }
    let datasets:any= []
    amountsArray.forEach((element:any) => {
      let colors:any=[]
        colors.push(this.random_rgba())
        
      datasets.push(
        {
          label: element.articel,
          data: element.amount,
          backgroundColor:colors
           
          ,
          borderColor:["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"]
          
        
        })
    });
     
    this.chartinstan= new Chart(this.myChart,
       {
      
      type: 'bar',
      data: {
        datasets: datasets,
        labels: datesrages,
        
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        
        scales: {
          y: {
            beginAtZero: true,
            // display:false //agar grid hatani ho
          },
          
        },
        
      }            
    })    
  }

  // extractChartsReport(report: any) {
  //   // debugger
  //   var self = this;
  //   var
  //     corpusIdx: any = {},
  //     max = 0,
  //     genericRange,
  //     isbnRe = /(?=[-0-9 ]{17}|[-0-9X ]{13}|[0-9X]{10})(?:97[89][- ]?)?[0-9]{1,5}[- ]?(?:[0-9]+[- ]?){2}[0-9X]/g;

  //   // if (!report || !report.data || !Array.isArray(report.data.transactions)) {
  //   //   return '';
  //   // }
    

  //   report.result = {
  //     salesPerf: []
  //   };
    

  //   // generic copy of bucket range for UI to use if necessary
  //   // to fill in zero-data for  currency/jcode combinations
  //   // not represented in the data
  //   genericRange = this.getRange(report);
  //   report.range = genericRange.buckets.map(function cpBucket(bckt: any) {
  //     return {
  //       date: bckt.date,
  //       amount: bckt.amount
  //     }
  //   });
  //   report.data.transactions.forEach(function processTransactn(elem: any) {
  //     var isbn;
  //     if (typeof corpusIdx[elem.journalCode] === 'undefined') {
  //       corpusIdx[elem.journalCode] = {};
  //     }
  //     if (typeof corpusIdx.$all === 'undefined') {
  //       corpusIdx.$all = {};
  //     }
  //     if (typeof corpusIdx[elem.journalCode][elem.currency] === 'undefined') {
  //       corpusIdx[elem.journalCode][elem.currency] = {
  //         currency: elem.currency,
  //         corpus: elem.journalCode,
  //         max: 0
  //       };
  //       corpusIdx[elem.journalCode][elem.currency].range = self.getRange(report);
  //     }
  //     if (typeof corpusIdx.$all[elem.currency] === 'undefined') {
  //       corpusIdx.$all[elem.currency] = {
  //         currency: elem.currency,
  //         max: 0
  //       };
  //       corpusIdx.$all[elem.currency].range = self.getRange(report);
  //     }
  //     if (typeof corpusIdx.$all[elem.currency]['$type-' + elem.resourceType] ===
  //       'undefined') {
  //       corpusIdx.$all[elem.currency]['$type-' + elem.resourceType] = {
  //         currency: elem.currency,
  //         max: 0
  //       };
  //       corpusIdx.$all[elem.currency]['$type-' + elem.resourceType].range =
  //         self.getRange(report);
  //     }
  //     corpusIdx[elem.journalCode][elem.currency].range.assign(elem);
  //     corpusIdx.$all[elem.currency].range.assign(elem);
  //     corpusIdx.$all[elem.currency]['$type-' + elem.resourceType].range.assign(elem);
  //     if (Array.isArray(report.bookSites) &&
  //       report.bookSites.indexOf(elem.journalCode) !== -1) {
  //       isbn = elem.resourceId.match(isbnRe);
  //       isbn = isbn ? isbn[0] : null;
  //       if (isbn) {
  //         if (typeof corpusIdx[isbn] === 'undefined') {
  //           corpusIdx[isbn] = {};
  //         }
  //         if (typeof corpusIdx[isbn][elem.currency] === 'undefined') {
  //           corpusIdx[isbn][elem.currency] = {
  //             currency: elem.currency,
  //             corpus: elem.journalCode,
  //             isbn: isbn
  //           }
  //           corpusIdx[isbn][elem.currency].range = self.getRange(report);
  //         }
  //         corpusIdx[isbn][elem.currency].range.assign(elem);
  //       }
  //     }
  //     if (isFinite(elem.amount)) {
  //       if (elem.amount > max) {
  //         max = elem.amount;
  //       }
  //     }
  //   });
  //   Object.keys(corpusIdx).forEach(function cps(corpus) {
  //     Object.keys(corpusIdx[corpus]).forEach(function mc(currency) {
  //       if (corpus === '$all') {
  //         Object.keys(corpusIdx.$all[currency]).forEach(function dpt(prop) {
  //           if (prop.indexOf('$type-') !== -1) {
  //             corpusIdx[corpus][currency][prop].values =
  //               corpusIdx[corpus][currency][prop].range.buckets;
  //             corpusIdx[corpus][currency][prop].max =
  //               corpusIdx[corpus][currency][prop].range.max;
  //             delete corpusIdx[corpus][currency][prop].range;
  //           }
  //         })
  //       }
  //       corpusIdx[corpus][currency].values = corpusIdx[corpus][currency].range.buckets;
  //       corpusIdx[corpus][currency].max = corpusIdx[corpus][currency].range.max;
  //       delete corpusIdx[corpus][currency].range;
  //     });
  //   });
  //   report.result = corpusIdx;
  //   report.max = max;
  //   return report;
  // };


  refreshCharts(date:any,amount:any,keys: any, curr: any, labels: any, types: any, ecomReports: any, currencies: any) {

    if (!Array.isArray(keys)) {
      return;
    }
    if (!Array.isArray(curr)) {
      curr = [currencies.default];
    }
    if (!Array.isArray(types)) {
      types = [];
    }
    if (!labels) {
      labels = {};
      
    }
    if (!date) {
      date = {};
      
    }
    if (!amount) {
      amount = {};
      
    }

    Object.keys(ecomReports.charts.result).forEach(function cps(key) {
      Object.keys(ecomReports.charts.result[key]).forEach(function mc(currency) {
        var max, currentMax, typeResult: any;
        if (curr.indexOf(currency) === -1) {
          return;
        }
        if (keys.indexOf(key) === -1) {
          return;
        }
        if (!ecomReports.charts.salesPerf[currency]) {
          ecomReports.charts.salesPerf[currency] = {
            data: [],
            max: 0
          };
        }
        if (types.length > 0) {
          typeResult = {
            key: labels[key],
            values: ecomReports.charts.range.map(function mapZero(elem: any) {
              return {
                amount: 0,
                date: elem.date,
                key: labels[key]
              };
            }),
            max: 0
          };

          types.forEach(function checkType(elem: any) {
            if (typeof (
              ecomReports.charts.result[key][currency]['$type-' + elem] == "object") &&
              Array.isArray(ecomReports.charts.result[key][currency]['$type-' + elem].values)) {
              for (var i = 0; i < ecomReports.charts.result[key][currency]['$type-' + elem].values.length; i++) {
                if (typeResult.values[i]) {
                  typeResult.values[i].amount +=
                    ecomReports.charts.result[key][currency]['$type-' + elem].values[i].amount;
                }
              }
              if (typeResult.max <
                ecomReports.charts.result[key][currency]['$type-' + elem].max) {
                typeResult.max = ecomReports.charts.result[key][currency]['$type-' + elem].max;
              }
            }
          });
          ecomReports.charts.salesPerf[currency].data.push(typeResult);
          max = typeResult.max;
          currentMax = ecomReports.charts.salesPerf[currency].max;
          if (isFinite(max) && max > currentMax) {
            ecomReports.charts.salesPerf[currency].max = max;
          }
        }
        else {
          ecomReports.charts.salesPerf[currency].data.push({
            key: labels[key],
            values: ecomReports.charts.result[key][currency].values
          });
          max = ecomReports.charts.result[key][currency].max;
          currentMax = ecomReports.charts.salesPerf[currency].max;
          if (isFinite(max) && max > currentMax) {
            ecomReports.charts.salesPerf[currency].max = max;
          }
        }
      });
    });
    curr.forEach(function spk(currency: any) {
      var zeroVals;
      if (!ecomReports.charts.salesPerf[currency]) {
        ecomReports.charts.salesPerf[currency] = {
          data: [],
          max: 0
        };
      }
      if (ecomReports.charts.salesPerf[currency].data.length === 0) {
        zeroVals = ecomReports.charts.range.map(function mapZero(elem: any) {
          return {
            amount: elem.amount,
            date: elem.date,
            key: 'Sales - ' + currency
          };
        });
        ecomReports.charts.salesPerf[currency].data.push({
          key: 'Sales - ' + currency,
          values: zeroVals
        })
      }
      if (ecomReports.charts.salesPerf[currency].max === 0) {
        ecomReports.charts.d3[currency].chart.yDomain = [0, 100];
      }
      else {
        delete ecomReports.charts.d3[currency].chart.yDomain;
      }
    });

  };

  dateFormat(dateRange:any) {
    var time, days;
    if (!dateRange || !dateRange.value.start || !dateRange.value.end) {
      
      return false;
    }
    if (typeof dateRange.value.start === 'string' ||
        typeof dateRange.value.start === 'number') {
      dateRange.value.start = new Date(dateRange.value.start);
    }
    if (typeof dateRange.value.end === 'string' ||
        typeof dateRange.value.start === 'number') {
      dateRange.value.end = new Date(dateRange.value.end);
    }
    // if (!angular.isDate(dateRange.value.start) || !angular.isDate(dateRange.value.end)) {
      // return false;
    // }
    // time difference
    time = Math.abs(dateRange.value.start.getTime() - dateRange.value.end.getTime());
    // calc days
    days = Math.ceil(time / (1000 * 3600 * 24));

    if (days < 15) {
      return 'day';
    }
    else if (days < 56) {
      return 'week';
    }
    else if (days < 548) {
      return 'month';
    }
    else {
      return 'year';
    }
  };


  getRange(options: any) {
    var result: any = {}, range: any;    
    result.ranges = options.range;
    result.buckets = [];
    result.max = 1;
    
    result.ranges.forEach(function indexBucket(rge: any) {
      result.buckets.push({
        date:     moment(rge.date).format('D MMM YYYY'),
        amount: rge.amount,
        
    
      });
    });
    result.assign = function assignItemToBucket(item: any) {
      result.ranges.forEach(function checkRange(rge: any, idx: any) {
        if (rge.contains(item.transactionDateTime)) {
          result.buckets[idx].amount += item.amount;
          if (result.buckets[idx].amount > result.max) {
            result.max = result.buckets[idx].amount;
          }
        }
      });
    };
    return result;
  };
}
function destroy() {
  throw new Error('Function not implemented.');
}






