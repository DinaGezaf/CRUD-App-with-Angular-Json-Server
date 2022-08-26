import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../shared/form.service';
import * as alertify from 'alertifyjs'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../shared/user';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  editData : any;
  users: User[] | undefined;

  myForm = new FormGroup({
    id :new FormControl({value: '', disabled : true}),
    name: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    email: new FormControl('',[Validators.email,Validators.required]),
    phone: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required])
  })

  constructor(private formService : FormService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  loadData() {
    this.formService.get().subscribe((response: any) => {
      this.users=response;
  })}

  saveUser() {
    if (this.myForm.valid) {
      const editId = this.myForm.getRawValue().id;
      if (editId != '' && editId != null) {
        this.formService.update(editId, this.myForm.getRawValue()).subscribe(() => {
          this.loadData();
          alertify.success("Updated successfully.")
        });
      }else {
        this.formService.create(this.myForm.value).subscribe(() => {
          this.loadData();
          alertify.success("Saved Successfully.")
        });
      }
    }
  }

  get id (){
    return this.myForm.get('id')
  }
  get name(){
    return this.myForm.get('name');
  }
  get email(){
    return this.myForm.get('email');
  }
  get phone(){
    return this.myForm.get('phone');
  }
  get address(){
    return this.myForm.get('address');
  }
  get gender(){
    return this.myForm.get('gender');
  }
}
