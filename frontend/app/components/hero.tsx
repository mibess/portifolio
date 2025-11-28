import Image from "next/image";
import { MessageCircle, ExternalLink, Linkedin } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function Hero() {
    return (
        <section id="about" className="relative min-h-screen flex items-center justify-center py-16">
            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <div className="relative inline-block mb-8 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/20 bg-black">
                    <Image
                        src="/profile.png"
                        alt="Claudemir Custódio"
                        fill
                        className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4 tracking-tighter">
                    CLAUDEMIR CUSTÓDIO
                </h1>
                <h2 className="text-xl md:text-2xl text-neon-cyan mb-8 tracking-widest uppercase border-l-4 border-neon-purple pl-4 inline-block bg-white/5 py-1 pr-4 font-mono">
                    Full Stack Java Developer
                </h2>

                <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base mb-10 leading-relaxed font-mono">
                    <span className="text-neon-purple">&gt;</span> Mais de 14 anos de experiência.<br />
                    <span className="text-neon-purple">&gt;</span> Focado em arquitetura Java, Cloud AWS e Microsserviços.<br />
                    <span className="text-neon-purple">&gt;</span> Transformando ideias complexas em código eficiente.
                </p>

                <div className="flex justify-center gap-6 mb-12">
                    <a href="https://github.com/mibess" target="_blank" className="text-gray-400 hover:text-white hover:scale-110 transition-transform">
                    <SiGithub className="w-8 h-8" />
                    </a>
                    <a href="https://www.linkedin.com/in/claudemircustodio" target="_blank" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-transform">
                    <Linkedin className="w-8 h-8" />
                    </a>
                    <a href="https://wa.me/5516997200212" target="_blank" className="text-gray-400 hover:text-green-400 hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8" />
                    </a>
                </div>

                <div className="flex justify-center">
                    <a
                    href="/Claudemir_Custodio_CV.pdf"
                    download="Claudemir_Custodio_CV.pdf"
                    className="group relative px-6 py-3 bg-transparent border border-neon-cyan/50 overflow-hidden rounded hover:border-neon-cyan transition-colors"
                    >
                    <div className="absolute inset-0 w-0 bg-neon-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                    <span className="relative group-hover:text-neon-cyan font-bold tracking-wider font-mono text-neon-cyan flex items-center">
                        <ExternalLink className="mr-2 w-4 h-4" /> BAIXAR CURRÍCULO
                    </span>
                    </a>
                </div>
            </div>
        </section>
    );
}