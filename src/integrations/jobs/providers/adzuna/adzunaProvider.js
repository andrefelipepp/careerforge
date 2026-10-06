import adzunaJobAdapter from "../../adapters/adzunaJobAdapter.js";

const BASE_URL = "https://api.adzuna.com/v1/api/jobs";

export default class AdzunaProvider {
  constructor({ appId, appKey, country = "br", fetchImpl = globalThis.fetch } = {}) {
    if (!appId || !appKey) throw new Error("ADZUNA_APP_ID e ADZUNA_APP_KEY são obrigatórios.");
    if (typeof fetchImpl !== "function") throw new Error("Uma implementação de fetch é obrigatória.");
    this.appId = appId;
    this.appKey = appKey;
    this.country = country.toLowerCase();
    this.fetch = fetchImpl;
  }

  async search({ query = "", location = "", page = 1, resultsPerPage = 10, sortBy = "date" } = {}) {
    const url = new URL(`${BASE_URL}/${this.country}/search/${page}`);
    url.searchParams.set("app_id", this.appId);
    url.searchParams.set("app_key", this.appKey);
    url.searchParams.set("results_per_page", String(Math.min(Math.max(resultsPerPage, 1), 50)));
    url.searchParams.set("content-type", "application/json");
    if (query) url.searchParams.set("what", query);
    if (location) url.searchParams.set("where", location);
    if (sortBy) url.searchParams.set("sort_by", sortBy);

    const response = await this.fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Adzuna respondeu ${response.status}: ${body.slice(0, 300)}`);
    }

    const payload = await response.json();
    const jobs = (payload.results ?? []).map(raw => adzunaJobAdapter(raw, { country: this.country }));
    return {
      provider: "adzuna",
      total: payload.count ?? jobs.length,
      page,
      jobs
    };
  }
}
