import { Component, OnInit } from '@angular/core';
import {HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator,PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ReferencesEditComponent } from '../template/references-edit/references-edit.component';
import { ReferencesDeleteComponent } from '../template/references-delete/references-delete.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReferencesAddComponent} from '../template/references-add/references-add.component';
import {hwValidator} from '../../services/hwvalidator.service'
import {ReferencesAddNewPriceComponent}  from '../template/references-add-new-price/references-add-new-price.component';
import {MatSort} from '@angular/material/sort';

interface USER {
  name: string;
  description: string;
  productType: string;

}

@Component({
  selector: 'app-references-specific-prices',
  templateUrl: './references-specific-prices.component.html',
  styleUrls: ['./references-specific-prices.component.css']
})
export class ReferencesSpecificPricesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'productType','price_interval','price_amount','options',];
  
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
  
  productTypes:any=[
    {key:"",value:'All'},
    {key:"issue-price",value:'Issue'},
    {key:"article-price",value:'Article'},
    
    
  ];
  selectedType:any= 'ALL';
  pricearray:any
  element:any

  

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
    var curr= localStorage.getItem('currency')+'';
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
    if(element.prices && Array.isArray(element.prices)  && element.productType=='refwork'){
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
            price_interval:elements.interval,
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
            price_interval:elements.interval,
            price_name:elements.name,
            price:elements
          })  
        }else{
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
        // }
      }
        
      
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

    const dialogRef = this.dialog.open(ReferencesDeleteComponent, {
      width: '950px',
      height: '500px',
      data: {element},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
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

    const dialogRef = this.dialog.open(ReferencesAddComponent, {
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
    const dialogRef = this.dialog.open(ReferencesAddNewPriceComponent, {
      width: '950px',
      height: '400px',
      data: {
        prices:p},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  edit(element:any){
    // console.log(element);
    var p= this.getCurrentPrices(element)
    const dialogRef = this.dialog.open(ReferencesEditComponent, {
      width: '950px',
      height: '500px',
      data: {element,
        prices:p},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

