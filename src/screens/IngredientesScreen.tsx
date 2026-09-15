import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Search, Plus, ChevronLeft, ChevronRight, Package } from 'lucide-react-native';
import { colors, categoryColors, fonts, radius, spacing } from '../theme/theme';

interface Ingrediente {
  id: number;
  nome: string;
  unidade: string;
  custoUnitario: number;
  estoque: number;
  unidadeEstoque: string;
  categoria: string;
  atualizacao: string;
}

const ingredientes: Ingrediente[] = [
  { id: 1, nome: 'Farinha de trigo', unidade: 'kg', custoUnitario: 4.89, estoque: 50, unidadeEstoque: 'kg', categoria: 'Farináceos', atualizacao: 'hoje' },
  { id: 2, nome: 'Açúcar cristal', unidade: 'kg', custoUnitario: 3.29, estoque: 20, unidadeEstoque: 'kg', categoria: 'Farináceos', atualizacao: 'ontem' },
  { id: 3, nome: 'Sal refinado', unidade: 'kg', custoUnitario: 1.49, estoque: 10, unidadeEstoque: 'kg', categoria: 'Farináceos', atualizacao: 'há 3d' },
  { id: 4, nome: 'Fermento biológico', unidade: '100g', custoUnitario: 2.9, estoque: 1200, unidadeEstoque: 'g', categoria: 'Fermentos', atualizacao: 'hoje' },
  { id: 5, nome: 'Margarina vegetal', unidade: 'kg', custoUnitario: 8.5, estoque: 12, unidadeEstoque: 'kg', categoria: 'Gorduras', atualizacao: 'ontem' },
  { id: 6, nome: 'Óleo de soja', unidade: 'L', custoUnitario: 6.2, estoque: 8, unidadeEstoque: 'L', categoria: 'Gorduras', atualizacao: 'há 2d' },
  { id: 7, nome: 'Ovos', unidade: 'dúzia', custoUnitario: 12.9, estoque: 10, unidadeEstoque: 'dz', categoria: 'Proteínas', atualizacao: 'hoje' },
  { id: 8, nome: 'Leite integral', unidade: 'L', custoUnitario: 4.59, estoque: 20, unidadeEstoque: 'L', categoria: 'Laticínios', atualizacao: 'hoje' },
  { id: 9, nome: 'Manteiga s/ sal', unidade: '200g', custoUnitario: 9.9, estoque: 6, unidadeEstoque: 'un', categoria: 'Laticínios', atualizacao: 'há 4d' },
  { id: 10, nome: 'Canela em pó', unidade: '50g', custoUnitario: 3.8, estoque: 4, unidadeEstoque: 'un', categoria: 'Temperos', atualizacao: 'há 5d' },
];

const categorias = ['Todos', 'Farináceos', 'Fermentos', 'Gorduras', 'Proteínas', 'Laticínios', 'Temperos'];

const receitasQueUsam = ['Pão francês', 'Pão de forma', 'Bolo de fubá', 'Rosca doce'];

