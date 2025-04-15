// app/page.tsx
import Image from 'next/image';
import { Github, Linkedin, Instagram, ArrowRight } from 'lucide-react'; // Certifique-se que ArrowRight está importado
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';

export default function Home() {
  const coverSrc = "/cover.png";     // Imagem para a seção de capa no topo
  const profileSrc = "/profile.png";   // Sua imagem de perfil

  return (
    <> {/* Fragmento para agrupar as seções */}
      {/* === Seção da Imagem de Capa === */}
      <section id="cover" className="w-full h-30 md:h-40 lg:h-40 relative"> {/* Defina a altura desejada para a capa */}
        <Image
          src={coverSrc}
          alt="Imagem de Capa do Portfólio"
          fill
          className="object-cover"
          priority
        />
         {/* Opcional: Adicionar um leve gradiente escuro sobre a capa para dar profundidade */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 dark:via-black/10 dark:to-black/40"></div>
      </section>

      <section className="flex flex-col lg:flex-row items-center gap-12 container mx-auto relative p-16 md:py-20"> {/* Z-10 pode não ser mais necessário */}
        
          {/* Coluna da Imagem com efeito especial (mantido do seu código) */}
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-2 bg-amber-400/30 dark:bg-amber-600/20 rounded-full blur-md group-hover:opacity-80 transition-all duration-300"></div>
            <div className="relative rounded-full p-1 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700">
              <Image
                src={profileSrc} // Usando a variável definida no topo
                alt="Foto de Claudemir Custódio"
                width={280}
                height={280}
                className="rounded-full object-cover shadow-xl w-48 h-48 md:w-64 md:h-64 border-4 border-white dark:border-slate-800"
                priority
              />
            </div>
          </div>

          {/* Coluna do Texto (mantido do seu código) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-100">
              Claudemir <span className="text-amber-600 dark:text-amber-400">Custódio</span>
            </h1>

            <div className="relative mb-5">
              <h2 className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300">
                Desenvolvedor Full Stack
              </h2>
              {/* Linha decorativa sutil */}
              <div className="absolute bottom-[-4px] left-0 w-2/3 h-1 bg-amber-300 dark:bg-amber-600/50 rounded-full"></div>
            </div>

            <p className="max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Desenvolvedor experiente em Java e frameworks modernos Spring Boot, Angular e React.
              Meu objetivo hoje é continuar entregando soluções de alta qualidade que ajudem 
              a impulsionar o crescimento dos negócios em que trabalho. 
              Estou sempre buscando novas oportunidades de aprendizado e 
              desenvolvimento para me tornar ainda melhor.
            </p>

            {/* Botões e Links Sociais (mantido do seu código) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
              <a
                href="#projetos"
                className="group relative flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition-all duration-300 hover:shadow-amber-500/20 hover:-translate-y-0.5 w-full sm:w-auto text-center"
              >
                Meus Projetos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contato"
                className="group relative flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition-all duration-300 hover:shadow-slate-700/20 hover:-translate-y-0.5 dark:bg-slate-600 dark:hover:bg-slate-500 w-full sm:w-auto text-center"
              >
                Contato
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex space-x-3 mt-4 sm:mt-0 sm:ml-4"> {/* Ajuste margem e espaçamento social */}
                <a
                  href="https://www.linkedin.com/in/claudemircustodio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-amber-400 dark:hover:bg-amber-600 transition-all hover:-translate-y-0.5 shadow hover:shadow-amber-400/20"
                >
                  <Linkedin className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </a>
                <a
                  href="https://github.com/mibess"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-amber-400 dark:hover:bg-amber-600 transition-all hover:-translate-y-0.5 shadow hover:shadow-amber-400/20"
                >
                  <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </a>
                <a
                  href="https://www.instagram.com/csilverios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-3 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-amber-400 dark:hover:bg-amber-600 transition-all hover:-translate-y-0.5 shadow hover:shadow-amber-400/20"
                >
                  <Instagram className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </a>
              </div>
            </div>
          </div>{/* Fim Coluna Texto */}
      </section>{/* Fim Container */}

      {/* O restante do conteúdo da página (Sobre, Projetos, etc.) virá aqui abaixo */}
      <section className="container mx-auto">
         
        <About />

        <Projects />
         
        <Contact />

       </section>
    </>
  );
}