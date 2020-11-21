import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  api = 'api/blogs/';
  constructor(private rest: RestService) { }

  saveBlog(param){ return this.rest.post( `${this.api}save`, param); }
  getBlogs(param){ return this.rest.post( `${this.api}getBlogs`, param); }
  changeStatus(param){ return this.rest.post( `${this.api}changeStatus`, param); }
  deleteBlog(param){ return this.rest.delete( `${this.api}deleteBlog`, param); }
  updateBlog(param, data){ return this.rest.put( `${this.api}updateBlog`, param, data); }
}
