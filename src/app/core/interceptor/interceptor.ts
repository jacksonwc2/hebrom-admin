import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

// tslint:disable:no-parameter-reassignment
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.setHeaders(request);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (this.mostrarErroClientSide(error)) {
          alert('Um erro ocorreu:' + error.message);
        }

        return throwError(error.error);
      })
    );
  }

  private setHeaders(req: HttpRequest<any>): HttpRequest<any> {
    const hasContentType = req.headers.has('Content-Type');
    debugger;
    if (!hasContentType) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }

    // Content-type empty é removido para ser definido pelo navegador
    debugger;
    if (hasContentType && !req.headers.get('Content-Type')) {
      req = req.clone({ headers: req.headers.delete('Content-Type') });
    }

    return req;
  }

  private mostrarErroClientSide(error: HttpErrorResponse) {
    return error.error instanceof ProgressEvent;
  }
}
