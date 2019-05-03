import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/ofertas.model';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    //Observable
    this.route.params.subscribe((parametros: Params) => {
      //Promise
      this.ofertasService.getOfertaId(parametros.id)
        .then((oferta: Oferta) => {
          this.oferta = oferta
        })
    })
  }

  ngOnDestroy() { }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens())
  }
}