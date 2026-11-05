# mibess.com.br · Claudemir Custódio

Site de consultoria em arquitetura Java & Cloud e mentoria técnica de Claudemir Custódio.
A direção visual ("Arquitetura em Movimento") e o plano de redesign estão em [`docs/redesign`](../docs/redesign).

## Tecnologias

- **[Next.js 16](https://nextjs.org/)** (App Router) e **React 19**
- **[Tailwind CSS v4](https://tailwindcss.com/)** com tokens próprios em `app/globals.css`
- **[Motion](https://motion.dev/)** para revelações, transições compartilhadas e elementos ligados ao scroll
- **[Lenis](https://lenis.darkroom.engineering/)** para o scroll suave (desligado com movimento reduzido)
- **Archivo** e **JetBrains Mono** via `next/font`
- **[Google Gemini](https://ai.google.dev/)** no assistente Mibee (`app/api/chat`)
- **Lucide** e **Simple Icons** para ícones

## Estrutura

```
app/
  page.tsx                 ordem das seções
  layout.tsx               fontes, metadados e JSON-LD
  opengraph-image.tsx      imagem de compartilhamento gerada em código
  icon.tsx, apple-icon.tsx ícones gerados em código
  api/chat/route.ts        assistente Mibee (Gemini)
  components/
    sections/              hero, credibilidade, atuação, cases, método, trajetória,
                           expertise, projetos, além do código, contato
    motion/                revelação, frase rotativa, contador, cota, diagramas vivos,
                           canvas do hero, botão magnético, spotlight
    ui/                    diálogo acessível e cabeçalho de seção
lib/
  content.ts               todos os textos do site
  projects-data.ts         projetos autorais
  personal-data.ts         fotos de "Além do código"
assets/fonts/              fontes estáticas (OFL) usadas nas imagens geradas
public/videos/             vídeos dos projetos (MP4, 1280 px, sem áudio)
```

Para trocar textos, edite `lib/content.ts`. Quando a foto da sessão chegar, preencha `RETRATO` no mesmo arquivo.

## Como executar localmente

Requer [Node.js](https://nodejs.org/) 20 ou superior.

```bash
cd frontend
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

O assistente Mibee precisa da variável `GEMINI_API_KEY` (em `.env.local` ou no provedor de hospedagem). Sem ela, o site e o build funcionam normalmente e o chat responde que está indisponível.

## Contato

- **E-mail:** [contato@mibess.com.br](mailto:contato@mibess.com.br)
- **WhatsApp:** [(16) 99720-0212](https://wa.me/5516997200212)
- **LinkedIn:** [linkedin.com/in/claudemircustodio](https://www.linkedin.com/in/claudemircustodio)
- **Localização:** Ribeirão Preto · SP
