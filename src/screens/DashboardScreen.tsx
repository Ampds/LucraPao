import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatCard } from '../components/StatCard';
import { ProdutoCard } from '../components/ProdutoCard';
import { produtos, ingredientes } from '../data/mockData';
import { calcularCustoProduto, formatarMoeda } from '../utils/calculos';
import { colors, spacing, typography } from '../theme/theme';

export function DashboardScreen() {
  // Em uma versão real, esses agregados viriam de vendas registradas no
  // período. Aqui simulamos assumindo o rendimento total de cada receita
  // como "produção do mês" para dar um número concreto na tela.
  const resumo = useMemo(() => {
    return produtos.reduce(
      (acc, produto) => {
        const { custoUnitario, lucroUnitario } = calcularCustoProduto(produto, ingredientes);
        const unidadesProduzidas = produto.rendimento;
        acc.custoTotal += custoUnitario * unidadesProduzidas;
        acc.receitaTotal += produto.precoVenda * unidadesProduzidas;
        acc.lucroTotal += lucroUnitario * unidadesProduzidas;
        return acc;
      },
      { custoTotal: 0, receitaTotal: 0, lucroTotal: 0 }
    );
  }, []);

  const produtoMaisRentavel = useMemo(() => {
    return [...produtos].sort((a, b) => {
      const margemA = calcularCustoProduto(a, ingredientes).margemLucro;
      const margemB = calcularCustoProduto(b, ingredientes).margemLucro;
      return margemB - margemA;
    })[0];
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.saudacao}>Olá! 👋</Text>
        <Text style={styles.titulo}>Como está o negócio hoje</Text>

        <View style={styles.statsRow}>
          <StatCard
            label="Lucro estimado"
            value={formatarMoeda(resumo.lucroTotal)}
            tone="profit"
            hint="produção atual"
          />
          <StatCard
            label="Custo total"
            value={formatarMoeda(resumo.custoTotal)}
            tone="cost"
            hint="ingredientes"
          />
        </View>

        <View style={styles.statsRow}>
          <StatCard label="Receita potencial" value={formatarMoeda(resumo.receitaTotal)} />
          <StatCard
            label="Produto destaque"
            value={produtoMaisRentavel.nome}
            hint="maior margem de lucro"
          />
        </View>

        <Text style={styles.secaoTitulo}>Seus produtos</Text>
        {produtos.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} ingredientes={ingredientes} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  saudacao: {
    fontSize: typography.size.body,
    color: colors.textSecondary,
  },
  titulo: {
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  secaoTitulo: {
    fontSize: typography.size.h1,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
});
