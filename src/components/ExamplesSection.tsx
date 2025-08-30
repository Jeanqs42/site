import { Code, MessageSquare, Search, Zap, Brain, Bot } from "lucide-react";

const examples = [
  {
    icon: MessageSquare,
    title: "Chatbots Inteligentes",
    description: "Crie assistentes virtuais que compreendem contexto e mantêm conversas naturais",
    useCase: "Atendimento ao cliente, FAQ automático, suporte técnico"
  },
  {
    icon: Search,
    title: "Sistema de Busca Semântica",
    description: "Busque informações em bases de conhecimento usando linguagem natural",
    useCase: "Documentação interna, base de conhecimento, catálogos de produtos"
  },
  {
    icon: Code,
    title: "Geração de Código",
    description: "Automatize a criação de código, documentação e revisões técnicas",
    useCase: "Desenvolvimento de software, APIs, scripts de automação"
  },
  {
    icon: Brain,
    title: "Análise de Dados",
    description: "Transforme dados complexos em insights compreensíveis e acionáveis",
    useCase: "Relatórios executivos, análise de sentimentos, KPIs"
  },
  {
    icon: Zap,
    title: "Automação de Tarefas",
    description: "Automatize processos repetitivos com inteligência artificial",
    useCase: "Classificação de emails, processamento de documentos, workflows"
  },
  {
    icon: Bot,
    title: "Assistentes Personalizados",
    description: "Desenvolva IAs especializadas para domínios específicos",
    useCase: "Educação, medicina, jurídico, finanças"
  }
];

const ExamplesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Aplicações Possíveis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra como nossa API pode transformar sua aplicação com inteligência artificial
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-smooth"
            >
              <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <example.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {example.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {example.description}
              </p>
              
              <div className="text-sm text-primary font-medium bg-primary-muted px-3 py-1 rounded-full inline-block">
                {example.useCase}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Pronto para começar? Escolha o plano ideal para seu projeto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;