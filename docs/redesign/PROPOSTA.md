# Redesign mibess.com.br: "Arquitetura em Movimento"

> **Status (rev. 2):** conceito, paleta e tipografia aprovados. Fases 1 a 3 implementadas no branch
> `claude/eloquent-bohr-d3k0se` (resultado medido na seção 12). Pendentes: escolha da logo (rodada 2),
> fotos da sessão e as decisões abertas da seção 11. Prompts em [`PROMPTS.md`](./PROMPTS.md).
> Medições feitas em 05/11/2026 sobre o build de produção local (Next.js 16), em 1440×900 (desktop) e 390×844 (mobile).

---

## 1. Resumo executivo

1. **O site hoje vende um desenvolvedor, e a nova versão precisa vender um consultor e mentor.** A estética cyberpunk (neon ciano/roxo, fonte Orbitron, `system.init()`, `MISSION.log()`, `INIT.contato`) comunica "dev criativo". Um comprador corporativo procura um parceiro estratégico.
2. **Sua prova mais forte está escondida.** Integrações com 5 grandes bancos + PIX, migração de monolito para AWS, monitoramento em tempo real e microsserviços críticos na CCEE aparecem como bullets em fonte mono de 14px dentro da timeline. Enquanto isso, os projetos autorais ocupam **56% da altura da página**.
3. **O conteúdo de consultoria já existe no código, mas não aparece.** O componente `contact.tsx` (não usado) traz "Como posso ajudar agora", "Alinhemos os próximos passos" e canais com descrição. Como você sugeriu, a mudança principal é de **visibilidade**: reordenar, dar peso e, em alguns pontos, resgatar o que já foi escrito.
4. **Direção proposta: "Arquitetura em Movimento".** Precisão de prancheta (grid, linhas técnicas, hierarquia rígida) somada a fluidez: linhas que se desenham, dados que fluem pelos diagramas, seções que se montam no scroll.
5. **Há problemas técnicos que um avaliador de big tech nota em um minuto** (Lighthouse/DevTools): CLS de **0,82** (o limite "bom" do Google é 0,10), **~11 MB** baixados no celular na primeira carga e imagem de compartilhamento quebrada (links no LinkedIn/WhatsApp saem sem prévia).

---

## 2. Diagnóstico da versão atual

### 2.1 Números

| Indicador | Medido | Referência / meta |
|---|---|---|
| Altura da página (desktop) | 10.629 px | ~8.200 px (com detalhes recolhíveis) |
| Altura da página (mobile) | 14.663 px | ~10.500 px |
| Participação dos projetos autorais na página | 56% | ~16% |
| CLS (estabilidade visual) | 0,82 desktop · 0,83 mobile | < 0,10 ("bom" no Core Web Vitals) |
| Causa do CLS | `.scanline` anima `bottom` (propriedade de layout) e o cursor do efeito de digitação no `h1` | animar só `transform`/`opacity` |
| Transferência na 1ª carga (mobile) | ~11 MB (vídeo `.mov` começa a baixar sozinho) | < 1,5 MB |
| Vídeos | 4 arquivos, 51,7 MB, até 3840×2160 (4K), 3 deles com faixa de áudio, para caixas de ~1000 px | MP4/WebM 720p, sem áudio, ≤ 2 MB cada, só carregam ao entrar na tela |
| Imagens sem uso no repositório | 5 arquivos, ~11 MB (`cover.png`, `chat-api.png`, `citel-api.png`, `login-api.png`, `loading-project.png`) | remover |
| Componentes sem uso | `contact.tsx`, `project-stories.tsx`, `loading-screen.tsx`, `theme-switcher.tsx` | reaproveitar conteúdo e remover |
| Imagem de compartilhamento (Open Graph) | aponta para `/logo.png`, que **não existe** | gerar 1200×630 em código |
| Textos de 8 a 10 px | 22 ocorrências | mínimo 12 px |
| Build sem `GEMINI_API_KEY` | falha (cliente criado no escopo do módulo) | inicialização preguiçosa |

### 2.2 Composição da página hoje (desktop)

