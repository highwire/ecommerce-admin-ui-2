import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalsRoutingModule } from './sites-journals-routing.module';
// import { SitesDefaultPricesComponent } from './sites-default-prices/sites-default-prices.component';
import { SitesSpecificPricesComponent } from './sites-specific-prices/sites-specific-prices.component';
// import { SitesSettingsComponent } from './sites-settings/sites-settings.component';
// import { SitesPromocodeComponent } from './sites-promocode/sites-promocode.component';


 // <--- JavaScript import from Angular
 import {MatPaginatorModule} from '@angular/material/paginator';

// import {SitesPublihserListComponent} from './sites-publihser-list/sites-publihser-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { SitesEditComponent } from './template/sites-edit/sites-edit.component';
import { SitesAddComponent } from './template/sites-add/sites-add.component';
import { SitesCitationComponent } from './template/sites-citation/sites-citation.component';
import { SitesDeleteComponent } from './template/sites-delete/sites-delete.component';
import { SitesAddNewPriceComponent } from './template/sites-add-new-price/sites-add-new-price.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {SiteFilterPipe} from '../services/sitecurrency.filter';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    SitesEditComponent,
    SitesAddComponent,
    SitesCitationComponent,
    SitesDeleteComponent,
    SitesAddNewPriceComponent,
    
    
    
    SitesSpecificPricesComponent,
    
    SiteFilterPipe
  ],
  imports: [
    
    CommonModule,
    MatTableModule,
    JournalsRoutingModule,
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
export class SitesModule { }
