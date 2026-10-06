import env, { hasAdzunaCredentials } from "../../config/env.js";
import AdzunaProvider from "./providers/adzuna/adzunaProvider.js";
import DemoProvider from "./providers/demoProvider.js";

export default function createJobProvider() {
  if (hasAdzunaCredentials()) {
    return new AdzunaProvider({ ...env.adzuna });
  }
  return new DemoProvider();
}
