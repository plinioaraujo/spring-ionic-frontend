import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

@Injectable()
export class errorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService, public alertCtrl: AlertController){

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
                case 401:
                this.handle401(); 
                case 403:
                     this.handle403();
                     break;
                default:
                 this.errorDefaultHandle(errorObj);
                     break;
             }

            return Observable.throw(errorObj);
        })as any;
    }   
  

    handle401(){
       let alert =  this.alertCtrl.create({
           title: "Erro 401: Falha de Autenticação!",
           message: 'Email ou senha inválidos',
           enableBackdropDismiss: false,
           buttons:[
               {
                   text: 'OK'
               }
           ]
       });
       alert.present();
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    errorDefaultHandle(errorObj) {
        let alert =  this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            subTitle: 'Página não encontrada! Procure o administrador do sistema.',
            message: 'Página não encontrada!',//errorObj.message,
            enableBackdropDismiss: false,
            buttons:[
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }
}



export const errorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: errorInterceptor,
    multi: true,
};