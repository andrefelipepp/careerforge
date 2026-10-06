import normalizeText from "../utils/normalizeText.js";
const eq = (a, b) => normalizeText(a) === normalizeText(b);
function matcherLocation(candidate, job) {
  const preferences = candidate.preferences ?? {};
  const locations = preferences.locations ?? [];
  if (!locations.length) return { match: true, reason: "Sem restrição de localização cadastrada" };
  const modality = job.modality ?? "";
  for (const allowed of locations) {
    const countryMatch = !allowed.country || eq(allowed.country, job.location?.country);
    const stateMatch = !allowed.state || eq(allowed.state, job.location?.state);
    const cityMatch = !allowed.city || eq(allowed.city, job.location?.city);
    const models = allowed.workModels ?? preferences.workModels ?? [];
    const modalityMatch = !models.length || models.some(model => eq(model, modality));
    if (countryMatch && stateMatch && cityMatch && modalityMatch) return { match: true, reason: "Localização e modalidade aceitas" };
  }
  return { match: false, reason: "Fora das preferências de localização/modalidade" };
}
export default matcherLocation;
