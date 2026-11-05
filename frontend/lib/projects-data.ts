export interface ProjectInfo {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  featured?: boolean;
}

export const projectsData: ProjectInfo[] = [
  {
    slug: "brodowski",
    title: "Bem vindo à Brodowski",
    description:
      "Experiência digital que apresenta Brodowski, cidade natal de Cândido Portinari, reunindo arte, memória ferroviária, atrações e um roteiro para planejar a visita.",
    imageUrl: "/brodowski-cover.jpg",
    videoUrl: "/videos/brodowski.mp4",
    tags: ["Next.js", "React", "TailwindCSS", "Design responsivo"],
    githubUrl: "https://github.com/mibess/brodowski",
    demoUrl: "https://brodowski.vercel.app/",
    featured: true,
  },
  {
    slug: "gerador-uc",
    title: "Gerador de UC",
    description:
      "Projeto completo com Javascript e Python. Esse projeto gera código de Unidades Consumidoras (UC) para o setor elétrico brasileiro a partir de dados fornecidos pelo usuário.",
    imageUrl: "/logo-gerador-uc.png",
    videoUrl: "/videos/gerador-uc.mp4",
    tags: ["JavaScript", "Python", "Flask", "TailwindCSS", "Docker", "CI/CD"],
    githubUrl: "https://github.com/mibess/gerador-uc",
    demoUrl: "https://geradoruc.mibess.com.br",
    featured: true,
  },
  {
    slug: "plataforma-ead",
    title: "Plataforma EAD",
    description:
      "Projeto completo com Angular e Spring Boot. Baseado na arquitetura de micro serviços esse projeto é uma plataforma de cursos online com funcionalidades como autenticação, gerenciamento de cursos, aulas em vídeo e painel administrativo.",
    imageUrl: "/logo-ead-plataform.png",
    tags: ["Java", "Spring Boot", "Angular", "PostgreSQL", "Microserviços", "Docker", "CI/CD", "GitHub Actions", "AWS"],
    githubUrl: "https://github.com/mibess/ead",
    demoUrl: "https://ead.mibess.com.br",
    featured: true,
  },
  {
    slug: "sistema-de-login",
    title: "Sistema de Login",
    description:
      "Sistema de Login completo utilizando Spring Boot, Google Auth e Keycloak, com funcionalidades de autenticação, autorização e gerenciamento de usuários.",
    imageUrl: "/logo-auth-system.png",
    tags: ["Java", "Spring Boot", "Angular", "PostgreSQL", "Keycloak", "Docker", "CI/CD", "GitHub Actions", "AWS"],
    githubUrl: "https://github.com/mibess/auth",
    demoUrl: null,
  },
  {
    slug: "banco-de-sangue",
    title: "Banco de Sangue",
    description:
      "Sistema de Processamento de Dados - Este é um sistema web desenvolvido para processar dados de candidatos a doadores fornecidos por uma agência de banco de sangue.",
    imageUrl: "/logo-banco-de-sangue.png",
    videoUrl: "/videos/banco-de-sangue.mp4",
    tags: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Docker", "CI/CD"],
    githubUrl: "https://github.com/mibess/agencia-citel",
    demoUrl: "https://citel.mibess.com.br",
  },
  {
    slug: "criador-de-cards",
    title: "Criador de Cards",
    description: "Com essa aplicação podemos listar, cadastrar, editar e excluir um card de pensamento.",
    imageUrl: "/logo-cards.png",
    videoUrl: "/videos/criador-de-cards.mp4",
    tags: ["Angular", "Java", "Spring Boot", "PostgreSQL", "TailwindCSS", "Docker", "CI/CD", "GitHub Actions", "AWS EC2"],
    githubUrl: "https://github.com/mibess/cards-ms",
    demoUrl: "https://cards.mibess.com.br/list-idea",
  },
  {
    slug: "gerenciador-de-senhas",
    title: "Gerenciador de Senhas",
    description:
      "Com essa aplicação podemos armazenar e gerenciar senhas pessoais, garantindo segurança e facilidade de acesso.",
    imageUrl: "/logo-secrets.png",
    tags: ["Angular", "Java", "Spring Boot", "PostgreSQL", "TailwindCSS", "Docker", "CI/CD", "GitHub Actions", "AWS EC2"],
    githubUrl: "https://github.com/mibess/secrets",
    demoUrl: "https://secrets.mibess.com.br",
  },
];
