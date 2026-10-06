import createCandidate from "../domain/candidate/createCandidate.js";

const candidate = createCandidate({
  id: "candidate-demo",
  personal: { name: "Candidato Demo" },
  professional: {
    headline: "Desenvolvedor de Software Júnior",
    roles: ["Desenvolvedor Front-end", "Desenvolvedor Back-end", "Desenvolvedor JavaScript", "Desenvolvedor Node.js", "Desenvolvedor Web"],
    areas: ["Desenvolvimento de Software", "Desenvolvimento Web", "Desenvolvimento Front-end", "Desenvolvimento Back-end", "Desenvolvimento Full Stack"],
    levels: ["Estágio", "Júnior"],
    competencies: {
      known: ["HTML", "CSS", "JavaScript", "Python", "Vercel", "C", "C++", "Node.js", "Lógica de Programação", "Git/GitHub", "Desenvolvimento Responsivo", "Desenvolvimento de Interfaces", "Resolução de Problemas", "APIs REST"],
      learning: ["PHP", "Git", "C#"],
      interested: ["React", "TypeScript", "Java", "Ruby", "Docker", "Laravel", "SQL"]
    }
  },
  languages: [
    { name: "Português", level: "Nativo / Fluente" },
    { name: "Inglês", level: "Básico" },
    { name: "Espanhol", level: "Básico" }
  ],
  preferences: {
    levels: ["Estágio", "Júnior"],
    workModels: ["Presencial", "Híbrido", "Remoto"],
    locations: [
      { country: "Brasil", state: "RN", city: "Natal", workModels: ["Presencial", "Híbrido", "Remoto"] },
      { country: "Brasil", workModels: ["Remoto"] },
      { country: "Portugal", workModels: ["Remoto"] }
    ]
  }
});
export default candidate;