| Ordem | Seção atual | Altura | % da página |
|---|---|---|---|
| 1 | Header + Hero (`DATA.resumo`) | 967 px | 9,1% |
| 2 | Agora / Próximo passo | 344 px | 3,2% |
| 3 | Skills (`SYS.load_skills()`) | 548 px | 5,2% |
| 4 | Vida pessoal (`HUMAN.core()`) | 704 px | 6,6% |
| 5 | Experiência + formação (`MISSION.log()`) | 1.533 px | 14,4% |
| 6 | **Projetos (`PROJ.exec()`)** | **5.954 px** | **56,0%** |
| 7 | Contato + rodapé (`INICIAR CONEXÃO?`) | 579 px | 5,4% |

### 2.3 O que funciona e deve ficar

- **Chat Mibee com IA e base de conhecimento** (`ABOUTME.md`). Para um consultor isso é um diferencial raro: demonstra IA aplicada na prática.
- **Narrativa humana** (família, música, futebol, fotografia, fogo de chão). Para mentoria, gera identificação e confiança.
- **Vídeos reais dos projetos.** São prova de entrega e só precisam de otimização.
- **Currículo em PDF, LinkedIn e GitHub** a um clique.
- **Stack moderna** (Next.js 16, React 19, Tailwind 4), que facilita a evolução.

### 2.4 O que trava a percepção corporativa

| Área | Problema | Por que importa para quem contrata consultoria |
|---|---|---|
| Posicionamento | Título "Full Stack Java Developer"; nenhuma menção a consultoria ou mentoria na página visível | O visitante não entende o que pode contratar |
| Hierarquia | Vida pessoal aparece **antes** da experiência profissional; skills em "nuvem de tags" antes de qualquer resultado | Decisores leem resultado → método → equipe; ferramentas vêm por último |
| Prova | Conquistas profissionais escondidas em bullets; projetos autorais superexpostos | Projetos de estudo pesam menos que entregas em produção para bancos e setor regulado |
| Estética | Neon, Orbitron, scanline, jargão de terminal em todos os títulos | Lê como portfólio de dev/gamer, e não como assessoria |
| Ritmo visual | Alternância aleatória de fundos escuros, cinza e branco, com cards `rounded-3xl` em tudo | Sem sistema, a página parece montada por partes |
| Leitura | Fonte monoespaçada em todos os parágrafos | Cansa em textos longos e reduz a velocidade de leitura |
| Conversão | Único CTA no fim da página; telefone e e-mail dentro do card de formação; e-mail `@live.com` | Comprador corporativo espera um próximo passo claro e um e-mail de domínio próprio |
| Consistência | JSON-LD usa `admin@mibess.com.br` e a interface usa `c.silverio@live.com`; título "Portfolio v2.0" | Pequenas inconsistências reduzem a confiança |
| Qualidade técnica | CLS 0,82, vídeos 4K em `.mov`, OG quebrada, textos de 8 px, itens clicáveis que não aceitam teclado | Um engenheiro de big tech abre o Lighthouse e vê isso em segundos |
| Internacional | Só em português (o `ABOUTME-en.md` existe, mas não é usado no site) | Empresas globais avaliam em inglês |

---

## 3. A lente de uma big tech

> Simulação: uma liderança de engenharia de uma empresa no porte de Netflix ou Google recebe seu link pelo LinkedIn e avalia se vale marcar uma conversa.

| Momento | O que ela procura | O que encontra hoje | O que precisa encontrar |
|---|---|---|---|
| **0–10 s** (primeira dobra) | Quem é, o que faz, para quem, qual o próximo passo | Título animado letra a letra, neon, "Full Stack Java Developer", botão "Baixar currículo" | Nome + papel ("Consultoria em arquitetura Java & Cloud · Mentoria técnica"), retrato profissional, CTA "Agendar conversa" |
| **10–60 s** (varredura) | Problemas que você resolve, provas, contexto de atuação | Tags de tecnologia, fotos de família, timeline longa em mono, 7 projetos com vídeo | Três frentes de atuação, quatro cases com contexto e resultado, faixa de credibilidade (14+ anos, 5 bancos + PIX, setor elétrico) |
| **1–5 min** (diligência) | Método, profundidade técnica, referências, idioma, formalidade | Currículo e LinkedIn (bom); sem método visível, sem versão em inglês, e-mail pessoal | Método em 3 etapas, trajetória detalhada sob demanda, diagramas de arquitetura dos cases, versão EN, e-mail de domínio |
| **Compras / jurídico** | Empresa formal, privacidade | Não há dados da empresa nem aviso de privacidade do chat | Rodapé com razão social/CNPJ (se houver) e nota de privacidade do assistente |

