/**
 * Conteúdo do site em um só lugar.
 * Os textos vêm das versões anteriores dos componentes (hero, next-step, page, contact, footer,
 * personal-life e skills) e do ABOUTME.md. Mudaram só os rótulos aprovados na proposta de redesign.
 */

export const INICIO_CARREIRA = 2010;

export function anosDeExperiencia(agora: Date = new Date()): number {
  return agora.getFullYear() - INICIO_CARREIRA;
}

/** Foto da sessão de estúdio usada no hero. Use null para voltar à ficha técnica. */
export const RETRATO: string | null = "/images/retrato-hero.webp";

const WHATSAPP = "5516993754887";
const MENSAGEM_AGENDAR = "Olá, Claudemir! Vi seu site e gostaria de agendar uma conversa sobre consultoria/mentoria.";

export const contato = {
  email: "contato@mibess.com.br",
  whatsappNumero: "(16) 99375-4887",
  whatsappUrl: `https://wa.me/${WHATSAPP}`,
  /** Agendamento é feito pelo WhatsApp, com mensagem pronta. */
  whatsappAgendar: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM_AGENDAR)}`,
  linkedin: "https://www.linkedin.com/in/claudemircustodio",
  github: "https://github.com/mibess",
  curriculo: "/Claudemir_Custodio_CV.pdf",
  local: "Ribeirão Preto · SP",
} as const;

export const perfil = {
  nome: "Claudemir Custódio",
  papel: "Consultoria em arquitetura Java & Cloud · Mentoria técnica",
  tituloInicio: ["Transformando ideias", "complexas em"],
  frases: ["código eficiente", "designs inteligentes", "projetos escaláveis"],
  apresentacao: "Oi, sou engenheiro de software apaixonado por transformar ideias em aplicações reais.",
  crenca: "Acredito que tecnologia não é só código. É experiência, clareza em resolver problemas de um jeito inteligente.",
  disponibilidade: "Disponível para novos projetos e desafios.",
  stack: "Java · Spring Boot · Angular · AWS",
} as const;

export function bio(anos: number): string {
  return `Claudemir Custódio é engenheiro de software e consultor com mais de ${anos} anos de experiência, focado em arquitetura Java, Cloud AWS e microsserviços.`;
}

export const navegacao = [
  { href: "#atuacao", label: "Atuação" },
  { href: "#cases", label: "Cases" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#projetos", label: "Projetos" },
  { href: "#alem-do-codigo", label: "Sobre" },
] as const;

export const credibilidade = {
  destaques: [
    { valor: 5, rotulo: "grandes bancos integrados, além do PIX", detalhe: "Itaú, Banco do Brasil, Santander, Bradesco e Caixa" },
    { valor: "CCEE", rotulo: "microsserviços críticos no setor elétrico", detalhe: "AMcom · squad CCEE" },
    { valor: "AWS", rotulo: "monolito local migrado para a nuvem", detalhe: "EC2 · S3 · ECS com Docker" },
    { valor: 7, rotulo: "projetos autorais publicados", detalhe: "6 com demonstração online" },
  ],
  ondeAtuei: ["AMcom · squad CCEE", "Rtools", "Master Company"],
} as const;

export const atuacao = {
  titulo: "Como posso ajudar",
  frentes: [
    {
      id: "arquitetura",
      titulo: "Arquitetura & performance",
      texto: "Consultoria técnica focada em arquitetura e performance.",
      itens: ["Microsserviços", "DDD", "Clean Architecture", "APIs REST"],
    },
    {
      id: "transformacao",
      titulo: "Transformação digital & squads ágeis",
      texto: "Projetos de transformação digital e squads ágeis.",
      itens: ["Monolito → AWS", "Docker", "CI/CD", "Scrum e Kanban"],
    },
    {
      id: "mentoria",
      titulo: "Mentoria & liderança técnica",
      texto: "Mentorias e apoio para times que precisam de liderança técnica.",
      itens: ["Carreira", "Desafios técnicos", "Liderança"],
    },
  ],
  agora: {
    rotulo: "Agora",
    texto:
      "Entregando novas funcionalidades e otimizações em microsserviços da CCEE, com Java, Spring Boot, Oracle e Angular alinhados às rotinas regulatórias do setor elétrico.",
  },
  foco: {
    rotulo: "Foco",
    texto:
      "Acelerar roadmaps que precisam de microsserviços robustos, frontends modernos e governança CI/CD para escala e observabilidade.",
  },
} as const;

export type DiagramaId = "bancos" | "nuvem" | "tempo-real" | "setor-eletrico";

export const cases: {
  id: DiagramaId;
  empresa: string;
  periodo: string;
  titulo: string;
  texto: string;
  stack: string[];
}[] = [
  {
    id: "bancos",
    empresa: "Rtools",
    periodo: "2010 — 2023",
    titulo: "Integrações bancárias e PIX",
    texto:
      "Integrações com as APIs dos maiores bancos do país (Itaú, Banco do Brasil, Santander, Bradesco e Caixa) para processamento de arquivos de remessa e retorno e faturamento em boletos, além de fluxos de liquidação instantânea via PIX.",
    stack: ["Boletos", "Remessa e retorno", "PIX", "5 bancos"],
  },
  {
    id: "nuvem",
    empresa: "Rtools",
    periodo: "2010 — 2023",
    titulo: "Do monolito local à nuvem AWS",
    texto:
      "Migração de softwares monolíticos locais para ambientes escaláveis na AWS com empacotamento Docker, governança dos fluxos Git e testes unitários e de integração, mantendo a cadência com Scrum e Kanban.",
    stack: ["AWS EC2 · S3 · ECS", "Docker", "Testes", "Git"],
  },
  {
    id: "tempo-real",
    empresa: "Rtools",
    periodo: "2010 — 2023",
    titulo: "Acessos monitorados em tempo real",
    texto:
      "Controle de acesso em catracas com cartões e biometria para academias, clubes e escolas, e uma aplicação web para monitorar os acessos em tempo real em monitores e dispositivos móveis.",
    stack: ["ReactJS", "Spring Boot", "REST", "Docker", "AWS ECS", "GitHub Actions"],
  },
  {
    id: "setor-eletrico",
    empresa: "AMcom · Squad CCEE",
    periodo: "2024 — atual",
    titulo: "Microsserviços críticos no setor elétrico",
    texto:
      "Novas funcionalidades e manutenção de microsserviços críticos para a comercialização e a regulação do setor elétrico brasileiro, com interfaces Angular focadas em desempenho e consistência da experiência do usuário.",
    stack: ["Java", "Spring Boot", "Oracle", "Angular", "Jira"],
  },
];

export const metodo = {
  titulo: "Alinhemos os próximos passos",
  intro: "Após o primeiro contato, envio um e-mail com possíveis horários e uma pauta objetiva para nossa conversa.",
  etapas: [
    { titulo: "Entendimento", texto: "Entendimento do contexto e objetivos do projeto." },
    { titulo: "Proposta", texto: "Proposta de caminhos técnicos e estimativa inicial." },
    { titulo: "Kick-off", texto: "Kick-off com plano de ação alinhado com stakeholders." },
  ],
} as const;

export const trajetoria = [
  {
    role: "Desenvolvedor de Sistemas",
    company: "AMcom · Squad CCEE",
    period: "jan 2024 — atual",
    details: [
      "Desenvolvo novas funcionalidades e mantenho microsserviços críticos da CCEE usando Java, Spring Boot e banco Oracle.",
      "Construo interfaces Angular com foco em desempenho e consistência da experiência do usuário.",
      "Atuo com Git (GitHub/Bitbucket), Jira e práticas ágeis para garantir cadência e qualidade das entregas.",
    ],
  },
  {
    role: "Desenvolvedor Full Stack Java",
    company: "Rtools Desenvolvimento de Sistemas",
    period: "jan 2010 — set 2023",
    details: [
      "Desenvolvi uma aplicação de controle de acesso em catracas com cartões e biometria para academias, clubes e escolas (Java 7, MySQL, Swing).",
      "Criei uma aplicação web para monitorar acessos em tempo real em monitores e dispositivos móveis (ReactJS, Spring Boot, REST, Docker, AWS ECS, GitHub Actions).",
      "Modelei e implementei módulos de gestão para sindicatos e associações (Java, JSF, Primefaces, PostgreSQL, Jasper Reports).",
      "Entreguei frontend para clientes acompanharem dados cadastrais, cobranças, agendamentos e homologações (Angular, Spring Boot, Docker, AWS, DDD).",
      "Implementei integrações bancárias (Itaú, BB, Santander, Bradesco, Caixa) para a geração de boletos e remessa. Implementei o pagamento via PIX para alguns clientes.",
      "Realizei testes unitários e de integração, migrei o monolito para AWS e mantive cadência com Scrum e Kanban usando GitHub/Bitbucket.",
    ],
  },
  {
    role: "Instrutor de Informática",
    company: "Master Company Informática",
    period: "jan 2009 — dez 2009",
    details: [
      "Ministrei aulas de Photoshop, CorelDraw e Microsoft Office para turmas com diferentes níveis de conhecimento.",
      "Desenvolvi materiais didáticos personalizados e apoiei projetos de design gráfico da escola.",
    ],
  },
] as const;

export const formacao = [
  { periodo: "2023", tipo: "Curso", titulo: "Engenharia de Software", instituicao: "Alura" },
  { periodo: "2008 — 2009", tipo: "Técnico", titulo: "Informática & Gestão de TI", instituicao: "ETEC - Escola Técnica Estadual de SP" },
  { periodo: "Idioma", tipo: "Idioma", titulo: "Inglês", instituicao: "Intermediário" },
  { periodo: "Local", tipo: "Local", titulo: "Ribeirão Preto · SP", instituicao: "Híbrido e remoto" },
] as const;

export const expertise = [
  { id: "backend", titulo: "Backend", itens: ["Java", "Spring Boot", "JPA/Hibernate", "REST API", "DDD", "Microservices", "RabbitMQ"] },
  { id: "frontend", titulo: "Frontend", itens: ["Angular", "React", "TypeScript", "JavaScript", "HTML", "CSS", "JSF", "Primefaces"] },
  { id: "infra", titulo: "Infra & Cloud", itens: ["AWS EC2/S3/ECS", "Docker", "CI/CD", "PostgreSQL", "Oracle", "MySQL", "Git", "Bitbucket"] },
  {
    id: "praticas",
    titulo: "Práticas",
    itens: ["Testes Unitários", "Testes de Integração", "Scrum/Kanban", "CI/CD (GitHub Actions/Bitbucket)", "Versionamento Git", "Jasper Reports"],
  },
] as const;

export const alemDoCodigo = {
  titulo: "Além do código",
  subtitulo: "O algoritmo por trás da lógica",
  manifesto: [
    "Acredito que a excelência técnica é sustentada por quem somos fora do terminal. Minha rotina vai muito além de compilar em Java e desenhar microsserviços.",
    "É no som de um acorde, na estratégia de um passe no gramado e na presença com a minha família que eu recarrego minha criatividade e renovo minha perspectiva para solucionar problemas complexos.",
  ],
} as const;

export const contatoSecao = {
  titulo: "Vamos construir algo impactante",
  texto: "Aberto a novas oportunidades e parcerias de longo prazo. Escolha o canal que preferir e vamos conversar.",
  resposta: "Respondo pessoalmente e costumo agendar uma call rápida para entender contexto, expectativas e próximos passos.",
  canais: [
    { id: "whatsapp", label: "WhatsApp", valor: contato.whatsappNumero, href: contato.whatsappAgendar, descricao: "Agendamento de conversas e contato rápido." },
    { id: "email", label: "E-mail", valor: contato.email, href: `mailto:${contato.email}`, descricao: "Retorno em até 24h com agenda e próximos passos." },
    { id: "linkedin", label: "LinkedIn", valor: "in/claudemircustodio", href: contato.linkedin, descricao: "Vamos falar sobre carreira, desafios técnicos e liderança." },
    { id: "github", label: "GitHub", valor: "github.com/mibess", href: contato.github, descricao: "Analise meu código, abra uma issue ou proponha colaboração." },
  ],
} as const;
