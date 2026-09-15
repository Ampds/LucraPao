import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, SafeAreaView } from 'react-native';
import { Plus, Zap, Droplet, Flame, Building2, Wifi, Package, Wrench, Shield } from 'lucide-react-native';
import { colors, categoryColors, fonts, radius, spacing } from '../theme/theme';

type Status = 'paid' | 'pending' | 'overdue';
type Recorrencia = 'monthly' | 'bimonthly' | 'annual';

interface Despesa {
  id: number;
  nome: string;
  categoria: string;
  valor: number;
  diaVencimento: number;
  status: Status;
  recorrencia: Recorrencia;
  icone: keyof typeof icones;
}

const despesas: Despesa[] = [
  { id: 1, nome: 'Conta de energia', categoria: 'Utilidades', valor: 420.8, diaVencimento: 10, status: 'pending', recorrencia: 'monthly', icone: 'bolt' },
  { id: 2, nome: 'Conta de água', categoria: 'Utilidades', valor: 89.5, diaVencimento: 15, status: 'paid', recorrencia: 'monthly', icone: 'droplet' },
  { id: 3, nome: 'Gás GLP', categoria: 'Utilidades', valor: 280.0, diaVencimento: 5, status: 'paid', recorrencia: 'monthly', icone: 'flame' },
  { id: 4, nome: 'Aluguel', categoria: 'Imóvel', valor: 2200.0, diaVencimento: 1, status: 'paid', recorrencia: 'monthly', icone: 'building' },
  { id: 5, nome: 'Internet', categoria: 'Comunicação', valor: 99.9, diaVencimento: 20, status: 'pending', recorrencia: 'monthly', icone: 'wifi' },
  { id: 6, nome: 'Embalagens', categoria: 'Materiais', valor: 340.0, diaVencimento: 25, status: 'pending', recorrencia: 'monthly', icone: 'package' },
  { id: 7, nome: 'Manutenção forno', categoria: 'Equipamentos', valor: 180.0, diaVencimento: 15, status: 'paid', recorrencia: 'bimonthly', icone: 'tool' },
  { id: 8, nome: 'Vigilância sanitária', categoria: 'Regulatório', valor: 450.0, diaVencimento: 30, status: 'paid', recorrencia: 'annual', icone: 'shield' },
];

const statusConfig: Record<Status, { label: string; bg: string; texto: string; ponto: string }> = {
  paid: { label: 'Pago', bg: colors.greenBg, texto: colors.greenMid, ponto: colors.green },
  pending: { label: 'Pendente', bg: colors.yellowBg, texto: colors.amber, ponto: '#D97706' },
  overdue: { label: 'Atrasado', bg: colors.redBg, texto: colors.redDark, ponto: colors.red },
};

const recorrenciaLabel: Record<Recorrencia, string> = {
  monthly: 'Mensal',
  bimonthly: 'Bimestral',
  annual: 'Anual',
};

const icones = {
  bolt: Zap,
  droplet: Droplet,
  flame: Flame,
  building: Building2,
  wifi: Wifi,
  package: Package,
  tool: Wrench,
  shield: Shield,
};