**Avaliação qualitativa (0 a 5), hoje → meta**

| Critério | Hoje | Meta |
|---|---|---|
| Clareza da oferta | 1 | 5 |
| Prova de impacto | 2 | 4 (5 com depoimentos) |
| Credibilidade visual | 2 | 5 |
| Facilidade de contato | 3 | 5 |
| Performance e qualidade técnica | 2 | 5 |
| Acessibilidade | 2 | 4 |
| Alcance internacional | 0 | 4 (fase 5) |

---

## 4. Conceito: Arquitetura em Movimento

**A ideia.** Você é um arquiteto de software que ajuda empresas e pessoas a evoluírem. O site deve parecer uma prancheta de arquitetura viva: estrutura precisa (grid, linhas técnicas, cotas, legendas) que ganha movimento quando o visitante interage. A estrutura transmite confiança corporativa e o movimento transmite transformação, que é exatamente o que você vende.

**Por que funciona para consultoria e mentoria**
- *Consultoria* é desenhar a estrutura certa: o grid, os diagramas e as cotas mostram rigor.
- *Mentoria* é conduzir alguém passo a passo: linhas que se desenham e etapas que se acendem mostram progressão.
- A metáfora conversa com o seu dia a dia (arquitetura de software, DDD, arquitetura hexagonal, microsserviços) sem cair no clichê "hacker".

**Princípios de design**
1. **Clareza executiva primeiro.** Em 5 segundos: quem, o quê, para quem e como começar.
2. **Prova antes de promessa.** Números, cases e contexto antes de autodescrição.
3. **Movimento com propósito.** Toda animação explica algo (fluxo de dados, progresso, sequência) ou guia a leitura. Nada pisca sem motivo.
4. **O humano no lugar certo.** A vida pessoal fica, mas depois da prova profissional, perto do contato, onde gera a conexão que fecha a conversa.
5. **Raiz técnica como assinatura discreta.** Rótulos em mono e diagramas precisos lembram que você é engenheiro, sem transformar o site num terminal.

**Detalhes de assinatura (coisas que só este site teria)**
- **Carimbo técnico no rodapé**, como a legenda de uma prancha de engenharia (NBR 10068): *Projeto: mibess.com.br · Autor: Claudemir Custódio · Revisão 3.0 · Escala 1:1 · Ribeirão Preto/SP*. O seu `System.exit(0);` continua ali como easter egg.
- **Cotas nos números:** "14+ anos" desenhado como uma linha de cota entre 2010 e hoje.
- **Diagramas vivos nos cases:** cada case ganha um mini diagrama de arquitetura (estilo C4) com pulsos de dados percorrendo as conexões. Ex.: Plataforma ↔ Itaú · BB · Santander · Bradesco · Caixa · PIX.
- **Grid hexagonal** na construção da logo, ligando arquitetura hexagonal (ports & adapters) e o Mibee (favo).
- **Marcadores de seção** no formato de chamada de corte de planta, com o número real da seção.

---

## 5. Sistema visual

### 5.1 Cores

| Token | Nome | Hex | Uso |
|---|---|---|---|
| `ink-950` | Noite | `#07111C` | Fundo do hero e do CTA final |
| `ink-900` | Tinta | `#0C1A29` | Seções escuras; texto principal sobre papel |
| `ink-800` | Grafite azulado | `#13263A` | Superfícies e cards em seções escuras |
| `ink-700` | Traço noturno | `#1F3550` | Linhas finas sobre fundo escuro |
| `paper` | Papel vegetal | `#F3F5F7` | Seções claras (leitura) |
| `paper-2` | Névoa | `#E6EBF0` | Superfícies e divisores sobre papel |
| `blueprint-400` | Azul planta | `#7FA6CC` | Linhas técnicas, rótulos e grid sobre escuro |
| `blueprint-600` | Azul planta profundo | `#2C5F92` | Links e linhas sobre papel |
| `honey` | Mel | `#F4A93C` | Assinatura: CTA principal, destaques, pulsos de dados (só sobre escuro ou como preenchimento) |
| `honey-deep` | Mel tostado | `#9A5B06` | Destaques em texto sobre papel |
| `text-on-ink` | | `#E9EEF4` | Texto sobre escuro |
| `muted-on-ink` | | `#93A3B8` | Texto secundário sobre escuro |
| `muted-on-paper` | | `#556274` | Texto secundário sobre papel |

