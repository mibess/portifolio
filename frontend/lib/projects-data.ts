export interface ProjectInfo {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string | null;
}

export const projectsData: ProjectInfo[] = [
  {
    title: "Sistema de Login",
    description:
      "Sistema de Login completo utilizando Spring Boot Google Auth e Keycloak",
    imageUrl: "/login-api.png",
    tags: [
      "Java",
      "Spring Boot",
      "Angular",
      "PostgreSQL",
      "Keycloak",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "AWS",
    ],
    githubUrl: "https://github.com/mibess/auth",
    demoUrl: "#",
  },
  {
    title: "Banco de Sangue - Sistema de Processamento de Dados",
    description:
      "Este é um sistema web desenvolvido para processar dados de candidatos a doadores fornecidos por uma agência de banco de sangue.",
    imageUrl: "/citel-api.png",
    tags: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "AWS",
      "Docker",
      "CI/CD",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/mibess/agencia-citel",
    demoUrl: null,
  },
  {
    title: "Criador de Cards",
    description:
      "Com essa aplicação podemos listar, cadastrar, editar e excluir um card de pensamento.",
    imageUrl: "/chat-api.png",
    tags: [
      "Angular",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "TailwindCSS",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "AWS EC2",
    ],
    githubUrl: "https://github.com/mibess/cards-ms",
    demoUrl: "https://cards.mibess.com.br/list-idea",
  },
];
