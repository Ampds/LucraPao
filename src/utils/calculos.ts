import { Ingrediente, Produto, CustoProduto, PrecoFornecedor } from '../types';

/** Retorna o preço mais barato entre os fornecedores cadastrados de um ingrediente. */
export function melhorPreco(ingrediente: Ingrediente): PrecoFornecedor | null {
  if (ingrediente.precos.length === 0) return null;
  return ingrediente.precos.reduce((menor, atual) =>
    atual.preco < menor.preco ? atual : menor
  );
}

/**
 * Calcula o custo total, custo unitário, lucro e margem de um produto,
 * a partir da receita cadastrada e dos ingredientes (usando sempre o
 * menor preço disponível entre fornecedores).
 */
export function calcularCustoProduto(
  produto: Produto,
  ingredientes: Ingrediente[]
): CustoProduto {
  const custoTotalReceita = produto.itensReceita.reduce((total, item) => {
    const ingrediente = ingredientes.find((i) => i.id === item.ingredienteId);
    if (!ingrediente) return total;
    const preco = melhorPreco(ingrediente);
    if (!preco) return total;
    return total + preco.preco * item.quantidade;
  }, 0);

  const rendimento = produto.rendimento > 0 ? produto.rendimento : 1;
  const custoUnitario = custoTotalReceita / rendimento;
  const lucroUnitario = produto.precoVenda - custoUnitario;
  const margemLucro = produto.precoVenda > 0 ? lucroUnitario / produto.precoVenda : 0;

  return { custoTotalReceita, custoUnitario, lucroUnitario, margemLucro };
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarPercentual(valor: number): string {
  return `${(valor * 100).toFixed(0)}%`;
}
