import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookDefaultPricesComponent } from './book-default-prices/book-default-prices.component';
import { BookSpecificPricesComponent } from './book-specific-prices/book-specific-prices.component';
import { BookSettingsComponent } from './book-settings/book-settings.component';
import { BookPromocodeComponent } from './book-promocode/book-promocode.component';
import { BookIncrementDiscountComponent } from './book-increment-discount/book-increment-discount.component';

 // <--- JavaScript import from Angular
 import {MatPaginatorModule} from '@angular/material/paginator';

import {BookPublihserListComponent} from './book-publihser-list/book-publihser-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { BookEditComponent } from './template/book-edit/book-edit.component';
import { BookAddComponent } from './template/book-add/book-add.component';
import { BookCitationComponent } from './template/book-citation/book-citation.component';
import { BookDeleteComponent } from './template/book-delete/book-delete.component';
import { BookAddNewPriceComponent } from './template/book-add-new-price/book-add-new-price.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {BookFilterPipe} from '../services/bookcurrency.filter';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    BookDefaultPricesComponent,
    BookSpecificPricesComponent,
    BookSettingsComponent,
    BookPromocodeComponent,
    BookIncrementDiscountComponent,
    BookPublihserListComponent,
    BookEditComponent,
    BookAddComponent,
    BookCitationComponent,
    BookDeleteComponent,
    BookAddNewPriceComponent,
    BookFilterPipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    BooksRoutingModule,
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
    MatSlideToggleModule
  ],
  providers: [],
})
export class BooksModule { }
