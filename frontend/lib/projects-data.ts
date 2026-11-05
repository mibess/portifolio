export interface ProjectInfo {
  slug: string;
  title: string;
  description: string;
  /** Capa do card. Nos projetos com vídeo, é um quadro real da demonstração. */
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  /** Só repositórios públicos: um link que dá 404 derruba a confiança. */
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
      "Gera códigos de Unidades Consumidoras (UC) para o setor elétrico brasileiro, no padrão da ANEEL, a partir da distribuidora escolhida. Frontend em JavaScript e backend em Python com Flask.",
    imageUrl: "/images/projetos/gerador-uc.jpg",
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
      "Plataforma de cursos online construída em microsserviços, com Angular e Spring Boot: autenticação, gestão de cursos, aulas em vídeo e painel administrativo.",
    imageUrl: "/logo-ead-plataform.png",
    tags: ["Java", "Spring Boot", "Angular", "PostgreSQL", "Microsserviços", "Docker", "CI/CD", "GitHub Actions", "AWS"],
    githubUrl: "https://github.com/mibess/ead",
    demoUrl: "https://ead.mibess.com.br",
    featured: true,
  },
  {
    slug: "sistema-de-login",
    title: "Sistema de Login",
    description:
      "Autenticação e autorização com Spring Boot, Keycloak e login do Google, com controle de acesso por perfis e gestão de usuários.",
    imageUrl: "/logo-auth-system.png",
    tags: ["Java", "Spring Boot", "Angular", "PostgreSQL", "Keycloak", "Docker", "CI/CD", "GitHub Actions", "AWS"],
    githubUrl: "https://github.com/mibess/auth",
    demoUrl: null,
  },
  {
    slug: "banco-de-sangue",
    title: "Banco de Sangue",
    description:
      "Sistema web que processa e valida os dados de candidatos à doação de sangue enviados por uma agência, com painel de indicadores e cadastro. Desenvolvido como desafio técnico.",
    imageUrl: "/images/projetos/banco-de-sangue.jpg",
    videoUrl: "/videos/banco-de-sangue.mp4",
    tags: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Docker", "CI/CD"],
    githubUrl: "https://github.com/mibess/agencia-citel",
    demoUrl: "https://citel.mibess.com.br",
  },
  {
    slug: "criador-de-cards",
    title: "Criador de Cards",
    description: "Aplicação para listar, cadastrar, editar e excluir cards de pensamentos, com prévia dos modelos antes de salvar.",
    imageUrl: "/images/projetos/criador-de-cards.jpg",
    videoUrl: "/videos/criador-de-cards.mp4",
    tags: ["Angular", "Java", "Spring Boot", "PostgreSQL", "TailwindCSS", "Docker", "CI/CD", "GitHub Actions", "AWS EC2"],
    githubUrl: "https://github.com/mibess/cards-ms",
    demoUrl: "https://cards.mibess.com.br/list-idea",
  },
  {
    slug: "gerenciador-de-senhas",
    title: "Gerenciador de Senhas",
    description: "Cofre para armazenar e gerenciar senhas pessoais com segurança e praticidade.",
    imageUrl: "/logo-secrets.png",
    tags: ["Angular", "Java", "Spring Boot", "PostgreSQL", "TailwindCSS", "Docker", "CI/CD", "GitHub Actions", "AWS EC2"],
    // O repositório mibess/secrets não é público; o link volta quando ele for publicado.
    githubUrl: null,
    demoUrl: "https://secrets.mibess.com.br",
  },
];
