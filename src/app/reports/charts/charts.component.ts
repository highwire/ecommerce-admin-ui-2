import { Component, OnInit } from '@angular/core';
import{Chart,registerables} from'chart.js';
import { FormControl, FormGroup } from '@angular/forms';
import {HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
// let twix = require('twix');


// require('twix');


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart:any;


  
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(
    public http: HTTPService,
    public base: BaseService,
    
  ) { }

  ngOnInit(): void {
    const date = moment();
console.log('date',date);
    this.chart=document.getElementById("my-first-chart");
  Chart.register(...registerables);
  //this.loadChart();
  this.getChartData();
  }

  getChartData(){
    var Currency= 'USD'
    let publisher = localStorage.getItem('publisher')  ;
    let URL= this.base.CHART_REPORT+publisher;
    var data={"options":
    {
      "start":"2022-02-28T01:48:36.610Z",
    "end":"2022-03-07T01:48:38.366Z",
    "dateFormat":"day",
    "bookSites":[],
    "publications":[]
    }}

    // let DATA= {
    //   // "endDate": this.dateRange.value.s
    //   "endDate": this.dateRange.value.end,
    //   "pub": publisher,
    //   "startDate": this.dateRange.value.start

      
    // }
    this.http.getDatawithPost(URL,data).subscribe((data:any)=>{
      // debugger;
      console.log('chart data', data.result.$all[Currency].values      );
      this.genratechartdata(data.result.$all[Currency].values );
      var reports= this.extractChartsReport(data);
      console.log('    data            ', reports); 
      
      
        
       
    })
  }
genratechartdata(data:any){
  var amounts:any=[];
  var dates:any=[];


  data.forEach((element:any) => {
    amounts.push(element.amount);
    dates.push(element.date);
    

    
    
  });
  this.loadChart(amounts,dates);
  console.log(amounts);


}

  loadChart(amounts:any,dates:any):void{
    new Chart(this.chart,{
      type:'bar',
      data:{
        datasets:[{
          label: 'Grouped',
          data: amounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(201, 203, 207, 0.5)',
            'rgba(153, 102, 254, 0.5)',
            'rgba(201, 203, 239, 0.5)',
            'rgba(153, 102, 234, 0.5)',
            'rgba(201, 203, 218, 0.5)',
            'rgba(201, 214, 290, 0.5)',
          ]},
          {
            data:[0,40,60,80,100],
            label:'Stacked',
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(153, 102, 254, 0.2)',
            'rgba(201, 203, 239, 0.2)',
            'rgba(153, 102, 234, 0.2)',
            'rgba(201, 203, 218, 0.2)',
            'rgba(201, 214, 290, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'],
          },
          
        ],
        labels: dates,
      },
      options: {
        responsive:true,
        maintainAspectRatio:false,
        scales: {
            y: {
                beginAtZero: true,
                // display:false //agar grid hatani ho
            }
        }
    }
    })
  }

  







  extractChartsReport(report:any) {
    var self= this;
    var 
      corpusIdx :any= {},
      max = 0,
      genericRange,
      isbnRe = /(?=[-0-9 ]{17}|[-0-9X ]{13}|[0-9X]{10})(?:97[89][- ]?)?[0-9]{1,5}[- ]?(?:[0-9]+[- ]?){2}[0-9X]/g;
  
    // if (!report || !report.data || !Array.isArray(report.data.transactions)) {
    //   return '';
    // }
    report.result = {
      salesPerf: []
    };
  
    // generic copy of bucket range for UI to use if necessary
    // to fill in zero-data for  currency/jcode combinations
    // not represented in the data
    genericRange = this.getRange(report);
    report.range = genericRange.buckets.map(function cpBucket(bckt:any) {
      return {
        date: bckt.date,
        amount: bckt.amount
      }
    });
    report.data.transactions.forEach(function processTransactn(elem:any) {
      var isbn;
      if (typeof corpusIdx[elem.journalCode] === 'undefined') {
        corpusIdx[elem.journalCode] = {};
      }
      if (typeof corpusIdx.$all === 'undefined') {
        corpusIdx.$all = {};
      }
      if (typeof corpusIdx[elem.journalCode][elem.currency] === 'undefined') {
        corpusIdx[elem.journalCode][elem.currency] = {
          currency: elem.currency,
          corpus: elem.journalCode,
          max: 0
        };
        corpusIdx[elem.journalCode][elem.currency].range = self.getRange(report);
      }
      if (typeof corpusIdx.$all[elem.currency] === 'undefined') {
        corpusIdx.$all[elem.currency] = {
          currency: elem.currency,
          max: 0
        };
        corpusIdx.$all[elem.currency].range = self.getRange(report);
      }
      if (typeof corpusIdx.$all[elem.currency]['$type-' + elem.resourceType] ===
      'undefined') {
        corpusIdx.$all[elem.currency]['$type-' + elem.resourceType] = {
          currency: elem.currency,
          max: 0
        };
        corpusIdx.$all[elem.currency]['$type-' + elem.resourceType].range =
        self.getRange(report);
      }
      corpusIdx[elem.journalCode][elem.currency].range.assign(elem);
      corpusIdx.$all[elem.currency].range.assign(elem);
      corpusIdx.$all[elem.currency]['$type-' + elem.resourceType].range.assign(elem);
      if (Array.isArray(report.bookSites) &&
      report.bookSites.indexOf(elem.journalCode) !== -1) {
        isbn = elem.resourceId.match(isbnRe);
        isbn = isbn ? isbn[0] : null;
        if (isbn) {
          if (typeof corpusIdx[isbn] === 'undefined') {
            corpusIdx[isbn] = {};
          }
          if (typeof corpusIdx[isbn][elem.currency] === 'undefined') {
            corpusIdx[isbn][elem.currency] = {
              currency: elem.currency,
              corpus: elem.journalCode,
              isbn: isbn
            }
            corpusIdx[isbn][elem.currency].range = self.getRange(report);
          }
          corpusIdx[isbn][elem.currency].range.assign(elem);
        }
      }
      if (isFinite(elem.amount)) {
        if (elem.amount > max) {
          max = elem.amount;
        }
      }
    });
    Object.keys(corpusIdx).forEach(function cps(corpus) {
      Object.keys(corpusIdx[corpus]).forEach(function mc(currency) {
        if (corpus === '$all') {
          Object.keys(corpusIdx.$all[currency]).forEach(function dpt(prop) {
            if (prop.indexOf('$type-') !== -1) {
              corpusIdx[corpus][currency][prop].values =
              corpusIdx[corpus][currency][prop].range.buckets;
              corpusIdx[corpus][currency][prop].max =
              corpusIdx[corpus][currency][prop].range.max;
              delete corpusIdx[corpus][currency][prop].range;
            }
          })
        }
        corpusIdx[corpus][currency].values = corpusIdx[corpus][currency].range.buckets;
        corpusIdx[corpus][currency].max = corpusIdx[corpus][currency].range.max;
        delete corpusIdx[corpus][currency].range;
      });
    });
    report.result = corpusIdx;
    report.max = max;
  
    return report;
  };
  


  refreshCharts(keys:any, curr:any, labels:any, types:any,ecomReports:any,currencies:any) {
    
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
    
    Object.keys(ecomReports.charts.result).forEach(function cps(key) {
      Object.keys(ecomReports.charts.result[key]).forEach(function mc(currency) {
        var max, currentMax, typeResult:any;
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
            values: ecomReports.charts.range.map(function mapZero(elem:any) {
              return {
                amount: 0,
                date: elem.date,
                key: labels[key]
              };
            }),
            max: 0
          };

          types.forEach(function checkType(elem:any) {
            if (typeof (
            ecomReports.charts.result[key][currency]['$type-' + elem]=="object" ) &&
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
          if (isFinite(max) &&  max > currentMax) {
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
          if (isFinite(max) &&  max > currentMax) {
            ecomReports.charts.salesPerf[currency].max = max;
          }
        }
      });
    });
    curr.forEach(function spk(currency:any) {
      var zeroVals;
      if (!ecomReports.charts.salesPerf[currency]) {
        ecomReports.charts.salesPerf[currency] = {
          data: [],
          max: 0
        };
      }
      if (ecomReports.charts.salesPerf[currency].data.length === 0) {
          zeroVals = ecomReports.charts.range.map(function mapZero(elem:any) {
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


  getRange (options:any) {
    var result:any = {}, range:any;
    // range =  moment(options.start).twix(moment()).count('weeks');
    // var t = moment("1982-01-25T09:30").twix("1982-01-25T13:30");
// debugger
// let twix = require('twix');

// moment()
    // range = moment(options.start).twix(options.end);
    result.ranges = range.split(1, options.dateFormat);
    result.buckets = [];
    result.max = 1;
    result.ranges.forEach(function indexBucket(rge:any) {
      result.buckets.push({
        date: rge.start().format(),
        amount: 0
      });
    });
    result.assign = function assignItemToBucket(item:any) {
      result.ranges.forEach(function checkRange(rge:any, idx:any) {
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