Contraste WCAG verificado: tinta sobre papel 16,1:1 · texto sobre noite 16,3:1 · secundário sobre tinta 6,8:1 · secundário sobre papel 5,7:1 · mel sobre tinta 8,9:1 · botão tinta sobre mel 8,9:1 · azul planta profundo sobre papel 6,1:1 · mel tostado sobre papel 5,0:1. **O mel nunca vira texto sobre papel** (1,8:1).

**Proporção de uso:** cerca de 60% neutros (noite, tinta, papel), 30% tons de texto, 10% acentos (mel ~6%, azul planta ~4%). O roxo e o ciano neon saem; o mel conecta Mibee (abelha), o fogo de chão e o pôr do sol das suas fotos.

### 5.2 Tipografia

| Papel | Fonte | Configuração |
|---|---|---|
| Títulos e números de destaque | **Archivo** (eixo de largura 112–125%, peso 600–700) | Tracking −0,02em, `text-wrap: balance`. A largura expandida remete a placas técnicas e carimbos de prancha |
| Texto corrido | **Archivo** (largura 100%, peso 400/500) | 17–18 px, entrelinha 1,6, máx. 65 caracteres por linha |
| Rótulos, dados e acenos de código | **JetBrains Mono** (já usada) | 12–13 px, caixa alta com +0,08em em rótulos. É a fonte do IntelliJ, a IDE do mundo Java |

Escala (desktop → mobile): 72/44 · 56/36 · 40/30 · 28/24 · 20/18 · 17/16 · 14 · 12. Orbitron sai do projeto.

### 5.3 Grid, forma e superfícies
- Grid de 12 colunas, conteúdo com até 1200 px, gutters de 24 px; respiro vertical de 120–160 px por seção no desktop e 72–96 px no mobile.
- Raio de 4 px em cards e botões (precisão arquitetônica). Pílula só em tags pequenas.
- Linhas de 1 px com 8–12% de opacidade separam conteúdo; sombra quase nunca. Cor de fundo e linhas criam profundidade, e o brilho neon sai.
- **Ritmo de seções intencional:** escuro para declarações (hero, credibilidade, método, CTA) e claro para leitura (atuação, cases, trajetória, projetos).

### 5.4 Iconografia e imagem
- Ícones Lucide com traço 1,5. Logos de tecnologia com `simple-icons` monocromáticos na cor do texto. Emojis saem dos rótulos.
- Fotografia com cor natural e leve contraste, sem filtros neon. As fotos pessoais ganham uma gradação única (ligeiramente quente) para parecerem uma série.
- Capas de projeto viram **screenshots reais** com moldura de navegador consistente. Os mockups gerados por IA mostram telas que não batem com as aplicações reais, e quem clica em "ver demo" percebe a diferença.

---

## 6. Linguagem de movimento (fluidez)

### 6.1 Tokens

| Token | Valor | Uso |
|---|---|---|
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entradas e revelações |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transições de estado e cor de fundo |
| Mola (Motion) | `stiffness 260 · damping 30` | Hover, botões magnéticos, modais |
| Durações | 160 ms (micro) · 320 ms (interface) · 700 ms (revelação) · 1200 ms (linha desenhando) · 12–30 s (ambiente) | |
| Revelação | `y: 24px → 0`, `opacity: 0 → 1`, `blur: 6px → 0`, intervalo de 70 ms entre itens | |
| Movimento reduzido | Só opacidade, até 200 ms; animações de ambiente pausadas | `prefers-reduced-motion` |

### 6.2 Padrões por seção

