import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from '../data-table/data-table.component';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'datatable' },
  { path: 'datatable', component: DataTableComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FormRoutingRoutingModule { }
