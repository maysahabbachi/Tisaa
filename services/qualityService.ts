import { topicSets, validateQuestionBank } from './content';
import { getQuestions, getDeck } from './gameService';
export function runContentChecks(): { questionCount: number; categoryCount: number; errors: string[] } {
  const errors = validateQuestionBank();
  const ar = getQuestions('ar');
  for (const language of ['ar', 'en', 'fr'] as const) {
    const questions = getQuestions(language);
    if (questions.length !== 300) errors.push(`${language}: wrong count`);
    questions.forEach((q, i) => {
      if (q.id !== ar[i].id || q.pack !== ar[i].pack) errors.push(`${q.id}: translation identity mismatch`);
      if (q.answers.length !== 9) errors.push(`${q.id}: wrong answer count`);
      if (!q.answers.some(a => a.points < 0) || !q.answers.some(a => a.points > 0)) errors.push(`${q.id}: missing positive or trap points`);
      if (q.answers.some((a, index) => a.points !== ar[i].answers[index].points)) errors.push(`${q.id}: points differ by language`);
    });
  }
  for (const pack of Object.keys(topicSets)) {
    const deck = getDeck(pack);
    if (deck.length !== 30 || new Set(deck.map(q => q.id)).size !== 30) errors.push(`${pack}: invalid shuffled deck`);
  }
  return { questionCount: ar.length, categoryCount: Object.keys(topicSets).length, errors };
}
