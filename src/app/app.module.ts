import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { FormRoutingModule } from './form-routing/form-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { FormRoutingRoutingModule } from './form-routing/form-routing-routing.module';
import { EditComponent } from './edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from './shared/material.module';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormRoutingRoutingModule,
    FormRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent],
})
export class AppModule {}
