import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FormService } from '../shared/form.service';
import { User } from '../shared/user';
import * as alertify from 'alertifyjs'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  user : User | undefined;
  users : User[] | undefined;

  editData : any;

  constructor(private formService : FormService,
              private dialog: MatDialog,
              private builder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  myForm = this.builder.group({
    id :this.builder.control({value: '', disabled : true}),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    gender: this.builder.control('', Validators.required),
  })


  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.formService.getUserById(this.data.id).subscribe(response => {
        this.editData = response;
        this.myForm.setValue({
          id : this.editData.id,
          name: this.editData.name,
          email: this.editData.email,
          phone: this.editData.phone,
          address: this.editData.address,
          gender: this.editData.gender
        });
      });
    }
  }

  updateUser() {
    if (this.myForm.valid) {
      const editId = this.myForm.getRawValue().id;
      if (editId != '' && editId != null) {
        this.formService.update(editId, this.myForm.getRawValue()).subscribe(response => {
          this.closeEditData();
          alertify.success("Updated successfully.")
        });
      }else {
        this.formService.create(this.myForm.value).subscribe(response => {
          this.closeEditData();
          alertify.success("Saved Successfully.")
        });
      }
    }
  }

  closeEditData() {
    this.dialog.closeAll();
  }
}
