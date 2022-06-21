import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { DetailedComponent } from './detailed/detailed.component';
import { ChartsComponent } from './charts/charts.component';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

import {MatPaginatorModule} from '@angular/material/paginator';


import {MatTableModule} from '@angular/material/table';

import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ReceiptComponent } from './receipt/receipt.component';
// import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts'; // this is needed!
// DoughnutChartComponent, 
// PieChartComponent, 
// BarChartComponent,
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [
   
    DetailedComponent,
    ChartsComponent,
    MostPopularComponent,
    ReceiptComponent,
    
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSortModule
    
  ]
})
export class ReportsModule { }
