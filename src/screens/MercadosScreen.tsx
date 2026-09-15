import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { ArrowUpDown } from 'lucide-react-native';
import { colors, fonts, radius, spacing } from '../theme/theme';

interface PrecoMercado {
  mercado: string;
  preco: number;
  distancia: string;
  atualizado: string;
}

interface ComparacaoProduto {
  produto: string;
  unidade: string;
  precos: PrecoMercado[];
}

const comparacoes: ComparacaoProduto[] = [
  {
    produto: 'Farinha de trigo',
    unidade: '5kg',
    precos: [
      { mercado: 'Atacadão', preco: 18.9, distancia: '2,3 km', atualizado: 'hoje' },
      { mercado: 'Extra', preco: 21.49, distancia: '1,1 km', atualizado: 'hoje' },
      { mercado: 'Carrefour', preco: 22.0, distancia: '3,8 km', atualizado: 'ontem' },
      { mercado: 'Assaí', preco: 19.5, distancia: '4,2 km', atualizado: 'hoje' },
      { mercado: 'Sonda', preco: 23.9, distancia: '0,8 km', atualizado: 'há 2d' },
    ],
  },
  {
    produto: 'Açúcar cristal',
    unidade: '5kg',
    precos: [
      { mercado: 'Atacadão', preco: 14.9, distancia: '2,3 km', atualizado: 'hoje' },
      { mercado: 'Assaí', preco: 15.2, distancia: '4,2 km', atualizado: 'hoje' },
      { mercado: 'Extra', preco: 16.8, distancia: '1,1 km', atualizado: 'ontem' },
      { mercado: 'Carrefour', preco: 17.49, distancia: '3,8 km', atualizado: 'hoje' },
      { mercado: 'Sonda', preco: 18.0, distancia: '0,8 km', atualizado: 'há 3d' },
    ],
  },
  {
    produto: 'Fermento biológico',
    unidade: '10 unid.',
    precos: [
      { mercado: 'Extra', preco: 13.9, distancia: '1,1 km', atualizado: 'hoje' },
      { mercado: 'Sonda', preco: 14.5, distancia: '0,8 km', atualizado: 'hoje' },
      { mercado: 'Carrefour', preco: 15.0, distancia: '3,8 km', atualizado: 'ontem' },
      { mercado: 'Atacadão', preco: 16.8, distancia: '2,3 km', atualizado: 'há 2d' },
      { mercado: 'Assaí', preco: 17.5, distancia: '4,2 km', atualizado: 'hoje' },
    ],
  },
  {
    produto: 'Ovos',
    unidade: '30 unid.',
    precos: [
      { mercado: 'Assaí', preco: 22.9, distancia: '4,2 km', atualizado: 'hoje' },
      { mercado: 'Atacadão', preco: 23.5, distancia: '2,3 km', atualizado: 'hoje' },
      { mercado: 'Extra', preco: 25.9, distancia: '1,1 km', atualizado: 'hoje' },
      { mercado: 'Carrefour', preco: 26.9, distancia: '3,8 km', atualizado: 'ontem' },
      { mercado: 'Sonda', preco: 28.0, distancia: '0,8 km', atualizado: 'há 2d' },
    ],
  },
];

