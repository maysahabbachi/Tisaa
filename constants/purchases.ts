// Public SDK keys only. Never put RevenueCat secret keys in the app.
export const purchaseConfig = {
  iosKey: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY ?? '',
  androidKey: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY ?? '',
};
export const paidPackIds = ['geography', 'nature', 'food', 'football', 'games', 'science', 'culture', 'sports', 'travel'] as const;
export function entitlementForPack(id: string): string { return `pack_${id}`; }
export function productForPack(id: string): string { return `tisaa_${id}`; }
