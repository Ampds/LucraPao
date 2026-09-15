import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Wheat, Store, Receipt, FilePlus, Check, TriangleAlert } from 'lucide-react-native';
import { colors, fonts, radius, spacing } from '../theme/theme';

const quickStats = [
  { label: 'Custo/unidade', value: 'R$ 0,48', sub: 'pão francês', delta: '+3%', up: true },
  { label: 'Gasto mensal', value: 'R$ 4.280', sub: 'estimativa', delta: '-8%', up: false },
  { label: 'Margem média', value: '38%', sub: 'produtos', delta: '+2pp', up: false },
];

const recentAlerts = [
  { text: 'Farinha de trigo 3% mais barata no Extra', type: 'saving' as const, time: 'há 2h' },
  { text: 'Custo por pão francês subiu R$ 0,03', type: 'warn' as const, time: 'hoje' },
  { text: 'Conta de energia: vencimento em 3 dias', type: 'warn' as const, time: 'hoje' },
];

export function InicioScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.crust, '#7A3700']}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Bom dia, Marina</Text>
              <Text style={styles.headerTitle}>Padaria Flor do Campo</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>M</Text>
            </View>
          </View>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Custo total — Setembro 2026</Text>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceValue}>R$ 4.280,50</Text>
              <View style={styles.balanceBadge}>
                <Text style={styles.balanceBadgeText}>↓ 8% vs ago</Text>
              </View>
            </View>
            <View style={styles.balanceBreakdown}>
              <BreakdownItem label="Ingredientes" value="R$ 2.940,00" />
              <View style={styles.divider} />
              <BreakdownItem label="Utilidades" value="R$ 890,50" />
              <View style={styles.divider} />
              <BreakdownItem label="Outros" value="R$ 450,00" />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.statsRow}>
            {quickStats.map((s) => (
              <View key={s.label} style={styles.statCard}>
                <Text style={styles.statLabel}>{s.label}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statSub}>{s.sub}</Text>
                <Text style={[styles.statDelta, { color: s.up ? colors.red : colors.green }]}>
                  {s.delta}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Acesso rápido</Text>
          <View style={styles.shortcutsGrid}>
            <ShortcutButton
              icon={<Wheat size={16} color="#fff" />}
              iconBg={colors.crust}
              title="Ingredientes"
              subtitle="42 cadastrados"
              onPress={() => router.push('/ingredientes')}
            />
            <ShortcutButton
              icon={<Store size={16} color="#fff" />}
              iconBg={colors.green}
              title="Comparar preços"
              subtitle="5 mercados"
              onPress={() => router.push('/mercados')}
            />
            <ShortcutButton
              icon={<Receipt size={16} color="#fff" />}
              iconBg={colors.textSecondary}
              title="Despesas fixas"
              subtitle="8 lançamentos"
              onPress={() => router.push('/despesas')}
            />
            <ShortcutButton
              icon={<FilePlus size={16} color="#fff" />}
              iconBg={colors.red}
              title="Nova receita"
              subtitle="Calcular custo"
              onPress={() => {}}
            />
          </View>

          <Text style={styles.sectionTitle}>Alertas recentes</Text>
          <View style={{ gap: spacing.sm }}>
            {recentAlerts.map((a, i) => (
              <View key={i} style={styles.alertCard}>
                <View
                  style={[
                    styles.alertIconWrap,
                    { backgroundColor: a.type === 'saving' ? colors.greenBg : colors.yellowBg },
                  ]}
                >
                  {a.type === 'saving' ? (
                    <Check size={13} color={colors.green} strokeWidth={2.5} />
                  ) : (
                    <TriangleAlert size={13} color={colors.amber} strokeWidth={2.5} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.alertText}>{a.text}</Text>
                  <Text style={styles.alertTime}>{a.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BreakdownItem({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text style={styles.breakdownLabel}>{label}</Text>
      <Text style={styles.breakdownValue}>{value}</Text>
    </View>
  );
}

function ShortcutButton({
  icon,
  iconBg,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.shortcut, pressed && { opacity: 0.85 }]}
    >
      <View style={[styles.shortcutIcon, { backgroundColor: iconBg }]}>{icon}</View>
      <Text style={styles.shortcutTitle}>{title}</Text>
      <Text style={styles.shortcutSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xl },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  greeting: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 2 },
  headerTitle: { fontFamily: fonts.display, fontSize: 22, color: '#fff' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: { fontFamily: fonts.display, color: '#fff', fontSize: 16 },
  balanceCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  balanceLabel: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 4 },
  balanceRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  balanceValue: { fontFamily: fonts.display, fontSize: 28, color: '#fff' },
  balanceBadge: {
    backgroundColor: 'rgba(45,122,58,0.25)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  balanceBadgeText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: '#86EFAC' },
  balanceBreakdown: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md, alignItems: 'center' },
  breakdownLabel: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.5)' },
  breakdownValue: { fontFamily: fonts.mono, fontSize: 13, color: '#fff', marginTop: 2 },
  divider: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.15)' },

  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl, gap: spacing.xl },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  statLabel: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginBottom: spacing.sm },
  statValue: { fontFamily: fonts.mono, fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  statSub: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  statDelta: { fontFamily: fonts.bodyMedium, fontSize: 11, marginTop: 6 },

  sectionTitle: { fontFamily: fonts.display, fontSize: 16, color: colors.textPrimary, marginBottom: -spacing.sm },
  shortcutsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  shortcut: {
    width: '47%',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  shortcutIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  shortcutTitle: { fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.textPrimary },
  shortcutSubtitle: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },

  alertCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'flex-start',
  },
  alertIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  alertText: { fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary, lineHeight: 18 },
  alertTime: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
});
