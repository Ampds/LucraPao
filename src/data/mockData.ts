import { Fornecedor, Ingrediente, Produto } from '../types';

export const fornecedores: Fornecedor[] = [
  { id: 'f1', nome: 'Atacadão Central' },
  { id: 'f2', nome: 'Distribuidora Trigo Bom' },
  { id: 'f3', nome: 'Mercado do Seu Zé' },
];

export const ingredientes: Ingrediente[] = [
  {
    id: 'i1',
    nome: 'Farinha de trigo',
    unidade: 'kg',
    precos: [
      { fornecedorId: 'f1', preco: 4.2, atualizadoEm: '2026-08-20' },
      { fornecedorId: 'f2', preco: 3.9, atualizadoEm: '2026-08-25' },
    ],
  },
  {
    id: 'i2',
    nome: 'Açúcar refinado',
    unidade: 'kg',
    precos: [
      { fornecedorId: 'f1', preco: 5.1, atualizadoEm: '2026-08-18' },
      { fornecedorId: 'f3', preco: 4.8, atualizadoEm: '2026-08-27' },
    ],
  },
  {
    id: 'i3',
    nome: 'Ovos',
    unidade: 'unidade',
    precos: [
      { fornecedorId: 'f3', preco: 0.65, atualizadoEm: '2026-08-29' },
      { fornecedorId: 'f1', preco: 0.7, atualizadoEm: '2026-08-15' },
    ],
  },
  {
    id: 'i4',
    nome: 'Manteiga',
    unidade: 'kg',
    precos: [{ fornecedorId: 'f2', preco: 32.0, atualizadoEm: '2026-08-22' }],
  },
  {
    id: 'i5',
    nome: 'Chocolate em pó',
    unidade: 'kg',
    precos: [
      { fornecedorId: 'f2', preco: 18.5, atualizadoEm: '2026-08-19' },
      { fornecedorId: 'f1', preco: 19.9, atualizadoEm: '2026-08-10' },
    ],
  },
];

export const produtos: Produto[] = [
  {
    id: 'p1',
    nome: 'Bolo de chocolate',
    categoria: 'Bolos',
    rendimento: 8,
    precoVenda: 12.0,
    imagemEmoji: '🍫',
    itensReceita: [
      { ingredienteId: 'i1', quantidade: 0.5 },
      { ingredienteId: 'i2', quantidade: 0.4 },
      { ingredienteId: 'i3', quantidade: 4 },
      { ingredienteId: 'i4', quantidade: 0.2 },
      { ingredienteId: 'i5', quantidade: 0.15 },
    ],
  },
  {
    id: 'p2',
    nome: 'Pão francês (dúzia)',
    categoria: 'Pães',
    rendimento: 12,
    precoVenda: 1.2,
    imagemEmoji: '🥖',
    itensReceita: [
      { ingredienteId: 'i1', quantidade: 1 },
      { ingredienteId: 'i3', quantidade: 1 },
    ],
  },
  {
    id: 'p3',
    nome: 'Torta de limão',
    categoria: 'Tortas',
    rendimento: 10,
    precoVenda: 9.5,
    imagemEmoji: '🍋',
    itensReceita: [
      { ingredienteId: 'i1', quantidade: 0.3 },
      { ingredienteId: 'i2', quantidade: 0.3 },
      { ingredienteId: 'i3', quantidade: 3 },
      { ingredienteId: 'i4', quantidade: 0.15 },
    ],
  },
];
