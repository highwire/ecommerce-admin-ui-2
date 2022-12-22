import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestReviewRoutingModule } from './test-review-routing.module';


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
import { MonofilterPipe } from '../services/monofilter.pipe';
import { TestreviewPipe } from '../services/testreview.pipe';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TestReviewSpecificPricesComponent } from './test-review-specific-prices/test-review-specific-prices.component';
import { TestReviewAddComponent } from './template/test-review-add/test-review-add.component';
import { TestReviewDeleteComponent } from './template/test-review-delete/test-review-delete.component';
import { TestReviewAddNewPriceComponent } from './template/test-review-add-new-price/test-review-add-new-price.component';
import { TestReviewEditComponent } from './template/test-review-edit/test-review-edit.component';
import { TestReviewCitationComponent } from './template/test-review-citation/test-review-citation.component';
@NgModule({
  declarations: [
    TestReviewSpecificPricesComponent,
    TestReviewAddComponent,
    TestReviewDeleteComponent,
    TestReviewAddNewPriceComponent,
    TestReviewEditComponent,
    TestReviewCitationComponent,
    // MonofilterPipe
    TestreviewPipe
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
    TestReviewRoutingModule
    
  
    

  ],
  exports:[],
  providers: [],
})
export class TestReviewModule { }
