import rawJob from "../integrations/jobs/fixtures/rawJob.js";
import genericJobAdapter from "../integrations/jobs/adapters/genericJobAdapter.js";

const job = genericJobAdapter(rawJob, { source: "demo-provider" });
export default job;
