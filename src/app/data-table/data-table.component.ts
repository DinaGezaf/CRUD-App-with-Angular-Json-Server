import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from '../shared/form.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from '../shared/user.model';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnInit {
  user!: User[];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'NO.',
    'Name',
    'Email',
    'Phone',
    'Address',
    'Gender',
    'Actions',
  ];

  constructor(private formService: FormService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.formService.get().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addUser() {
    const newUser = this.dialog.open(CreateComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
    });
    newUser.afterClosed().subscribe((r) => {
      this.loadData();
    });
  }
  editUser(id: any) {
    const editedUser = this.dialog.open(EditComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { id: id },
    });
    editedUser.afterClosed().subscribe((r) => {
      this.loadData();
    });
  }

  deleteUser(id: any) {
    alertify.confirm(
      'Delete User Data!!',
      'Do you want to delete this user ?',
      () => {
        this.formService.delete(id).subscribe((r) => {
          this.loadData();
        });
      },
      function () {}
    );
  }
}
