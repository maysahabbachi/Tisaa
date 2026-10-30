import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
import { Label } from '@/components/ui/Primitives';
import { useSettings } from '@/hooks/useSettings';
interface HomeHeroProps { wide: boolean }
export const HomeHero = memo(function HomeHero({ wide }: HomeHeroProps) {
  const { t, rtl } = useSettings();
  return <View style={[styles.hero, wide ? styles.wide : null]}>
    <Image source={require('@/assets/images/party-hero.webp')} style={[styles.image, wide ? styles.wideImage : null, !rtl ? { left: undefined, right: wide ? spacing.lg : -48 } : null]} contentFit="contain" transition={200} />
    <View style={[styles.copy, { alignItems: rtl ? 'flex-end' : 'flex-start' }]}><View style={styles.tag}><View style={styles.dot} /><Label style={styles.tagText}>{t('heroTag')}</Label></View><Label style={styles.title}>{t('heroTitle')}</Label><Label style={styles.subtitle}>{t('heroSub')}</Label></View>
    <View style={styles.footer}><View style={styles.stat}><Feather name="users" size={17} color={colors.cream} /><Label style={styles.statText}>{t('twoTeams')}</Label></View><View style={styles.separator} /><View style={styles.stat}><Feather name="clock" size={17} color={colors.cream} /><Label style={styles.statText}>{t('sixty')}</Label></View><View style={styles.separator} /><View style={styles.stat}><Feather name="grid" size={17} color={colors.cream} /><Label style={styles.statText}>{t('nine')}</Label></View></View>
  </View>;
});
const styles = StyleSheet.create({ hero: { height: 320, overflow: 'hidden', backgroundColor: colors.shade, borderRadius: radii.lg, borderColor: colors.border, borderWidth: 1 }, wide: { height: 336 }, image: { position: 'absolute', width: 215, height: 205, left: -48, bottom: 46, opacity: 0.6 }, wideImage: { width: 330, height: 280, left: spacing.lg, bottom: 34, opacity: 1 }, copy: { padding: spacing.md, gap: spacing.xs }, tag: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 4, borderRadius: radii.pill }, dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary }, tagText: { fontSize: typography.small, color: colors.cream }, title: { fontSize: 34, lineHeight: 46, fontWeight: '700', color: colors.cream, marginTop: spacing.xs }, subtitle: { color: colors.subtle, fontSize: typography.label, lineHeight: 24 }, footer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 56, backgroundColor: colors.surface, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border }, stat: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' }, statText: { color: colors.cream, fontSize: typography.small }, separator: { height: 16, width: 1, backgroundColor: colors.border } });
