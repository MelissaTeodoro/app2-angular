import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //Interface
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/ofertas.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
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
    .then( (oferta: Oferta) => {
      this.oferta = oferta
    })
    /*Método Subscribe
    this.route.params.subscribe((parametro: any) => {
      console.log(parametro)
    })*/
  }

}
