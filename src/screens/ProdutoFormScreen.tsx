import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ingredientes as todosIngredientes } from '../data/mockData';
import { ItemReceita, Produto } from '../types';
import { calcularCustoProduto, formatarMoeda, formatarPercentual, melhorPreco } from '../utils/calculos';
import { colors, radius, spacing, typography, shadow } from '../theme/theme';

interface ProdutoFormScreenProps {
  produtoExistente?: Produto; // se vier preenchido, tela funciona como edição
}

export function ProdutoFormScreen({ produtoExistente }: ProdutoFormScreenProps) {
  const router = useRouter();
  const [nome, setNome] = useState(produtoExistente?.nome ?? '');
  const [categoria, setCategoria] = useState(produtoExistente?.categoria ?? '');
  const [rendimento, setRendimento] = useState(String(produtoExistente?.rendimento ?? '1'));
  const [precoVenda, setPrecoVenda] = useState(String(produtoExistente?.precoVenda ?? ''));
  const [itensReceita, setItensReceita] = useState<ItemReceita[]>(
    produtoExistente?.itensReceita ?? []
  );

  const produtoCalculado: Produto = useMemo(
    () => ({
      id: produtoExistente?.id ?? 'novo',
      nome,
      categoria,
      rendimento: Number(rendimento) || 1,
      precoVenda: Number(precoVenda) || 0,
      itensReceita,
      imagemEmoji: produtoExistente?.imagemEmoji ?? '🧁',
    }),
    [nome, categoria, rendimento, precoVenda, itensReceita, produtoExistente]
  );

  const custo = calcularCustoProduto(produtoCalculado, todosIngredientes);
  const lucroPositivo = custo.lucroUnitario >= 0;

  function adicionarIngrediente(ingredienteId: string) {
    if (itensReceita.some((i) => i.ingredienteId === ingredienteId)) return;
    setItensReceita((atual) => [...atual, { ingredienteId, quantidade: 0 }]);
  }

  function atualizarQuantidade(ingredienteId: string, quantidadeTexto: string) {
    const quantidade = Number(quantidadeTexto.replace(',', '.')) || 0;
    setItensReceita((atual) =>
      atual.map((item) => (item.ingredienteId === ingredienteId ? { ...item, quantidade } : item))
    );
  }

  function removerIngrediente(ingredienteId: string) {
    setItensReceita((atual) => atual.filter((i) => i.ingredienteId !== ingredienteId));
  }

  const ingredientesDisponiveis = todosIngredientes.filter(
    (ing) => !itensReceita.some((item) => item.ingredienteId === ing.id)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>
          {produtoExistente ? 'Editar produto' : 'Novo produto'}
        </Text>

        <Campo label="Nome do produto">
          <TextInput
            style={styles.input}
            placeholder="Ex.: Bolo de cenoura"
            placeholderTextColor={colors.textSecondary}
            value={nome}
            onChangeText={setNome}
          />
        </Campo>

        <View style={styles.linhaDupla}>
          <Campo label="Categoria" flex={1}>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Bolos"
              placeholderTextColor={colors.textSecondary}
              value={categoria}
              onChangeText={setCategoria}
            />
          </Campo>
          <Campo label="Rende (un.)" flex={1}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={rendimento}
              onChangeText={setRendimento}
            />
          </Campo>
        </View>

        <Campo label="Preço de venda (por unidade)">
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            placeholder="R$ 0,00"
            placeholderTextColor={colors.textSecondary}
            value={precoVenda}
            onChangeText={setPrecoVenda}
          />
        </Campo>

        <Text style={styles.secaoTitulo}>Ingredientes da receita</Text>

        {itensReceita.length === 0 && (
          <Text style={styles.dica}>
            Adicione os ingredientes usados nessa receita para calcular o custo automaticamente.
          </Text>
        )}

        {itensReceita.map((item) => {
          const ingrediente = todosIngredientes.find((i) => i.id === item.ingredienteId)!;
          const preco = melhorPreco(ingrediente);
          return (
            <View key={item.ingredienteId} style={styles.linhaIngrediente}>
              <View style={styles.ingredienteInfo}>
                <Text style={styles.ingredienteNome}>{ingrediente.nome}</Text>
                <Text style={styles.ingredientePreco}>
                  {preco ? `${formatarMoeda(preco.preco)} / ${ingrediente.unidade}` : 'sem preço cadastrado'}
                </Text>
              </View>
              <TextInput
                style={styles.inputQuantidade}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={colors.textSecondary}
                value={item.quantidade ? String(item.quantidade) : ''}
                onChangeText={(texto) => atualizarQuantidade(item.ingredienteId, texto)}
              />
              <Text style={styles.unidade}>{ingrediente.unidade}</Text>
              <Pressable onPress={() => removerIngrediente(item.ingredienteId)} hitSlop={8}>
                <Text style={styles.removerTexto}>✕</Text>
              </Pressable>
            </View>
          );
        })}

        {ingredientesDisponiveis.length > 0 && (
          <View style={styles.chipsWrap}>
            {ingredientesDisponiveis.map((ing) => (
              <Pressable
                key={ing.id}
                style={styles.chipAdicionar}
                onPress={() => adicionarIngrediente(ing.id)}
              >
                <Text style={styles.chipAdicionarTexto}>+ {ing.nome}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.resumoCard}>
          <Text style={styles.resumoTitulo}>Resumo de custo</Text>
          <LinhaResumo label="Custo total da receita" valor={formatarMoeda(custo.custoTotalReceita)} />
          <LinhaResumo label="Custo por unidade" valor={formatarMoeda(custo.custoUnitario)} />
          <View style={styles.divisor} />
          <LinhaResumo
            label="Lucro por unidade"
            valor={formatarMoeda(custo.lucroUnitario)}
            destaque
            positivo={lucroPositivo}
          />
          <LinhaResumo
            label="Margem de lucro"
            valor={formatarPercentual(custo.margemLucro)}
            destaque
            positivo={lucroPositivo}
          />
        </View>

        <Pressable style={styles.botaoSalvar} onPress={() => router.back()}>
          <Text style={styles.botaoSalvarTexto}>Salvar produto</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Campo({
  label,
  children,
  flex,
}: {
  label: string;
  children: React.ReactNode;
  flex?: number;
}) {
  return (
    <View style={[styles.campo, flex ? { flex } : undefined]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function LinhaResumo({
  label,
  valor,
  destaque,
  positivo,
}: {
  label: string;
  valor: string;
  destaque?: boolean;
  positivo?: boolean;
}) {
  return (
    <View style={styles.linhaResumo}>
      <Text style={styles.resumoLabel}>{label}</Text>
      <Text
        style={[
          styles.resumoValor,
          destaque && styles.resumoValorDestaque,
          destaque && { color: positivo ? colors.profit : colors.cost },
        ]}
      >
        {valor}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  titulo: {
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  campo: { marginBottom: spacing.md },
  linhaDupla: { flexDirection: 'row', gap: spacing.md },
  label: {
    fontSize: typography.size.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: typography.weight.medium,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.size.body,
    color: colors.textPrimary,
  },
  secaoTitulo: {
    fontSize: typography.size.h1,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  dica: {
    fontSize: typography.size.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  linhaIngrediente: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ingredienteInfo: { flex: 1 },
  ingredienteNome: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
  },
  ingredientePreco: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
  },
  inputQuantidade: {
    width: 56,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    textAlign: 'center',
    marginRight: spacing.xs,
    color: colors.textPrimary,
  },
  unidade: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
    marginRight: spacing.sm,
    width: 28,
  },
  removerTexto: {
    color: colors.cost,
    fontSize: typography.size.body,
    paddingHorizontal: spacing.xs,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  chipAdicionar: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
  chipAdicionarTexto: {
    fontSize: typography.size.label,
    color: colors.crust,
    fontWeight: typography.weight.medium,
  },
  resumoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
    ...shadow.card,
  },
  resumoTitulo: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  resumoLabel: {
    fontSize: typography.size.body,
    color: colors.textSecondary,
  },
  resumoValor: {
    fontSize: typography.size.body,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  resumoValorDestaque: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  botaoSalvar: {
    backgroundColor: colors.crust,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  botaoSalvarTexto: {
    color: colors.textOnCrust,
    fontSize: typography.size.body,
    fontWeight: typography.weight.bold,
  },
});