function formatarReal(valor: number) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export function MercadosScreen() {
  const [produtoAtivo, setProdutoAtivo] = useState(0);
  const comparacao = comparacoes[produtoAtivo];
  const ordenado = [...comparacao.precos].sort((a, b) => a.preco - b.preco);
  const maxPreco = Math.max(...ordenado.map((p) => p.preco));
  const minPreco = Math.min(...ordenado.map((p) => p.preco));
  const economia = maxPreco - minPreco;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Comparar Preços</Text>
        <Text style={styles.headerSub}>5 mercados monitorados na sua região</Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={comparacoes}
        keyExtractor={(item) => item.produto}
        contentContainerStyle={styles.seletorLista}
        style={styles.seletor}
        renderItem={({ item, index }) => {
          const ativo = index === produtoAtivo;
          return (
            <Pressable
              onPress={() => setProdutoAtivo(index)}
              style={[styles.seletorChip, ativo && styles.seletorChipAtivo]}
            >
              <Text style={[styles.seletorTexto, ativo && styles.seletorTextoAtivo]}>{item.produto}</Text>
              <Text style={[styles.seletorUnidade, ativo && styles.seletorTextoAtivo]}>{item.unidade}</Text>
            </Pressable>
          );
        }}
      />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.economiaBanner}>
          <View style={styles.economiaIconWrap}>
            <ArrowUpDown size={18} color="#fff" strokeWidth={2.5} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.economiaTitulo}>Economize {formatarReal(economia)} por pacote</Text>
            <Text style={styles.economiaSub}>
              Comprando no {ordenado[0].mercado} em vez do {ordenado[ordenado.length - 1].mercado}
            </Text>
          </View>
        </View>

        <View style={styles.graficoCard}>
          <Text style={styles.graficoTitulo}>
            {comparacao.produto} — {comparacao.unidade}
          </Text>
          <View style={{ gap: spacing.md }}>
            {ordenado.map((p) => {
              const pct = ((p.preco - minPreco) / (maxPreco - minPreco || 1)) * 60 + 20;
              const isMin = p.preco === minPreco;
              return (
                <View key={p.mercado} style={styles.barraLinha}>
                  <Text style={[styles.barraMercado, isMin && styles.barraMercadoAtivo]}>{p.mercado}</Text>
                  <View style={styles.barraTrilha}>
                    <View
                      style={[
                        styles.barraPreenchida,
                        { width: `${pct}%`, backgroundColor: isMin ? colors.green : colors.border },
                      ]}
                    >
                      <Text style={[styles.barraValor, { color: isMin ? '#fff' : colors.textSecondary }]}>
                        {formatarReal(p.preco)}
                      </Text>
                    </View>
                  </View>
                  {isMin && <Text style={styles.barraMelhor}>✓ melhor</Text>}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.tabela}>
          <View style={styles.tabelaHeader}>
            <Text style={styles.tabelaHeaderTexto}>Detalhes por mercado</Text>
          </View>
          {ordenado.map((p, i) => {
            const isMin = p.preco === minPreco;
            return (
              <View
                key={p.mercado}
                style={[
                  styles.tabelaLinha,
                  i > 0 && styles.tabelaLinhaBorda,
                  isMin && { backgroundColor: '#F0FDF4' },
                ]}
              >
                <View style={[styles.tabelaPosicao, isMin && { backgroundColor: colors.green }]}>
                  <Text style={[styles.tabelaPosicaoTexto, isMin && { color: '#fff' }]}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tabelaMercado}>{p.mercado}</Text>
                  <Text style={styles.tabelaDetalhe}>
                    {p.distancia} · Atualizado {p.atualizado}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.tabelaPreco, isMin && { color: colors.green }]}>
                    {formatarReal(p.preco)}
                  </Text>
                  {!isMin && (
                    <Text style={styles.tabelaDiferenca}>+{formatarReal(p.preco - minPreco)}</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitulo: { fontFamily: fonts.display, fontSize: 20, color: colors.textPrimary, marginBottom: 2 },
  headerSub: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },

  seletor: { borderBottomWidth: 1, borderBottomColor: colors.border, flexGrow: 0 },
  seletorLista: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.sm },
  seletorChip: {
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 110,
  },
  seletorChipAtivo: { backgroundColor: colors.crust, borderColor: colors.crust },
  seletorTexto: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textSecondary, textAlign: 'center' },
  seletorUnidade: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, textAlign: 'center', opacity: 0.7 },
  seletorTextoAtivo: { color: '#fff' },

  conteudo: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },

  economiaBanner: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.greenBg,
    borderWidth: 1,
    borderColor: colors.greenBgBorder,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  economiaIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  economiaTitulo: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.greenDark },
  economiaSub: { fontFamily: fonts.body, fontSize: 11, color: colors.greenMid, marginTop: 2 },

  graficoCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  graficoTitulo: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.textPrimary, marginBottom: spacing.lg },
  barraLinha: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  barraMercado: { width: 72, fontFamily: fonts.body, fontSize: 11, color: colors.textPrimary, textAlign: 'right' },
  barraMercadoAtivo: { fontFamily: fonts.bodySemibold, color: colors.green },
  barraTrilha: { flex: 1, height: 26, justifyContent: 'center' },
  barraPreenchida: {
    height: 20,
    borderRadius: radius.pill,
    minWidth: 50,
    justifyContent: 'center',
    paddingLeft: spacing.sm,
  },
  barraValor: { fontFamily: fonts.mono, fontSize: 11 },
  barraMelhor: { fontFamily: fonts.bodyMedium, fontSize: 11, color: colors.green, width: 52 },

  tabela: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, overflow: 'hidden' },
  tabelaHeader: { backgroundColor: colors.surfaceAlt, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  tabelaHeaderTexto: { fontFamily: fonts.bodySemibold, fontSize: 11, color: '#5C3010' },
  tabelaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  tabelaLinhaBorda: { borderTopWidth: 1, borderTopColor: colors.border },
  tabelaPosicao: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabelaPosicaoTexto: { fontFamily: fonts.mono, fontSize: 12, fontWeight: '700', color: colors.textSecondary },
  tabelaMercado: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.textPrimary },
  tabelaDetalhe: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  tabelaPreco: { fontFamily: fonts.mono, fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  tabelaDiferenca: { fontFamily: fonts.body, fontSize: 11, color: colors.red, marginTop: 2 },
});
