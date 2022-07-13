// import { Component, OnInit } from '@angular/core';
import {HTTPService } from '../../../services/http.service';
import { BaseService } from '../../../services/base.service';
import { Component, OnInit,Inject } from '@angular/core';

import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  currency_stack:any;
  productType:any;
  currency=[]
  data:any;
  notForSaleLabel= 'Not for Sale';
  accessPeriods= [
    {label: '24 Hours', value: 24, sort: 24},
    {label: '48 Hours', value: 48, sort: 48},
    {label: '72 Hours', value: 72, sort: 72},
    {label: '7 Days', value: 168, sort: 168},
    {label: '3 Months', value: 2160, sort: 2160},
    {label: '6 Months', value: 4320, sort: 4320},
    {label: '1 Year', value: 8760, sort: 8760},
    {label: '2 Years', value: 17520, sort: 17520},
    {label: 'Perpetual', value: -1, sort: 99999}
  ];
  constructor(
    public http: HTTPService,
    public base: BaseService,
    public dialogRef: MatDialogRef<BookAddComponent>,
    
    @Inject(MAT_DIALOG_DATA) public basedata: any
  ) { }
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // console.log(this.basedata.element.name)
    console.log(this.basedata.prices);
    if(this.basedata.prices[0])
    this.productType=this.basedata.prices[0].productType;

    this.selectAllPublishers();
    this.getCurrencyList();
    // this.calculateAccess()
  }
  calculateAccess(prices:any){
    var newPrice:any=[];
    var ret=  true;
    prices.forEach((element:any) => {
      var elm:any= element.price_currency+'_'+element.price_interval
       if(newPrice.indexOf(elm)==-1){
        newPrice.push(elm);        
       }else{
        ret=  false;
       }                    
     });
     return ret;    
  }
  selectAllPublishers(){
    // let publisher = localStorage.getItem('publisher')  ;
    var name =  window.encodeURIComponent(this.basedata.element.name)
    let URL= this.base.OPEN_URL+name;
    this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
      if(res && res.resource && res.resource[0]){
        this.data= res.resource[0];
      }else{
        this.data={}
        this.data['doi']=this.basedata.element.name;
      }        
      console.log(res);       
    })
  }
  onItemChange(test:any,item:any){
    if(test.checked){
      item.price_amount= '';
    }else{
      item.price_amount= this.notForSaleLabel;
    }
    
    console.log(    test.checked);



  }
  getCurrencyList(){
    var currency:any= localStorage.getItem('currency');
      if(currency){
          this.currency= JSON.parse(currency) ;
      }
  
  }
  addPrice(){
    this.basedata.prices[0]
    var add= {
        description: this.basedata.prices[0].description,
        identifier: this.basedata.prices[0].identifier ,
        name: this.basedata.prices[0].name,
        price_name:this.basedata.prices[0].price_name,
        price_amount:'',
        price_currency:'',
        price_interval:'',                
        productType:this.basedata.prices[0].productType,
    }
    
    this.basedata.prices.push(add);
    console.log('Add price',this.basedata.prices)
  }

  closeDialog(update:any) {
    this.dialogRef.close(update);
  }

  update(){
    let publisher = localStorage.getItem('publisher')  ;
    var name = this.basedata.element.name.replace('/', '!2F')
    let URL= this.base.DELETE_PRICE+ publisher +'/products/'+ name;
    console.log(URL);

    if(!this.calculateAccess(this.basedata.prices))
    {alert('Price alreay exit.')
    return 
  }
    var prices= this.checkPricealreayexit();
    
    
    var data={
        corpus: null,
        description: this.basedata.element.description,
        identifier: this.basedata.element.identifier,
        name: this.basedata.element.name,
        prices: prices,
        productType: this.basedata.element.productType
  
    }
    console.log(data);
    this.http.getDatawithPut(URL,data).subscribe((res:any)=>{
      // alert(res);
      this.closeDialog(true);
    }
  , err => alert('Something went wrong.')
    )
  
  }
  checkPricealreayexit(){
    debugger;
    var prices:any
    prices=[];
    this.basedata.prices.forEach((element:any) => {
      // if(element.price_interval==this.data.element.price_interval 
        // && element.price_currency == this.data.element.price_currency)
        // element.price_amount=  this.data.element.price_amount    
        prices.push({
          name: element.price_name, 
          // amount: element.price_amount,
           amount: element.price_amount==this.notForSaleLabel? -1:element.price_amount,
           currency: element.price_currency,
           interval: element.price_interval
        });     
    });

    return prices;
  }
  
  
  removeitem(index:any){
    
    console.log(index,'     ', this.basedata.prices)
    this.basedata.prices.splice(index, 1);
    console.log(index,'     ', this.basedata.prices)
  
  }
  

}
