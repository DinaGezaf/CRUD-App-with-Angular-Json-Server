import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from '../shared/form.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from '../shared/user';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit {
  users : any;
  finaldata:any;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  displayedColumns: string[] = ['NO.','Name', 'Email', 'Phone', 'Address', 'Gender', 'Actions'];

  constructor(private formService : FormService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.formService.get().subscribe(response=> {
      this.users=response;
      this.finaldata = new MatTableDataSource<User>(this.users);
      this.finaldata.paginator=this.paginator;
      this.finaldata.sort=this.sort;
  })}

  editUser(id:any){
    const editedUser = this.dialog.open(EditComponent,{
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data:{id: id}
    })
    editedUser.afterClosed().subscribe(r => {
      this.loadData();
    });
  }

  deleteUser(id: any) {
    alertify.confirm("Delete User Data!!", "Do you want to delete this user ?", () => {
      this.formService.delete(id).subscribe(r => {
         this.loadData();
      });
    }, function () {})
  }

}
