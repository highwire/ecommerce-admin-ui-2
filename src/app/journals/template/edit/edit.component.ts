
import { Component, OnInit,Inject } from '@angular/core';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HTTPService } from '../../../services/http.service';
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  notForSaleLabel= 'Not for Sale';
  price_amount:any;
  
  ddata:any;
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
  ]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    
    public http: HTTPService,
    public base: BaseService,
    ) { }


  ngOnInit(): void {
    console.log('data',this.data.element);
    this.selectAllPublishers();

  }
//   description: "Survival of Burgess Shale-type animals in a Middle Ordovician deep-water setting"
// identifier: "15002"
// name: "10.1144/jgs2015-131"
// price: {name: 'article-price', amount: 100, currency: 'USD', interval: 24}
// price_amount: 100
// price_currency: "USD"
// price_interval: 24
// price_name: "article-price"
// productType: "article"


//   corpus: null
// description: "Personality 101"
// identifier: "11034"
// name: "10.1136/hw-demo-2017-311261"
// prices: [{name: "article-price", amount: 40, currency: "USD", interval: 24},…]
// 0: {name: "article-price", amount: 40, currency: "USD", interval: 24}
// 1: {name: "article-price", amount: "371", currency: "EUR", interval: 24}
// productType: "article"

selectAllPublishers(){
  // let publisher = localStorage.getItem('publisher')  ;
  var name =  window.encodeURIComponent(this.data.element.name)
  let URL= this.base.OPEN_URL+name;
  this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
    if(res && res.resource && res.resource[0]){
      this.ddata= res.resource[0];
    }else{
      this.ddata={}
      this.ddata['doi']=this.data.element.name;
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
}

update(){
  let publisher = localStorage.getItem('publisher')  ;
  var name = this.data.element.name.replace('/', '!2F')
  let URL= this.base.DELETE_PRICE+ publisher +'/products/'+ name;
  console.log(URL);

  var prices= this.checkPricealreayexit();
  var data={
      corpus: null,
      description: this.data.element.description,
      identifier: this.data.element.identifier,
      name: this.data.element.name,
      prices: prices,
      productType: this.data.element.productType

  }
  this.http.getDatawithPut(URL,data).subscribe((res:any)=>{
    this.base.openSnackBar(5,'Updated successful.');

  })

}
checkPricealreayexit(){
  var prices:any
  prices=[];
  this.data.prices.forEach((element:any) => {
    if(element.price_interval==this.data.element.price_interval 
      && element.price_currency == this.data.element.price_currency)
      element.price_amount=  this.data.element.price_amount    
      prices.push({
        name: element.price_name, 
        amount: element.price_amount,
         currency: element.price_currency,
         interval: element.price_interval
      });     
  });
  return prices;
}





}
