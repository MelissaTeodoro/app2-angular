import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/ofertas.model'

class CarrinhoService {
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )
        //Verificar se o item em questão já não existe dentro de this.itens
        let itemCarrinhoEncontrado = this.itens.find(
            (item: ItemCarrinho) => item.id === itemCarrinho.id
        )

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        } else {
            //Nenhuma referência encontrada
            this.itens.push(itemCarrinho)
        }
    }

    public totalCarrinhoCompra(): number {
        let total: number = 0

        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade)
        })

        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        //Incrementar quantidade
        /*let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinhoEncontrado.id )
        
        if( itemCarrinhoEncontrado ) {
            itemCarrinhoEncontrado.quantidade += 1
        }*/

        itemCarrinho.quantidade += 1

    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
        //Decrementar a quantidade
        itemCarrinho.quantidade -= 1

        if (itemCarrinho.quantidade === 0) {
            this.itens.splice(this.itens.indexOf(itemCarrinho), 1) //Extrai o indice indicado
        }
    }

    public limparCarrinho(): void {
        this.itens = []
    }

    public calculaQtdItemCarrinho(): number {
        let totalItens: number = null
        this.itens.map((item: ItemCarrinho) => totalItens += item.quantidade)
        return totalItens
    }
}

export { CarrinhoService }