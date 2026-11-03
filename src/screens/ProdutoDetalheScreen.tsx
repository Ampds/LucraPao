import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ingredientes as todosIngredientes } from '../data/mockData';
import { Produto } from '../types';
import { calcularCustoProduto, formatarMoeda, formatarPercentual, melhorPreco } from '../utils/calculos';
import { colors, radius, spacing, typography, shadow } from '../theme/theme';

interface ProdutoDetalheScreenProps {
  produto: Produto;
}

export function ProdutoDetalheScreen({ produto }: ProdutoDetalheScreenProps) {
  const router = useRouter();
  const custo = calcularCustoProduto(produto, todosIngredientes);
  const lucroPositivo = custo.lucroUnitario >= 0;

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/produtos');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.botaoVoltar} onPress={voltar} hitSlop={8}>
          <Text style={styles.botaoVoltarTexto}>← Voltar</Text>
        </Pressable>

        <View style={styles.cabecalho}>
          <View style={styles.emojiWrap}>
            <Text style={styles.emoji}>{produto.imagemEmoji}</Text>
          </View>
          <View style={styles.cabecalhoInfo}>
            <Text style={styles.titulo}>{produto.nome}</Text>
            <Text style={styles.categoria}>{produto.categoria}</Text>
          </View>
        </View>

        <View style={styles.linhaDupla}>
          <Info label="Preço de venda" valor={formatarMoeda(produto.precoVenda)} />
          <Info label="Rendimento" valor={`${produto.rendimento} un.`} />
        </View>

        <Text style={styles.secaoTitulo}>Ingredientes da receita</Text>
        {produto.itensReceita.length === 0 && (
          <Text style={styles.dica}>Nenhum ingrediente cadastrado nessa receita.</Text>
        )}
        {produto.itensReceita.map((item) => {
          const ingrediente = todosIngredientes.find((i) => i.id === item.ingredienteId);
          if (!ingrediente) return null;
          const preco = melhorPreco(ingrediente);
          return (
            <View key={item.ingredienteId} style={styles.linhaIngrediente}>
              <View style={styles.ingredienteInfo}>
                <Text style={styles.ingredienteNome}>{ingrediente.nome}</Text>
                <Text style={styles.ingredientePreco}>
                  {preco ? `${formatarMoeda(preco.preco)} / ${ingrediente.unidade}` : 'sem preço cadastrado'}
                </Text>
              </View>
              <Text style={styles.ingredienteQuantidade}>
                {item.quantidade} {ingrediente.unidade}
              </Text>
            </View>
          );
        })}

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

        <Pressable
          style={styles.botaoEditar}
          onPress={() => router.push(`/produto/editar/${produto.id}`)}
        >
          <Text style={styles.botaoEditarTexto}>Editar produto</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Info({ label, valor }: { label: string; valor: string }) {
  return (
    <View style={styles.info}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValor}>{valor}</Text>
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
  botaoVoltar: { alignSelf: 'flex-start', marginBottom: spacing.md },
  botaoVoltarTexto: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.medium,
    color: colors.crust,
  },
  cabecalho: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  emojiWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  emoji: { fontSize: 32 },
  cabecalhoInfo: { flex: 1 },
  titulo: {
    fontSize: typography.size.h1,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  categoria: { fontSize: typography.size.body, color: colors.textSecondary },
  linhaDupla: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  info: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    ...shadow.card,
  },
  infoLabel: {
    fontSize: typography.size.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  infoValor: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  secaoTitulo: {
    fontSize: typography.size.h1,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  dica: { fontSize: typography.size.body, color: colors.textSecondary, marginBottom: spacing.md },
  linhaIngrediente: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
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
  ingredientePreco: { fontSize: typography.size.caption, color: colors.textSecondary },
  ingredienteQuantidade: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
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
  resumoLabel: { fontSize: typography.size.body, color: colors.textSecondary },
  resumoValor: {
    fontSize: typography.size.body,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  resumoValorDestaque: { fontSize: typography.size.h2, fontWeight: typography.weight.bold },
  divisor: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  botaoEditar: {
    backgroundColor: colors.crust,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  botaoEditarTexto: {
    color: colors.textOnCrust,
    fontSize: typography.size.body,
    fontWeight: typography.weight.bold,
  },
});