| Seção | Movimento |
|---|---|
| Global | Scroll suave (Lenis); barra de progresso fina em mel no topo; fundo transita entre noite e papel ao trocar de seção |
| Header | Esconde ao rolar para baixo e volta ao rolar para cima; desfoque após 24 px; indicador deslizante da seção ativa |
| Hero | Sequência de entrada com até 1,2 s: rótulo → título por linhas (máscara) → texto → CTAs → retrato (revelação de baixo para cima). Fundo em canvas: grid de planta com linhas fluindo e pulsos de mel. A frase rotativa ("código eficiente / designs inteligentes / projetos escaláveis") troca a cada 3 s com deslize vertical e desfoque, substituindo o efeito de digitação. Com largura reservada, não há salto de layout |
| Credibilidade | Números contam até o valor ao entrar na tela; a cota 2010 → hoje se desenha |
| Atuação | Cards se "montam" em sequência; imagens com parallax leve (8–12%); destaque que segue o cursor no hover |
| Cases | Diagramas vivos: linhas se desenham e os pulsos de dados percorrem as conexões em loop, pausando fora da tela |
| Método | Três etapas ligadas por uma linha que se preenche conforme o scroll |
| Trajetória | A linha do tempo se desenha com o scroll; marcos acendem ao serem alcançados; "ver detalhes" expande com animação de altura |
| Projetos | Vídeo toca no hover (desktop) ou ao entrar na tela (mobile); clique abre o detalhe com transição de elemento compartilhado (o card cresce até virar o modal) |
| Além do código | Galeria horizontal com arraste e inércia; foto expande até o visualizador com transição compartilhada |
| Contato | Botão magnético; visual-chave com deriva lenta ao fundo |

### 6.3 Stack técnica sugerida
- **Motion** (motion.dev, antiga Framer Motion) com `LazyMotion`: revelações, `layoutId` para transições compartilhadas, scroll-linked.
- **Lenis** (~4 KB) para o scroll suave.
- **Canvas 2D** para o fundo do hero (sem WebGL), pausado fora da tela.
- **IntersectionObserver** para vídeos e diagramas.
- Só `transform`/`opacity` são animados, a 60 fps. Orçamento: até ~40 KB gz de JS de animação.

---

## 7. Nova arquitetura de informação: mapa de visibilidade

O conteúdo é mantido. Muda a ordem, o peso visual e a forma de apresentar. Itens marcados com ★ resgatam conteúdo que já existe no código, mas hoje não aparece no site.

| # | Nova seção (âncora) | De onde vem o conteúdo | Peso visual | Tratamento |
|---|---|---|---|---|
| 1 | **Hero** `#inicio` | `hero.tsx` (título, frases rotativas, bio, redes, currículo) | Máximo | Retrato profissional, papel de consultor/mentor, CTA "Agendar conversa" + "Baixar currículo"; redes discretas |
| 2 | **Credibilidade** | Números do hero + timeline | Alto (faixa) | 14+ anos (cota 2010 → hoje), 5 bancos + PIX, setor elétrico (CCEE), monolito → AWS; "Onde atuei: AMcom · CCEE · Rtools" |
| 3 | **Atuação** `#atuacao` | ★ `contact.tsx` ("Como posso ajudar agora") + `next-step.tsx` (Agora / Próximo passo) | Alto | Três frentes com visual: Arquitetura & performance · Transformação digital & squads ágeis · Mentoria & liderança técnica |
| 4 | **Cases** `#cases` | Bullets da timeline (Rtools, AMcom) | Alto | Quatro cases no formato Contexto → Atuação → Stack, com diagrama vivo: Integrações bancárias & PIX · Monolito → AWS · Monitoramento em tempo real · Microsserviços críticos no setor elétrico |
| 5 | **Método** `#metodo` | ★ `contact.tsx` ("Alinhemos os próximos passos") | Médio | 1. Entendimento do contexto e objetivos · 2. Proposta de caminhos técnicos e estimativa inicial · 3. Kick-off com plano de ação alinhado com stakeholders |
| 6 | **Trajetória** `#trajetoria` | Timeline + formação (`page.tsx`) | Médio | Cargo, empresa, período e resumo; bullets completos em "ver detalhes"; formação em linha. Contatos saem daqui |
| 7 | **Expertise** `#expertise` | `skills.tsx` | Médio-baixo | Matriz de 4 grupos com ícones das tecnologias, sem nuvem de tags |
| 8 | **Projetos autorais** `#projetos` | `projects.tsx` + `projects-data.ts` | Médio (56% → ~16%) | 3 destaques (Brodowski, Gerador de UC, Plataforma EAD) + grade compacta; vídeo sob demanda; modal de detalhe |
| 9 | **Além do código** `#alem-do-codigo` | `personal-life.tsx` (manifesto + 6 fotos) | Médio-baixo | Faixa editorial com legendas humanas ("Fotografia · perspectiva"); mesmo texto de hoje; reforça a mentoria |
| 10 | **Contato** `#contato` | `footer.tsx` + ★ `contact.tsx` (canais com descrição, "retorno em até 24h") | Máximo | CTA final forte; e-mail, LinkedIn, WhatsApp e agenda online |
| 11 | **Rodapé** | `footer.tsx` | Baixo | Logo, navegação, redes, carimbo técnico, `System.exit(0);` |
| — | **Mibee** (flutuante) | `chat.tsx` | Flutuante | Visual alinhado à marca; sugestões de consultoria e mentoria |

