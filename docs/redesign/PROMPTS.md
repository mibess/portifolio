# Prompts de imagem e logo: mibess

> Gere estas imagens **antes** da implementação. A direção visual está em [`PROPOSTA.md`](./PROPOSTA.md) (conceito "Arquitetura em Movimento").

## Como usar

- **Os prompts estão em inglês** porque os geradores respondem melhor assim. A explicação de cada um está em português.
- **Ferramenta por tipo de imagem:**
  - Logo: **Recraft** (exporta SVG) ou **Ideogram** / **ChatGPT** (melhores com texto).
  - Retrato a partir das suas fotos: **Gemini** ou **ChatGPT** (edição com imagem de referência; preservam bem o rosto). No Midjourney, use Omni Reference.
  - Visuais abstratos e 3D: **Midjourney**, **ChatGPT** ou **Gemini**.
  - Vídeo em loop (opcional): **Runway**, **Kling**, **Veo** ou **Sora** (imagem → vídeo).
- **Cores:** os códigos hex ajudam no ChatGPT, Gemini, Ideogram e Recraft. No Midjourney, troque pelos nomes: *deep ink navy*, *cool off-white*, *muted blueprint blue*, *honey amber*.
- **Gere 4 ou mais variações** de cada item e escolha 1 ou 2 pelos critérios indicados.
- **Entrega:** coloque os escolhidos em `frontend/public/images/originais/` (commit neste branch) ou anexe na conversa, com os nomes da tabela do fim. Eu converto para AVIF/WebP, gero os tamanhos responsivos e tiro os originais pesados do bundle.

---

## 1. Logo (rodada 2)

A rodada 1 (símbolos de traço: "Favo", "Ponte" e "Degrau") foi descartada. A rodada 2 segue o caminho de Netflix, Google e Accenture: **o nome escrito é a marca**. As três direções são tipográficas, então eu produzo a versão final direto em SVG a partir das fontes; gerar imagens com IA é **opcional**, só para explorar variações.

### D · Assinatura (recomendada, aplicada no site como provisória)
"mibess" em Archivo expandida, a mesma família do site. O pingo do "i" vira um quadrado cor de mel: o pixel da logo antiga, refinado, e o ponto de foco do Mibee. O "m" com o quadrado vira favicon e avatar.
```text
Wordmark logo for "mibess", a software architecture consulting and technical mentoring brand.
The word "mibess" in lowercase, exact spelling m-i-b-e-s-s, set in a bold extended grotesk sans-serif (similar to Archivo Expanded Bold), tight but even letter-spacing, confident and modern like the wordmarks of global tech companies.
Signature detail: the dot of the letter "i" is a small solid square in honey amber (#F4A93C), exactly as wide as the letter stems; every other letter is deep ink navy (#0C1A29).
No symbol, no tagline, no outline, no gradient, no shadow, no 3D. Flat vector on a plain cool off-white background (#F3F5F7), centered, generous whitespace.
```
Variação em caixa alta:
```text
Wordmark logo: the word "MIBESS" in uppercase, exact spelling M-I-B-E-S-S, set in an extended grotesk sans-serif, semibold, with wide letter-spacing (about 14% of the type size), followed by a small solid honey-amber (#F4A93C) square used as a period. Letters in deep ink navy (#0C1A29) on a plain cool off-white background (#F3F5F7). Flat vector, no symbol, no tagline, no gradient, no shadow.
```
Ícone:
```text
App icon: a bold lowercase "m" from an extended grotesk sans-serif in off-white (#F3F5F7), centered in a square with 18% rounded corners filled with deep ink navy (#07111C), with a small solid honey-amber (#F4A93C) square at the upper right of the "m", like the dot of an "i". Flat vector, legible at 16x16 px, no gradients, no text.
```

### E · Clássico
O mesmo nome numa serifa de alto contraste, com o pingo redondo em mel. Tom de consultoria boutique; seria a única serifa do site.
```text
Wordmark logo for "mibess", a premium consulting and mentoring brand.
The word "mibess" in lowercase, exact spelling m-i-b-e-s-s, set in an elegant high-contrast serif typeface (similar to Fraunces or Libre Caslon Display), refined spacing, timeless and sophisticated like a boutique advisory firm.
Signature detail: the dot of the letter "i" is a small solid circle in honey amber (#F4A93C); all other letters in deep ink navy (#0C1A29).
No symbol, no tagline, no ornaments, no gradient, no shadow. Flat vector on a plain cool off-white background (#F3F5F7), centered, generous whitespace.
```

