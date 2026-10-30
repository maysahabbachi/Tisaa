import { useMemo } from 'react';
import { runContentChecks } from '@/services/qualityService';
export function useContentStats() { return useMemo(runContentChecks, []); }
