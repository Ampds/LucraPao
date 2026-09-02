// Tipos centrais do domínio do LucraPão.
// Mantidos simples de propósito — o objetivo é modelar o suficiente para
// telas essenciais funcionarem com dados mockados, sem acoplar a um backend.

export interface Fornecedor {
  id: string;
  nome: string;
}

export interface PrecoFornecedor {
  fornecedorId: string;
  preco: number; // preço por unidade de medida do ingrediente
  atualizadoEm: string; // ISO date
}

export type UnidadeMedida = 'g' | 'kg' | 'ml' | 'l' | 'unidade';

export interface Ingrediente {
  id: string;
  nome: string;
  unidade: UnidadeMedida;
  precos: PrecoFornecedor[]; // um ingrediente pode ter preços de vários fornecedores
}

export interface ItemReceita {
  ingredienteId: string;
  quantidade: number; // na mesma unidade do ingrediente
}

export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  itensReceita: ItemReceita[];
  precoVenda: number;
  rendimento: number; // quantas unidades a receita produz
  imagemEmoji: string; // placeholder visual leve, sem depender de upload de imagem
}

export interface HistoricoCusto {
  produtoId: string;
  data: string; // ISO date
  custoUnitario: number;
}

// --- Tipos derivados/calculados ---

export interface CustoProduto {
  custoTotalReceita: number;
  custoUnitario: number;
  lucroUnitario: number;
  margemLucro: number; // percentual, ex.: 0.42 = 42%
}

export interface ItemListaCompras {
  ingredienteId: string;
  quantidadeNecessaria: number;
  melhorPreco: PrecoFornecedor & { fornecedorNome: string };
}