**Composição estimada da nova página (desktop, ~8.200 px):** oferta e prova profissional (credibilidade, atuação, cases, método, trajetória) ~46% · projetos autorais ~16% · demais seções (hero, expertise, além do código, contato, rodapé) ~38%. Hoje, oferta e prova somam 18% e projetos 56%.

**Navegação:** `Atuação · Cases · Trajetória · Projetos · Sobre` + botão `Vamos conversar`. No mobile, menu em folha com os mesmos itens e o CTA fixo.

---

## 8. Microcopy: ajustes para você aprovar

O conteúdo é preservado. Estes são ajustes de rótulo e posicionamento sem os quais o redesign não cumpre o objetivo de vender consultoria.

| Onde | Hoje | Proposta | Motivo |
|---|---|---|---|
| Papel (hero, `<title>`, JSON-LD) | Full Stack Java Developer | Consultoria em arquitetura Java & Cloud · Mentoria técnica | Dizer o que pode ser contratado |
| Títulos de seção | `DATA.resumo`, `SYS.skills`, `LOG.experiência`, `PROJ.exec`, `INIT.contato`, `HUMAN.core()`, `MISSION.log()` | Atuação, Cases, Trajetória, Expertise, Projetos, Além do código, Contato (com rótulo mono discreto `02 / atuação`) | Clareza; o aceno técnico fica no rótulo pequeno |
| Próximo passo | "Se tornar especialista e acelerar roadmaps…" | "Foco: acelerar roadmaps que precisam de microsserviços robustos, frontends modernos e governança CI/CD para escala e observabilidade." | "Se tornar especialista" enfraquece a autoridade de quem vende consultoria |
| CTA final | "INICIAR CONEXÃO? Estou disponível para novos projetos e desafios." | "Vamos conversar sobre o seu desafio?" + "Disponível para novos projetos e desafios." | Linguagem de negócio, mantendo a frase original |
| Botões | "BAIXAR CURRÍCULO" | "Agendar conversa" (principal) + "Baixar currículo" (secundário) | Um próximo passo claro |
| Anos de experiência | "14+" fixo (hero e imagem do perfil) | Calcular a partir de 2010 (hoje daria 16) | Evitar número desatualizado |
| Rótulos das fotos | "📸 FOCUS_PERSPECTIVE", "👶 CORE_LEGACY"… | "Fotografia · perspectiva", "Família · legado"… (descrições iguais) | Tom adulto, sem emoji |
| Mibee | "dev sênior conversando com outro dev ou recrutador tech"; "núcleo cerebral da IA" | "consultor sênior conversando com líderes de tecnologia e com profissionais em busca de mentoria"; erros em linguagem simples | Coerência com o novo posicionamento |
| Sugestões do Mibee | Experiência, Projetos, Tech Stack, Meus Planos, Hobbies, Formação | + "Como funciona a consultoria?" e "Mentoria: para quem é?" | Levar o visitante à conversa comercial |
| `<title>` | "Claudemir Custódio \| Java Full Stack \| Portfolio v2.0" | "Claudemir Custódio · Consultoria em Arquitetura Java, Cloud e Mentoria" | SEO e primeira impressão |
| E-mail | `c.silverio@live.com` (interface) e `admin@mibess.com.br` (JSON-LD) | `contato@mibess.com.br` em todos os lugares | Profissionalismo e consistência (exige criar a caixa) |

