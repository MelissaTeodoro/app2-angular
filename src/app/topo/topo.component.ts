import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/ofertas.service';
import { Observable, Subject } from 'rxjs';
import { Oferta } from '../shared/ofertas.model';
import '../util/rxjs-extensions';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService, private carrinhoService: CarrinhoService) { }

  ngOnInit() {

    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .debounceTime(1000) //Executa a ação do switchmap após 1 segundo
      .distinctUntilChanged() //Não executa nova requisição caso o termo pesquisado seja o mesmo
      .switchMap((termo: string) => {
        if (termo.trim() === '') //Método que retira espaços vazios
        {//retornar um observable de array de ofertas vazio
          //Inferir um tipo com Observable.of()
          return Observable.of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termo)
      })

      .catch((err: any) => {
        return Observable.of<Oferta[]>([])
      })
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }

}
