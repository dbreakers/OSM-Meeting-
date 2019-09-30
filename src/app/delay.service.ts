// ANGULAR
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

// OBSERVABLES
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log( new Date(), request.url );
       return timer(5000).pipe(         // <== Wait 2 Seconds
      switchMap( ()=> next.handle(request) )) 
    }
    
}