function formatarReal(valor: number) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export function DespesasScreen() {
  const [filtro, setFiltro] = useState<'all' | 'paid' | 'pending'>('all');

  const filtradas = despesas.filter((e) => filtro === 'all' || e.status === filtro);
  const totalPago = despesas.filter((e) => e.status === 'paid').reduce((s, e) => s + e.valor, 0);
  const totalPendente = despesas.filter((e) => e.status !== 'paid').reduce((s, e) => s + e.valor, 0);
  const total = despesas.reduce((s, e) => s + e.valor, 0);
  const pctPago = (totalPago / total) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitulo}>Despesas</Text>
            <Text style={styles.headerSub}>Setembro 2026</Text>
          </View>
          <Pressable style={styles.addBtn}>
            <Plus size={16} color="#fff" strokeWidth={2.5} />
          </Pressable>
        </View>

        <View style={styles.resumoRow}>
          <View style={[styles.resumoCard, { backgroundColor: colors.greenBg, borderColor: colors.greenBgBorder }]}>
            <Text style={[styles.resumoLabel, { color: colors.greenMid }]}>Pago</Text>
            <Text style={[styles.resumoValor, { color: colors.greenDark }]}>{formatarReal(totalPago)}</Text>
          </View>
          <View style={[styles.resumoCard, { backgroundColor: colors.yellowBg, borderColor: colors.yellowBgBorder }]}>
            <Text style={[styles.resumoLabel, { color: colors.amber }]}>A pagar</Text>
            <Text style={[styles.resumoValor, { color: colors.amberDark }]}>{formatarReal(totalPendente)}</Text>
          </View>
        </View>

        <View>
          <View style={styles.progressoLinha}>
            <Text style={styles.progressoTexto}>Progresso do mês</Text>
            <Text style={styles.progressoTexto}>{Math.round(pctPago)}% pago</Text>
          </View>
          <View style={styles.progressoTrilha}>
            <View style={[styles.progressoPreenchido, { width: `${pctPago}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.filtros}>
        {(['all', 'paid', 'pending'] as const).map((f) => {
          const labels = { all: 'Todos', paid: 'Pagos', pending: 'Pendentes' };
          const ativo = filtro === f;
          return (
            <Pressable
              key={f}
              onPress={() => setFiltro(f)}
              style={[styles.filtroChip, ativo && styles.filtroChipAtivo]}
            >
              <Text style={[styles.filtroTexto, ativo && styles.filtroTextoAtivo]}>{labels[f]}</Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filtradas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListFooterComponent={
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total mensal estimado</Text>
            <Text style={styles.totalValor}>{formatarReal(total)}</Text>
          </View>
        }
        renderItem={({ item }) => {
          const sc = statusConfig[item.status];
          const corCategoria = categoryColors[item.categoria] ?? colors.crust;
          const Icone = icones[item.icone];
          return (
            <View style={styles.despesaCard}>
              <View style={styles.despesaTopo}>
                <View style={[styles.despesaIconWrap, { backgroundColor: corCategoria }]}>
                  <Icone size={16} color="#fff" strokeWidth={2} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.despesaTituloLinha}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.despesaNome}>{item.nome}</Text>
                      <Text style={styles.despesaVencimento}>
                        Vence dia {item.diaVencimento} · {recorrenciaLabel[item.recorrencia]}
                      </Text>
                    </View>
                    <Text style={styles.despesaValor}>{formatarReal(item.valor)}</Text>
                  </View>
                  <View style={styles.despesaBadges}>
                    <View style={[styles.badge, { backgroundColor: sc.bg }]}>
                      <View style={[styles.badgeDot, { backgroundColor: sc.ponto }]} />
                      <Text style={[styles.badgeTexto, { color: sc.texto }]}>{sc.label}</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: `${corCategoria}15` }]}>
                      <Text style={[styles.badgeTexto, { color: corCategoria }]}>{item.categoria}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
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
  headerSub: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.crust,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumoRow: { flexDirection: 'row', gap: spacing.md },
  resumoCard: { flex: 1, borderRadius: radius.lg, borderWidth: 1, padding: spacing.md },
  resumoLabel: { fontFamily: fonts.bodyMedium, fontSize: 11, marginBottom: 4 },
  resumoValor: { fontFamily: fonts.mono, fontSize: 15, fontWeight: '700' },
  progressoLinha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressoTexto: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary },
  progressoTrilha: { height: 8, borderRadius: 4, backgroundColor: colors.border, overflow: 'hidden' },
  progressoPreenchido: { height: '100%', borderRadius: 4, backgroundColor: colors.green },

  filtros: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtroChip: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: colors.surfaceAlt,
  },
  filtroChipAtivo: { backgroundColor: colors.crust },
  filtroTexto: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textSecondary },
  filtroTextoAtivo: { color: '#fff' },

  lista: { padding: spacing.lg, paddingBottom: spacing.xxl },
  despesaCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  despesaTopo: { flexDirection: 'row', gap: spacing.md },
  despesaIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  despesaTituloLinha: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  despesaNome: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.textPrimary },
  despesaVencimento: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  despesaValor: { fontFamily: fonts.mono, fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  despesaBadges: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  badgeDot: { width: 5, height: 5, borderRadius: 2.5, marginRight: 4 },
  badgeTexto: { fontFamily: fonts.bodyMedium, fontSize: 11 },

  totalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  totalLabel: { fontFamily: fonts.bodySemibold, fontSize: 13, color: '#5C3010' },
  totalValor: { fontFamily: fonts.mono, fontSize: 15, fontWeight: '700', color: colors.textPrimary },
});
