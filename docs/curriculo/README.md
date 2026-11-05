# Currículo em PDF

Fonte dos dois currículos publicados em `frontend/public/`:

| Arquivo | Idioma | Onde aparece |
|---|---|---|
| `Claudemir_Custodio_CV.pdf` | Português | Botão "Baixar currículo" do site |
| `Claudemir_Custodio_CV_EN.pdf` | Inglês | `mibess.com.br/Claudemir_Custodio_CV_EN.pdf` (ainda sem link no site) |

- `curriculo.template.html` e `curriculo-en.template.html`: conteúdo de cada versão (A4, 2 páginas). Edite os textos aqui e mantenha as duas versões com as mesmas informações.
- `estilo.css`: layout compartilhado pelas duas versões.
- `gerar.js`: injeta a logo (a mesma de `frontend/lib/logo-path.ts`), confere se nada transborda das páginas e gera os dois PDFs com o Chromium do Playwright.
- `metadados.py`: grava título, autor, assunto e palavras-chave em cada PDF.
- `fonts/`: Archivo e JetBrains Mono (SIL Open Font License 1.1, ver `OFL-*.txt`).

## Como gerar

Na raiz do repositório, com o Playwright e o `pypdf` disponíveis:

```bash
node docs/curriculo/gerar.js
```

```bash
python3 docs/curriculo/metadados.py
```

O `gerar.js` para com erro se algum texto não couber; nesse caso, encurte o texto ou ajuste os espaçamentos em `estilo.css`. Se o inglês e o português ocuparem alturas diferentes, a sobra vira espaço igual entre os blocos de cada página.

## Decisões

- Sem foto, como é comum em currículos para empresas e processos internacionais.
- Texto real e selecionável, fontes embutidas, links clicáveis e PDF marcado (com o idioma do documento), para leitura por sistemas de recrutamento (ATS) e leitores de tela.
- Contatos e formação em linhas corridas, para não embaralhar na extração de texto.
- Página 1 funciona sozinha como perfil de consultor; a página 2 traz a trajetória completa e os projetos.
- Na versão em inglês: telefone no formato internacional, fuso horário (UTC-3) junto da cidade e mensagem do WhatsApp em inglês.
