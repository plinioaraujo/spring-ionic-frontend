import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';

@Injectable()
export class errorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            console.log("Passou no Interceptor");
        return next.handle(req)
        .catch((error,caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

             console.log("Erro detectado pelo Interceptor");
             console.log(errorObj);   

             switch (errorObj.status) {
                 case 403:
                     this.handle403();
                     break;
             
                 default:
                     break;
             }

            return Observable.throw(errorObj);
        })as any;
    }   

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const errorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: errorInterceptor,
    multi: true,
};