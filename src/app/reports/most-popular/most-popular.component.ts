import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator,PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {hwValidator} from '../../services/hwvalidator.service'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.css']
})
export class MostPopularComponent implements OnInit {
  p1:any;
  response:any;
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  displayedColumns: string[] = [
    'contentId',
    'title',
    'resourceType',
  'amount',
   'interval',
   'qty',
   'revenue' 
    ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  freeLabel= 'Free';
  notForSaleLabel= 'Not for Sale';
  clickedRows = new Set<any>();
  products: any;
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  animal: any;
  name: any;
  currency:any=[]	
  selectedCurrency:any= '  All CURRENCIES';	
  masterdata:any	
  productTypes:any=[	
    {key:"",value:'All'},	
    {key:"issue",value:'Issue'},	
    {key:"article",value:'Article'},	
  ];	
  selectedType:any= 'ALL';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public http: HTTPService,
    public base: BaseService,
    public dialog: MatDialog,
    public hwv: hwValidator,
    
  ) { }

  ngOnInit(): void {
    var d = new Date();
    d.setDate(d.getDate()-7);
    this.dateRange.patchValue({
      start: d,
      end:  new Date()
   });
   
    this.selectAllPublishers();
   this.getCurrencyList();
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.selectAllPublishers();
  }
  
  getCurrencyList(){
    var currency:any= localStorage.getItem('currency');
      if(currency){
          this.currency= JSON.parse(currency) ;
      }

  }

  selectAllPublishers(){
    let publisher = localStorage.getItem('publisher')  ;
    let URL= this.base.MOST_POPULAR+publisher;
    // "pub": publisher,
    let DATA={"options": {
      // "endDate": this.dateRange.value.s
      "end": this.dateRange.value.end,
      
      "start": this.dateRange.value.start
    }}
    this.http.getDatawithPost(URL,DATA).subscribe((data:any)=>{
      this.fomartdata(data)
        
       
    })
  }

  // data: []
  // qty: {all: 0}
  // revenue: {}

  fomartdata(data:any){
    this.p1= [  ]


    // article: {qty: 4, USD: {…}}
    // data: (4) [{…}, {…}, {…}, {…}]
    // mpInterval: "24"
    // qty: {all: 4, USD: 4}
    // revenue: {USD: 140}
  // }    
  
    var self = this;
    if(data.data.length){
      this.p1.push( {key: 'No.of Items sold', value: 0})
      let revenuedata=0;
      this.currency.forEach((element:any) => {
        console.log(element)
        revenuedata=+ data.revenue[element];
        this.p1.push(   {
                key:'Total Revenue-'+element,
                value:revenuedata
        })

        let articledata = data.article[element].qty;
        this.p1.push(   {
                key:'Total Article Sold',
                value:articledata
        })
        this.p1.push(   {
          key:'Total Issue Sold',
          value:0
  })

        

        


      });
      this.p1.push(   {
        key:'Most Popular Access Period',
        value:data.mpInterval
      })


    }else{
      
      this.p1= [  
        {key: 'No.of Items sold', value: 0},
        {key: 'Total Revenue - EUR', value: 0},
        {key: 'Total Revenue - GBP', value: 0},
        {key: 'Total Revenue - USD', value: 0},
        {key: 'Total Issue Sold', value: 0},

        {key: 'Total Article Sold', value: 0},
        {key: 'Most Popular Access Period', value: '0'}
      
    ]
     
    }
      
      // revenue.USD
      this.masterdata=this.dataSource.data
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = data.total;
      },1000);
      
    
  }

filterDOI(data:any)
{
  var self= this;
  data= data.filter((entry:any)=>{
    // return  self.hwv.doi(item.name);
    return(self.hwv.doi(entry.name) || self.hwv.pisaId(entry.name) ||self.hwv.isbn(entry.name) || self.hwv.resourceId(entry.name))
  });
  console.log('filterDOI',data);
  this.extractPrice(data); 
}
extractPrice(data:any, currencies?:any,productType?:any){	
  	
  var self= this;	
  var pricearray:any= [];	
  // this.masterdata=data;	
  data.forEach((elements:any) => {	
   
        if(productType){	
          if(elements.resourceType==productType)	
          pricearray.push(
            elements
          )  	
        }	
        else if( currencies){	
          if(elements.currency.toUpperCase()==currencies)	
          pricearray.push(elements)  	
        }else{	
          pricearray.push(elements)  	
      }	        	  	
  });	
   this.dataSource.data= pricearray;	
  //  this.masterdata=pricearray;	
   setTimeout(() => {	
    this.paginator.pageIndex = this.currentPage;	
    this.paginator.length = data.length;},1000);	
  }	

  toppingList: string[] = [
    "Extra cheese",
    "Mushroom",
   
  ];
  applyFilter(filterValue:any) {	
    this.dataSource.filter = filterValue.value.trim().toLowerCase();	
  }
  
  someMethod(value: any, element: any) {
    console.log("selected value", value);
    console.log("selected element", element);
    element.symbol = value;
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

  
  getCurrentPrices(element:any){
    let prices:any
      prices=[]
     debugger;
    this.dataSource.data.forEach((item:any) => {
      if(element.name==item.name){        
        prices.push(item);
      }    
    });
    return prices
  }

  currencySelect(currency:any){	
    debugger	
    this.selectedCurrency= currency	
    console.log(currency);	
    this.extractPrice(this.masterdata, currency=='Currencies' ? '':currency, '');	
  }	
  
  productSelect(productType:any){	
    	
    this.selectedType = productType.value	
    console.log(productType);	
    this.extractPrice(this.masterdata,'', productType.key == 'All' ? '': productType.key)
  }

  resetDate(){
    this.dateRange.reset();
  }
}