function formatarReal(valor: number) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export function IngredientesScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [selecionado, setSelecionado] = useState<Ingrediente | null>(null);

  const filtrados = useMemo(
    () =>
      ingredientes.filter((i) => {
        const combinaCat = categoriaAtiva === 'Todos' || i.categoria === categoriaAtiva;
        const combinaBusca = i.nome.toLowerCase().includes(busca.toLowerCase());
        return combinaCat && combinaBusca;
      }),
    [categoriaAtiva, busca]
  );

  if (selecionado) {
    const cor = categoryColors[selecionado.categoria] ?? colors.crust;
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.detalheContainer}>
          <Pressable onPress={() => setSelecionado(null)} style={styles.voltarBtn} hitSlop={8}>
            <ChevronLeft size={16} color={colors.crust} strokeWidth={2.5} />
            <Text style={styles.voltarTexto}>Voltar</Text>
          </Pressable>

          <View style={[styles.badgeCategoria, { backgroundColor: `${cor}20` }]}>
            <Text style={[styles.badgeCategoriaTexto, { color: cor }]}>{selecionado.categoria}</Text>
          </View>
          <Text style={styles.detalheTitulo}>{selecionado.nome}</Text>

          <View style={styles.custoCard}>
            <Text style={styles.custoLabel}>Custo por {selecionado.unidade}</Text>
            <Text style={styles.custoValor}>{formatarReal(selecionado.custoUnitario)}</Text>
            <Text style={styles.custoAtualizado}>Atualizado {selecionado.atualizacao}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitulo}>Estoque atual</Text>
            <View style={styles.estoqueRow}>
              <View>
                <Text style={styles.estoqueValor}>
                  {selecionado.estoque} <Text style={styles.estoqueUnidade}>{selecionado.unidadeEstoque}</Text>
                </Text>
                <Text style={styles.estoqueSub}>
                  Valor em estoque: {formatarReal(selecionado.estoque * selecionado.custoUnitario)}
                </Text>
              </View>
              <View style={styles.estoqueIconWrap}>
                <Package size={22} color={colors.crust} strokeWidth={1.5} />
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitulo}>Usado em receitas</Text>
            {receitasQueUsam.map((r) => (
              <View key={r} style={styles.receitaLinha}>
                <Text style={styles.receitaTexto}>{r}</Text>
                <ChevronRight size={14} color={colors.textSecondary} strokeWidth={2} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitulo}>Ingredientes</Text>
          <Pressable style={styles.addBtn}>
            <Plus size={16} color="#fff" strokeWidth={2.5} />
          </Pressable>
        </View>

        <View style={styles.buscaWrap}>
          <Search size={15} color={colors.textSecondary} strokeWidth={2} style={styles.buscaIcone} />
          <TextInput
            style={styles.busca}
            placeholder="Buscar ingrediente..."
            placeholderTextColor={colors.textSecondary}
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categorias}
          keyExtractor={(item) => item}
          contentContainerStyle={{ gap: spacing.sm }}
          renderItem={({ item }) => {
            const ativo = item === categoriaAtiva;
            return (
              <Pressable
                onPress={() => setCategoriaAtiva(item)}
                style={[styles.filtroChip, ativo && styles.filtroChipAtivo]}
              >
                <Text style={[styles.filtroTexto, ativo && styles.filtroTextoAtivo]}>{item}</Text>
              </Pressable>
            );
          }}
        />
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => {
          const cor = categoryColors[item.categoria] ?? colors.crust;
          return (
            <Pressable style={styles.itemCard} onPress={() => setSelecionado(item)}>
              <View style={{ flex: 1 }}>
                <View style={styles.itemCategoriaLinha}>
                  <View style={[styles.dot, { backgroundColor: cor }]} />
                  <Text style={styles.itemCategoriaTexto}>{item.categoria}</Text>
                </View>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemEstoque}>
                  Estoque: {item.estoque} {item.unidadeEstoque}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.itemPreco}>{formatarReal(item.custoUnitario)}</Text>
                <Text style={styles.itemUnidade}>/{item.unidade}</Text>
                <Text style={styles.itemAtualizado}>{item.atualizacao}</Text>
              </View>
            </Pressable>
          );
        }}
      />
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
    gap: spacing.md,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitulo: { fontFamily: fonts.display, fontSize: 20, color: colors.textPrimary },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.crust,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buscaWrap: { position: 'relative', justifyContent: 'center' },
  buscaIcone: { position: 'absolute', left: spacing.md, zIndex: 1 },
  busca: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingLeft: 36,
    paddingRight: spacing.md,
    paddingVertical: 10,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textPrimary,
  },
  filtroChip: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filtroChipAtivo: { backgroundColor: colors.crust, borderColor: colors.crust },
  filtroTexto: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textSecondary },
  filtroTextoAtivo: { color: '#fff' },

  lista: { padding: spacing.lg, paddingBottom: spacing.xxl },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  itemCategoriaLinha: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  itemCategoriaTexto: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary },
  itemNome: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.textPrimary },
  itemEstoque: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  itemPreco: { fontFamily: fonts.mono, fontSize: 13, color: colors.textPrimary },
  itemUnidade: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  itemAtualizado: { fontFamily: fonts.body, fontSize: 11, color: colors.crust, marginTop: 4 },

  // Detalhe
  detalheContainer: { padding: spacing.lg, paddingBottom: spacing.xxl },
  voltarBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: spacing.xl },
  voltarTexto: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.crust },
  badgeCategoria: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginBottom: spacing.sm,
  },
  badgeCategoriaTexto: { fontFamily: fonts.bodyMedium, fontSize: 12 },
  detalheTitulo: { fontFamily: fonts.display, fontSize: 24, color: colors.textPrimary, marginBottom: spacing.lg },
  custoCard: { backgroundColor: colors.crust, borderRadius: radius.xl, padding: spacing.xl, marginBottom: spacing.lg },
  custoLabel: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  custoValor: { fontFamily: fonts.display, fontSize: 34, color: '#fff' },
  custoAtualizado: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: spacing.sm },
  infoCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  infoTitulo: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.textPrimary, marginBottom: spacing.md },
  estoqueRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  estoqueValor: { fontFamily: fonts.mono, fontSize: 22, color: colors.textPrimary },
  estoqueUnidade: { fontSize: 15 },
  estoqueSub: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  estoqueIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receitaLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
  },
  receitaTexto: { fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary },
});
