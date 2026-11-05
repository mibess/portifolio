/**
 * Gera o currículo em PDF, em português e em inglês, a partir dos templates HTML.
 *
 * Uso (na raiz do repositório, com o Playwright disponível):
 *   node docs/curriculo/gerar.js
 *   python3 docs/curriculo/metadados.py
 *
 * Saídas, em frontend/public/:
 *   Claudemir_Custodio_CV.pdf     português (o arquivo do botão "Baixar currículo" do site)
 *   Claudemir_Custodio_CV_EN.pdf  inglês
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const dir = __dirname;
const raiz = path.resolve(dir, "../..");

const VERSOES = [
  { template: "curriculo.template.html", html: "curriculo.html", pdf: "frontend/public/Claudemir_Custodio_CV.pdf" },
  { template: "curriculo-en.template.html", html: "curriculo-en.html", pdf: "frontend/public/Claudemir_Custodio_CV_EN.pdf" },
];

// Logo: o mesmo desenho usado pelo site (frontend/lib/logo-path.ts)
const ts = fs.readFileSync(path.join(raiz, "frontend/lib/logo-path.ts"), "utf8");
const viewBox = ts.match(/LOGO_VIEWBOX = "([^"]+)"/)[1];
const d = ts.match(/LOGO_PATH =\s*"([^"]+)"/)[1];
const [, x, y, lado] = ts.match(/LOGO_PINGO = \{ x: ([\d.-]+), y: ([\d.-]+), lado: ([\d.]+) \}/);
const logo =
  `<svg class="logo" viewBox="${viewBox}" role="img" aria-label="mibess">` +
  `<path fill="#0C1A29" d="${d}"/><rect x="${x}" y="${y}" width="${lado}" height="${lado}" fill="#F4A93C"/></svg>`;

(async () => {
  const browser = await chromium.launch();
  let transbordou = false;

  for (const versao of VERSOES) {
    const htmlFinal = path.join(dir, versao.html);
    const html = fs.readFileSync(path.join(dir, versao.template), "utf8").replaceAll("<!--LOGO-->", logo);
    fs.writeFileSync(htmlFinal, html);

    const page = await browser.newPage();
    await page.goto("file://" + htmlFinal, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);

    // Cada página tem altura fixa de A4: nada pode transbordar.
    const paginas = await page.evaluate(() =>
      [...document.querySelectorAll(".pagina")].map((p) => ({ altura: p.clientHeight, conteudo: p.scrollHeight })),
    );
    const fontes = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").length);
    console.log(`${versao.template}: páginas ${JSON.stringify(paginas)} | fontes carregadas: ${fontes}`);

    if (paginas.some((p) => p.conteudo > p.altura + 1)) {
      console.error("  Conteúdo transborda a página. Ajuste o texto ou o espaçamento antes de gerar o PDF.");
      transbordou = true;
    } else {
      // tagged: PDF com estrutura e idioma do documento, para leitores de tela.
      await page.pdf({ path: path.join(raiz, versao.pdf), preferCSSPageSize: true, printBackground: true, tagged: true });
      console.log("  PDF gerado em", versao.pdf);
    }
    await page.close();
  }

  await browser.close();
  if (transbordou) process.exitCode = 1;
})();
