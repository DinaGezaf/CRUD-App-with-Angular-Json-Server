import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../shared/form.service';
import * as alertify from 'alertifyjs'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../shared/user.model';
import { AstMemoryEfficientTransformer } from '@angular/compiler';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  editData: any;

  myForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  constructor(
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  saveUser() {
    if (this.myForm.valid) {
      const editId = this.myForm.getRawValue().id;
      if (editId != '' && editId != null) {
        this.formService
          .update(editId, this.myForm.getRawValue())
          .subscribe(() => {
          this.closeEditData();
            alertify.success('Updated successfully.');
          });
      } else {
        this.formService.create(this.myForm.value).subscribe(() => {
          this.closeEditData();
          alertify.success('Saved Successfully.');
        });
      }
    }
  }

  closeEditData() {
    this.dialog.closeAll();
  }

  get id() {
    return this.myForm.get('id');
  }
  get name() {
    return this.myForm.get('name');
  }
  get email() {
    return this.myForm.get('email');
  }
  get phone() {
    return this.myForm.get('phone');
  }
  get address() {
    return this.myForm.get('address');
  }
  get gender() {
    return this.myForm.get('gender');
  }
}
