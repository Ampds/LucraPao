import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadow } from '../theme/theme';

interface StatCardProps {
  label: string;
  value: string;
  tone?: 'neutral' | 'profit' | 'cost';
  hint?: string;
}

export function StatCard({ label, value, tone = 'neutral', hint }: StatCardProps) {
  const toneColors = {
    neutral: { bg: colors.surface, text: colors.textPrimary },
    profit: { bg: colors.profitBg, text: colors.profit },
    cost: { bg: colors.costBg, text: colors.cost },
  }[tone];

  return (
    <View style={[styles.card, { backgroundColor: toneColors.bg }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: toneColors.text }]}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    ...shadow.card,
  },
  label: {
    fontSize: typography.size.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: typography.size.h1,
    fontWeight: typography.weight.bold,
  },
  hint: {
    fontSize: typography.size.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
