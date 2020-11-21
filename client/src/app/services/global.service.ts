import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  totalPrice = 0;
  totalItems = 0;

  cartProduct = new BehaviorSubject([]);
  cart = this.cartProduct.asObservable();

  baseUrl: any =  'http://213.136.93.43:3030/';

  constructor(private route: Router,
              private spinner: NgxSpinnerService) { }

  getcurrentUser(){
    if (localStorage.getItem('currentUser') !== 'undefined' && localStorage.getItem('currentUser') !== '') {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    return null;
  }

  successAlert(message){
    Swal.fire(message);
  }

  errorAlert(message){
    Swal.fire(message, 'error');
  }

  redirect(link) {
    this.route.navigate(['/' + link]);
  }

  logout(){
    localStorage.clear();
    this.redirect('');
  }
  spin(v) {
    if (v === true) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
}
