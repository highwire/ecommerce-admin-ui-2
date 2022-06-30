import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferencesRoutingModule } from './references-routing.module';
import { ReferencesSpecificPricesComponent } from './references-specific-prices/references-specific-prices.component';
 import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ReferencesEditComponent } from './template/references-edit/references-edit.component';
import { ReferencesAddComponent } from './template/references-add/references-add.component';
import { ReferencesCitationComponent } from './template/references-citation/references-citation.component';
import { ReferencesDeleteComponent } from './template/references-delete/references-delete.component';
import { ReferencesAddNewPriceComponent } from './template/references-add-new-price/references-add-new-price.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {RefFilterPipe} from '../services/ref-currency.filter';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
   ReferencesAddComponent,
   ReferencesAddNewPriceComponent,
   ReferencesCitationComponent,
   
   ReferencesDeleteComponent,
   
   ReferencesSpecificPricesComponent,
   ReferencesEditComponent,
   
   RefFilterPipe
  ],
  imports: [
    
    CommonModule,
    MatTableModule,
    ReferencesRoutingModule,
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
    
  ],
  
  providers: [],
})
export class ReferencesModule { }
