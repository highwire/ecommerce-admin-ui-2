


// import { Component, OnInit } from '@angular/core';
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
  currency=[];
  sitedata:any;
  fromModel = new FormGroup({
    doi : new FormControl(''),
    selected_site : new FormControl('')
  });

 

 
  constructor(
    public client :HttpClient,
    public http: HTTPService,
    public base: BaseService,
    public dialogRef: MatDialogRef<AddNewPriceComponent>,
    
    @Inject(MAT_DIALOG_DATA) public basedata: any
  ) { }
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
   
    this.getSiteData();
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
        Authorization: 'Bearer '+ token,

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
    let publisher = this.fromModel.value.selected_site //localStorage.getItem('publisher')  ;
    // var name = this.basedata.element.name.replace('/', '!2F')
    let URL= this.base.ATOM_LOOKUP+ publisher +'?'+'doi='+this.fromModel.value.doi;
    debugger;
  
    
    var data={
     
  
    }
    https://ecommerce.highwire.org/atom/lookup/corpus/hwdjpt?doi=test
    console.log(data);
    this.http.getDatawithGet(URL,data).subscribe((res:any)=>{
      alert(res);
      // this.closeDialog(true);
    })
  
  }
 
  

}
