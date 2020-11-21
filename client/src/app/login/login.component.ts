import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService, UsersService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private global: GlobalService,
              private userSrc: UsersService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(){
    const loginCredential = this.loginForm.value;
    this.userSrc.login(this.loginForm.value).subscribe( res => {
      if (res.result){
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        localStorage.setItem('token', JSON.stringify(res.token));
        this.global.redirect('dashbord/blog');
      } else { this.global.errorAlert(res.message); this.loginForm.reset(); }
   }, err => {
      this.global.errorAlert(err.error.message);
      console.error( err);
      this.loginForm.reset();
     });
  }
}
