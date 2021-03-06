import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { EstadoDTO } from "../../models/estado.dto";

@Injectable()
export class EstadoService{

    constructor(public http :HttpClient){

    }

    findaAll() : Observable<EstadoDTO[]>{
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.base_url}/estados`);
    }
}