import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
   baseUrl = 'http://localhost:3030/';
 // this.baseUrl +

  constructor(private http: HttpClient) { }

  get(endPointg: string, params?: any, optn?: any): Observable<any> {
    const p = [];
    let newParam: string;
    if (params) {
      // tslint:disable-next-line: forin
      for (const  k in params) {
        const str = k + '=' + params[k];
        p.push(str);
      }
      newParam = p.join('&');
    }
    try {
      return this.http.get(this.baseUrl + endPointg + '?' + newParam, optn );
    }
    catch (e) {
      console.log(e);
    }
  }

  post(endPointg: string, params?: any): Observable<any> {
    try { return this.http.post<any>(this.baseUrl + endPointg, params); }
    catch (e) {
      console.log(e);
    }
  }

  delete(endPointg: string, params?: any): Observable<any> {
    const p = [];
    let newParam: string;
    if (params) {
      // tslint:disable-next-line: forin
      for (const  k in params) {
        const str = k + '=' + params[k];
        p.push(str);
      }
      newParam = p.join('&');
    }
    try { return this.http.delete<any>(this.baseUrl + endPointg + '?' + newParam); }
    catch (e) {
      console.log(e);
    }
  }

  put(endPointg: string, params?: any, optn?: any): Observable<any> {
    const p = [];
    let newParam: string;
    if (params) {
      // tslint:disable-next-line: forin
      for (const  k in params) {
        const str = k + '=' + params[k];
        p.push(str);
      }
      newParam = p.join('&');
    }
    try {
      return this.http.put<any>(this.baseUrl + endPointg + '?' + newParam, optn);
    }
    catch (e) {
      console.log(e);
    }
  }


}