### F · Selo técnico
Carimbo circular, como o de aprovação em pranchas de engenharia, com "desde 2010". Melhor como peça complementar (propostas, certificados, LinkedIn) do que como logo do topo do site.
```text
Circular technical seal for "mibess", inspired by engineering approval stamps on architectural drawings.
An outer thin circle and an inner hairline circle; between them, the text "MIBESS · ARQUITETURA DE SOFTWARE · MENTORIA ·" set around the ring in a clean monospaced typeface with wide letter-spacing. In the center, a bold lowercase "m" in an extended grotesk sans-serif with a small solid honey-amber (#F4A93C) square at its upper right, and below it the small text "DESDE 2010".
Deep ink navy (#0C1A29) on a plain cool off-white background (#F3F5F7). Flat vector, precise, no texture, no distressed effect, no gradients.
```

### Como escolher
- [ ] O nome é lido de primeira, inclusive pequeno no topo do site.
- [ ] Funciona em uma cor só, no claro e no escuro.
- [ ] O ícone continua legível a 16 px.
- [ ] Combina com a tipografia do site (D) ou cria um contraste intencional (E).
- [ ] Você se imagina assinando uma proposta para uma big tech com ela.

**Depois da escolha** eu entrego: logo horizontal clara e escura em SVG, variação em caixa alta, ícone, favicon (ICO, PNG e SVG), `apple-touch-icon`, a imagem de compartilhamento e, se quiser, o selo F.

---

## 2. Retrato profissional

O retrato é a imagem mais importante do site: em consultoria individual, as pessoas contratam **alguém**. O retrato antigo (medalhão neon com texto embutido) já saiu do site.

**Decidido: sessão de fotos.** Use o briefing em 2.4. Até as fotos chegarem, o hero mostra uma ficha técnica no lugar do retrato; para ativar a foto, preencha `RETRATO` em `frontend/lib/content.ts`. Os prompts de edição com IA abaixo ficam só como referência e não são necessários.

**Alternativa descartada:** edição com IA a partir das suas fotos (2.1 a 2.3). **Alternativa:** edição com IA a partir de 3 a 5 fotos reais e recentes suas (de frente e de 3/4, com boa luz, sem óculos escuros). Nos prompts abaixo, a IA é instruída a **não alterar seu rosto**. Se o resultado não se parecer exatamente com você, descarte: um retrato "maquiado" por IA destrói a confiança quando a pessoa te encontra numa call.

### 2.1 Retrato do hero (fundo escuro)
```text
Use the person in the attached photos as the only subject. Keep his identity exactly: same face, eyes, nose, skin tone, hairline, hairstyle and beard as in the reference photos. Do not beautify, slim, smooth the skin, change age or change ethnicity.

Professional portrait for the website of a senior software architecture consultant and mentor.
Half-body framing, slight three-quarter angle, relaxed confident posture, hands loosely together at waist level, gentle genuine smile, direct eye contact.
Wardrobe: well-fitted unstructured navy blazer over a plain charcoal crew-neck t-shirt; no logos, no tie, no accessories.
Background: seamless deep ink-navy studio backdrop (#0C1A29) with a soft gradient, slightly lighter behind the head.
Lighting: large soft key light from the left at 45 degrees, gentle fill from the right, subtle warm honey-toned rim light on the shoulder and hair separating him from the dark background.
Photorealistic, natural skin texture, 85 mm lens, f/2.8, sharp focus on the eyes, editorial style like the leadership page of a top consulting firm.
Vertical 4:5 composition, head in the upper third, empty space above the head.
No text, no watermark, no frame, no props.
```

### 2.2 Retrato claro (contato, LinkedIn, propostas)
Use o mesmo prompt de 2.1, trocando duas linhas:
```text
Background: seamless cool light-gray studio backdrop (#E6EBF0) with a soft gradient and a subtle vignette.
Pose: arms lightly crossed, relaxed shoulders, warm smile, direct eye contact.
```

