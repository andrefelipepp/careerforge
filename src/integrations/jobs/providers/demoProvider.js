import rawJob from "../fixtures/rawJob.js";
import genericJobAdapter from "../adapters/genericJobAdapter.js";

export default class DemoProvider {
  async search() {
    return { provider: "demo", total: 1, page: 1, jobs: [genericJobAdapter(rawJob, { source: "demo-provider" })] };
  }
}
