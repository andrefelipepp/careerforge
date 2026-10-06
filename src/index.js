import loadEnv from "./config/loadEnv.js";
loadEnv();
import candidate from "./data/candidate.js";
import env, { hasAdzunaCredentials } from "./config/env.js";
import createJobProvider from "./integrations/jobs/jobProviderFactory.js";
import matchEngine from "./services/matchEngine.js";

function printMatch(result, index) {
  console.log(`\n${index + 1}. ${result.job.title} — ${result.job.company}`);
  console.log(`   Match: ${result.score}% | ${result.recommendation}`);
  console.log(`   Fonte: ${result.job.source}`);
  if (result.job.location?.city) console.log(`   Local: ${result.job.location.city}`);
  if (result.job.url) console.log(`   URL: ${result.job.url}`);
  if (result.strengths.length) console.log(`   Pontos fortes: ${result.strengths.slice(0, 3).join("; ")}`);
  if (result.gaps.length) console.log(`   Gaps: ${result.gaps.slice(0, 3).join("; ")}`);
}

async function main() {
  const provider = createJobProvider();
  const mode = hasAdzunaCredentials() ? "Adzuna (API real)" : "Demo (sem credenciais Adzuna)";
  console.log(`\nCareerForge — Fase 4`);
  console.log(`Provider: ${mode}`);

  const search = await provider.search({
    query: env.jobs.query,
    location: env.jobs.location,
    resultsPerPage: env.jobs.resultsPerPage
  });

  const ranking = search.jobs
    .map(job => matchEngine(candidate, job))
    .sort((a, b) => b.score - a.score);

  console.log(`Vagas recebidas: ${ranking.length}${search.total ? ` de ${search.total} encontradas` : ""}`);
  ranking.forEach(printMatch);

  if (!hasAdzunaCredentials()) {
    console.log("\nPara usar vagas reais, copie .env.example para .env e informe ADZUNA_APP_ID e ADZUNA_APP_KEY.");
  }
}

main().catch(error => {
  console.error("\nErro ao executar CareerForge:");
  console.error(error.message);
  process.exitCode = 1;
});
