import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { CidadeDTO } from "../../models/cidade.dto";

@Injectable()
export class CidadeService{

    constructor(public http :HttpClient){

    }

    findaAll(estadoId : string) : Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.base_url}/estados/${estadoId}/cidades`);
    }
}