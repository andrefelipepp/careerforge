import normalizeText from "../utils/normalizeText.js";
function matchEducation(candidate, job) {
  const required = job.education ?? [];
  if (!required.length) return { matched: [], missing: [], percentage: 100, notSpecified: true };
  const candidateText = (candidate.education ?? []).map(item => normalizeText([item.degree, item.field, item.course].filter(Boolean).join(" "))).join(" ");
  const matched = required.filter(item => candidateText.includes(normalizeText(typeof item === "string" ? item : item.field ?? item.degree ?? "")));
  const missing = required.filter(item => !matched.includes(item));
  return { matched, missing, percentage: matched.length / required.length * 100, notSpecified: false };
}
export default matchEducation;
