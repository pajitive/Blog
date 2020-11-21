import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {  GlobalService, UsersService } from '../services';
import { MustMatch } from '../_helper/must-match.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  p = 1;
  Count: number;
  baseUrl: any;
  blogForm: FormGroup;
  signupForm: FormGroup;
  blogs = [];
  users = [];

  isUpdateField = false;
  isSubmitted = false;
  updateItemId: any;


  constructor(private global: GlobalService,
              private formbuilder: FormBuilder,
              private userSrc: UsersService) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      userName: ['', [Validators.required]],
      role: ['', Validators.required],
      validTill: ['', Validators.required], 
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.getAllUsers();
  }

  getAllUsers(event = 1){
    this.global.spin(true);
    const param = {
      initial: event,
      pageSize: 10
    };
    this.userSrc.getAllUsers(param).subscribe(res => {
        this.global.spin(false);
        this.users = res.data;
        this.Count = res.totalItems;
    });
  }

  deleteUser(item){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        const param = {
          id: item._id,
        };
        this.userSrc.deleteUser(param).subscribe( res => {
          if (res.result){
            this.users.forEach((e, i) => {
              if (e._id === item._id){
                this.users.splice(i, 1);
              }
            });
            this.global.successAlert(res.message);
          }
        });
      }
    });
  }

  editUser(item){
    this.isUpdateField = true;
    this.updateItemId = item._id;
    this.signupForm.patchValue(item);
  }

  updateCat(){
    this.userSrc.updateUser({id: this.updateItemId}, this.signupForm.value).subscribe(res => {
    this.global.successAlert(res.message);
    this.getAllUsers();
    this.resetForm();
  }, (err) => {
    console.log('error', err);
  });
}

  resetForm(){
    this.isSubmitted = false;
    this.isUpdateField = false;
    this.signupForm.patchValue({
      userName: '',
      role: '',
      password: '',
      confirmPassword: '',
    });
  }

  signup(){
    this.isSubmitted = true;
    if (this.signupForm.invalid) {
       return;
    }
    this.userSrc.signUp(this.signupForm.value).subscribe(res => {
       if (res.result){
         this.isSubmitted = false;
         this.resetForm();
         this.getAllUsers();
         this.global.successAlert('you have registered successfully.');
       } else{
         this.global.errorAlert(res.message);
       }
    }, err => { console.log('err===>>', err); });
    }
}
