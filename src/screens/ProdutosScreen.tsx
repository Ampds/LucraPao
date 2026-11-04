import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { ProdutoCard } from '../components/ProdutoCard';
import { ingredientes, produtos } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/theme';

const CATEGORIAS = ['Todos', ...Array.from(new Set(produtos.map((p) => p.categoria)))];

export function ProdutosScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const colunas = width >= 960 ? 2 : 1;

  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      const combinaBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
      const combinaCategoria = categoria === 'Todos' || p.categoria === categoria;
      return combinaBusca && combinaCategoria;
    });
  }, [busca, categoria]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Produtos</Text>

          <Pressable
            style={styles.botaoNovo}
            onPress={() => router.push('/produto/novo')}
          >
            <Text style={styles.botaoNovoTexto}>+ Novo</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.busca}
          placeholder="Buscar produto..."
          placeholderTextColor={colors.textSecondary}
          value={busca}
          onChangeText={setBusca}
        />

        <FlatList
          horizontal
          style={styles.listaFiltros}
          showsHorizontalScrollIndicator={false}
          data={CATEGORIAS}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filtros}
          renderItem={({ item }) => {
            const ativo = item === categoria;

            return (
              <Pressable
                onPress={() => setCategoria(item)}
                style={[styles.filtroChip, ativo && styles.filtroChipAtivo]}
              >
                <Text style={[styles.filtroTexto, ativo && styles.filtroTextoAtivo]}>
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />

        <FlatList
          key={`produtos-${colunas}`}
          style={styles.listaProdutos}
          data={produtosFiltrados}
          keyExtractor={(item) => item.id}
          numColumns={colunas}
          columnWrapperStyle={colunas > 1 ? styles.linhaColunas : undefined}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Text style={styles.vazioTexto}>Nenhum produto encontrado.</Text>
              <Text style={styles.vazioSub}>
                Cadastre um produto para começar a acompanhar o lucro dele.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.itemColuna}>
              <ProdutoCard
                produto={item}
                ingredientes={ingredientes}
                onVisualizar={() => router.push(`/produto/${item.id}`)}
                onEditar={() => router.push(`/produto/editar/${item.id}`)}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  conteudo: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  titulo: {
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  botaoNovo: {
    backgroundColor: colors.crust,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  botaoNovoTexto: {
    color: colors.textOnCrust,
    fontWeight: typography.weight.medium,
    fontSize: typography.size.label,
  },
  busca: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.size.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listaFiltros: {
    flexGrow: 0,
    height: 52,
    marginTop: spacing.sm,
  },
  filtros: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  filtroChip: {
    minHeight: 36,
    justifyContent: 'center',
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceAlt,
  },
  filtroChipAtivo: {
    backgroundColor: colors.crust,
  },
  filtroTexto: {
    fontSize: typography.size.label,
    color: colors.textSecondary,
    fontWeight: typography.weight.medium,
  },
  filtroTextoAtivo: {
    color: colors.textOnCrust,
  },
  listaProdutos: {
    flex: 1,
  },
  lista: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  linhaColunas: {
    gap: spacing.md,
  },
  itemColuna: {
    flex: 1,
  },
  vazio: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  vazioTexto: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  vazioSub: {
    fontSize: typography.size.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});