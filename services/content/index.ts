import { general } from './general';
import { geography } from './geography';
import { nature } from './nature';
import { food } from './food';
import { football } from './football';
import { games } from './games';
import { science } from './science';
import { culture } from './culture';
import { sports } from './sports';
import { travel } from './travel';
import type { TopicSet } from './types';
export const topicSets: Record<string, TopicSet> = { general, geography, nature, food, football, games, science, culture, sports, travel };
// Content integrity gate: 300 independent topics, 9 valid listed answers each,
// and complete translations. Facts are authored, not fetched during play.
export function validateQuestionBank(): string[] {
  const errors: string[] = [];
  const prompts = new Set<string>();
  let count = 0;
  for (const [pack, set] of Object.entries(topicSets)) {
    if (set.topics.length !== 30) errors.push(`${pack}: expected 30 topics`);
    set.topics.forEach((q, i) => {
      count++;
      if (q.keys.length !== 9 || new Set(q.keys).size !== 9) errors.push(`${pack}/${i}: expected 9 unique answers`);
      for (const key of q.keys) if (!set.words[key]) errors.push(`${pack}/${i}: missing word ${key}`);
      for (const language of ['ar', 'en', 'fr'] as const) {
        if (!q.title[language]) errors.push(`${pack}/${i}: missing ${language} prompt`);
        const names = q.keys.map(key => set.words[key]?.[language]);
        if (names.some(name => !name) || new Set(names).size !== 9) errors.push(`${pack}/${i}: invalid ${language} answers`);
      }
      if (prompts.has(q.title.ar)) errors.push(`${pack}/${i}: duplicate prompt`);
      prompts.add(q.title.ar);
    });
  }
  if (count !== 300) errors.push(`Expected 300, received ${count}`);
  return errors;
}
