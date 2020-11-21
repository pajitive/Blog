import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GlobalService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit  {
  cartItems: any = 0;
  constructor(private global: GlobalService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.global.cart.subscribe(res => {
        this.cartItems = 0;
        res.forEach(e => {
          this.cartItems += e.totalItems;
        });
      });
    }, 500);
  }

}
