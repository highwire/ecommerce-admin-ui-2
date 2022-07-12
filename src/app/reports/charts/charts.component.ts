import { Component, NgModule, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FormControl, FormGroup } from '@angular/forms';
import { HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { __values } from 'tslib';


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
  publisher:any

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
    this.publisher= localStorage.getItem('publisher-label');
    console.log("hhhhhhhhhh",this.publisher);
    
    // myChart = new Chart(ctx,config)
    
    Chart.register(...registerables);
    //this.loadChart();
    this.getChartData();
    
    
    this.selectedItems = [];
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

  onItemSelect(item: any) {
    this.extractPrice(this.masterData, item.corpus);
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  currencySelect(currency:any){	
    	
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
    })
  }

  genratechartdata(data1: any,daterange:any) {
    // var Currency = 'USD';
    var defaultcurrency:any=  localStorage.getItem('defaultcurrency') ;
    if(defaultcurrency){
      defaultcurrency= JSON.parse(defaultcurrency) ;
      defaultcurrency= defaultcurrency.currency
    }
    // var curr= localStorage.getItem('currency')+'';
    // if(curr)
    // this.currency=  JSON.parse(curr);
    var Currency:any=  localStorage.getItem('currency') ;
    if(Currency){
      Currency= JSON.parse(Currency) ;
      console.log('Currency',Currency);
      // Currency= Currency.currency
    }
    // debugger;
    var amountsArray:any=[];
    let siteData:any=  localStorage.getItem('siteData') 
    if(siteData){
      siteData= JSON.parse(siteData);
      siteData.forEach((element:any) => {
        if(data1[element.corpus] && data1[element.corpus]!== undefined){
          var obj:any={};
          obj['amount']=[];
          obj['date']=[]
            data1[element.corpus][defaultcurrency].values.forEach((element:any) => {          
              obj['amount'].push(element.amount) ,
              obj['date'].push(moment(element.date).format('D MMM YYYY') )               
            });            
            obj['articel']= element.title;
            amountsArray.push(obj);
          }      
      });     
      console.log('amountsArray',amountsArray);
    }   
    let datesrages:any= [];
    daterange.forEach((element:any) => {
      console.log(element.date);
      datesrages.push(moment(element.date).format('D MMM YYYY') ) 
    });
    this.loadChart(amountsArray,datesrages);
    // console.log(amounts);
  }
  random(number:any){
    return Math.floor(Math.random()*number);;
}

random_rgba(){
  
    return 'rgb('+this.random(255)+','+this.random(255)+','+this.random(255)+')';    

}
 
loadChart( amountsArray:any,datesrages:any): void {   
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
  resetDate(){
    this.dateRange.reset();
  }

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
  // journal and book button ...
  onJournal(){

    this.selectAllPublishers();}
  
  onBooks(){
    this.getSiteData();
  }
    //books............
    getSiteData(){
      let publisher = localStorage.getItem('springer')  ;
      let URL= this.base.SITE_TYPE_SERVICE_POINT ;
      var data={
        // publisher: publisher,
        siteType: "ItemSet",
        publisher: "springer",
        // siteType: "Books"
      }
      console.log(data)
      this.http.getDatawithPost(URL,data).subscribe((data:any)=>{
        let  localdata:any=[];
          console.log('sitedata',data);             
          localdata=  JSON.parse(data).feed   ;
          this.sitedata= [];
          localdata.forEach((element:any) => {
            
            this.sitedata.push({
              corpus: element.entry.corpus,
              title: element.entry.title,
            })
            
          });
          
          
         
      })
    }   
  }

function destroy() {
  throw new Error('Function not implemented.');
}









