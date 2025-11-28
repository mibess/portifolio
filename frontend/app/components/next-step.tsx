export default function NextStep() {
    return (
        <section className="py-18 bg-black/20 relative">
            <div className="max-w-4xl mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-2">
                <div className="glass-panel p-6 rounded-xl border-l-4 border-neon-cyan">
                    <h3 className="text-neon-cyan font-display font-bold text-lg mb-2">AGORA</h3>
                    <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    Entregando novas funcionalidades e otimizações em microsserviços da CCEE, com Java,
                    Spring Boot, Oracle e Angular alinhados às rotinas regulatórias do setor elétrico.
                    </p>
                </div>

                <div className="glass-panel p-6 rounded-xl border-l-4 border-neon-purple">
                    <h3 className="text-neon-purple font-display font-bold text-lg mb-2">PRÓXIMO PASSO</h3>
                    <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    Se tornar especialista e acelerar roadmaps que precisem de microsserviços robustos, frontends modernos e
                    governança CI/CD para escala e observabilidade.
                    </p>
                </div>
                </div>
            </div>
        </section>
    );
}