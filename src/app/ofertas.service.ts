import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/ofertas.model';
import { URL_API } from './app.api';
//import 'rxjs/add/operator/toPromise';

@Injectable() //Usado para decorar a classe OfertaService
export class OfertasService {

    constructor(private http: Http) {}

    public getOfertas(): Promise<Oferta[]> {
        //requisição http que retorna uma promessa com Oferta[]
        return this.http.get(`${URL_API}/ofertas?destaque=true`) //Esse verbo vai retornar um observable, porém vou converter para promise no momento
            .toPromise()
            .then((resposta:any) => resposta.json()) //retorna um objeto literal
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta.json())
    }

    public getOfertaId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            //Método .shift() extrai a primeira posição do array
            return resposta.json().shift()
        })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            console.log(resposta.json()[0].descricao)
            return resposta.json()[0].descricao
        })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            console.log(resposta.json()[0].descricao)
            return resposta.json()[0].descricao
        })
    }
}