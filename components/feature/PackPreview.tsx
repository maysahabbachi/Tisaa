import { useMemo, memo } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
import { getPacks, getQuestions } from '@/services/gameService';
import { Button, IconButton, Label } from '@/components/ui/Primitives';
import { useSettings } from '@/hooks/useSettings';
import { useGame } from '@/hooks/useGame';
interface PackPreviewProps { id: string | null; onClose: () => void; onUnlock: () => void }
export const PackPreview = memo(function PackPreview({ id, onClose, onUnlock }: PackPreviewProps) {
  const { language, t, number } = useSettings();
  const { products, status, busy, restore } = useGame();
  const pack = useMemo(() => getPacks(language).find(p => p.id === id), [language, id]);
  const sample = useMemo(() => getQuestions(language).find(q => q.pack === id), [language, id]);
  const product = products.find(p => p.id === id);
  return <Modal visible={Boolean(pack)} transparent animationType="slide" onRequestClose={onClose}><SafeAreaView style={styles.overlay} edges={['top', 'bottom']}><View style={styles.panel}><ScrollView style={styles.flex} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
    <View style={styles.top}><IconButton icon="x" onPress={onClose} label={t('close')} /><View style={styles.icon}><Feather name={pack?.icon ?? 'grid'} size={32} color={colors.gold} /></View></View>
    <Label style={styles.title}>{pack?.name}</Label><Label subtle>{pack?.subtitle}</Label>
    <View style={styles.sample}><Label style={styles.eyebrow}>{t('preview')}</Label><Label style={styles.question}>{sample?.prompt}</Label><Label subtle>{number(pack?.count ?? 30)} · {t('questionCount')} · {t('nine')}</Label></View>
    <Label style={styles.price}>{product?.price ?? t('oneTime')}</Label>
    <View style={styles.notice}><Feather name="info" size={20} color={colors.gold} /><Label style={styles.noticeText}>{status === 'ready' ? (product ? t('oneTime') : t('storeUnavailable')) : t(status === 'notConfigured' ? 'storeNotReady' : 'nativeOnly')}</Label></View>
    <Button title={busy ? t('restoring') : product ? `${t('buy')} · ${product.price}` : t('buy')} icon="shopping-bag" disabled={busy || status !== 'ready' || !product} onPress={onUnlock} />
    <Button title={t('restore')} secondary icon="rotate-ccw" disabled={busy} onPress={() => { void restore(); }} />
  </ScrollView></View></SafeAreaView></Modal>;
});
const styles = StyleSheet.create({ flex: { flex: 1 }, overlay: { flex: 1, backgroundColor: colors.shade, justifyContent: 'flex-end', alignItems: 'center', padding: spacing.sm }, panel: { width: '100%', maxWidth: 540, height: '85%', maxHeight: 740, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border }, content: { padding: spacing.md, gap: spacing.sm }, top: { flexDirection: 'row', justifyContent: 'space-between' }, icon: { backgroundColor: colors.goldDark, width: 64, height: 64, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center' }, title: { fontSize: typography.title, fontWeight: '700' }, sample: { padding: spacing.sm, backgroundColor: colors.background, borderRadius: radii.sm, gap: spacing.xs }, eyebrow: { color: colors.primary, fontSize: typography.label }, question: { fontWeight: '600', fontSize: typography.section }, price: { color: colors.primary, fontSize: typography.section, fontWeight: '700' }, notice: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' }, noticeText: { flex: 1, fontSize: typography.label, color: colors.gold, lineHeight: 24 } });