### 2.3 Mentoria em ação
```text
Use the person in the attached photos as the main subject and keep his identity exactly (same face, skin tone, hairstyle and beard; do not beautify or alter).

Candid documentary-style photo of him mentoring a small team in a modern, bright meeting room. He stands beside a large whiteboard with a marker in hand, explaining a simple software architecture diagram drawn as boxes and arrows (no readable words), turned slightly toward two colleagues seated at a table in the foreground, softly out of focus and seen from behind or in profile.
Wardrobe: navy unstructured blazer over a charcoal t-shirt.
Soft natural window light from the left, realistic office details, muted palette of navy, gray, light wood and a touch of honey amber.
Photorealistic, 35 mm lens, f/2.0, shallow depth of field, engaged expression mid-explanation, not posed.
Horizontal 3:2 composition, subject on the right third, calm space on the left.
No logos, no readable text, no watermark.
```

### 2.4 Briefing para fotógrafo (decidido)
- **Objetivo:** retratos para site de consultoria e mentoria, LinkedIn e propostas comerciais.
- **Figurino:** blazer azul-marinho ou grafite sem estrutura sobre camiseta lisa escura, ou camisa clara sem gravata. Levar duas opções, sem logos.
- **Fundos:** (1) contínuo escuro azulado ou grafite; (2) contínuo cinza-claro frio; (3) escritório ou coworking com quadro branco.
- **Luz:** suave, principal a 45°, recorte quente sutil no ombro e no cabelo.
- **Lista de fotos:** meio corpo 4:5 olhando para a câmera · headshot do peito para cima (LinkedIn) · 3/4 com braços levemente cruzados · horizontal 16:9 com espaço vazio à esquerda para texto · em ação no quadro branco explicando um diagrama · conversa com 1 ou 2 pessoas (mentoria) · detalhe das mãos desenhando um diagrama.
- **Entrega:** JPEG em alta resolução (3000 px ou mais no lado maior), cor natural, sem filtros.

---

## 3. Visual-chave "Arquitetura em Movimento"

Uso: fundo do CTA final, fundo da imagem de compartilhamento (Open Graph) e imagem de reserva do hero (dispositivos fracos ou movimento reduzido). No hero, a animação principal será feita em código (canvas), mais leve e nítida que vídeo.

### 3.1 Desktop (16:9)
```text
Abstract key visual for a premium software architecture consultancy, theme "architecture in motion".
Deep ink-navy background (#07111C). On the right side, a precise blueprint-style construction: a faint hairline grid, a few isometric hexagonal cells and small technical dimension marks, drawn in thin muted blueprint-blue lines (#7FA6CC). From this rigid structure, dozens of ultra-thin luminous lines peel away and flow toward the left as smooth parallel ribbons, like long-exposure light trails, gradually fading into darkness. A few tiny honey-amber (#F4A93C) light pulses travel along the ribbons like data packets.
Calm, elegant, cinematic, subtle volumetric haze, very fine film grain, restrained glow.
Keep the left 45% of the frame dark and almost empty for headline text.
No text, no numbers, no logos, no people, no UI, no neon, no purple, no cyberpunk city.
Aspect ratio 16:9.
```
Midjourney: acrescente `--ar 16:9 --style raw --stylize 100`.

### 3.2 Mobile (9:16)
```text
Abstract key visual for a premium software architecture consultancy, theme "architecture in motion", vertical 9:16.
Deep ink-navy background (#07111C). In the lower third, a precise blueprint-style construction: a faint hairline grid, a few isometric hexagonal cells and small technical dimension marks in thin muted blueprint-blue lines (#7FA6CC). From it, ultra-thin luminous lines flow upward as smooth parallel ribbons, like long-exposure light trails, fading into darkness, with a few tiny honey-amber (#F4A93C) pulses traveling along them.
Calm, elegant, cinematic, subtle haze, fine film grain, restrained glow.
Keep the top 50% of the frame dark and almost empty for text.
No text, no numbers, no logos, no people, no UI, no neon, no purple.
```

### 3.3 Loop de vídeo (opcional, imagem → vídeo)
```text
Animate this image as a seamless 8-second loop. The luminous lines flow slowly and continuously from right to left, the small amber light pulses travel along them, and the blueprint grid and hexagonal cells stay perfectly still. Very slow, calm, hypnotic motion. No camera movement, no zoom, no flicker, no new objects, no text. The first and last frames must match for a perfect loop.
```
Exporte em 1920×1080 MP4. Eu recomprimo para ≤ 3 MB.

---

## 4. Série "Atuação" (3 visuais)

Cada imagem representa uma frente de atuação que **já está escrita** no seu `contact.tsx`. As três precisam parecer uma série: mesmos materiais, luz e enquadramento.

