const env = {
  adzuna: {
    appId: process.env.ADZUNA_APP_ID ?? "",
    appKey: process.env.ADZUNA_APP_KEY ?? "",
    country: (process.env.ADZUNA_COUNTRY ?? "br").toLowerCase()
  },
  jobs: {
    query: process.env.JOBS_QUERY ?? "desenvolvedor javascript",
    location: process.env.JOBS_LOCATION ?? "",
    resultsPerPage: Number(process.env.JOBS_RESULTS_PER_PAGE ?? 10)
  }
};

export function hasAdzunaCredentials() {
  return Boolean(env.adzuna.appId && env.adzuna.appKey);
}

export default env;
