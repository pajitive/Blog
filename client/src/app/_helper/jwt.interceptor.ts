import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { environment } from '@environments/environment';
import { GlobalService } from '../services';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  userSession: any;
    constructor(private global: GlobalService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.userSession = this.global.getcurrentUser();
      const isLoggedIn =  this.userSession?.token;
      if (isLoggedIn) {
            request = request.clone({
                setHeaders: {
                   Authorization: `Bearer ${this.userSession.token}`,
                  // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;',
                    responseType: 'json',
                    Accept: 'application/json'
                   }
            });
        }

      return next.handle(request);
    }
}
