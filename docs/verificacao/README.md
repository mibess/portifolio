# Verificação do site

Scripts para conferir o site antes de publicar. Rodam contra o build de produção local.

| Script | O que confere |
|---|---|
| `verificar.js` | 62 checagens: modal de projetos, perguntas frequentes, menu no celular, chat (aviso de IA, limite de caracteres, erro sem chave), links e âncoras, imagens, cookies, conteúdo visível sem JavaScript e com os scripts do Next bloqueados, movimento reduzido, privacidade, 404, `security.txt`, `robots.txt`, `sitemap.xml`, JSON-LD e a API do chat (origem, formato, tamanho e limite de requisições) |
| `axe.js` | Acessibilidade com axe-core (WCAG 2.2 AA e boas práticas) na home, na privacidade e no 404, no desktop e no celular |

## Como rodar

Em um terminal, suba o site sem a `GEMINI_API_KEY` (os testes do chat esperam o erro 503 e gastariam cota com a chave):

```bash
cd frontend
npm run build
npm run start
```

Em outro terminal:

```bash
cd docs/verificacao
npm install
npx playwright install chromium
```

```bash
node verificar.js http://localhost:3000
```

```bash
node axe.js http://localhost:3000
```

Desempenho, no perfil celular e no desktop:

```bash
npx lighthouse http://localhost:3000 --view
```

```bash
npx lighthouse http://localhost:3000 --preset=desktop --view
```

Os testes da API do chat que fazem várias chamadas só rodam quando o endereço é `localhost`. Contra o site no ar, `verificar.js` faz só as checagens de navegação.

## Resultado em 05/11/2026

- `verificar.js`: todas as checagens passando.
- `axe.js`: nenhuma violação nas 6 combinações de página e tela.
- Lighthouse (build local): desktop 100 · 100 · 100 · 100; celular 82 a 86 em desempenho e 100 em acessibilidade, boas práticas e SEO. No celular, o LCP medido no trace foi igual ao FCP (cerca de 0,3 s); a nota vem da simulação de rede lenta do Lighthouse.

Os textos usados nos testes (nomes de projetos, perguntas, "Meu papel") acompanham `frontend/lib/content.ts`; ao mudar o conteúdo, ajuste o teste correspondente.
