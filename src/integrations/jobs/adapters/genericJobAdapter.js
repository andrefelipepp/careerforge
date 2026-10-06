import createJob from "../../../domain/job/createJob.js";
import validateJob from "../../../domain/job/validateJob.js";

const first = (...values) => values.find(value => value !== undefined && value !== null && value !== "");
const array = value => Array.isArray(value) ? value : value ? [value] : [];

function normalizeLocation(raw = {}) {
  const location = typeof raw.location === "object" && raw.location ? raw.location : {};
  return {
    country: first(location.country, raw.country, ""),
    state: first(location.state, location.region, raw.state, raw.region, ""),
    city: first(location.city, raw.city, "")
  };
}

function normalizeSalary(raw = {}) {
  const salary = typeof raw.salary === "object" && raw.salary ? raw.salary : {};
  return {
    min: first(salary.min, salary.minimum, raw.salaryMin, null),
    max: first(salary.max, salary.maximum, raw.salaryMax, null),
    currency: first(salary.currency, raw.currency, null),
    period: first(salary.period, raw.salaryPeriod, null)
  };
}

function genericJobAdapter(raw = {}, options = {}) {
  const job = createJob({
    id: first(raw.id, raw.jobId, raw.uuid, null),
    externalId: first(raw.externalId, raw.id, raw.jobId, null),
    title: first(raw.title, raw.position, raw.jobTitle, raw.name, ""),
    company: first(raw.company?.name, raw.company, raw.companyName, raw.employer, ""),
    area: first(raw.area, raw.category, raw.department, ""),
    level: first(raw.level, raw.seniority, raw.experienceLevel, ""),
    yearsOfExperience: first(raw.yearsOfExperience, raw.minimumExperienceYears, null),
    location: normalizeLocation(raw),
    modality: first(raw.modality, raw.workModel, raw.workplaceType, ""),
    employmentType: first(raw.employmentType, raw.contractType, raw.type, ""),
    competencies: array(first(raw.competencies, raw.skills, raw.requirements?.skills, [])),
    languages: array(first(raw.languages, raw.requirements?.languages, [])),
    education: array(first(raw.education, raw.requirements?.education, [])),
    salary: normalizeSalary(raw),
    description: first(raw.description, raw.summary, ""),
    url: first(raw.url, raw.applyUrl, raw.jobUrl, null),
    publishedAt: first(raw.publishedAt, raw.createdAt, raw.postedAt, null),
    source: options.source ?? raw.source ?? "generic",
    metadata: { providerPayloadId: first(raw.id, raw.jobId, null) }
  });
  const validation = validateJob(job);
  if (!validation.valid) throw new Error(`Não foi possível normalizar a vaga: ${validation.errors.join(" ")}`);
  return job;
}
export default genericJobAdapter;
