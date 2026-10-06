import normalizeText from "../utils/normalizeText.js";
function matchLanguages(candidate, job) {
  const required = job.languages ?? [];
  if (!required.length) return { matched: [], missing: [], percentage: 100, notSpecified: true };
  const available = new Set((candidate.languages ?? []).map(item => normalizeText(item.name)));
  const names = required.map(item => typeof item === "string" ? item : item.name);
  const matched = names.filter(name => available.has(normalizeText(name)));
  const missing = names.filter(name => !available.has(normalizeText(name)));
  return { matched, missing, percentage: matched.length / names.length * 100, notSpecified: false };
}
export default matchLanguages;
