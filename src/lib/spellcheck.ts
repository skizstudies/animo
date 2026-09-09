/** A small domain dictionary for the words most likely to show up in a
 * cooperative officer's short free-text answers. Not a general spellchecker —
 * just enough for the agent to sanity-check a likely typo ("shelyer" →
 * "shelter") before it folds the answer into an official report. */
const DOMAIN_WORDS = [
  "shelter", "temporary", "transitional", "displaced", "relocated", "families",
  "assistance", "relief", "urgent", "immediate", "support", "supplies",
  "food", "water", "medicine", "medical", "clothing", "blankets",
  "market", "trading", "post", "closed", "days", "following", "disaster",
  "fertilizer", "seedlings", "livestock", "equipment", "damage", "damaged",
  "flooding", "flooded", "wind", "roof", "materials", "construction",
  "hectares", "crops", "rice", "corn", "vegetables", "barangay", "cooperative",
  "evacuation", "center", "affected", "farmers", "farm", "harvest",
];

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

export interface SpellSuggestion {
  original: string;
  suggestion: string;
}

/** Scans free text for a word that's *close* to a known domain word but not
 * an exact or already-correct match — a likely typo, not just an unfamiliar
 * word. Returns the first candidate found, or null if nothing looks off. */
export function findSuggestion(text: string): SpellSuggestion | null {
  const words = text.match(/[A-Za-z]+/g) ?? [];
  for (const word of words) {
    if (word.length < 4) continue;
    const lower = word.toLowerCase();
    if (DOMAIN_WORDS.includes(lower)) continue;

    let best: { word: string; distance: number } | null = null;
    for (const known of DOMAIN_WORDS) {
      // Skip simple inflections (urgent/urgently, family/families) — one
      // word being a prefix of the other is a suffix difference, not a typo.
      if (known.startsWith(lower) || lower.startsWith(known)) continue;
      const distance = levenshtein(lower, known);
      if (distance <= 2 && (!best || distance < best.distance)) {
        best = { word: known, distance };
      }
    }
    if (best && best.distance > 0) {
      return { original: word, suggestion: best.word };
    }
  }
  return null;
}

/** Replaces the first whole-word occurrence of `original` in `text` with
 * `replacement`, preserving the rest of the sentence as typed. */
export function applySuggestion(text: string, original: string, replacement: string): string {
  return text.replace(new RegExp(`\\b${original}\\b`), replacement);
}
