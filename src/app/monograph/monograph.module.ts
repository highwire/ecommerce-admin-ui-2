import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonographRoutingModule } from './monograph-routing.module';


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
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MonographSpecificPricesComponent } from './monograph-specific-prices/monograph-specific-prices.component';
import { MonographAddComponent } from './template/monograph-add/monograph-add.component';
import { MonographDeleteComponent } from './template/monograph-delete/monograph-delete.component';
import { MonographAddNewPriceComponent } from './template/monograph-add-new-price/monograph-add-new-price.component';
import { MonographEditComponent } from './template/monograph-edit/monograph-edit.component';
import { MonographCitationComponent } from './template/monograph-citation/monograph-citation.component';
@NgModule({
  declarations: [
    MonographSpecificPricesComponent,
    MonographAddComponent,
    MonographDeleteComponent,
    MonographAddNewPriceComponent,
    MonographEditComponent,
    MonographCitationComponent,
    MonofilterPipe
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
    MonographRoutingModule,
  
    

  ],
  exports:[],
  providers: [],
})
export class MonographModule { }
