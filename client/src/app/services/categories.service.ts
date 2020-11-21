import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  api = 'api/categories/';

  constructor(private rest: RestService) { }

  saveCategories(param){ return this.rest.post( `${this.api}save`, param); }
  getAllCategories(param){ return this.rest.post( `${this.api}getCategories`, param); }
  changeStatus(param){ return this.rest.post( `${this.api}changeStatus`, param); }
  deleteCategory(param){ return this.rest.delete( `${this.api}deleteCategory`, param); }
  updateCategory(param, data){ return this.rest.put( `${this.api}updateCategory`, param, data); }
  uploadCategoryImage( param) { return this.rest.post( 'categoryPic', param); }

}
