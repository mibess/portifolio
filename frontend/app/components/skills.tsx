import { CheckCircle2, Cloud, Code, Cpu, Server } from "lucide-react";

const skills = {
  backend: ["Java", "Spring Boot", "JPA/Hibernate", "REST API", "DDD", "Microservices", "RabbitMQ"],
  frontend: ["Angular", "React", "TypeScript", "JavaScript", "HTML", "CSS", "JSF", "Primefaces"],
  infra: ["AWS EC2/S3/ECS", "Docker", "CI/CD", "PostgreSQL", "Oracle", "MySQL", "Git", "Bitbucket"],
  practices: ["Testes Unitários", "Testes de Integração", "Scrum/Kanban", "CI/CD (GitHub Actions/Bitbucket)", "Versionamento Git", "Jasper Reports"]
};
export default function Skills() {
    return (
        <section id="stack" className="py-20 bg-gray-200 relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center mb-12">
                    <span className="text-blue-500 mr-4"><Cpu className="w-8 h-8" /></span>
                    <h3 className="text-3xl font-display font-bold text-gray-800">SYS.load_skills()</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card Backend */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-blue-500 font-bold text-lg font-mono">Backend.Core</h4>
                            <Server className="text-gray-400 group-hover:text-blue-500 w-6 h-6" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                        {skills.backend.map(skill => (
                            <span key={skill} className="bg-gray-200 text-xs px-3 py-1 rounded border border-gray-200 font-mono text-gray-700">
                            {skill}
                            </span>
                        ))}
                        </div>
                    </div>

                    {/* Card Frontend */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-purple-500 font-bold text-lg font-mono">Frontend.UI</h4>
                            <Code className="text-gray-400 group-hover:text-purple-500 w-6 h-6" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                        {skills.frontend.map(skill => (
                            <span key={skill} className="bg-gray-200 text-xs px-3 py-1 rounded border border-gray-200 font-mono text-gray-700">
                            {skill}
                            </span>
                        ))}
                        </div>
                    </div>

                    {/* Card DevOps/Cloud */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-green-500 font-bold text-lg font-mono">Infra.Cloud</h4>
                            <Cloud className="text-gray-400 group-hover:text-green-500 w-6 h-6" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                        {skills.infra.map(skill => (
                            <span key={skill} className="bg-gray-200 text-xs px-3 py-1 rounded border border-gray-200 font-mono text-gray-700">
                            {skill}
                            </span>
                        ))}
                        </div>
                    </div>

                    {/* Card Practices */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-emerald-500 font-bold text-lg font-mono">Ops.Práticas</h4>
                            <CheckCircle2 className="text-gray-400 group-hover:text-emerald-500 w-6 h-6" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                        {skills.practices.map(skill => (
                            <span key={skill} className="bg-gray-200 text-xs px-3 py-1 rounded border border-gray-200 font-mono text-gray-700">
                            {skill}
                            </span>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}
