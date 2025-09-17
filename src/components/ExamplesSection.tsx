import {
  Code,
  MessageSquare,
  Search,
  Zap,
  Brain,
  Bot,
  Newspaper,
  BarChart,
  TrendingUp,
} from "lucide-react";

const examples = [
  // Exemplos originais
  {
    icon: MessageSquare,
    title: "Chatbots Inteligentes",
    description: "Crie assistentes virtuais que compreendem contexto e mantêm conversas naturais.",
    useCase: "Atendimento ao cliente, FAQ automático, suporte técnico",
    link: "https://conversational-ai-engine.lovable.app",
  },

  {
    icon: Search,
    title: "Sistema de Busca Semântica",
    description: "Busque informações em bases de conhecimento usando linguagem natural.",
    useCase: "Documentação interna, base de conhecimento, catálogos",
    link: "https://vexpro-insight-engine.lovable.app",
  },
  
  {
    icon: Bot,
    title: "Assistentes Personalizados",
    description: "Desenvolva IAs especializadas para domínios específicos.",
    useCase: "Educação, medicina, jurídico, finanças",
    link: "https://vexpro-assist-hub.lovable.app",
  },
  // --- Novos exemplos com links ---
  {
    icon: Newspaper,
    title: "Narrador de Histórias Interativo",
    description: "Crie histórias personalizadas e roteiros em tempo real, onde a narrativa se adapta às escolhas do usuário.",
    useCase: "Mídia, jornalismo, entretenimento",
    link: "https://lnh8imcwwn1p.manus.space",
  },
  {
    icon: BarChart,
    title: "BrandSense Analytics",
    description: "Ferramenta completa para análise de marcas, visualização de sentimento e monitoramento de menções.",
    useCase: "Análise de marcas, marketing, social listening",
    link: "https://j6h5i7cgpmqj.manus.space",
  },
  {
    icon: TrendingUp,
    title: "Análise de Mercado Financeiro",
    description: "Monitore notícias para extrair o sentimento do mercado e gerar insights para decisões de investimento.",
    useCase: "Finanças, trading, análise de investimentos",
    link: "https://3dhkilc888o0.manus.space",
  },
];

const ExamplesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Aplicações Possíveis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra como nossa API pode transformar sua aplicação com inteligência artificial e explore nossas ferramentas em ação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-smooth flex flex-col"
            >
              <div className="flex-grow">
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

              {example.link && (
                <a
                  href={example.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block text-center bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-smooth"
                >
                  Acessar Ferramenta
                </a>
              )}
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