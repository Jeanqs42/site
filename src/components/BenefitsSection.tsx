import { Zap, Shield, Code, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: Code,
    title: "Fácil integração",
    description: "Integre em minutos com nossa API RESTful simples e documentação completa."
  },
  {
    icon: Zap,
    title: "Escalável e rápido",
    description: "Infraestrutura otimizada para alto volume com latência ultra-baixa."
  },
  {
    icon: Shield,
    title: "Seguro com chaves únicas",
    description: "Autenticação robusta com API keys únicas e criptografia de ponta."
  },
  {
    icon: BarChart3,
    title: "Analytics em tempo real",
    description: "Monitore uso, performance e métricas detalhadas em tempo real."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background"> {/* Corrigido de bg-white para bg-background */}
      <div className="mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Cansado de Limitações? Dê o Próximo Passo com Nossa API de IA
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A sua Solução de IA Multi-Modelo em uma Única API para empresas e desenvolvedores que precisam de uma de IA confiável e performática.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-smooth group cursor-pointer border border-border/50"
            >
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;