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
    title: "Gerador de UC",
    description:
      "Projeto completo com Javascript e Python. Esse projeto gera código de Unidades Consumidoras (UC) para o setor elétrico brasileiro a partir de dados fornecidos pelo usuário.",
    imageUrl: "/logo-gerador-uc.png",
    tags: [
      "JavaScript",
      "Python",
      "Flask",
      "TailwindCSS",
      "Docker",
      "CI/CD",
    ],
    githubUrl: "https://github.com/mibess/gerador-uc",
    demoUrl: "https://geradoruc.mibess.com.br",
  },
  {
    title: "Plataforma EAD",
    description:
      "Projeto completo com Angular e Spring Boot. Baseado na arquitetura de micro serviços esse projeto é uma plataforma de cursos online com funcionalidades como autenticação, gerenciamento de cursos, aulas em vídeo e painel administrativo.",
    imageUrl: "/logo-ead-plataform.png",
    tags: [
      "Java",
      "Spring Boot",
      "Angular",
      "PostgreSQL",
      "Microserviços",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "AWS",
    ],
    githubUrl: "https://github.com/mibess/ead",
    demoUrl: "https://ead.mibess.com.br",
  },
  {
    title: "Sistema de Login",
    description:
      "Sistema de Login completo utilizando Spring Boot, Google Auth e Keycloak, com funcionalidades de autenticação, autorização e gerenciamento de usuários.",
    imageUrl: "/logo-auth-system.png",
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
    title: "Banco de Sangue",
    description:
      "Sistema de Processamento de Dados - Este é um sistema web desenvolvido para processar dados de candidatos a doadores fornecidos por uma agência de banco de sangue.",
    imageUrl: "/logo-banco-de-sangue.png",
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
    demoUrl: "https://citel.mibess.com.br",
  },
  {
    title: "Criador de Cards",
    description:
      "Com essa aplicação podemos listar, cadastrar, editar e excluir um card de pensamento.",
    imageUrl: "/logo-cards.png",
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
  {
    title: "Gerenciador de Senhas",
    description:
      "Com essa aplicação podemos armazenar e gerenciar senhas pessoais, garantindo segurança e facilidade de acesso.",
    imageUrl: "/logo-secrets.png",
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
    githubUrl: "https://github.com/mibess/secrets",
    demoUrl: "https://secrets.mibess.com.br",
  },
];
