# O que ainda falta

> Atualizado em 05/11/2026, depois da rodada de robustez: perguntas frequentes, política de privacidade, 404 e telas de erro, cabeçalhos de segurança, chat com limites, capas reais de projetos, desempenho no celular e bateria de verificação.
>
> A análise completa, com cada pergunta e o que depende do Claudemir, está num documento privado no claude.ai (Objeções de empresas grandes · respostas e pendências). Este repositório é público.

## Com o Claudemir (conteúdo e decisões)

| # | Item | Prioridade |
|---|---|---|
| 1 | Dados da empresa para o rodapé e para os dados estruturados (razão social e CNPJ), ou o modelo de faturamento | Alta |
| 2 | Disponibilidade para consultoria (horas por semana, início) | Alta |
| 3 | Plano e limite de gasto da API do Gemini | Alta |
| 4 | Conferir no ar: demos, WhatsApp, e-mail, chat e prévia do link no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/); alinhar o LinkedIn ao site | Alta |
| 5 | Onde guardar o planejamento interno (`docs/redesign`) | Alta |
| 6 | Números de resultado por case | Média |
| 7 | Depoimentos (2 a 4, com nome, cargo, empresa e autorização) | Média |
| 8 | Formatos de trabalho, duração típica e modelo de cobrança | Média |
| 9 | Frases sobre NDA, LGPD e continuidade para as perguntas frequentes | Média |
| 10 | Prints reais da Plataforma EAD, do Sistema de Login e do Gerenciador de Senhas | Média |
| 11 | Google Search Console e Bing Webmaster Tools com o sitemap | Média |
| 12 | Certificação ou conteúdo técnico autoral (opcional) | Baixa |
| 13 | Regra de limite de requisições para `/api/chat` no firewall da Vercel (opcional) | Baixa |
| 14 | Descrição do repositório `agencia-citel` ("Canditados") e publicação do repositório de senhas, se for mostrar o código | Baixa |
| 15 | Versão em inglês do site | Baixa |
| 16 | Agenda online (Cal.com ou Calendly): adiada; hoje o agendamento é pelo WhatsApp e pelo e-mail | Baixa |

## Comigo (implementação)

| # | Item | Depende do Claudemir? |
|---|---|---|
| 1 | **Banner do LinkedIn** (1584×396) e avatar com a logo nova | Não |
| 2 | Capas reais dos 3 projetos restantes | Sim (item 10 acima) |
| 3 | Seção de **depoimentos** | Sim (item 7 acima) |
| 4 | Bloco de **formatos de trabalho** e frases de NDA e continuidade nas perguntas frequentes | Sim (itens 8 e 9 acima) |
| 5 | Dados da empresa no rodapé e no JSON-LD | Sim (item 1 acima) |
| 6 | **Versão em inglês** do site (i18n) | Sim (item 15 acima) |
| 7 | Vídeo em loop **16:9 para o desktop** | Opcional |

## Já resolvido

### Rodada de robustez (05/11/2026)

- **Perguntas frequentes** antes do contato, só com fatos já publicados: como começa um trabalho, custo, contextos, atendimento remoto e em inglês, tempo de resposta e o que acontece com as perguntas do chat.
- **"Meu papel"** em cada case e o resultado da migração para a AWS.
- **Capas reais** (quadros dos vídeos das demos) no Gerador de UC, no Banco de Sangue e no Criador de Cards.
- **Link quebrado** removido (repositório de senhas não é público) e descrição do Banco de Sangue como desafio técnico.
- **Base do chat** alinhada ao site e ao currículo (anos, cargos, momento atual).
- **E-mail com assunto pronto** no hero, ao lado do WhatsApp; **currículo em inglês** linkado no contato, no rodapé e nas perguntas.
- **Política de privacidade** (`/privacidade`), **404** em português e telas de erro com saída para contato.
- **Segurança**: Content-Security-Policy, HSTS, proteção contra frames, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `security.txt` e `robots.txt` bloqueando `/api/`; rota `/api/aboutme` removida.
- **Chat**: aviso de IA e privacidade, regras contra invenção e compromissos em nome do Claudemir, validação de entrada e limite de requisições.
- **Desempenho no celular** (Lighthouse) de 55 para 82 a 86; desktop 100 nas quatro categorias.
- **Resiliência**: conteúdo visível sem JavaScript, com os scripts bloqueados e em navegadores antigos.
- **Acessibilidade**: nenhuma violação no axe-core (WCAG 2.2 AA).
- **Bateria de verificação** em [`docs/verificacao`](../verificacao).
- **Currículos**: descrição da Plataforma EAD corrigida nas duas versões.

### Rodadas anteriores

- Logo **D · Assinatura** aplicada em SVG (texto em curvas) e arquivos para download em `/brand/`.
- **Retrato de estúdio** no hero, esmaecendo no fundo da cena.
- **Visual-chave** no hero (imagem no desktop, vídeo em loop no celular) e na imagem de compartilhamento.
- **Série Atuação** nos cards.
- **Agendamento pelo WhatsApp** (16) 99375-4887, com mensagem pronta.
- E-mail **contato@mibess.com.br**.
- **Currículo em PDF** sem foto, em português (`/Claudemir_Custodio_CV.pdf`) e em inglês (`/Claudemir_Custodio_CV_EN.pdf`). Fonte em `docs/curriculo`.
