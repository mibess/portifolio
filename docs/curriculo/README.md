# Currículo em PDF

Fonte do arquivo `frontend/public/Claudemir_Custodio_CV.pdf`, entregue pelo botão "Baixar currículo" do site.

- `curriculo.template.html`: conteúdo e layout (A4, 2 páginas). Edite os textos aqui.
- `gerar.js`: injeta a logo (a mesma de `frontend/lib/logo-path.ts`), confere se nada transborda das páginas e gera o PDF com o Chromium do Playwright.
- `metadados.py`: grava título, autor, assunto e palavras-chave no PDF.
- `retrato.jpg`: recorte do retrato de estúdio. `fonts/`: Archivo e JetBrains Mono (SIL Open Font License 1.1, ver `OFL-*.txt`).

## Como gerar

Na raiz do repositório, com o Playwright e o `pypdf` disponíveis:

```bash
node docs/curriculo/gerar.js
```

```bash
python3 docs/curriculo/metadados.py
```

O `gerar.js` para com erro se algum texto não couber; nesse caso, encurte o texto ou ajuste os espaçamentos no CSS do template.

## Decisões

- Texto real e selecionável, fontes embutidas e links clicáveis, para leitura por sistemas de recrutamento (ATS).
- Contatos e formação em linhas corridas, para não embaralhar na extração de texto.
- Página 1 funciona sozinha como perfil de consultor; a página 2 traz a trajetória completa e os projetos.
