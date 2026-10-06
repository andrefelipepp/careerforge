function createJob(data = {}) {
  return {
    id: data.id ?? null,
    externalId: data.externalId ?? null,
    title: data.title ?? "",
    company: data.company ?? "",
    area: data.area ?? "",
    level: data.level ?? "",
    yearsOfExperience: data.yearsOfExperience ?? null,
    location: { country: "", state: "", city: "", ...(data.location ?? {}) },
    modality: data.modality ?? "",
    employmentType: data.employmentType ?? "",
    competencies: Array.isArray(data.competencies) ? data.competencies : [],
    languages: Array.isArray(data.languages) ? data.languages : [],
    education: Array.isArray(data.education) ? data.education : [],
    salary: { min: null, max: null, currency: null, period: null, ...(data.salary ?? {}) },
    description: data.description ?? "",
    url: data.url ?? null,
    publishedAt: data.publishedAt ?? null,
    source: data.source ?? null,
    metadata: data.metadata ?? {}
  };
}
export default createJob;
