



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
