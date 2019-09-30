// ANGULAR
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

// OBSERVABLES
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request);
        return next.handle(request).delay(2000);
    }
}
