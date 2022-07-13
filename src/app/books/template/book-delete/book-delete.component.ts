
import { Component, OnInit,Inject } from '@angular/core';

import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {HTTPService } from '../../../services/http.service';
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

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
  constructor(
    public http: HTTPService,
    public base: BaseService,
    public dialogRef: MatDialogRef<BookDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
    console.log('data',this.data.element);
    // value="{{basedata.productType}}";

    // Request URL: http://localhost:9000/api/catalogadm/publishers/hw-demo/products/10.demo!2Fptj.20150473
                    // http://localhost:9000/api/catalogadm/publishers/hw-demo/products/10.1136%2Fhw-demo-2017-311261
                    // http://localhost:9000/api/catalogadm/publishers/hw-demo/products/10.1136!2Fhw-demo-2017-311261

  }
  delete(){
    let publisher = localStorage.getItem('publisher')  ;
    var name = this.data.element.name.replace('/', '!2F')
    // var name =  window.encodeURIComponent(this.data.element.name)
    let URL= this.base.DELETE_PRICE+ publisher +'/products/'+ name;
    console.log(URL);
    this.http.getDatawithDelete(URL,'').subscribe((res:any)=>{
      this.base.openSnackBar(3,'Deleted Successfully.');
      this.dialogRef.close(true);
    })

  }

}
