import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  currentUser: any;
  constructor(private global: GlobalService) { }

  ngOnInit(): void {
    this.currentUser = this.global.getcurrentUser();
  }

  logOut(){
    this.global.logout();
  }
}
