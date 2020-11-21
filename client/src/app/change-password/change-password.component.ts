import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService, UsersService } from '../services';
import { MustMatch } from '../_helper/must-match.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePass: FormGroup;
  isSubmitted = false;
  currentUser: any;

  constructor(private formBuilder: FormBuilder,
              private global: GlobalService,
              private userSrc: UsersService) { }

  ngOnInit(): void {
    this.currentUser = this.global.getcurrentUser();

    this.changePass = this.formBuilder.group({
      userName: [this.currentUser.userName],
      oldPass: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  resetForm(){
    this.changePass.patchValue({
      userName: this.currentUser.userName,
      oldPass: '',
      password: '',
      confirmPassword: ''
    });
  }

  changePassword(){
     this.userSrc.changePassword(this.changePass.value).subscribe( res => {
        if (res.result){ this.resetForm(); this.global.successAlert(res.message); }
        else { this.global.errorAlert(res.message); }
     }, err => { this.global.errorAlert(err.error.message); console.error('=====>>>', err); });
  }
}
