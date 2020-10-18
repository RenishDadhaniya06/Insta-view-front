import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  requestCounter = 0;

  constructor(public loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestCounter += 1;

    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.requestCounter -= 1;

        if (this.requestCounter === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
