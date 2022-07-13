import { Component, OnInit } from '@angular/core';
import {HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator,PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { BookEditComponent } from '../template/book-edit/book-edit.component';
import { BookDeleteComponent } from '../template/book-delete/book-delete.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BookAddComponent} from '../template/book-add/book-add.component';
import {hwValidator} from '../../services/hwvalidator.service'
import {BookAddNewPriceComponent}  from '../template/book-add-new-price/book-add-new-price.component';
import {MatSort} from '@angular/material/sort';

interface USER {
  name: string;
  description: string;
  productType: string;

}

@Component({
  selector: 'app-book-specific-prices',
  templateUrl: './book-specific-prices.component.html',
  styleUrls: ['./book-specific-prices.component.css']
})
export class BookSpecificPricesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'productType','price_amount','price_interval','options',];
  currency:any=[];
  selectedCurrency:any= '  All CURRENCIES';
  masterdata:any;
  dataSource: MatTableDataSource<USER> = new MatTableDataSource();
  freeLabel= 'Free';
  notForSaleLabel= 'Not for Sale';
  clickedRows = new Set<any>();
  products: any;
  isLoading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  animal: any;
  name: any;
  defCurrency:any='USD($)'
  disable:boolean=true
  
  productTypes:any=[
    {key:"",value:'All'},
    {key:"issue-price",value:'Issue'},
    {key:"article-price",value:'Article'},
 ];
 
  selectedType:any= 'ALL';
  pricearray:any
  element:any;

  currFormat(defCurrency:any) {
    // console.log(priceType)
    if (defCurrency === 'USD') {
      return this.defCurrency;
    }
    else  {
      return this.currency;
    }
    
  }
  
  

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort
  constructor(
    public http: HTTPService,
    public base: BaseService,
    public dialog: MatDialog,
    public hwv: hwValidator,
    
  ) { }

  ngOnInit(): void {
    this.selectAllPublishers();
    var curr= localStorage.getItem('defaultcurrency')+'';
    if(curr)
    this.currency=  JSON.parse(curr);

    var pro = localStorage.getItem('productType') + '';
    // if(pro)
    // this.productType = JSON.parse(pro)

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.selectAllPublishers();
  }
  selectAllPublishers(){
    let publisher = localStorage.getItem('publisher')  ;
    let URL= this.base.PRODUCT_LIST+ publisher+'/products';
    this.http.getDatawithGet(URL,publisher).subscribe((data:any)=>{
        console.log(data);
        this.filterDOI(data);
       
    })
  }

  filterDOI(data:any){
  var self= this;
  data= data.filter((entry:any)=>{
    // return  self.hwv.doi(item.name);
    return(self.hwv.doi(entry.name) || self.hwv.pisaId(entry.name) ||self.hwv.isbn(entry.name) || self.hwv.resourceId(entry.name))
  });
  console.log('filterDOI',data);
  this.extractPrice(data,'','');
  }
  
  extractPrice(data:any, currencies?:any,productType?:any){
  
  var self= this;
  var pricearray:any= [];
  this.masterdata=data;
  data.forEach((element:any) => {
    // console.log(element);
    if(element.prices && Array.isArray(element.prices)  && (element.productType=='ebook'  || element.productType=='edition' )){
      // debugger
      
       element.prices.forEach((elements:any) => {      
        // if(elements.name== "article-price"){
            // return false;
        // }
        if(productType){
          if(elements.name==productType)
          pricearray.push({
            name: element.name,
            productType:element.productType,
            description:element.description,      
            identifier: element.identifier,
            price_amount: self.formatAmountDisplay (elements.amount),
            price_currency:elements.currency,
            price_interval:self.period(elements.interval),
            price_name:elements.name,
            price:elements
          })  
        }


        else if( currencies){
          if(elements.currency.toUpperCase()==currencies)
          pricearray.push({
            name: element.name,
            productType:element.productType,
            description:element.description,      
            identifier: element.identifier,
            price_amount: self.formatAmountDisplay (elements.amount),
            price_currency:elements.currency,
            price_interval:self.period(elements.interval),
            price_name:elements.name,
            price:elements
          })  
        }else{
          // debugger
          pricearray.push({
            name: element.name,
            productType:element.productType,
            description:element.description,      
            identifier: element.identifier,
            price_amount: self.formatAmountDisplay (elements.amount),
            price_currency:elements.currency,
            price_interval:self.period(elements.interval),
            price_name:elements.name,
            price:elements
          })  
        // }
      }
        
      console.log(pricearray)
      });      
    }    
  });
   this.dataSource.data= pricearray;
   setTimeout(() => {
    this.paginator.pageIndex = this.currentPage;
    this.paginator.length = data.length;},1000);
  }


  toppingList: string[] = [
    "Extra cheese",
    "Mushroom"];

  applyFilter(filterValue:any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  someMethod(value: any, element: any) {
    console.log("selected value", value);
    console.log("selected element", element);
    element.symbol = value;
  }

  currencySelect(currency:any){
    debugger
    this.selectedCurrency= currency
    console.log(currency);
    this.extractPrice(this.masterdata, currency=='Currencies' ? '':currency, '');
  }
    // this.masterdata=data;
  productSelect(productType:any){
    
    this.selectedType = productType.value
    console.log(productType);
    this.extractPrice(this.masterdata,'', productType.key == 'All' ? '': productType.key)
  }

  delete(element:any){
    // console.log(element);

    const dialogRef = this.dialog.open(BookDeleteComponent, {
      width: '950px',
      height: '500px',
      data: {element},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      if(result){
        this.selectAllPublishers();
      }
    });
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

  viewAdd(element:any){
    // console.log(element);
    var p= this.getCurrentPrices(element)

    const dialogRef = this.dialog.open(BookAddComponent, {
      width: '1050px',
      height: '600px',
      
      data: {
        element,
        prices:p,
        
      },
    });

    dialogRef.afterClosed().subscribe(udate => {
      console.log('The dialog was closed',udate);
      if(udate){
        this.selectAllPublishers();
      }
      
      
    });
  }
  
  getCurrentPrices(element?:any){
    let prices:any
      prices=[]
     if(element){
      this.dataSource.data.forEach((item:any) => {
        if(element.name==item.name){        
          prices.push(item);
        }    
      });
     }else{
      this.dataSource.data.forEach((item:any) => {
         prices.push(item);});
     }
     return prices
    }

  addData(){
    // console.log();
    var p= this.getCurrentPrices()
    const dialogRef = this.dialog.open(BookAddNewPriceComponent, {
      width: '950px',
      height: '400px',
      data: {
        prices:p},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      if(result){
        this.selectAllPublishers();
      }
    });
  }
  edit(element:any){
    // console.log(element);
    var p= this.getCurrentPrices(element)
    const dialogRef = this.dialog.open(BookEditComponent, {
      width: '950px',
      height: '500px',
      data: {element,
        prices:p},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      if(result){
        this.selectAllPublishers();
      }
    });
  }

  period(interval:any=[]){
    var hours = interval;
    var days = hours/24;
    var year = days/365
    var month = hours * .0015
    // console.log(month + " month");
    // console.log(year + " year");
    // console.log(hours)
    if(hours > 8700){
      return `${Math.floor(year)} Year `;
    }
    if(hours > 699  ){
      return `${Math.floor(month)} Month`;}
    if(hours < 0 ){
        return  'Perpetual' }
    else{
      return `${hours} Hours`;
    }
    }
}

