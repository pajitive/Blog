import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService, UsersService } from '../services';
import { MustMatch } from '../_helper/must-match.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
              private global: GlobalService,
              private userSrc: UsersService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
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
         this.global.successAlert('you have registered successfully.');
         localStorage.setItem('currentUser', JSON.stringify(res.data));
         localStorage.setItem('token', JSON.stringify(res.token));
         this.global.redirect('');
       } else{
         this.global.errorAlert(res.message);
       }
    }, err => { console.log('err===>>', err); });
    }

}
