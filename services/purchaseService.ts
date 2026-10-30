import { NativeModules, Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { purchaseConfig, paidPackIds, entitlementForPack, productForPack } from '@/constants/purchases';
import type { CustomerInfo, PurchasesPackage } from 'react-native-purchases';
export type StoreStatus = 'ready' | 'notConfigured' | 'nativeOnly';
export type StorePackage = { id: string; price: string };
export type StoreSnapshot = { unlocked: string[]; products: StorePackage[]; status: StoreStatus };
const cacheKey = 'tisaa-store-entitlements-v1';
let clientPromise: Promise<typeof import('react-native-purchases').default> | null = null;
const packages = new Map<string, PurchasesPackage>();
export function storeStatus(): StoreStatus {
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') return 'nativeOnly';
  const key = Platform.OS === 'ios' ? purchaseConfig.iosKey : purchaseConfig.androidKey;
  if (!key || key.startsWith('test_')) return 'notConfigured';
  if (Constants.executionEnvironment === 'storeClient' || !NativeModules.RNPurchases) return 'nativeOnly';
  return 'ready';
}
async function getClient() {
  if (storeStatus() !== 'ready') throw new Error('STORE_NOT_READY');
  if (!clientPromise) clientPromise = import('react-native-purchases').then(({ default: Purchases }) => {
    Purchases.configure({ apiKey: Platform.OS === 'ios' ? purchaseConfig.iosKey : purchaseConfig.androidKey });
    return Purchases;
  }).catch(error => { clientPromise = null; throw error; });
  return clientPromise;
}
function entitlementIds(info: CustomerInfo): string[] { return ['general', ...paidPackIds.filter(id => Boolean(info.entitlements.active[entitlementForPack(id)]))]; }
async function cacheEntitlements(info: CustomerInfo): Promise<string[]> {
  const ids = entitlementIds(info);
  await AsyncStorage.setItem(cacheKey, JSON.stringify(ids)).catch(() => undefined);
  return ids;
}
export async function loadCachedEntitlements(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(cacheKey);
    const ids = raw ? JSON.parse(raw) : [];
    return ['general', ...paidPackIds.filter(id => Array.isArray(ids) && ids.includes(id))];
  } catch { return ['general']; }
}
export async function fetchStore(): Promise<StoreSnapshot> {
  const status = storeStatus();
  if (status !== 'ready') return { unlocked: await loadCachedEntitlements(), products: [], status };
  const client = await getClient();
  const info = await client.getCustomerInfo();
  const unlocked = await cacheEntitlements(info);
  // Product availability must never prevent previously verified entitlements from syncing.
  const offerings = await client.getOfferings().catch(() => null);
  packages.clear();
  for (const pkg of offerings?.current?.availablePackages ?? []) {
    const id = paidPackIds.find(pack => pkg.product.identifier === productForPack(pack));
    if (id) packages.set(id, pkg);
  }
  return { unlocked, products: [...packages].map(([id, pkg]) => ({ id, price: pkg.product.priceString })), status };
}
export async function buyPack(id: string): Promise<string[]> {
  const client = await getClient();
  if (!packages.has(id)) await fetchStore();
  const pkg = packages.get(id);
  if (!pkg) throw new Error('PRODUCT_UNAVAILABLE');
  const { customerInfo } = await client.purchasePackage(pkg);
  const ids = await cacheEntitlements(customerInfo);
  if (!ids.includes(id)) throw new Error('ENTITLEMENT_NOT_ACTIVE');
  return ids;
}
export async function restorePacks(): Promise<string[]> { const client = await getClient(); return cacheEntitlements(await client.restorePurchases()); }
export function isPurchaseCancelled(error: unknown): boolean { return Boolean(error && typeof error === 'object' && 'userCancelled' in error && error.userCancelled); }
