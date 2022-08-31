import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormService } from '../shared/form.service';
import { User } from '../shared/user.model';
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
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  myForm = new FormGroup({
    id :new FormControl({value: '', disabled : true}),
    name: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    email: new FormControl('',[Validators.email,Validators.required]),
    phone: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required])
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
