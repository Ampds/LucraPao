import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ProdutoCard } from '../components/ProdutoCard';
import { produtos, ingredientes } from '../data/mockData';
import { colors, radius, spacing, typography, shadow } from '../theme/theme';

const CATEGORIAS = ['Todos', ...Array.from(new Set(produtos.map((p) => p.categoria)))];

export function ProdutosScreen() {
  const router = useRouter();
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
      <View style={styles.header}>
        <Text style={styles.titulo}>Produtos</Text>
        <Pressable style={styles.botaoNovo} onPress={() => router.push('/produto/novo')}>
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
              <Text style={[styles.filtroTexto, ativo && styles.filtroTextoAtivo]}>{item}</Text>
            </Pressable>
          );
        }}
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhum produto encontrado.</Text>
            <Text style={styles.vazioSub}>Cadastre um produto para começar a acompanhar o lucro dele.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProdutoCard
            produto={item}
            ingredientes={ingredientes}
            onPress={() => router.push(`/produto/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
  filtros: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  filtroChip: {
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceAlt,
    marginRight: spacing.sm,
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
  lista: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
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
  },
  vazioSub: {
    fontSize: typography.size.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
