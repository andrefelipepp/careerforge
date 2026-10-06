function matchExperience(candidate, job) {
  const required = job.yearsOfExperience;
  const available = candidate.professional?.yearsOfExperience ?? 0;
  if (required == null) return { match: true, required: null, available, percentage: 100, notSpecified: true };
  const percentage = required <= 0 ? 100 : Math.min(100, (available / required) * 100);
  return { match: available >= required, required, available, percentage, notSpecified: false };
}
export default matchExperience;
