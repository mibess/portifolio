/**
 * Gera o currículo em PDF a partir de curriculo.template.html.
 *
 * Uso (na raiz do repositório, com o Playwright disponível):
 *   node docs/curriculo/gerar.js
 *   python3 docs/curriculo/metadados.py
 *
 * Saída: frontend/public/Claudemir_Custodio_CV.pdf (o arquivo do botão "Baixar currículo" do site).
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const dir = __dirname;
const raiz = path.resolve(dir, "../..");
const saida = path.join(raiz, "frontend/public/Claudemir_Custodio_CV.pdf");

// Logo: o mesmo desenho usado pelo site (frontend/lib/logo-path.ts)
const ts = fs.readFileSync(path.join(raiz, "frontend/lib/logo-path.ts"), "utf8");
const viewBox = ts.match(/LOGO_VIEWBOX = "([^"]+)"/)[1];
const d = ts.match(/LOGO_PATH =\s*"([^"]+)"/)[1];
const [, x, y, lado] = ts.match(/LOGO_PINGO = \{ x: ([\d.-]+), y: ([\d.-]+), lado: ([\d.]+) \}/);
const logo =
  `<svg class="logo" viewBox="${viewBox}" role="img" aria-label="mibess">` +
  `<path fill="#0C1A29" d="${d}"/><rect x="${x}" y="${y}" width="${lado}" height="${lado}" fill="#F4A93C"/></svg>`;

const html = fs.readFileSync(path.join(dir, "curriculo.template.html"), "utf8").replaceAll("<!--LOGO-->", logo);
const htmlFinal = path.join(dir, "curriculo.html");
fs.writeFileSync(htmlFinal, html);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + htmlFinal, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  // Cada página tem altura fixa de A4: nada pode transbordar.
  const paginas = await page.evaluate(() =>
    [...document.querySelectorAll(".pagina")].map((p) => ({ altura: p.clientHeight, conteudo: p.scrollHeight })),
  );
  const fontes = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").length);
  console.log("páginas:", JSON.stringify(paginas), "| fontes carregadas:", fontes);
  const estourou = paginas.filter((p) => p.conteudo > p.altura + 1);
  if (estourou.length) {
    console.error("Conteúdo transborda a página. Ajuste o texto ou o espaçamento antes de gerar o PDF.");
    process.exitCode = 1;
    await browser.close();
    return;
  }

  await page.pdf({ path: saida, preferCSSPageSize: true, printBackground: true });
  await browser.close();
  console.log("PDF gerado em", path.relative(raiz, saida));
})();
