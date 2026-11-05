import {
  SiAngular,
  SiBitbucket,
  SiCss,
  SiDocker,
  SiGit,
  SiHibernate,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiOpenjdk,
  SiPostgresql,
  SiPrimefaces,
  SiRabbitmq,
  SiReact,
  SiSpringboot,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import SectionHeader from "../ui/section-header";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { expertise } from "@/lib/content";

const icones: Record<string, React.ComponentType<{ className?: string; title?: string }>> = {
  Java: SiOpenjdk,
  "Spring Boot": SiSpringboot,
  "JPA/Hibernate": SiHibernate,
  RabbitMQ: SiRabbitmq,
  Angular: SiAngular,
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  Primefaces: SiPrimefaces,
  Docker: SiDocker,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Git: SiGit,
  Bitbucket: SiBitbucket,
};

export default function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-titulo" className="band-nevoa section-y">
      <div className="container-site">
        <SectionHeader numero="05" rotulo="Expertise" tituloId="expertise-titulo" titulo="Stack e práticas" />

        <RevealGroup className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded border border-linha bg-linha lg:grid-cols-4">
          {expertise.map((g) => (
            <RevealItem key={g.id} className="min-w-0 bg-papel p-5 sm:p-6">
              <h3 className="flex items-baseline justify-between gap-3">
                <span className="t-card text-lg">{g.titulo}</span>
                <span className="font-mono text-xs text-ardosia">{String(g.itens.length).padStart(2, "0")}</span>
              </h3>
              <ul className="mt-5 space-y-2.5">
                {g.itens.map((item) => {
                  const Icone = icones[item];
                  return (
                    <li key={item} className="flex items-center gap-3 text-[15px]">
                      {Icone ? (
                        <Icone className="h-4 w-4 flex-none text-planta-forte" aria-hidden="true" />
                      ) : (
                        <span className="mx-[5px] h-1.5 w-1.5 flex-none bg-planta-forte" aria-hidden="true" />
                      )}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
