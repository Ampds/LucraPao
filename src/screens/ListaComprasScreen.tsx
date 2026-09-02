import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SectionList, Pressable, SafeAreaView } from 'react-native';
import { ingredientes, produtos, fornecedores } from '../data/mockData';
import { melhorPreco, formatarMoeda } from '../utils/calculos';
import { colors, radius, spacing, typography, shadow } from '../theme/theme';

/**
 * Gera a lista de compras a partir de todos os ingredientes usados nos
 * produtos cadastrados, somando a quantidade necessária de cada um.
 * Em uma versão real, o usuário escolheria quais produtos entram no
 * cálculo (ex.: "próxima fornada"); aqui consideramos todos.
 */
function useItensListaCompras() {
  return useMemo(() => {
    const quantidadePorIngrediente = new Map<string, number>();
    produtos.forEach((produto) => {
      produto.itensReceita.forEach((item) => {
        const atual = quantidadePorIngrediente.get(item.ingredienteId) ?? 0;
        quantidadePorIngrediente.set(item.ingredienteId, atual + item.quantidade);
      });
    });

    return ingredientes
      .filter((ing) => quantidadePorIngrediente.has(ing.id))
      .map((ing) => {
        const preco = melhorPreco(ing);
        const fornecedor = fornecedores.find((f) => f.id === preco?.fornecedorId);
        return {
          ingrediente: ing,
          quantidadeNecessaria: quantidadePorIngrediente.get(ing.id) ?? 0,
          melhorPreco: preco,
          fornecedorNome: fornecedor?.nome ?? 'Sem fornecedor',
        };
      });
  }, []);
}

export function ListaComprasScreen() {
  const itens = useItensListaCompras();
  const [marcados, setMarcados] = useState<Set<string>>(new Set());

  function alternarMarcado(id: string) {
    setMarcados((atual) => {
      const novo = new Set(atual);
      novo.has(id) ? novo.delete(id) : novo.add(id);
      return novo;
    });
  }

  const custoTotal = itens.reduce(
    (total, item) => total + (item.melhorPreco?.preco ?? 0) * item.quantidadeNecessaria,
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de compras</Text>
        <Text style={styles.subtitulo}>
          Baseada nos ingredientes dos seus produtos cadastrados
        </Text>
      </View>

      <View style={styles.resumoBar}>
        <Text style={styles.resumoBarLabel}>Custo estimado da compra</Text>
        <Text style={styles.resumoBarValor}>{formatarMoeda(custoTotal)}</Text>
      </View>

      <SectionList
        contentContainerStyle={styles.lista}
        sections={[{ title: 'Ingredientes', data: itens }]}
        keyExtractor={(item) => item.ingrediente.id}
        renderItem={({ item }) => {
          const marcado = marcados.has(item.ingrediente.id);
          const outrosFornecedores = item.ingrediente.precos.length - 1;
          return (
            <Pressable
              onPress={() => alternarMarcado(item.ingrediente.id)}
              style={[styles.item, marcado && styles.itemMarcado]}
            >
              <View style={[styles.checkbox, marcado && styles.checkboxMarcado]}>
                {marcado && <Text style={styles.checkboxIcone}>✓</Text>}
              </View>

              <View style={styles.itemInfo}>
                <Text style={[styles.itemNome, marcado && styles.itemTextoMarcado]}>
                  {item.ingrediente.nome}
                </Text>
                <Text style={styles.itemQuantidade}>
                  {item.quantidadeNecessaria} {item.ingrediente.unidade}
                </Text>
              </View>

              <View style={styles.itemPrecoWrap}>
                <Text style={styles.itemFornecedor}>{item.fornecedorNome}</Text>
                <Text style={styles.itemPreco}>
                  {item.melhorPreco ? formatarMoeda(item.melhorPreco.preco) : '—'}
                </Text>
                {outrosFornecedores > 0 && (
                  <Text style={styles.itemComparar}>
                    +{outrosFornecedores} opção{outrosFornecedores > 1 ? 'ões' : ''}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        }}
        renderSectionHeader={() => null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  titulo: {
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  subtitulo: {
    fontSize: typography.size.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  resumoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  resumoBarLabel: {
    fontSize: typography.size.label,
    color: colors.textSecondary,
  },
  resumoBarValor: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    color: colors.crust,
  },
  lista: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadow.card,
  },
  itemMarcado: {
    opacity: 0.55,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkboxMarcado: {
    backgroundColor: colors.profit,
    borderColor: colors.profit,
  },
  checkboxIcone: {
    color: colors.textOnCrust,
    fontSize: 13,
    fontWeight: typography.weight.bold,
  },
  itemInfo: { flex: 1 },
  itemNome: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
  },
  itemTextoMarcado: {
    textDecorationLine: 'line-through',
  },
  itemQuantidade: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
  },
  itemPrecoWrap: { alignItems: 'flex-end' },
  itemFornecedor: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
  },
  itemPreco: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  itemComparar: {
    fontSize: 10,
    color: colors.neutralInfo,
    marginTop: 2,
  },
});
