import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Pedido } from '../app/shared/pedido.model';
import { Observable } from 'rxjs';
import { URL_API } from './app.api';

@Injectable()
export class OrdemCompraService {

    constructor(private http: Http) { }

    public efetivarCompra(pedido: Pedido): Observable<number> {
        let headers: Headers = new Headers()

        headers.append('Content-type', 'application/json')

        return this.http.post(
            `${URL_API}/pedidos`,
            //Representação textual do objeto literal
            JSON.stringify(pedido),
            new RequestOptions({ headers: headers })
        ) //Resposta dada pela API
            //Extraindo o conteúdo da resposta e convertendo para .json
            .map((resposta: Response) => resposta.json().id)
    }
}