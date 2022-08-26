import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../create/create.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { EditComponent } from '../edit/edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create' },
  { path: 'create', component: CreateComponent },
  { path: 'datatable', component: DataTableComponent },
  { path: 'edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FormRoutingRoutingModule { }
