// Bateria de verificação do site. Uso: node verificar.js [url-base]
// Pensada para o build de produção local (npm run build && npm run start), sem GEMINI_API_KEY:
// os testes da API do chat que gastam cota só rodam em localhost.
const { chromium } = require("playwright");

const BASE = process.argv[2] || "http://localhost:3000";
const LOCAL = /localhost|127\.0\.0\.1/.test(BASE);
let falhas = 0;
const ok = (c, m) => {
  if (!c) falhas++;
  console.log((c ? "PASS " : "FAIL ") + m);
};

function vigiar(p) {
  const erros = [];
  p.on("pageerror", (e) => erros.push("pageerror: " + e.message));
  p.on("console", (m) => {
    if (m.type() === "error") erros.push("console: " + m.text());
  });
  return erros;
}

async function rolarTudo(p) {
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 600) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(90);
  }
  await p.waitForTimeout(900);
}

(async () => {
  const b = await chromium.launch();

  // 1. Desktop: interações principais, CSP e erros
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    const erros = vigiar(p);
    const resp = await p.goto(BASE + "/", { waitUntil: "networkidle" });
    ok(resp.status() === 200, "home responde 200");

    // Projetos: modal, capa real e link do GitHub só para repositórios públicos
    await p.locator("#projetos").scrollIntoViewIfNeeded();
    await p.waitForTimeout(600);
    await p.getByRole("button", { name: "Ver detalhes de Bem vindo à Brodowski" }).click();
    await p.waitForTimeout(700);
    ok(await p.getByRole("dialog").isVisible(), "modal de projeto abre");
    await p.keyboard.press("Escape");
    ok(await p.getByRole("dialog").waitFor({ state: "detached", timeout: 3000 }).then(() => true, () => false), "Esc fecha o modal");
    ok((await p.locator('a[href="https://github.com/mibess/secrets"]').count()) === 0, "sem link para o repositório privado mibess/secrets");
    const capas = await p.evaluate(() => [...document.querySelectorAll("#projetos img")].map((i) => i.currentSrc || i.src));
    ok(capas.some((c) => c.includes("projetos%2Fgerador-uc.jpg") || c.includes("projetos/gerador-uc.jpg")), "capa real do Gerador de UC em uso");

    // Cases: "Meu papel" nos quatro cards
    ok((await p.locator("#cases").getByText("Meu papel").count()) === 4, "os 4 cases mostram 'Meu papel'");

    // Perguntas frequentes
    await p.locator("#perguntas").scrollIntoViewIfNeeded();
    await p.waitForTimeout(700);
    const itens = p.locator("#perguntas details");
    ok((await itens.count()) === 6, "6 perguntas frequentes");
    await itens.nth(0).locator("summary").click();
    ok(await itens.nth(0).evaluate((d) => d.open), "pergunta abre ao clicar");
    await itens.nth(0).locator("summary").click();
    ok(!(await itens.nth(0).evaluate((d) => d.open)), "pergunta fecha ao clicar de novo");
    await itens.nth(0).locator("summary").focus();
    await p.keyboard.press("Enter");
    ok(await itens.nth(0).evaluate((d) => d.open), "pergunta abre pelo teclado (Enter)");

    // Links de contato e currículos
    const mailHero = await p.locator("#inicio a[href^='mailto:']").getAttribute("href");
    ok(mailHero && mailHero.includes("subject="), "hero oferece e-mail com assunto pronto: " + mailHero);
    ok((await p.locator("a[href='/Claudemir_Custodio_CV_EN.pdf']").count()) >= 2, "currículo em inglês linkado (contato e rodapé)");
    ok((await p.locator("footer a[href='/privacidade']").count()) === 1, "rodapé tem link de privacidade");

    // Âncoras internas apontam para elementos que existem
    const ancorasQuebradas = await p.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h.length > 1 && !document.getElementById(h.slice(1))),
    );
    ok(ancorasQuebradas.length === 0, "âncoras internas válidas " + JSON.stringify(ancorasQuebradas));

    // Links externos abrem com noopener
    const semNoopener = await p.evaluate(() =>
      [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !(a.rel || "").includes("noopener")).map((a) => a.href),
    );
    ok(semNoopener.length === 0, "links externos com rel=noopener " + JSON.stringify(semNoopener));

    // Imagens: todas carregadas e com atributo alt
    await rolarTudo(p);
    const imgs = await p.evaluate(() =>
      [...document.querySelectorAll("img")].map((i) => ({ src: i.currentSrc || i.src, alt: i.getAttribute("alt"), ok: i.complete && i.naturalWidth > 0 })),
    );
    ok(imgs.every((i) => i.alt !== null), "todas as imagens têm alt (" + imgs.length + ")");
    ok(imgs.filter((i) => !i.ok).length === 0, "nenhuma imagem quebrada " + JSON.stringify(imgs.filter((i) => !i.ok).map((i) => i.src)));
    const ocultos = await p.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length);
    ok(ocultos === 0, "após rolar, nenhum bloco ficou invisível (" + ocultos + ")");

    // Chat: abre, mostra aviso de IA e trata a falta de chave
    await p.getByRole("button", { name: "Abrir o assistente Mibee" }).click();
    await p.waitForTimeout(600);
    ok(await p.locator("#mibee-chat").getByText("Não envie dados confidenciais").isVisible(), "chat mostra aviso de IA e privacidade");
    ok((await p.locator("#mibee-pergunta").getAttribute("maxlength")) === "800", "campo do chat limitado a 800 caracteres");
    if (LOCAL) {
      await p.getByRole("button", { name: "Consultoria" }).click();
      await p.waitForTimeout(1500);
      ok(await p.getByText("Não consegui responder agora", { exact: false }).isVisible(), "chat mostra erro claro sem a chave do Gemini");
    }

    ok((await ctx.cookies()).length === 0, "nenhum cookie gravado");
    ok((await p.evaluate(() => localStorage.length)) === 0, "nada gravado no localStorage");
    const relevantes = erros.filter((e) => !e.includes("503") && !e.includes("Falha na resposta do assistente"));
    ok(relevantes.length === 0, "sem erros no console nem violações de CSP: " + JSON.stringify(relevantes));
    await ctx.close();
  }

  // 2. Celular: menu, chat e perguntas
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    const erros = vigiar(p);
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    await p.getByRole("button", { name: "Abrir menu" }).tap();
    await p.waitForTimeout(500);
    ok(await p.locator("#menu-movel").isVisible(), "menu móvel abre");
    await p.locator("#menu-movel").getByRole("link", { name: "Cases" }).tap();
    await p.waitForTimeout(2000);
    const y = await p.evaluate(() => document.getElementById("cases").getBoundingClientRect().top);
    ok(Math.abs(y - 88) < 24, "menu leva até Cases (topo a " + Math.round(y) + " px)");
    const largura = await p.evaluate(() => document.documentElement.scrollWidth);
    ok(largura <= 390, "sem rolagem horizontal no celular (" + largura + " px)");
    ok(erros.length === 0, "celular sem erros: " + JSON.stringify(erros));
    await ctx.close();
  }

  // 3. Sem JavaScript: todo o conteúdo visível e perguntas funcionando
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
    const p = await ctx.newPage();
    await p.goto(BASE + "/", { waitUntil: "load" });
    const ocultos = await p.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length);
    ok(ocultos === 0, "sem JavaScript, nenhum bloco invisível (" + ocultos + ")");
    await p.locator("#perguntas details").first().locator("summary").click();
    ok(await p.locator("#perguntas details").first().evaluate((d) => d.open), "sem JavaScript, perguntas abrem");
    ok(await p.getByText("Desenvolvi as integrações com os cinco bancos").isVisible(), "sem JavaScript, texto dos cases aparece");
    await ctx.close();
  }

  // 4. Scripts do Next bloqueados (proxy corporativo, extensão): a revelação inline funciona sozinha
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.route(/\/_next\/static\/chunks\/.*\.js$/, (r) => r.abort());
    await p.goto(BASE + "/", { waitUntil: "load" });
    ok(await p.evaluate(() => document.documentElement.classList.contains("js")), "script inline marca <html class=js> mesmo sem os chunks");
    await rolarTudo(p);
    const ocultos = await p.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length);
    ok(ocultos === 0, "com os scripts do Next bloqueados, tudo aparece ao rolar (" + ocultos + " ocultos)");
    await ctx.close();
  }

  // 5. Conteúdo abaixo da dobra começa escondido e só aparece ao chegar na tela (a animação existe)
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    const antes = await p.evaluate(() => parseFloat(getComputedStyle(document.querySelector("#contato [data-reveal]")).opacity));
    ok(antes < 0.01, "bloco do contato começa escondido antes de rolar (" + antes + ")");
    await p.locator("#contato").scrollIntoViewIfNeeded();
    await p.waitForTimeout(1300);
    const depois = await p.evaluate(() => parseFloat(getComputedStyle(document.querySelector("#contato [data-reveal]")).opacity));
    ok(depois > 0.99, "e aparece ao chegar na tela (" + depois + ")");
    await ctx.close();
  }

  // 6. Movimento reduzido
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const p = await ctx.newPage();
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    await rolarTudo(p);
    const ocultos = await p.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length);
    ok(ocultos === 0, "movimento reduzido: tudo visível (" + ocultos + ")");
    ok(await p.evaluate(() => !window.__lenis), "movimento reduzido: scroll suave desligado");
    await ctx.close();
  }

  // 7. Páginas de apoio
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    const erros = vigiar(p);
    const r1 = await p.goto(BASE + "/privacidade", { waitUntil: "networkidle" });
    ok(r1.status() === 200, "privacidade responde 200");
    ok(await p.getByRole("heading", { level: 1, name: "Como este site trata os seus dados" }).isVisible(), "privacidade tem título");
    ok((await p.locator('footer a[href="/#cases"]').count()) === 1, "rodapé da privacidade aponta para /#cases");
    await p.getByRole("link", { name: "Voltar ao site" }).click();
    await p.waitForURL(BASE + "/");
    ok(true, "'Voltar ao site' leva à home");
    const r2 = await p.goto(BASE + "/nao-existe", { waitUntil: "networkidle" });
    ok(r2.status() === 404, "rota inexistente responde 404");
    ok(await p.getByRole("heading", { name: "Esta página não existe" }).isVisible(), "404 personalizado em português");
    ok(erros.filter((e) => !e.includes("404")).length === 0, "páginas de apoio sem erros: " + JSON.stringify(erros));
    await ctx.close();
  }

  // 8. Arquivos e rotas auxiliares
  {
    const ctx = await b.newContext();
    const r = ctx.request;
    for (const [rota, tipo] of [
      ["/Claudemir_Custodio_CV.pdf", "application/pdf"],
      ["/Claudemir_Custodio_CV_EN.pdf", "application/pdf"],
      ["/.well-known/security.txt", "text/plain"],
      ["/robots.txt", "text/plain"],
      ["/sitemap.xml", "application/xml"],
      ["/opengraph-image", "image/png"],
      ["/images/projetos/banco-de-sangue.jpg", "image/jpeg"],
    ]) {
      const res = await r.get(BASE + rota);
      ok(res.status() === 200 && (res.headers()["content-type"] || "").startsWith(tipo), `${rota} → ${res.status()} ${res.headers()["content-type"]}`);
    }
    const sec = await (await r.get(BASE + "/.well-known/security.txt")).text();
    const expira = new Date(sec.match(/Expires: (.+)/)[1]);
    ok(sec.includes("Contact: mailto:contato@mibess.com.br") && expira > new Date(Date.now() + 300 * 864e5), "security.txt com contato e validade de ~1 ano");
    ok((await (await r.get(BASE + "/robots.txt")).text()).includes("Disallow: /api/"), "robots.txt bloqueia /api/");
    ok((await (await r.get(BASE + "/sitemap.xml")).text()).includes("/privacidade"), "sitemap inclui /privacidade");
    ok((await r.get(BASE + "/api/aboutme")).status() === 404, "/api/aboutme removida");
    const html = await (await r.get(BASE + "/")).text();
    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">(.+?)<\/script>/)[1]);
    const pessoa = ld["@graph"].find((x) => x["@type"] === "Person");
    ok(pessoa && pessoa.telephone && !pessoa.sameAs.some((s) => s.includes("wa.me")) && pessoa.makesOffer.length === 2, "JSON-LD com pessoa, telefone, ofertas e sem wa.me em sameAs");

    // API do chat: origem, formato, tamanho e limite de requisições (só em localhost, para não gastar cota)
    if (LOCAL) {
      // Um IP de teste por rodada: o limite de requisições guarda as chamadas por IP durante 10 minutos,
      // e assim a bateria pode ser repetida sem esperar a janela anterior acabar.
      const ip = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
      const post = (dados, headers = {}) =>
        r.post(BASE + "/api/chat", { data: dados, headers: { "content-type": "application/json", "x-forwarded-for": ip, ...headers }, failOnStatusCode: false });
      ok((await post({ question: "oi" }, { origin: "https://site-estranho.example" })).status() === 403, "chat recusa origem externa (403)");
      ok((await r.post(BASE + "/api/chat", { data: "{quebrado", headers: { "content-type": "application/json", "x-forwarded-for": ip } })).status() === 400, "chat recusa JSON inválido (400)");
      ok((await post({ question: "x".repeat(801) })).status() === 400, "chat recusa pergunta com mais de 800 caracteres (400)");
      ok((await post({ question: "   " })).status() === 400, "chat recusa pergunta vazia (400)");
      ok((await post({ question: "oi", history: [{ sender: "hacker", text: 1 }] })).status() === 503, "histórico malformado é ignorado e a rota segue (503 sem chave)");
      let ultimo = null;
      for (let i = 0; i < 25; i++) ultimo = await post({ question: "teste de limite" });
      ok(ultimo.status() === 429 && Number(ultimo.headers()["retry-after"]) > 0, "limite de requisições devolve 429 com Retry-After (" + ultimo.status() + ")");
    }
    await ctx.close();
  }

  await b.close();
  console.log(falhas ? `\n${falhas} FALHA(S)` : "\nTUDO OK");
  process.exitCode = falhas ? 1 : 0;
})();
