import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportGuidelineRoutingModule } from './report-guideline-routing.module';


 // <--- JavaScript import from Angular
 import {MatPaginatorModule} from '@angular/material/paginator';


import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { MonofilterPipe } from '../services/monofilter.pipe';
import { GuidelinefilterPipe } from '../services/guidelinefilter.pipe';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ReportGuidelineSpecificPricesComponent } from './report-guideline-specific-prices/report-guideline-specific-prices.component';
import { ReportGuidelineAddComponent } from './template/report-guideline-add/report-guideline-add.component';
import { ReportGuidelineDeleteComponent } from './template/report-guideline-delete/report-guideline-delete.component';
import { ReportGuidelineAddNewPriceComponent } from './template/report-guideline-add-new-price/report-guideline-add-new-price.component';
import { ReportGuidelineEditComponent } from './template/report-guideline-edit/report-guideline-edit.component';
import { ReportGuidelineCitationComponent } from './template/report-guideline-citation/report-guideline-citation.component';
@NgModule({
  declarations: [
    ReportGuidelineSpecificPricesComponent,
    ReportGuidelineAddComponent,
    ReportGuidelineDeleteComponent,
    ReportGuidelineAddNewPriceComponent,
    ReportGuidelineEditComponent,
    ReportGuidelineCitationComponent,
    GuidelinefilterPipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSortModule,
    MatSlideToggleModule,
    ReportGuidelineRoutingModule ,
  
    

  ],
  exports:[],
  providers: [],
})
export class ReportGuidelineModule { }
