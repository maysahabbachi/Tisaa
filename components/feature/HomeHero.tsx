import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
import { Label } from '@/components/ui/Primitives';

type HomeHeroProps = { wide: boolean };
export const HomeHero = memo(function HomeHero({ wide }: HomeHeroProps) {
  return <View style={[styles.hero, wide ? styles.wide : null]}>
    <Image source={require('@/assets/images/party-hero.webp')} style={[styles.image, wide ? styles.wideImage : null]} contentFit="contain" transition={200} />
    <View style={styles.copy}><View style={styles.tag}><View style={styles.dot} /><Label style={styles.tagText}>لعبة اللّمات والتحديات</Label></View><Label style={styles.title}>تسعة أجوبة.{ '\n' }دقيقة واحدة.</Label><Label style={styles.subtitle}>قولوا اللي في بالكم…{ '\n' }بس احذروا الإجابة الخادعة!</Label></View>
    <View style={styles.footer}><View style={styles.stat}><Feather name="users" size={17} color={colors.cream} /><Label style={styles.statText}>فريقان</Label></View><View style={styles.separator} /><View style={styles.stat}><Feather name="clock" size={17} color={colors.cream} /><Label style={styles.statText}>٦٠ ثانية</Label></View><View style={styles.separator} /><View style={styles.stat}><Feather name="grid" size={17} color={colors.cream} /><Label style={styles.statText}>٩ أجوبة</Label></View></View>
  </View>;
});
const styles = StyleSheet.create({ hero: { height: 308, overflow: 'hidden', backgroundColor: colors.shade, borderRadius: radii.lg, borderColor: colors.border, borderWidth: 1 }, wide: { height: 320 }, image: { position: 'absolute', width: 215, height: 205, left: -48, bottom: 46 }, wideImage: { width: 330, height: 280, left: spacing.lg, bottom: 34 }, copy: { padding: spacing.md, alignItems: 'flex-end', gap: spacing.xs }, tag: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 4, borderRadius: radii.pill }, dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary }, tagText: { fontSize: typography.small, color: colors.cream }, title: { fontSize: 36, lineHeight: 48, fontWeight: '700', color: colors.cream, marginTop: spacing.xs }, subtitle: { color: colors.subtle, fontSize: typography.label, lineHeight: 24 }, footer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 56, backgroundColor: colors.surface, flexDirection: 'row-reverse', justifyContent: 'space-evenly', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border }, stat: { flexDirection: 'row-reverse', gap: spacing.xs, alignItems: 'center' }, statText: { color: colors.cream, fontSize: typography.label }, separator: { height: 16, width: 1, backgroundColor: colors.border } });