**Âncora de estilo (cole ao fim de cada um dos 3 prompts):**
```text
Series style: premium 3D render; abstract sculptural objects made of frosted glass and dark brushed graphite resting on a faint blueprint grid with thin technical dimension lines; deep ink-navy studio environment (#0C1A29); soft top light, one warm honey-amber (#F4A93C) accent light and a cool blueprint-blue (#7FA6CC) rim light; shallow depth of field; calm, precise, minimal, generous negative space, centered composition; no text, no numbers, no logos, no people. Aspect ratio 4:3.
```
**Consistência:** no Midjourney, gere o 4.1 primeiro e use-o como `--sref` nos outros dois, mantendo o mesmo `--seed`. No ChatGPT ou Gemini, gere os três na mesma conversa e peça "same style, lighting and materials as the previous image".

### 4.1 Arquitetura & performance
*"Consultoria técnica focada em arquitetura e performance."*
```text
A precise modular structure of interlocking hexagonal frosted-glass cells assembling into a stable, perfectly balanced honeycomb tower; one cell at the core glows softly in honey amber like the heart of the system; tiny dimension lines measure the structure.
```

### 4.2 Transformação digital & squads ágeis
*"Projetos de transformação digital e squads ágeis."* A metáfora é a migração de monolito para serviços, que você já fez.
```text
A single heavy graphite monolith block, captured mid-transformation as it gracefully separates into smaller, evenly spaced frosted-glass modules that float apart into an orderly grid, connected by ultra-thin luminous blueprint-blue lines carrying tiny amber pulses: a monolith becoming microservices.
```

### 4.3 Mentoria & liderança técnica
*"Mentorias e apoio para times que precisam de liderança técnica."*
```text
A sequence of frosted-glass steps rising gently from left to right; a thin line of warm honey-amber light starts at a small glowing sphere on the first step and traces a guiding path up to the top step, where a larger translucent form waits: growth guided step by step.
```

**Como escolher:** objetos centrados com espaço para respirar; nada que pareça "bolha genérica"; o mel aparece como ponto de luz, não como cor dominante; nenhum texto ou número inventado na imagem.

---

## 5. O que não precisa de IA

| Item | Como será feito |
|---|---|
| Capas dos projetos | Screenshots reais das demos (eu capturo com navegador automatizado) com moldura de navegador padronizada. Os mockups atuais mostram telas que não existem nas aplicações |
| Vídeos dos projetos | Os seus vídeos atuais, recomprimidos (MP4/WebM, 1280 px, sem áudio) |
| Imagem de compartilhamento (1200×630), favicon, `apple-touch-icon` | Gerados em código a partir da logo final |
| Banner do LinkedIn (1584×396) | Gerado a partir do visual-chave + logo (fase 5) |
| Fundos, grid de planta, gradientes, diagramas dos cases | CSS, SVG e canvas, animados |
| Fotos pessoais (Além do código) | As 6 atuais ficam e recebem gradação de cor unificada |

---

## 6. Checklist de entrega

| Arquivo | Onde entra | Proporção · tamanho mínimo | Prioridade |
|---|---|---|---|
| Logo | Rodada 2 é tipográfica: eu produzo a partir da sua escolha (D, E ou F) | — | Opcional gerar |
| Fotos da sessão: `retrato-hero-escuro.jpg`, `retrato-claro.jpg`, `retrato-mentoria.jpg` | Hero, Contato, LinkedIn, Atuação | 4:5 · 1600×2000 e 3:2 · 2400×1600 | Alta |
| `visual-chave-desktop.jpg` | CTA final, Open Graph, reserva do hero | 16:9 · 2560×1440 | Alta |
| `visual-chave-mobile.jpg` | Idem, mobile | 9:16 · 1080×1920 | Média |
| `atuacao-arquitetura.jpg` | Atuação 1 (hoje: ilustração em linha feita em código) | 4:3 · 1600×1200 | Média |
| `atuacao-transformacao.jpg` | Atuação 2 (hoje: ilustração em linha feita em código) | 4:3 · 1600×1200 | Média |
| `atuacao-mentoria.jpg` | Atuação 3 (hoje: ilustração em linha feita em código) | 4:3 · 1600×1200 | Média |
| `visual-chave-loop.mp4` (opcional) | Fundo do hero | 16:9 · 1920×1080 · 8 s | Baixa |
