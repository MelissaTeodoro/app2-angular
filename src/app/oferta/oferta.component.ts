import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //Interface
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/ofertas.model';
import { Observable, observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx'

//npm install rxjs-compat

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    //console.log( 'ID recuperado da rota: ',this.route.snapshot.params['id'])
    this.ofertasService.getOfertaId(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => {
        this.oferta = oferta
      })
    /*Método Subscribe
    this.route.params.subscribe((parametro: any) => {
      console.log(parametro)
    })*/

    /*Subscribe
    this.route.params.subscribe((parametro: any) => { console.log(parametro) },
      (erro: any) => console.log(erro),
      //Conclusão do processamento do observable
      () => console.log('Processamento foi classificado como concluído')
    )*/

    let tempo = Observable.interval(2000)

    tempo.subscribe((intervalo: number) => { console.log(intervalo) })

    //Observable (observável)
    let meuObservableTeste = Observable.create((observer: Observer<string>) => {
      observer.next('Primeiro evento da stream')
      observer.next('Segundo evento da stream')
      //Finalizar com sucesso a stream de eventos
      observer.complete()
      //observer.error('Algum erro foi encontrado')
    })

    //Observable (observador)
    meuObservableTeste.subscribe(
      (resultado: any) => console.log(resultado),
      (erro: string) => console.log(erro),
      () => console.log('A stream de eventos foi finalizada')
    )
  }

}
