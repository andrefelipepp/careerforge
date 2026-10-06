import matchCompetencies from "./competencyMatcher.js";
import matcherLocation from "./locationMatcher.js";
import matchProfessional from "./professionalMatcher.js";
import matchLevel from "./levelMatcher.js";
import matchLanguages from "./languageMatcher.js";
import matchExperience from "./experienceMatcher.js";
import matchEducation from "./educationMatcher.js";
import matchWeights from "../config/matchWeights.js";
function getRecommendation(score) { if (score >= 75) return "CANDIDATAR"; if (score >= 55) return "AVALIAR"; return "BAIXA COMPATIBILIDADE"; }
function matchEngine(candidate, job) {
  const competencies = matchCompetencies(candidate, job);
  const location = matcherLocation(candidate, job);
  const professional = matchProfessional(candidate, job);
  const level = matchLevel(candidate, job);
  const languages = matchLanguages(candidate, job);
  const experience = matchExperience(candidate, job);
  const education = matchEducation(candidate, job);
  const professionalPercentage = (professional.positionMatch ? 60 : 0) + (professional.areaMatch ? 40 : 0);
  const components = { competencies: competencies.percentage, professional: professionalPercentage, experience: experience.percentage, level: level.match ? 100 : 0, location: location.match ? 100 : 0, languages: languages.percentage, education: education.percentage };
  const score = Object.entries(matchWeights).reduce((sum, [key, weight]) => sum + components[key] * weight / 100, 0);
  const strengths = [
    ...competencies.known.map(x => `Competência dominada: ${x}`),
    ...competencies.learning.map(x => `Competência em aprendizado: ${x}`),
    ...(professional.positionMatch ? ["Cargo compatível"] : []), ...(professional.areaMatch ? ["Área compatível"] : []),
    ...(level.match ? ["Senioridade compatível"] : []), ...(location.match ? ["Localização/modalidade compatível"] : [])
  ];
  const gaps = [
    ...competencies.missing.map(x => `Competência ausente: ${x}`), ...languages.missing.map(x => `Idioma ausente: ${x}`),
    ...(!professional.positionMatch ? ["Cargo sem correspondência direta"] : []), ...(!professional.areaMatch ? ["Área sem correspondência direta"] : []),
    ...(!level.match ? ["Senioridade incompatível"] : []), ...(!location.match ? [location.reason] : []), ...(!experience.match ? [`Experiência abaixo do solicitado (${experience.available}/${experience.required} anos)`] : [])
  ];
  return { candidate: { id: candidate.id, name: candidate.personal?.name }, job: { id: job.id, title: job.title, company: job.company, source: job.source, location: job.location, url: job.url }, score: Number(score.toFixed(1)), recommendation: getRecommendation(score), strengths, gaps, breakdown: { competencies, professional, experience, level, location, languages, education, components, weights: matchWeights } };
}
export default matchEngine;
