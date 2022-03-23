import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {HTTPService } from '../../services/http.service';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  constructor(
    public http: HTTPService,
    public base: BaseService,
    public dialogRef: MatDialogRef<ReceiptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
    console.log('data',this.data.element);

  }
  update(){
    let publisher = localStorage.getItem('publisher')  ;
    var name = this.data.element.name.replace('/', '!2F')
    var highwireTransactionId=this.data.element.highwireTransactionId
    // var name =  window.encodeURIComponent(this.data.element.name)
    // https://ecommerce.highwire.org/api/report/publishers/hw-demo/transactions/1876631680/sendReceipt
    let URL= this.base.SEND_RECEIPT+ publisher + '/transactions/'+highwireTransactionId+ '/sendReceipt';
    console.log(URL);
    this.http.getDatawithPost(URL,'').subscribe((res:any)=>{
      alert('sent');
      this.closeDialog(true);
 
    })

  }
  
  closeDialog(update:any) {
    this.dialogRef.close(update);
  }


}
