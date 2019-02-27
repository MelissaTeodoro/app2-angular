import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/ofertas.model';

//import 'rxjs/add/operator/toPromise';

@Injectable() //Usado para decorar a classe OfertaService
export class OfertasService {

    constructor(private http: Http) {}

    public getOfertas(): Promise<Oferta[]> {
        //requisição http que retorna uma promessa com Oferta[]
        return this.http.get('http://localhost:3000/ofertas') //Esse verbo vai retornar um observable, porém vou converter para promise no momento
            .toPromise()
            .then((resposta:any) => resposta.json()) //retorna um objeto literal
    }     
}