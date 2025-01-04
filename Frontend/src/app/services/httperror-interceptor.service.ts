import { HttpErrorResponse,  HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError,   concatMap,   Observable,   of,   retryWhen,  throwError } from "rxjs";
import { AlertifyService } from "./alertify.service";
import { Injectable } from "@angular/core";
import { ErrorCodes } from "../Enums/enums";

@Injectable({
  providedIn:'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{
  constructor(private alertify: AlertifyService){}
    intercept(request: HttpRequest<any>, next: HttpHandler) {
      console.log('HTTP Request Started');
        return next.handle(request)
        .pipe(
          retryWhen(error => this.retryRequest(error,3)),
          catchError((error:HttpErrorResponse) => {
            const errorMessage = this.setError(error);
            console.log(error);
            this.alertify.error(errorMessage);
            return throwError(errorMessage);
          })
        );
    }
    retryRequest(error: Observable<any>, retryCount: number): Observable<unknown>
    {
      return error.pipe(
        concatMap((checkError : HttpErrorResponse, count:number) => {
          if(count <=retryCount)
          {
            switch(checkError.status){
              case ErrorCodes.serverDown :    // Retry in case of WebAPi is down
                return of(checkError);
                case ErrorCodes.unauthorized :   // Retry in case of unauthorized error
                return of(checkError);
            }
          }
          return throwError(checkError);
        })
      )
    }
    setError(error:HttpErrorResponse): string {
      let errorMessage='Unknown error occured';
      if(error.error instanceof ErrorEvent){
        // client side error
        errorMessage=error.error.message;
      }
      else{
        // Server Side error
        if(error.status != 0){
          errorMessage=error.error.errorMessage;
        }
      }
      return errorMessage;
    }
}
