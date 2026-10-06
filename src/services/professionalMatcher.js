import normalizeText from "../utils/normalizeText.js";
function textRelated(a, b) {
  const x = normalizeText(a); const y = normalizeText(b);
  return Boolean(x && y && (x.includes(y) || y.includes(x)));
}
function matchProfessional(candidate, job) {
  const roles = candidate.professional?.roles ?? [];
  const areas = candidate.professional?.areas ?? [];
  const positions = roles.filter(role => textRelated(job.title, role));
  const matchedAreas = areas.filter(area => textRelated(job.area, area));
  return { positionMatch: positions.length > 0, areaMatch: matchedAreas.length > 0, positions, areas: matchedAreas };
}
export default matchProfessional;
