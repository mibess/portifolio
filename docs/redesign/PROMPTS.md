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

## 1. Logo

**Diagnóstico da logo atual.** Um "m" em blocos pesados com estética pixel e o wordmark `mibess_` com cursor de terminal. Comunica "hacker/gamer", tem leitura fraca (lê-se "MIBESS") e não carrega significado sobre consultoria ou mentoria.

**O que a nova logo precisa:** simples, geométrica, atemporal; funcionar em uma cor, em 16 px (favicon) e grande em propostas; manter o "m" como símbolo (continuidade) e carregar uma ideia.

### Conceito A: "Favo" (recomendado)

Um "m" construído a partir de **duas células hexagonais lado a lado que dividem a mesma parede**.
- **Hexágono:** arquitetura hexagonal (*ports & adapters*), padrão que você domina junto com DDD e Clean Architecture.
- **Favo:** o Mibee (abelha), colaboração e a estrutura mais eficiente da natureza, máxima resistência com o mínimo de material.
- **Parede compartilhada:** consultoria e mentoria como construção conjunta.
- **Cortes inferiores:** as hastes externas terminam com um pequeno corte para dentro, o início da aresta inferior do hexágono. Isso faz o desenho ler como favo e evita que pareça dois telhados de casa (risco de "imobiliária" que apareceu no esboço). Os cortes também lembram as "portas" (*ports*) da arquitetura hexagonal.
- **Pingo do "i" em mel:** um hexágono sólido âmbar no wordmark liga símbolo e nome.

**A.1 Símbolo**
```text
Minimal geometric logo symbol for "mibess", a software architecture consulting and technical mentoring brand.
A lowercase letter "m" built from two adjacent pointy-top hexagons (honeycomb cells) that share one central vertical wall: three parallel vertical stems joined at the top by shoulders rising at 30 degrees to two 120-degree peaks. The two outer stems end at the bottom with a short inward cut at 30 degrees, the beginning of each hexagon's lower edge, so the shapes read as open honeycomb cells, never as house roofs.
Single uniform monoline stroke, crisp mitered corners, flat stroke ends, precise construction on an isometric hexagonal grid, perfectly symmetrical.
Deep ink navy (#0C1A29) on a plain cool off-white background (#F3F5F7).
Flat vector logo, no gradients, no shadows, no 3D, no texture, no text, centered with generous negative space.
Swiss modernist, timeless, corporate, premium. Must remain legible at 16 px.
Avoid: house or roof shapes, real-estate look, crypto or blockchain look, 3D cubes, bees or cartoon elements, glow, uppercase M.
```

**A.2 Logo horizontal (símbolo + nome)**
```text
Horizontal logo lockup for the brand "mibess" (software architecture consulting and technical mentoring).
Left: the symbol, a monoline lowercase "m" built from two adjacent pointy-top hexagons sharing a central wall, with short inward 30-degree cuts at the bottom of the outer stems (open honeycomb cells).
Right: the wordmark "mibess" in lowercase, exact spelling m-i-b-e-s-s, set in a clean grotesk sans-serif with slightly extended width and medium weight (similar to Archivo SemiExpanded Medium), natural letter-spacing.
The dot of the letter "i" is a small solid hexagon in honey amber (#F4A93C); everything else is deep ink navy (#0C1A29).
The symbol is as tall as the wordmark's ascender height and sits on the same baseline, with clear space between them.
Flat vector, plain cool off-white background (#F3F5F7), no gradients, no shadows, no tagline, lots of whitespace.
```
Variações (acrescente ao fim do prompt):
- Com descritor: `Add below the wordmark, left-aligned with it, a small tracked uppercase descriptor in slate gray (#556274): CONSULTORIA · MENTORIA`
- Versão escura: `Same lockup in off-white (#F3F5F7) on deep ink navy (#07111C); the dot of the "i" stays honey amber.`

**A.3 Ícone (favicon, avatar, app)**
```text
App icon for the brand "mibess": the monoline honeycomb lowercase "m" (two adjacent pointy-top hexagons sharing a central wall, short inward cuts at the bottom of the outer stems) in off-white (#F3F5F7), centered in a square with 18% rounded corners filled with deep ink navy (#07111C). A tiny solid honey-amber (#F4A93C) hexagon floats above the central stem. Stroke heavy enough to read at 16x16 px. Flat vector, no gradients, no text, no shadow.
```

### Conceito B: "Ponte"

