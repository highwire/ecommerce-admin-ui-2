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
import { ReceiptComponent } from '../receipt/receipt.component';
@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedComponent implements OnInit {
  
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  displayedColumns: string[] = ['highwireTransactionId','transactionDateTime',
  'amount','discounts', 'currency', 'customerCountry',
   'name','email' ,
  'journalCode','journalName','contentId', 'edit'
    ];
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  freeLabel= 'Free';
  notForSaleLabel= 'Not for Sale';
  clickedRows = new Set<any>();
  products: any;
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  animal: any;
  name: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public http: HTTPService,
    public base: BaseService,
    public dialog: MatDialog,
    public hwv: hwValidator,
    
  ) { }

  ngOnInit(): void {
    //   endDate: "2022-02-17T18:30:00.000Z"
// pub: "hw-demo"
// startDate: "2021-11-01T18:30:00.000Z"
    this.dateRange.patchValue({
      start: "2021-11-01T18:30:00.000Z",
      end: "2022-02-17T18:30:00.000Z"
   });
    this.selectAllPublishers();
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

  setDate(){
    // Start: {{dateRange.value.start | date}}
    // End: {{dateRange.value.end | date}}
  }

  addEvent(event: any) {

    // console.log('event.value',event.value);
    // this.events.push(`${type}: ${event.value}`);
  }


  selectAllPublishers(){
    let publisher = localStorage.getItem('publisher')  ;
    let URL= this.base.DETAILED_REPORT;
    let DATA= {
      // "endDate": this.dateRange.value.s
      "endDate": this.dateRange.value.end,
      "pub": publisher,
      "startDate": this.dateRange.value.start
    }
    this.http.getDatawithPost(URL,DATA).subscribe((data:any)=>{
      this.dataSource.data= data.transactions;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = data.total;
      },1000);
        
       
    })
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
extractPrice(data:any){
  debugger;
  var self= this;
  var pricearray:any= [];
  data.forEach((element:any) => {
    // console.log(element);
    if(element.prices && Array.isArray(element.prices)){
       element.prices.forEach((elements:any) => {      
        pricearray.push({
          name: element.name,
          productType:element.productType,
          description:element.description,      
          identifier: element.identifier,
          price_amount: self.formatAmountDisplay (elements.amount),
          price_currency:elements.currency,
          price_interval:elements.interval,
          price_name:elements.name,
          price:elements
        })  
      });      
    }    
  });


  this.dataSource.data= pricearray;
  setTimeout(() => {
    this.paginator.pageIndex = this.currentPage;
    this.paginator.length = data.length;
  },1000);

}


  toppingList: string[] = [
    "Extra cheese",
    "Mushroom",
   
  ];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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


  send(element:any){
    // console.log(element);

    const dialogRef = this.dialog.open(ReceiptComponent, {
      width: '950px',
      height: '500px',
      data: {element},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}





// amount: