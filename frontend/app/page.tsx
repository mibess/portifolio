import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./components/sections/hero";
import Credibility from "./components/sections/credibility";
import Services from "./components/sections/services";
import Cases from "./components/sections/cases";
import Method from "./components/sections/method";
import Journey from "./components/sections/journey";
import Expertise from "./components/sections/expertise";
import Projects from "./components/sections/projects";
import BeyondCode from "./components/sections/beyond-code";
import Faq from "./components/sections/faq";
import Contact from "./components/sections/contact";
import { anosDeExperiencia } from "@/lib/content";

// Regenera a página uma vez por dia para manter os anos de experiência atualizados.
export const revalidate = 86400;

export default function Home() {
  const anos = anosDeExperiencia();

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero anos={anos} />
        <Credibility anos={anos} />
        <Services />
        <Cases />
        <Method />
        <Journey />
        <Expertise />
        <Projects />
        <BeyondCode />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
