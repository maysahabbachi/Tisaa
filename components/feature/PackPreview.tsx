import { Modal, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
import { packs, questions } from '@/services/gameService';
import { Button, IconButton, Label } from '@/components/ui/Primitives';

type PackPreviewProps = { id: string | null; onClose: () => void; onUnlock: () => void };
export function PackPreview({ id, onClose, onUnlock }: PackPreviewProps) {
  const pack = packs.find(p => p.id === id);
  const sample = questions.find(q => q.pack === id);
  return <Modal visible={Boolean(pack)} transparent animationType="slide" onRequestClose={onClose}><SafeAreaView style={styles.overlay} edges={['top', 'bottom']}><View style={styles.panel}>
    <View style={styles.top}><IconButton icon="x" onPress={onClose} label="إغلاق" /><View style={styles.icon}><Feather name={pack?.icon ?? 'grid'} size={32} color={colors.gold} /></View></View>
    <Label style={styles.title}>{pack?.name}</Label><Label subtle>{pack?.subtitle}</Label>
    <View style={styles.sample}><Label style={styles.eyebrow}>نظرة على الحزمة</Label><Label style={styles.question}>{sample?.prompt}</Label><Label subtle>{pack?.count} أسئلة أصلية · ٩ إجابات لكل سؤال</Label></View>
    <View style={styles.notice}><Feather name="info" size={18} color={colors.gold} /><Label style={styles.noticeText}>شراء تجريبي فقط — لا يوجد دفع حقيقي.{ '\n' }تُحفظ الحزمة محليًا على هذا الجهاز.</Label></View>
    <Button title="فتح الحزمة للتجربة" icon="unlock" onPress={onUnlock} />
    <Label subtle style={styles.foot}>الحزمة تُفتح مرة واحدة في هذه النسخة التجريبية.</Label>
  </View></SafeAreaView></Modal>;
}
const styles = StyleSheet.create({ overlay: { flex: 1, backgroundColor: colors.shade, justifyContent: 'flex-end', alignItems: 'center', padding: spacing.sm }, panel: { width: '100%', maxWidth: 540, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md, gap: spacing.sm }, top: { flexDirection: 'row', justifyContent: 'space-between' }, icon: { backgroundColor: colors.goldDark, width: 64, height: 64, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center' }, title: { fontSize: typography.title, fontWeight: '700' }, sample: { padding: spacing.sm, backgroundColor: colors.background, borderRadius: radii.sm, gap: spacing.xs }, eyebrow: { color: colors.primary, fontSize: typography.label }, question: { fontWeight: '600', fontSize: typography.section }, notice: { flexDirection: 'row-reverse', gap: spacing.xs, alignItems: 'center' }, noticeText: { flex: 1, fontSize: typography.label, color: colors.gold, lineHeight: 24 }, foot: { fontSize: typography.small, textAlign: 'center' } });
