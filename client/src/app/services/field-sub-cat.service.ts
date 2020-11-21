import { Injectable } from '@angular/core';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class FieldSubCatService {

  api = 'api/field-sub-cat/';
  constructor(private rest: RestService) { }

  saveFieldSubCategories(param){ return this.rest.post( `${this.api}save`, param); }
  getFieldSubCat(param){ return this.rest.post( `${this.api}getFieldSubCat`, param); }
  changeStatus(param){ return this.rest.post( `${this.api}changeStatus`, param); }
  deleteFieldSubCat(param){ return this.rest.delete( `${this.api}deleteFieldSubCat`, param); }
  updateFieldSubCat(param, data){ return this.rest.put( `${this.api}updateFieldSubCat`, param, data); }
}
