import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api = 'api/user/';
  constructor(private rest: RestService) { }

  signUp(param){ return this.rest.post( `${this.api}signup`, param); }
  changePassword(param){ return this.rest.post( `${this.api}changePassword`, param); }
  login(param){ return this.rest.post( `${this.api}login`, param); }
  getAllUsers(param){ return this.rest.post( `${this.api}getAllUsers`, param); }
  deleteUser(param){ return this.rest.delete( `${this.api}deleteUser`, param); }
  updateUser(param, data){ return this.rest.put( `${this.api}updateUser`, param, data); }

}
