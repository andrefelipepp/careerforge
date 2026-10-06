function createCandidate(data = {}) {
  return {
    id: data.id ?? null,
    personal: { name: "", email: "", phone: "", links: {}, ...(data.personal ?? {}) },
    professional: {
      headline: "",
      summary: "",
      roles: [],
      areas: [],
      levels: [],
      yearsOfExperience: 0,
      competencies: { known: [], learning: [], interested: [] },
      ...(data.professional ?? {}),
      competencies: {
        known: data.professional?.competencies?.known ?? [],
        learning: data.professional?.competencies?.learning ?? [],
        interested: data.professional?.competencies?.interested ?? []
      }
    },
    experience: data.experience ?? [],
    education: data.education ?? [],
    projects: data.projects ?? [],
    certifications: data.certifications ?? [],
    languages: data.languages ?? [],
    preferences: {
      roles: [], areas: [], levels: [], workModels: [], locations: [], minimumSalary: null,
      ...(data.preferences ?? {})
    }
  };
}
export default createCandidate;
