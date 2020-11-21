import { Injectable } from '@angular/core';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class SubCatService {

  api = 'api/subCategories/';
  constructor(private rest: RestService) { }

  saveSubCategories(param){ return this.rest.post( `${this.api}save`, param); }
  getSubCat(param){ return this.rest.post( `${this.api}getSubCat`, param); }
  changeStatus(param){ return this.rest.post( `${this.api}changeStatus`, param); }
  deleteSubCat(param){ return this.rest.delete( `${this.api}deleteSubCat`, param); }
  updateSubCat(param, data){ return this.rest.put( `${this.api}updateSubCat`, param, data); }
}
