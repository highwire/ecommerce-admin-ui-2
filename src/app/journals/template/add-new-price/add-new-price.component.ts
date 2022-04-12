
import {HTTPService } from '../../../services/http.service';
import { BaseService } from '../../../services/base.service';
import { Component, OnInit,Inject } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import {forkJoin,map, of, catchError} from 'rxjs';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-new-price',
  templateUrl: './add-new-price.component.html',
  styleUrls: ['./add-new-price.component.css']
})
export class AddNewPriceComponent implements OnInit {
  entry:any;
  currency:any;
  sitedata:any;
  pricedata:any= [];
  fromModel = new FormGroup({
    doi : new FormControl(''),
    selected_site : new FormControl('')
  });

  priceobj= new FormGroup({
    productType : new FormControl(''),
    accessPeriod : new FormControl(''),
    price:  new FormControl(''),
    forsale:  new FormControl(''),
    currency: new FormControl(''),
    name:new FormControl('')
  });


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
    public client :HttpClient,
    public http: HTTPService,
    public base: BaseService,
    public dialogRef: MatDialogRef<AddNewPriceComponent>,
    
    @Inject(MAT_DIALOG_DATA) public basedata: any
  ) { }
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // console.log(this.basedata.prices);
    this.getSiteData();    
    var curr= localStorage.getItem('currency')+'';
    this.currency=  JSON.parse(curr);
  }
  
  filterPrice(){
    
    this.basedata.prices.forEach((element:any) => {
      console.log(element.name,'  ',this.fromModel.value.doi);
    if(element.name==this.fromModel.value.doi){
      this.pricedata.push(element);
    }
    });
    console.log("Filter data", this.pricedata);
    this.priceobj.patchValue({
      price: this.pricedata[0].price_amount,
      currency: this.pricedata[0].price_currency,
      accessPeriod:this.pricedata[0].price_interval,
      productType:this.pricedata[0].productType,
      name:this.pricedata[0].price_name,
   });
  }

  getSiteData(){
    let publisher = localStorage.getItem('publisher')  ;
    let URL= this.base.SITE_LIST;
    var data={
      pubTerm: publisher,
      role: "Intelligent Commerce Pricing and Reporting UI",
      userId: "2"
    }
    this.http.getDatawithPost(URL,data).subscribe((data:any)=>{
        console.log('sitedata',data);             
        this.sitedata=  data.sites;
        this.apicall()
    })
  }
  catchError(e:any){
    console.log(e);
  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    var arr: any[]=[]
    var token= localStorage.getItem('hwp-login');    
    var httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/vnd.hw.citation-ui+json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: 'Bearer '+ token
      })
    }
    
    this.sitedata.forEach((element:any,indx:any) => {
      arr.push ( this.client.get<any[]>(this.base.ATOM_LITE+element.site_code+'.atom' ,httpOptions));
      // if(indx==1)
      // arr.push ( this.client.get<any[]>(this.base.ATOM_LITE+element.site_code+'.atom11' ,httpOptions))
      })
    
    // var ar= arr;
    return forkJoin(arr);
    
  
}

apicall(){
  this.requestDataFromMultipleSources().subscribe(responseList => {
    console.log(responseList);
    
});
}

handleResponse(res:any){
  console.log('res',res);

}

addPrice(){
var priceArray:any={};
priceArray.productType = this.pricedata[0].productType;
priceArray.corpus = this.pricedata[0].corpus;
priceArray.name = this.pricedata[0].name;
priceArray.description = this.pricedata[0].description;
priceArray.prices= []
  this.pricedata.forEach((element:any) => {
    priceArray.prices.push(element.price)
  });


    var add= {
      name:this.priceobj.value.name,
      amount: this.priceobj.value.price,
      currency: this.priceobj.value.currency ,
      interval: this.priceobj.value.accessPeriod             
    }
 
    priceArray.prices.push(add)
    console.log('Add price',priceArray);
    let publisher = localStorage.getItem('publisher')  ;
    var name = this.pricedata[0].name.replace('/', '!2F')
    let URL= this.base.DELETE_PRICE+ publisher +'/products/'+ name;
    console.log(URL);
    
    this.http.getDatawithPut(URL,priceArray).subscribe((res:any)=>{
      this.base.openSnackBar(5,'Updated successful.');    
    })    
  }

  closeDialog(update:any) {
    this.dialogRef.close(update);
  }
  update(){
    if(!this.fromModel.value.doi){
      this.base.openSnackBar(5,'Please enter doi.');
      return;
    }
    if(!this.fromModel.value.selected_site){

      this.base.openSnackBar(5,'Please select site.');
      return;
    }
    this.filterPrice();

    let publisher = this.fromModel.value.selected_site //localStorage.getItem('publisher')  ;
    // var name = this.basedata.element.name.replace('/', '!2F')
    let URL= this.base.ATOM_LOOKUP+ publisher +'?'+'doi='+this.fromModel.value.doi;  
    this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
      this.getUriData(res);

    })
  
  }
  getUriData(data:any){
    // var arr= data.splite('/')
    // console.log(arr);
    var URL= this.base.ATOM_LITE_TWO+data.results.entry.uri;
    console.log(URL);
    var token= localStorage.getItem('hwp-login');
    var header:any=    {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+ token,
      'accept':'application/vnd.hw.citation-ui+json',
      'Accept-Encoding':'gzip, deflate, br'
    }
    this.http.getDatawithGet(URL,'',header).subscribe((res:any)=>{
      console.log('res 2     ',res);
      this.entry=  res;
      // alert(res.results.entry.uri);
      // this.closeDialog(true);
      
    })
  }
 
}
