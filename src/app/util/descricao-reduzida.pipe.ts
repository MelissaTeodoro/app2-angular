import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'descricaoReduzida' //nome que será usado no template, neste caso no input
})
export class DescricaoReduzida implements PipeTransform {

    transform(texto: string, truncarEm: number): string {
        if (texto.length > truncarEm) {
            return texto.substr(0, truncarEm) + '...' //retorna caracteres de uma string começando da posição específica
        } else {
            return texto
        }
    }
}