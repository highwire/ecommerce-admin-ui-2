



// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';

// import {HTTPService } from '../../services/http.service';
// import { BaseService } from 'src/app/services/base.service';
// import {AfterViewInit,  ViewChild} from '@angular/core';
// import {MatPaginator,PageEvent} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import {hwValidator} from '../../services/hwvalidator.service'
// import {MatDatepickerInputEvent} from '@angular/material/datepicker';

// @Component({
//   selector: 'app-charts',
//   templateUrl: './charts.component.html',
//   styleUrls: ['./charts.component.css']
// })
// export class ChartsComponent implements OnInit {
  
//   dateRange = new FormGroup({
//     start: new FormControl(),
//     end: new FormControl()
//   });


  
//   freeLabel= 'Free';
//   notForSaleLabel= 'Not for Sale';
//   clickedRows = new Set<any>();
//   products: any;
//   isLoading = false;
//   totalRows = 0;
//   pageSize = 5;
//   currentPage = 0;
//   pageSizeOptions: number[] = [5, 10, 25, 100];
//   animal: any;
//   name: any;

//   public donutChartData = [{
//     id: 0,
//     label: 'water',
//     value: 20,
//     color: 'red',
//   }, {
//     id: 1,
//     label: 'land',
//     value: 20,
//     color: 'blue',
//   }, {
//     id: 2,
//     label: 'sand',
//     value: 30,
//     color: 'green',
//   }, {
//     id: 3,
//     label: 'grass',
//     value: 20,
//     color: 'yellow',
//   }, {
//     id: 4,
//     label: 'earth',
//     value: 10,
//     color: 'pink',
//   }];

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   constructor(
//     public http: HTTPService,
//     public base: BaseService,
//     public dialog: MatDialog,
//     public hwv: hwValidator,
    
//   ) { }

//   ngOnInit(): void {
//     //   endDate: "2022-02-17T18:30:00.000Z"
// // pub: "hw-demo"
// // startDate: "2021-11-01T18:30:00.000Z"
//     this.dateRange.patchValue({
//       start: "2021-11-01T18:30:00.000Z",
//       end: "2022-02-17T18:30:00.000Z"
//    });
//     this.selectAllPublishers();
//   }
  

//   ngAfterViewInit() {
//     // this.dataSource.paginator = this.paginator;
//   }
//   pageChanged(event: PageEvent) {
//     console.log({ event });
//     this.pageSize = event.pageSize;
//     this.currentPage = event.pageIndex;
//     this.selectAllPublishers();
//   }

//   setDate(){
//     // Start: {{dateRange.value.start | date}}
//     // End: {{dateRange.value.end | date}}
//   }

//   addEvent(event: any) {

//     // console.log('event.value',event.value);
//     // this.events.push(`${type}: ${event.value}`);
//   }


//   selectAllPublishers(){
//     let publisher = localStorage.getItem('publisher')  ;
//     let URL= this.base.DETAILED_REPORT;
//     let DATA= {
//       // "endDate": this.dateRange.value.s
//       "endDate": this.dateRange.value.end,
//       "pub": publisher,
//       "startDate": this.dateRange.value.start
//     }
//     this.http.getDatawithPost(URL,DATA).subscribe((data:any)=>{
//       // this.dataSource.data= data.transactions;
//       // setTimeout(() => {
//       //   this.paginator.pageIndex = this.currentPage;
//       //   this.paginator.length = data.total;
//       // },1000);
        
       
//     })
//   }


// filterDOI(data:any)
// {
//   var self= this;
//   data= data.filter((entry:any)=>{
//     // return  self.hwv.doi(item.name);
//     return(self.hwv.doi(entry.name) || self.hwv.pisaId(entry.name) ||self.hwv.isbn(entry.name) || self.hwv.resourceId(entry.name))
//   });
//   console.log('filterDOI',data);
//   this.extractPrice(data);

// }
// extractPrice(data:any){
//   debugger;
//   var self= this;
//   var pricearray:any= [];
//   data.forEach((element:any) => {
//     console.log(element);
//     if(element.prices && Array.isArray(element.prices)){
//        element.prices.forEach((elements:any) => {      
//         pricearray.push({
//           name: element.name,
//           productType:element.productType,
//           description:element.description,      
//           identifier: element.identifier,
//           price_amount: self.formatAmountDisplay (elements.amount),
//           price_currency:elements.currency,
//           price_interval:elements.interval,
//           price_name:elements.name,
//           price:elements
//         })  
//       });      
//     }    
//   });


//   // this.dataSource.data= pricearray;
//   // setTimeout(() => {
//   //   this.paginator.pageIndex = this.currentPage;
//   //   this.paginator.length = data.length;
//   // },1000);

// }


//   toppingList: string[] = [
//     "Extra cheese",
//     "Mushroom",
   
//   ];

//   applyFilter(filterValue: string) {
//     // this.dataSource.filter = filterValue.trim().toLowerCase();
//   }
//   someMethod(value: any, element: any) {
//     console.log("selected value", value);
//     console.log("selected element", element);
//     element.symbol = value;
//   }






//   formatAmountDisplay(amount:any) {
//     if (amount === -1) {
//       return this.notForSaleLabel;
//     }
//     else if (amount === 0) {
//       return this.freeLabel;
//     }
//     return amount;
//   }

  
//   getCurrentPrices(element:any){
//     let prices:any
//       prices=[]
//      debugger;
//     // this.dataSource.data.forEach((item:any) => {
//     //   if(element.name==item.name){        
//     //     prices.push(item);
//     //   }    
//     // });
//     // return prices
//   }



// }





// // amount:
























import { Component, OnInit } from '@angular/core';
import{Chart,registerables} from'chart.js';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart:any;
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor() { }

  ngOnInit(): void {
    this.chart=document.getElementById("my-first-chart");
  Chart.register(...registerables);
  this.loadChart();
  }
  loadChart():void{
    new Chart(this.chart,{
      type:'bar',
      data:{
        datasets:[{
          label: 'Grouped',
          data: [65, 59, 80, 81, 56, 55, 40,23,1,32,45,12],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(201, 203, 207, 0.5)',
            'rgba(153, 102, 254, 0.5)',
            'rgba(201, 203, 239, 0.5)',
            'rgba(153, 102, 234, 0.5)',
            'rgba(201, 203, 218, 0.5)',
            'rgba(201, 214, 290, 0.5)',
          ]},
          {
            data:[0,40,60,80,100],
            label:'Stacked',
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(153, 102, 254, 0.2)',
            'rgba(201, 203, 239, 0.2)',
            'rgba(153, 102, 234, 0.2)',
            'rgba(201, 203, 218, 0.2)',
            'rgba(201, 214, 290, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'],
          },
          
        ],
        labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun','July','Aug','Sept','Oct',"Nov",'Dec'],
      },
      options: {
        responsive:true,
        maintainAspectRatio:false,
        scales: {
            y: {
                beginAtZero: true,
                // display:false //agar grid hatani ho
            }
        }
    }
    })
  }

}
