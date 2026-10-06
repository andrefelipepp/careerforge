import normalizeText from "../utils/normalizeText.js";
function matchLevel(candidate, job) {
  if (!job.level) return { match: true, levels: [], notSpecified: true };
  const levels = candidate.professional?.levels ?? candidate.preferences?.levels ?? [];
  const matched = levels.filter(level => normalizeText(level) === normalizeText(job.level));
  return { match: matched.length > 0, levels: matched, notSpecified: false };
}
export default matchLevel;
