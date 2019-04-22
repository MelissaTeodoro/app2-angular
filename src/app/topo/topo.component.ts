import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/ofertas.service';
import { Observable, Subject } from 'rxjs';
import { Oferta } from '../shared/ofertas.model';
import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public ofertas2: Oferta[]
  public subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .debounceTime(1000) //Executa a ação do switchmap após 1 segundo
      .distinctUntilChanged() //Não executa nova requisição caso o termo pesquisado seja o mesmo
      .switchMap((termo: string) => {
        console.log('Requisição HTTP para API')

        if (termo.trim() === '') //Método que retira espaços vazios
        {//retornar um observable de array de ofertas vazio
          //Inferir um tipo de Observable.of()
          return Observable.of<Oferta[]>([])
        }

        return this.ofertasService.pesquisaOfertas(termo)

      })

      .catch((err: any) => {
        console.log(err)

        return Observable.of<Oferta[]>([])
      })

    this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log(ofertas)
      this.ofertas2 = ofertas
    })
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('Keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }
}
