import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-increment-discount',
  templateUrl: './book-increment-discount.component.html',
  styleUrls: ['./book-increment-discount.component.css']
})
export class BookIncrementDiscountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  message=  false;
  currencies =  ['USD'];
//------tax setting start-----
lead = '';
tab = 'upcoming';
editdata = '';
catalog = ['ABC'];

promocode = {
  date: '',
  promo_code: '',
  discount: '',
  start_date: '',
  end_date: '',
  discount_type: 'BY_PERCENTAGE',
  selected_site: '',
  increment:[]
};



//------tax setting start-----
data = [
  
  
  {
      date: new Date(2021, 3, 15),
      promo_code: 'Incremental |  2-10| 5-20',
      discount: '10',
      start_date: new Date(2021, 3, 15),
      end_date: new Date(2021, 3, 15),
      discount_type: 'BY_AMOUNT',
      selected_site: 'abc',
      increment:[],
  },
  {
      date: new Date(2021, 3, 15),
      promo_code: 'Incremental |  2-10| 5-20',
      discount: '22',
      start_date: new Date(2021, 3, 15),
      end_date: new Date(2021, 3, 15),
      discount_type: 'BY_PERCENTAGE',
      selected_site: 'abc',
      increment:[{
      
          item: '2',
          currency:'',
          discount: '10',
          discount_type: 'BY_AMOUNT',
          
      },
      {
          currency:'5',
          item: '20',
          discount: '22',            
          discount_type: 'BY_PERCENTAGE',
          
      }]
  }
];

data1 = [{
      
      item: '',
      currency:'',
      discount: '',
      discount_type: 'BY_AMOUNT',
      
  },
  {
      currency:'',
      item: '',
      discount: '',            
      discount_type: 'BY_PERCENTAGE',
      
  }

];


removerow(){
 if(this.data1.length>1)
  this.data1.pop()  ;


}

addrow(){
if(this.data1.length<3)
this.data1.push(
  {
      item: '',
      currency:'',
      discount: '',
      discount_type: 'BY_AMOUNT',
})

}

promoModalEdit(x:any) {
  
}
setTab(tab:any) {
  
  if (tab != this.tab) {
      this.tab = tab;
  }
}

incrementDiscountModalEdit() {


};

submit(promocode:any, form:any) {
  this.clearMessage();
  if (!promocode.selected_site) {
      this.message= true;
      this.lead = 'Please select site.';
      
      return;
  }
  if (!this.comparedate(promocode.start_date, promocode.end_date)) {
      return;
  }

  if (form.$invalid) {
      this.message= true;
      this.lead = 'Please enter valid details.';
      
      return;
  }
  this.lead = '';
  this.message= false;
  promocode.date = new Date();
  promocode.date
  promocode.increment=  JSON.parse(JSON.stringify (this.data1));
  this.data.push(promocode);

}

selectSite(selectSite:any) {
  this.promocode.selected_site = selectSite;
  console.log('selectSite', selectSite)
}

comparedate(d1:any, d2:any) {
  const start = new Date(d1);
  const end = new Date(d2);

  // less than, greater than is fine:
  console.log('start < end', start < end); // false
  if (start < end) {
      return true
  }

  console.log('start > end', start > end); // false
  if (start > end) {
      this.lead = 'Start date should smaller than end date.';
      return false
  }

  console.log('start <= end', start <= end); // true
  if (start == end) {
      this.lead = 'Start date should smaller than end date.';
      return false
  }

  return false
 
}
clearMessage(){
  console.log('clearMessage')
  var self= this;
  setTimeout( ()=>{
      self.hidemessage();
  },4000)
}
hidemessage(){
  this.lead = '';
  this.message= false;
console.log('clearMessage',this.message);

}

}