O "m" minúsculo tem dois arcos, como os vãos de uma ponte. Consultoria e mentoria são pontes entre onde a empresa ou a pessoa está e onde quer chegar, e entre negócio e tecnologia.
**Atenção:** nunca usar amarelo/âmbar neste conceito. Dois arcos amarelos remetem ao McDonald's.
```text
Minimal logo symbol for "mibess", a consulting and technical mentoring brand.
A lowercase "m" drawn as one continuous monoline that forms two shallow structural arches, like the spans of a modern bridge: the line starts at the bottom left as a vertical pier, rises into two equal arches with a shared central pier, and finishes on the right with a short horizontal deck line that extends beyond the letter, suggesting a bridge between two sides.
Engineering-drawing precision, thin uniform stroke, deep ink navy (#0C1A29) on plain cool off-white (#F3F5F7).
Flat vector, no fill, no gradients, no shadows, no text, centered, generous whitespace, legible at 16 px.
Avoid: rounded golden arches, yellow or red colors, anything resembling fast-food branding, cursive script.
```

### Conceito C: "Degrau" (evolução da logo atual)

Mantém a silhueta sólida do "m" atual e o detalhe da haste central que desce abaixo da linha de base, agora refinado como um **degrau**, o "próximo passo" (que já é um tema do seu site). É a opção de maior continuidade.
```text
Refined geometric monogram for "mibess": a bold, solid lowercase "m" with three stems and square architectural proportions; the middle stem extends slightly below the baseline, forming a small step. A precise, premium evolution of a blocky pixel-style "m".
Clean rectangular counters, identical stem widths, subtle 45-degree chamfers on the two outer top corners only.
Deep ink navy (#0C1A29) on plain cool off-white (#F3F5F7).
Flat vector, no gradients, no shadows, no text, centered, generous whitespace, legible at 16 px.
Avoid: pixel-art look, 3D, glow, underscore or cursor symbols, gaming style.
```

### Como escolher a logo

- [ ] Lê como "m" a 16 px (favicon) e a 32 px.
- [ ] Funciona em uma cor só (tinta no claro e branco no escuro).
- [ ] Não lembra marcas conhecidas (McDonald's, Gmail, Medium, Motorola) nem estética de imobiliária ou cripto.
- [ ] A geometria é simples o bastante para ser redesenhada em SVG com poucos pontos.
- [ ] O símbolo sozinho funciona como avatar do LinkedIn e do WhatsApp.
- [ ] Ignore erros de letra no wordmark: o texto final será recomposto de qualquer forma.

**Produção final.** A logo do site não será o PNG gerado. Você escolhe o conceito e a variação; eu redesenho em SVG com geometria exata (grid hexagonal), componho o wordmark em Archivo convertido em curvas e entrego: logo horizontal (clara e escura), símbolo, favicon (ICO/PNG/SVG), `apple-touch-icon` e a imagem de compartilhamento (Open Graph).

---

## 2. Retrato profissional

O retrato é a imagem mais importante do site: em consultoria individual, as pessoas contratam **alguém**. O retrato atual (medalhão neon com texto embutido) precisa ser substituído.

**Recomendado:** sessão com fotógrafo (briefing em 2.4). **Alternativa:** edição com IA a partir de 3 a 5 fotos reais e recentes suas (de frente e de 3/4, com boa luz, sem óculos escuros). Nos prompts abaixo, a IA é instruída a **não alterar seu rosto**. Se o resultado não se parecer exatamente com você, descarte: um retrato "maquiado" por IA destrói a confiança quando a pessoa te encontra numa call.

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

### 2.4 Briefing para fotógrafo (alternativa recomendada)
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
| `logo-a-simbolo.png` · `logo-a-horizontal.png` · `logo-a-icone.png` | Escolha do conceito A | 1:1 (horizontal ~3:1) · 2048 px | Alta |
| `logo-b-simbolo.png` · `logo-c-simbolo.png` | Comparação entre conceitos | 1:1 · 2048 px | Média |
| `retrato-hero-escuro.jpg` | Hero | 4:5 · 1600×2000 | Alta |
| `retrato-claro.jpg` | Contato, LinkedIn | 4:5 · 1600×2000 | Alta |
| `retrato-mentoria.jpg` | Atuação / Método | 3:2 · 2400×1600 | Média |
| `visual-chave-desktop.jpg` | CTA final, Open Graph, reserva do hero | 16:9 · 2560×1440 | Alta |
| `visual-chave-mobile.jpg` | Idem, mobile | 9:16 · 1080×1920 | Média |
| `atuacao-arquitetura.jpg` | Atuação 1 | 4:3 · 1600×1200 | Alta |
| `atuacao-transformacao.jpg` | Atuação 2 | 4:3 · 1600×1200 | Alta |
| `atuacao-mentoria.jpg` | Atuação 3 | 4:3 · 1600×1200 | Alta |
| `visual-chave-loop.mp4` (opcional) | Fundo do hero | 16:9 · 1920×1080 · 8 s | Baixa |