---

## 9. Correções técnicas que afetam a percepção profissional

| Problema | Impacto | Correção |
|---|---|---|
| CLS 0,82 (`.scanline` com `bottom` + cursor de digitação) | Página "pula" e reprova no Core Web Vitals | Remover scanline (ou animar `transform`); frase rotativa com largura reservada |
| OG image `/logo.png` inexistente | Links compartilhados sem prévia | `opengraph-image.tsx` 1200×630 com logo, nome, papel e visual-chave |
| Vídeos 4K `.mov` com áudio, autoplay | ~11 MB no celular; `.mov` falha em alguns navegadores | ffmpeg → MP4 (H.264) + WebM, 1280 px, sem áudio, ≤ 2 MB; `preload="none"` + play só visível; corrigir `video-citel.mov` sem `/` |
| ~11 MB de imagens e 4 componentes sem uso | Repositório pesado e código morto, visível a quem abre o GitHub | Remover após resgatar o conteúdo |
| `priority` em imagens abaixo da dobra (`projects-bg.png`) | Disputa banda com o que importa | `priority` só no retrato do hero |
| Build exige `GEMINI_API_KEY` | Previews e CI quebram | Instanciar o cliente dentro do handler |
| Galeria com `div onClick`, modal sem `role="dialog"` nem foco preso, ícones sociais sem `aria-label` | Inacessível por teclado e leitor de tela | Botões reais, diálogo acessível, rótulos |
| Textos de 8–10 px e cinza baixo sobre preto | Ilegível em telas comuns | Mínimo 12 px e tokens com contraste AA |
| Animações infinitas (`animate-pulse`, `animate-ping`) sem movimento reduzido | Distração e acessibilidade | Respeitar `prefers-reduced-motion` |
| `ThemeProvider` com `enableSystem`, mas o site só tem tema escuro improvisado | Comportamento imprevisível | Sistema de tokens único, sem alternância por enquanto |

> O código do site também é vitrine: se o repositório for público, quem avalia consultoria de arquitetura vai olhar. Vale remover código comentado e tipos `any` e manter um README em ordem.

---

## 10. Plano de implementação

| Fase | Entrega | Depende das imagens? |
|---|---|---|
| **1. Fundação** | Tokens de cor e tipografia, Archivo + JetBrains Mono, remoção do neon/scanline, header novo, ritmo de seções, componentes base (Seção, Rótulo, Botão, Card), correções de CLS/OG/build | Não. Pode começar já |
| **2. Conteúdo reorganizado** | Nova ordem; Atuação, Cases, Método e Contato resgatando `contact.tsx`; Trajetória recolhível; Projetos compactos; Além do código editorial | Parcial (usa placeholders) |
| **3. Movimento** | Lenis, revelações, frase rotativa, contadores, cotas, diagramas vivos, timeline desenhada, transições compartilhadas, movimento reduzido | Não |
| **4. Assets e polimento** | Logo final em SVG, favicon, retrato, visuais de Atuação, visual-chave, screenshots reais dos projetos, vídeos otimizados, OG, auditoria WCAG AA | **Sim** |
| **5. Expansão (opcional)** | Versão em inglês (i18n), agenda online, depoimentos, página de Mentoria, banner do LinkedIn e currículo na nova identidade | Parcial |

**Critérios de aceite**
- Lighthouse ≥ 95 em Performance, Acessibilidade, Boas práticas e SEO (mobile).
- LCP < 2,0 s em 4G; CLS < 0,05; primeira carga < 1,5 MB.
- Contraste WCAG AA em todos os textos; navegação completa por teclado.
- Na primeira dobra (1440×900 e 390×844): nome, papel, proposta de valor e CTA visíveis.
- Composição: oferta e prova profissional com cerca de metade da página e projetos autorais abaixo de 20%, sem remover conteúdo.

---

## 11. Decisões

