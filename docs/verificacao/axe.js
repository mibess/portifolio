// Auditoria de acessibilidade com axe-core (WCAG 2.2 A/AA). Uso: node axe.js [url-base]
const { chromium } = require("playwright");

const BASE = process.argv[2] || "http://localhost:3000";
const AXE = require.resolve("axe-core/axe.min.js");

(async () => {
  const b = await chromium.launch();
  let total = 0;
  for (const [nome, viewport] of [
    ["desktop", { width: 1440, height: 900 }],
    ["celular", { width: 390, height: 844 }],
  ]) {
    for (const rota of ["/", "/privacidade", "/nao-existe"]) {
      const ctx = await b.newContext({ viewport, reducedMotion: "reduce", bypassCSP: true });
      const p = await ctx.newPage();
      await p.goto(BASE + rota, { waitUntil: "networkidle" });
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 700) {
        await p.evaluate((yy) => window.scrollTo(0, yy), y);
        await p.waitForTimeout(60);
      }
      await p.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
      await p.waitForTimeout(1500);
      await p.addScriptTag({ path: AXE });
      const r = await p.evaluate(async () =>
        window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }),
      );
      const v = r.violations.map((x) => ({ id: x.id, impacto: x.impact, n: x.nodes.length, ex: x.nodes.slice(0, 2).map((n) => n.target.join(" ")) }));
      total += v.length;
      console.log(`${nome} ${rota}: ${v.length} violação(ões), ${r.passes.length} regras aprovadas`);
      v.forEach((x) => console.log("   ", JSON.stringify(x)));
      await ctx.close();
    }
  }
  await b.close();
  console.log(total ? `\n${total} violação(ões) no total` : "\nSem violações");
})();
