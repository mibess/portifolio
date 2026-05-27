"use client";

import Image from "next/image";
import { MessageCircle, ExternalLink, Linkedin } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useState, useEffect } from "react";

const PHRASES = [
    "CÓDIGO EFICIENTE",
    "DESIGNS INTELIGENTES",
    "PROJETOS ESCALÁVEIS"
];

export default function Hero() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = PHRASES[phraseIndex];
        let timeout: any;

        if (isDeleting) {
            if (charIndex === 0) {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
            } else {
                timeout = setTimeout(() => {
                    setCharIndex((prev) => prev - 1);
                }, 40);
            }
        } else {
            if (charIndex === currentPhrase.length) {
                timeout = setTimeout(() => setIsDeleting(true), 2500);
            } else {
                timeout = setTimeout(() => {
                    setCharIndex((prev) => prev + 1);
                }, 100);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, phraseIndex]);

    const displayedText = PHRASES[phraseIndex].substring(0, charIndex);
    const spaceIndex = displayedText.indexOf(" ");
    
    let line1 = displayedText;
    let line2 = "";
    if (spaceIndex !== -1) {
        line1 = displayedText.substring(0, spaceIndex);
        line2 = displayedText.substring(spaceIndex + 1);
    }

    return (
        <section id="about" className="relative min-h-screen flex items-center py-4 overflow-hidden">
            {/* Background Image Effect */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/hero-bg.png" 
                    alt="Background" 
                    fill 
                    className="object-cover opacity-60" 
                    priority 
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-[#050505]/80 to-[#050505]/40"></div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#050505]"></div>
            </div>

            <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center mt-12 lg:mt-0">
                
                {/* Left Column (5 cols) - Title and Intro */}
                <div className="lg:col-span-6 xl:col-span-5 flex flex-col text-left space-y-8">
                    <div className="font-mono text-neon-cyan text-sm md:text-base mb-2">
                        &gt; system.init()
                    </div>
                    
                    <h1 
                        className="h-30 md:h-80 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-gray-200 uppercase leading-[1.1] tracking-tighter"
                        style={{ minHeight: "4.4em" }}
                    >
                        TRANSFORMANDO <br/>
                        IDEIAS COMPLEXAS <br/>
                        EM <span className="text-neon-cyan">{line1}</span>
                        {spaceIndex !== -1 && (
                            <>
                                <br/>
                                <span className="text-neon-cyan">{line2}</span>
                            </>
                        )}
                        <span className="animate-pulse" style={{ animationDuration: "700ms" }}> |</span>
                    </h1>
                    
                    <p className="text-gray-400 font-mono text-sm md:text-base max-w-lg leading-relaxed border-l-2 border-white/10 pl-4">
                        Claudemir Custódio é um Full Stack Java Developer com mais de 14 anos de experiência, focado em arquitetura Java, Cloud AWS e Microsserviços.
                    </p>
                    
                    <div className="flex gap-6 pt-2">
                        <a href="https://github.com/mibess" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-transform hover:scale-110">
                            <SiGithub className="w-7 h-7" />
                        </a>
                        <a href="https://www.linkedin.com/in/claudemircustodio" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-transform hover:scale-110">
                            <Linkedin className="w-7 h-7" />
                        </a>
                        <a href="https://wa.me/5516997200212" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-400 transition-transform hover:scale-110">
                            <MessageCircle className="w-7 h-7" />
                        </a>
                    </div>
                    
                    <div className="pt-2">
                        <a
                            href="/Claudemir_Custodio_CV.pdf"
                            download="Claudemir_Custodio_CV.pdf"
                            className="inline-flex group relative px-6 py-3 bg-cyber-black/80 border border-neon-cyan/30 overflow-hidden rounded hover:border-neon-cyan transition-colors"
                        >
                            <div className="absolute inset-0 w-0 bg-neon-cyan transition-all duration-300 ease-out group-hover:w-full opacity-10"></div>
                            <span className="relative group-hover:text-neon-cyan font-bold tracking-wider font-mono text-neon-cyan flex items-center text-sm">
                                <ExternalLink className="mr-2 w-4 h-4" /> BAIXAR CURRÍCULO
                            </span>
                        </a>
                    </div>
                </div>

                {/* Right Column (7 cols) - Picture and Stats */}
                <div className="lg:col-span-6 xl:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-cyber-dark/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/5">
                    
                    {/* The Image Area (5 cols) */}
                    <div className="md:col-span-5 relative w-full max-w-70 mx-auto aspect-square group mt-8 md:ms-6 md:mt-0">
                        {/* Abstract Background Brush Layers */}
                        <div className="absolute -inset-4 bg-neon-purple/20 rotate-3 rounded-2xl blur-md transform group-hover:rotate-6 transition-transform duration-700"></div>
                        <div className="absolute -inset-2 bg-[#ff5252]/20 -rotate-3 rounded-2xl blur-md transform group-hover:-rotate-6 transition-transform duration-700"></div>
                        <div className="absolute -inset-4 bg-neon-cyan/10 rotate-12 rounded-3xl blur-lg"></div>
                        
                        {/* Profile Image with rugged clip-path */}
                        <div className="relative w-full h-full overflow-hidden" 
                             style={{ clipPath: 'polygon(5% 2%, 98% 5%, 95% 98%, 2% 95%)' }}>
                            <Image
                                src="/profile.png"
                                alt="Claudemir Custódio"
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 filter"
                                priority
                                sizes="(max-width: 768px) 100vw, 300px"
                            />
                        </div>
                        
                        {/* Corner Decorative Borders */}
                        <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-neon-purple/50 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-neon-purple/50 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    {/* The Text Area (7 cols) */}
                    <div className="md:col-span-7 flex flex-col space-y-6 mt-8 md:ms-8 md:mt-0">
                        <h2 className="text-lg lg:text-4xl font-display font-bold text-gray-200 leading-[1.1] tracking-wide">
                            Claudemir Custódio
                        </h2>
                        
                        <p className="text-gray-400 font-mono text-xs md:text-sm leading-relaxed">
                            Oi, sou engenheiro de software apaixonado por transformar ideias em aplicações reais.
                            <br/><br/>
                            Acredito que tecnologia não é só código. É experiência, clareza em resolver problemas de um jeito inteligente.
                        </p>

                        <div className="border-t border-dashed border-gray-700 pt-6 flex flex-wrap gap-6 justify-start">
                            <div>
                                <div className="text-neon-cyan font-display font-bold text-2xl tracking-wider">14+</div>
                                <div className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">Anos Exp</div>
                            </div>
                            <div>
                                <div className="text-neon-cyan font-display font-bold text-2xl tracking-wider">Angular</div>
                                <div className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">Frontend</div>
                            </div>
                            <div>
                                <div className="text-neon-cyan font-display font-bold text-2xl tracking-wider">Java</div>
                                <div className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">Backend</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
