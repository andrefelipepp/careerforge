import normalizeText from "../utils/normalizeText.js";
const has = (list, value) => list.some(item => normalizeText(item) === normalizeText(value));
function matchCompetencies(candidate, job) {
  const required = job.competencies ?? [];
  const competencies = candidate.professional?.competencies ?? {};
  const result = { known: [], learning: [], interested: [], missing: [], points: 0, percentage: 100 };
  if (!required.length) return result;
  for (const item of required) {
    if (has(competencies.known ?? [], item)) { result.known.push(item); result.points += 10; }
    else if (has(competencies.learning ?? [], item)) { result.learning.push(item); result.points += 5; }
    else if (has(competencies.interested ?? [], item)) { result.interested.push(item); result.points += 2; }
    else result.missing.push(item);
  }
  result.percentage = (result.points / (required.length * 10)) * 100;
  return result;
}
export default matchCompetencies;
