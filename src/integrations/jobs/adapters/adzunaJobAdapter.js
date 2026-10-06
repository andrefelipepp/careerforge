import createJob from "../../../domain/job/createJob.js";
import validateJob from "../../../domain/job/validateJob.js";

function inferLevel(text = "") {
  const value = text.toLowerCase();
  if (/\b(est[aá]gio|estagi[aá]rio|intern(ship)?)\b/.test(value)) return "Estágio";
  if (/\b(jr\.?|j[uú]nior|junior)\b/.test(value)) return "Júnior";
  if (/\b(pl\.?|pleno|mid[- ]level)\b/.test(value)) return "Pleno";
  if (/\b(sr\.?|s[eê]nior|senior|lead|principal)\b/.test(value)) return "Sênior";
  return "";
}

function inferModality(text = "") {
  const value = text.toLowerCase();
  if (/\b(h[ií]brid[oa]|hybrid)\b/.test(value)) return "Híbrido";
  if (/\b(remot[oa]|remote|home office|work from home)\b/.test(value)) return "Remoto";
  return "";
}

function normalizeLocation(location = {}, country = "") {
  const area = Array.isArray(location.area) ? location.area : [];
  return {
    country: area[0] ?? country.toUpperCase(),
    state: area.length > 2 ? area.at(-2) : "",
    city: area.length > 1 ? area.at(-1) : location.display_name ?? ""
  };
}

export default function adzunaJobAdapter(raw = {}, options = {}) {
  const searchableText = `${raw.title ?? ""} ${raw.description ?? ""}`;
  const job = createJob({
    id: raw.id ? `adzuna:${raw.id}` : null,
    externalId: raw.id ?? null,
    title: raw.title ?? "",
    company: raw.company?.display_name ?? "Empresa não informada",
    area: raw.category?.label ?? "",
    level: inferLevel(searchableText),
    yearsOfExperience: null,
    location: normalizeLocation(raw.location, options.country),
    modality: inferModality(searchableText),
    employmentType: [raw.contract_type, raw.contract_time].filter(Boolean).join(" / "),
    // A API de busca não fornece uma lista estruturada de competências.
    // A extração semântica da descrição será responsabilidade da Fase 5.
    competencies: [],
    languages: [],
    education: [],
    salary: {
      min: raw.salary_min ?? null,
      max: raw.salary_max ?? null,
      currency: options.currency ?? null,
      period: null
    },
    description: raw.description ?? "",
    url: raw.redirect_url ?? null,
    publishedAt: raw.created ?? null,
    source: "adzuna",
    metadata: {
      categoryTag: raw.category?.tag ?? null,
      locationDisplayName: raw.location?.display_name ?? null,
      latitude: raw.latitude ?? null,
      longitude: raw.longitude ?? null,
      salaryPredicted: Boolean(raw.salary_is_predicted)
    }
  });

  const validation = validateJob(job);
  if (!validation.valid) {
    throw new Error(`Vaga Adzuna inválida (${raw.id ?? "sem id"}): ${validation.errors.join(" ")}`);
  }
  return job;
}
