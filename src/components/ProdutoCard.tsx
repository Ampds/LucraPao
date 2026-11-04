import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { colors, radius, shadow, spacing, typography } from '../theme/theme';
import { Ingrediente, Produto } from '../types';
import {
  calcularCustoProduto,
  formatarMoeda,
  formatarPercentual,
} from '../utils/calculos';

interface ProdutoCardProps {
  produto: Produto;
  ingredientes: Ingrediente[];
  onVisualizar?: () => void;
  onEditar?: () => void;
}

export function ProdutoCard({
  produto,
  ingredientes,
  onVisualizar,
  onEditar,
}: ProdutoCardProps) {
  const { width } = useWindowDimensions();
  const compacto = width < 520;

  const { custoUnitario, lucroUnitario, margemLucro } = calcularCustoProduto(
    produto,
    ingredientes
  );
  const lucroPositivo = lucroUnitario >= 0;

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onVisualizar}
        style={({ pressed }) => [
          styles.linhaPrincipal,
          compacto && styles.linhaPrincipalCompacta,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{produto.imagemEmoji}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.nome} numberOfLines={2}>
            {produto.nome}
          </Text>
          <Text style={styles.categoria}>{produto.categoria}</Text>

          <View style={[styles.linhaValores, compacto && styles.linhaValoresCompacta]}>
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
            style={[
              styles.margemValor,
              { color: lucroPositivo ? colors.profit : colors.cost },
            ]}
          >
            {formatarPercentual(margemLucro)}
          </Text>
          <Text style={styles.margemLabel}>margem</Text>
        </View>
      </Pressable>

      {(onVisualizar || onEditar) && (
        <View style={styles.acoes}>
          {onVisualizar && (
            <Pressable
              style={[styles.botaoAcao, styles.botaoVer]}
              onPress={onVisualizar}
            >
              <Text style={styles.botaoVerTexto}>Visualizar</Text>
            </Pressable>
          )}

          {onEditar && (
            <Pressable
              style={[styles.botaoAcao, styles.botaoEditar]}
              onPress={onEditar}
            >
              <Text style={styles.botaoEditarTexto}>Editar</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadow.card,
  },
  linhaPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linhaPrincipalCompacta: {
    alignItems: 'flex-start',
  },
  acoes: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  botaoAcao: {
    flex: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  botaoVer: {
    backgroundColor: colors.surfaceAlt,
  },
  botaoVerTexto: {
    fontSize: typography.size.label,
    fontWeight: typography.weight.medium,
    color: colors.crust,
  },
  botaoEditar: {
    backgroundColor: colors.crust,
  },
  botaoEditarTexto: {
    fontSize: typography.size.label,
    fontWeight: typography.weight.medium,
    color: colors.textOnCrust,
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
    minWidth: 0,
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
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  linhaValoresCompacta: {
    flexDirection: 'column',
    gap: spacing.xs,
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
    marginLeft: spacing.sm,
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