import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/ofertas.model';

//Metadados
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[]

  //Criar a variável do objeto que vai receber o serviço
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    /* .then() --> Executa métodos de tratamento da realização e rejeição da promessa
     .catch() --> Adiciona um callback que trata rejeição*/

    this.ofertasService.getOfertas()
      .then((ofertas: Oferta[]) => {
        this.ofertas = ofertas
      }) //Executa uma ação quando a promessa for resolvida

      .catch((param: any) => {
        console.log(param)
      })
  }

}
