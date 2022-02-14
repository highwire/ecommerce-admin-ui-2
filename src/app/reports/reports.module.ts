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




@NgModule({
  declarations: [
    DetailedComponent,
    ChartsComponent,
    MostPopularComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule
    
  ]
})
export class ReportsModule { }
