import { Component, OnInit } from '@angular/core';
import {hwValidator} from '../../services/hwvalidator.service'
import {HTTPService } from '../../services/http.service';
import { BaseService } from 'src/app/services/base.service';
import {FormControl} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-default-prices',
  templateUrl: './default-prices.component.html',
  styleUrls: ['./default-prices.component.css']
})
export class DefaultPricesComponent implements OnInit {
  dropdownList :any= [];
  selected:any=  false;
  selectedItems :any= [];
  dropdownSettings :any= {};

  myControl = new FormControl();
  showdrop:any=  false;
  masterData:any;
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
    // <a *ngFor="let website of sitedata " value="website.corpus">
    // {{website.title}}</a>
    
    this.selectedItems = [
    
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'corpus',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      
      closeDropDownOnSelection:true
    };
  }

  onItemChange(test:any,item:any){
    if(test.checked){
      item.price_amount= '';
    }else{
      item.price_amount= this.notForSaleLabel;
    }
  }


  onItemSelect(item: any) {
    
    if(item.corpus){
      this.selected= true;
    }
    this.extractPrice(this.masterData, item.corpus);
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
    var self= this;
    // data= data.filter((entry:any)=>{
      // debugger;
    // return  self.hwv.doi(item.name);
      // return(entry.productType=='ebook' )
      // && entry.name=='chapter-price' ) ||
      // (entry.productType=='ebook' && entry.name=='edition-price' )
    // });
  // console.log('filterDOI',data);
  this.masterData= data
  

}
dropDownChange(value:any){
  console.log(value.value);
  this.extractPrice(this.masterData, value.value);

}

extractPrice(data:any, pub:any){
  // debugger;
  var self= this;
  var pricearray:any= [];
  data.forEach((element:any) => {
    // console.log(element);
    if(element.prices && Array.isArray(element.prices) && element.name==pub        ){
      element.prices.forEach((elements:any) => {   
        // if(elements.name=='chapter-price'  || elements.name=='edition-price' )
      // (entry.productType=='ebook' && entry.name=='edition-price' )
      if(elements.name=="article-price" || elements.name=='issue-price')
      pricearray.push({
          name: element.name,
          productType:element.productType,
          description:element.description,      
          identifier: element.identifier,
          price_amount: self.formatAmountDisplay (elements.amount),
          price_currency:elements.currency,
          price_interval:elements.interval,
          price_name:elements.name,
          showName: (elements.name=="article-price") ?'Article':'Issue'
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
      showName: (type=="article") ?'Article':'Issue'
  }
  
  this.pricearray.push(add);
  console.log('Add price',this.pricearray)
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

update(){
  let publisher = localStorage.getItem('publisher')  ;
  var name = this.pricearray[0].name.replace('/', '!2F')
  let URL= this.base.DELETE_PRICE+ publisher +'/products/'+ name;
  console.log(URL);
  this.calculateAccess(this.pricearray);
  if(!this.calculateAccess(this.pricearray))
    {   alert('Price alreay exit.')
        return 
    }
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
        
        amount: element.price_amount==this.notForSaleLabel? -1:element.price_amount,
         currency: element.price_currency,
         interval: element.price_interval
      });     
  });
  return prices;
}
getCurrencyList(){
  var currency:any= localStorage.getItem('currency');
    if(currency){
        this.currency= JSON.parse(currency) ;
    }

}
removeitem(index:any){
  this.base.openSnackBar(5,'Item deleted');
  console.log(index,'     ', this.pricearray)
  this.pricearray.splice(index, 1);
  console.log(index,'     ', this.pricearray)

}

myFunction() {
  this.showdrop= this.showdrop?false:true;
}

filterFunction() {
  // var input, filter, ul, li, a, i;
  // input = document.getElementById("myInput");
  // filter = input.value.toUpperCase();
  // div = document.getElementById("myDropdown");
  // a = div.getElementsByTagName("a");
  // for (i = 0; i < a.length; i++) {
  //   txtValue = a[i].textContent || a[i].innerText;
  //   if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //     a[i].style.display = "";
  //   } else {
  //     a[i].style.display = "none";
  //   }
  // }
}


}















