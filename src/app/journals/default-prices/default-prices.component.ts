import { Component, OnInit } from '@angular/core';
import {hwValidator} from '../../services/hwvalidator.service'
import {HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-default-prices',
  templateUrl: './default-prices.component.html',
  styleUrls: ['./default-prices.component.css']
})
export class DefaultPricesComponent implements OnInit {
  currency=[]
  pricearray:any;
  displayedColumns: string[] = ['name', 'description','options', 'productType','price_interval','price_amount'];  
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

sitedata:any;

  constructor(
    public http: HTTPService,
    public base: BaseService,
    public hwv: hwValidator,
  ) { 
  }

  ngOnInit(): void {
    this.selectAllPublishers();
    this.selectAllListPublishers();
    this.getCurrencyList();
  }

  selectAllListPublishers(){
    let publisher = localStorage.getItem('publisher')  ;
    let URL= this.base.PRODUCT_LIST+ publisher+'/products';
    this.http.getDatawithGet(URL,publisher).subscribe((data:any)=>{
        console.log(data);
        this.filterDOI(data);
       
    })
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
    var self= this;
    data= data.filter((entry:any)=>{
      debugger;
    // return  self.hwv.doi(item.name);
      return(entry.productType=='ebook' )
      // && entry.name=='chapter-price' ) ||
      // (entry.productType=='ebook' && entry.name=='edition-price' )
    });
  // console.log('filterDOI',data);
  this.extractPrice(data);

}
extractPrice(data:any){
  var self= this;
  var pricearray:any= [];
  data.forEach((element:any) => {
    // console.log(element);
    if(element.prices && Array.isArray(element.prices)){
      element.prices.forEach((elements:any) => {   
        if(elements.name=='chapter-price'  || elements.name=='edition-price' )
      // (entry.productType=='ebook' && entry.name=='edition-price' )
        pricearray.push({
          name: element.name,
          productType:element.productType,
          description:element.description,      
          identifier: element.identifier,
          price_amount: self.formatAmountDisplay (elements.amount),
          price_currency:elements.currency,
          price_interval:elements.interval,
          price_name:elements.name
        })  
      });      
    }    
  });


  this.pricearray=  pricearray;
  console.log('this.pricearray',this.pricearray);


} 



addPrice(type:any){
  this.pricearray[0]
  var add= {
      description: this.pricearray[0].description,
      identifier: this.pricearray[0].identifier ,
      name: this.pricearray[0].name,
      price_name:this.pricearray[0].price_name,
      price_amount:'',
      price_currency:'',
      price_interval:'',                
      productType:type,
  }
  
  this.pricearray.push(add);
  console.log('Add price',this.pricearray)
}


update(){
  let publisher = localStorage.getItem('publisher')  ;
  var name = this.pricearray[0].name.replace('/', '!2F')
  let URL= this.base.DELETE_PRICE+ publisher +'/products/'+ name;
  console.log(URL);

  var prices= this.checkPricealreayexit();
  var data={
      corpus: null,
      description: this.pricearray[0].description,
      identifier: this.pricearray[0].identifier,
      name: this.pricearray[0].name,
      prices: prices,
      productType: this.pricearray[0].productType

  }
  console.log(data);
  this.http.getDatawithPut(URL,data).subscribe((res:any)=>{
    this.base.openSnackBar(5,'Updated successful.');
    this.selectAllListPublishers();
  })

}
setAssess(a:any,b:any){
  b.price_interval=a.value;
  b.price_interval_label=a.label;


}
checkPricealreayexit(){
  var prices:any
  prices=[];
  this.pricearray.forEach((element:any) => {
    // if(element.price_interval==this.data.element.price_interval 
      // && element.price_currency == this.data.element.price_currency)
      // element.price_amount=  this.data.element.price_amount    
      prices.push({
        name: element.price_name, 
        amount: element.price_amount,
         currency: element.price_currency,
         interval: element.price_interval
      });     
  });
  return prices;
}
getCurrencyList(){
  let publisher = localStorage.getItem('publisher')  ;
  // var name =  window.encodeURIComponent(this.basedata.element.name)
  let URL= this.base.CURRENCY_LIST+publisher+ '/currencies';
  this.http.getDatawithGet(URL,'').subscribe((res:any)=>{
    this.currency  =  res;
      console.log(res);       
  })

}
removeitem(index:any){
  this.base.openSnackBar(5,'Item deleted');
  console.log(index,'     ', this.pricearray)
  this.pricearray.splice(index, 1);
  console.log(index,'     ', this.pricearray)

}



}















