import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Produto, Ingrediente } from '../types';
import { calcularCustoProduto, formatarMoeda, formatarPercentual } from '../utils/calculos';
import { colors, radius, spacing, typography, shadow } from '../theme/theme';

interface ProdutoCardProps {
  produto: Produto;
  ingredientes: Ingrediente[];
  onPress?: () => void;
}

export function ProdutoCard({ produto, ingredientes, onPress }: ProdutoCardProps) {
  const { custoUnitario, lucroUnitario, margemLucro } = calcularCustoProduto(
    produto,
    ingredientes
  );
  const lucroPositivo = lucroUnitario >= 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.emojiWrap}>
        <Text style={styles.emoji}>{produto.imagemEmoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.categoria}>{produto.categoria}</Text>

        <View style={styles.linhaValores}>
          <Text style={styles.custoTexto}>
            Custo: <Text style={styles.custoValor}>{formatarMoeda(custoUnitario)}</Text>
          </Text>
          <Text style={styles.vendaTexto}>
            Venda: <Text style={styles.vendaValor}>{formatarMoeda(produto.precoVenda)}</Text>
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.margemBadge,
          { backgroundColor: lucroPositivo ? colors.profitBg : colors.costBg },
        ]}
      >
        <Text
          style={[styles.margemValor, { color: lucroPositivo ? colors.profit : colors.cost }]}
        >
          {formatarPercentual(margemLucro)}
        </Text>
        <Text style={styles.margemLabel}>margem</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadow.card,
  },
  cardPressed: {
    opacity: 0.85,
  },
  emojiWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  emoji: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  categoria: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  linhaValores: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  custoTexto: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
  },
  custoValor: {
    color: colors.cost,
    fontWeight: typography.weight.medium,
  },
  vendaTexto: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
  },
  vendaValor: {
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  margemBadge: {
    alignItems: 'center',
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minWidth: 64,
  },
  margemValor: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
  },
  margemLabel: {
    fontSize: 9,
    color: colors.textSecondary,
  },
});