| # | Decisão | Situação |
|---|---|---|
| 1 | Conceito "Arquitetura em Movimento", paleta e tipografia | **Aprovados** |
| 2 | Logo | Rodada 1 (símbolos de traço) descartada. **Rodada 2** com três estilos tipográficos: D Assinatura (recomendada, já aplicada no site como provisória), E Clássico e F Selo técnico. Aguardando escolha |
| 3 | Retrato | **Sessão de fotos** (briefing em `PROMPTS.md`). Até lá, o hero usa uma ficha técnica |
| 4 | E-mail | **contato@mibess.com.br** em todo o site |
| 5 | Agenda online no CTA | Pendente (link do Cal.com ou Calendly) |
| 6 | Versão em inglês | Pendente (fase 5) |
| 7 | Microcopy | Aplicada no branch conforme a seção 8; revisar no site |
| 8 | Fases 1 a 3 antes das imagens | **Feito** |

---

## 12. Implementação (fases 1 a 3) e resultado medido

Medições no build de produção local, em 1440×900 (desktop) e 390×844 (celular), antes e depois.

| Indicador | Antes | Depois |
|---|---|---|
| CLS (estabilidade visual) | 0,82 desktop · 0,83 celular | **0,000 desktop · 0,001 celular** |
| Transferência na 1ª carga | 0,97 MB desktop · 11,06 MB celular | **0,45 MB** nas duas larguras |
| Transferência após rolar a página inteira | 11,5 MB | **0,92 MB** |
| Vídeos dos projetos | 51,7 MB (`.mov` até 4K) | **2,7 MB** (MP4 1280 px, sem áudio, carregados sob demanda) |
| Arquivos em `public/` | ~70 MB | **7,5 MB** |
| Projetos autorais na altura da página | 56% | **14%** |
| Oferta e prova profissional na altura da página | 18% | **50%** |
| Altura total | 10.629 px desktop · 14.663 px celular | 10.655 px desktop · 16.608 px celular |
| Imagem de compartilhamento | quebrada | gerada em código (1200×630) |
| Build sem `GEMINI_API_KEY` | falhava | passa; o chat responde 503 com mensagem clara |

A altura total não diminuiu: o conteúdo que estava escondido (atuação, método, cases com diagramas) passou a aparecer, e os detalhes longos da trajetória ficaram recolhíveis. A meta que importa, a composição, foi atingida.

**O que entrou**
- Sistema visual: tokens de cor e tipo em `app/globals.css`, Archivo + JetBrains Mono, faixas escuras e claras, chamadas de corte numeradas, carimbo técnico no rodapé.
- Nova ordem: Hero, Credibilidade, Atuação, Cases, Método, Trajetória, Expertise, Projetos, Além do código, Contato. Todo o texto vem dos componentes antigos e do `ABOUTME.md`, centralizado em `lib/content.ts`.
- Movimento: entrada do hero em CSS (não espera o JavaScript), frase rotativa com largura reservada, canvas com grid de planta e pulsos, contadores, cota de experiência calculada a partir de 2010, quatro diagramas vivos, linhas do método e da trajetória ligadas ao scroll, modal de projeto e visualizador de fotos com transição compartilhada, scroll suave com Lenis, botão magnético e luz que segue o cursor. Tudo respeita `prefers-reduced-motion`.
- Acessibilidade: diálogos com foco preso, Esc e retorno de foco; botões reais; rótulos em ícones; texto mínimo de 12 px; contraste AA; link para pular ao conteúdo.
- Mibee: visual novo, sugestões de consultoria e mentoria, persona de consultor e os textos de atuação e método no contexto da IA.
- Limpeza: componentes, imagens e dependências sem uso removidos (`next-themes`, `@radix-ui/react-slot`, `class-variance-authority`, `tw-animate-css`).

**Verificado com testes automatizados no navegador:** modal de projeto (abre, mostra o projeto certo, trava a rolagem, foco entra e volta, Esc fecha), visualizador de fotos (setas e Esc), "ver detalhes" da trajetória, menu móvel (abre, fecha e rola até a seção), chat (abre e mostra erro claro sem a chave) e movimento reduzido (todo o conteúdo visível, scroll suave desligado).

**Fica para a fase 4:** logo final em SVG após a escolha, fotos da sessão (`RETRATO` em `lib/content.ts`), screenshots reais nas capas dos projetos e, se desejado, a série de imagens de Atuação no lugar das ilustrações em linha.
