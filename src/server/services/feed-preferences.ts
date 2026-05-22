const PROFILE_TOKEN_STOPWORDS = new Set([
  "club",
  "society",
  "association",
  "students",
  "student",
  "chapter",
  "community",
  "team",
  "the",
  "and",
  "for",
  "with",
]);

function normalizeProfileTokens(values: Iterable<string>): string[] {
  const tokens: string[] = [];

  for (const value of values) {
    const matches = value.toLowerCase().match(/[a-z0-9]+/g) ?? [];

    for (const token of matches) {
      if (token.length < 3 || PROFILE_TOKEN_STOPWORDS.has(token)) {
        continue;
      }

      tokens.push(token);
    }
  }

  return tokens;
}

function derivePreferenceKeywordsFromHeader(headers: Headers, headerName: string): string[] {
  const raw = headers.get(headerName);

  if (!raw) {
    return [];
  }

  const parts = raw
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return normalizeProfileTokens(parts);
}

export function deriveFeedPreferenceSignals(headers: Headers): {
  courseKeywords: string[];
  selectedDomains: string[];
} {
  return {
    courseKeywords: derivePreferenceKeywordsFromHeader(headers, "x-campus-course-keywords"),
    selectedDomains: derivePreferenceKeywordsFromHeader(headers, "x-campus-selected-domains"),
  };
}
