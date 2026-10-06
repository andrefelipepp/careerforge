function validateJob(job) {
  const errors = [];
  if (!job || typeof job !== "object") errors.push("Vaga inválida.");
  if (!job?.title?.trim()) errors.push("A vaga precisa ter um título.");
  if (!job?.company?.trim()) errors.push("A vaga precisa informar a empresa.");
  if (!Array.isArray(job?.competencies)) errors.push("competencies deve ser um array.");
  if (job?.yearsOfExperience != null && (!Number.isFinite(job.yearsOfExperience) || job.yearsOfExperience < 0)) errors.push("yearsOfExperience deve ser um número positivo ou null.");
  return { valid: errors.length === 0, errors };
}
export default validateJob;
