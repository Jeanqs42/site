import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Infinity } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Freemium",
    icon: Zap,
    price: "Grátis",
    period: "",
    description: "Perfeito para experimentar e pequenos projetos",
    requests: "100 requisições/dia",
    features: [
      "Modelos básicos de IA",
      "Documentação completa",
      "Suporte via comunidade",
      "Dashboard básico"
    ],
    popular: false,
    cta: "Começar grátis"
  },
  {
    name: "Basic",
    icon: Check,
    price: "R$ 19,90",
    period: "/mês",
    description: "Para desenvolvedores e pequenos negócios",
    requests: "1.000 requisições/dia",
    features: [
      "Todos os recursos do Freemium",
      "Modelos avançados",
      "Suporte por email",
      "Analytics detalhado",
      "99.5% SLA"
    ],
    popular: false,
    cta: "Assinar Basic"
  },
  {
    name: "Premium",
    icon: Crown,
    price: "R$ 59,90",
    period: "/mês",
    description: "Recomendado para empresas em crescimento",
    requests: "10.000 requisições/dia",
    features: [
      "Todos os recursos do Basic",
      "Todos os modelos (Groq, Gemini, Cohere, OpenAI)",
      "Suporte prioritário",
      "Busca na web integrada",
      "99.9% SLA",
      "Webhooks personalizados"
    ],
    popular: true,
    cta: "Assinar Premium"
  },
  {
    name: "Unlimited",
    icon: Infinity,
    price: "R$ 199,90",
    period: "/mês",
    description: "Para grandes corporações e alto volume",
    requests: "Requisições ilimitadas",
    features: [
      "Todos os recursos do Premium",
      "Acesso prioritário a novos modelos",
      "Suporte dedicado",
      "Consultoria técnica",
      "99.99% SLA",
      "Infraestrutura dedicada"
    ],
    popular: false,
    cta: "Assinar Unlimited"
  }
];

const PricingSection = () => {
  return (
    <section className="py-20 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Planos que crescem com você
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades. Upgrade ou downgrade a qualquer momento.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-smooth relative ${
                plan.popular ? 'ring-2 ring-primary ring-opacity-50 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="gradient-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Mais popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                  plan.popular ? 'gradient-primary' : 'bg-muted'
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="text-sm font-medium text-primary bg-primary-muted px-3 py-1 rounded-full inline-block">
                  {plan.requests}
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/login" className="block">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'gradient-primary border-0 shadow-hero' 
                      : 'border-border hover:bg-card-hover'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/planos">
            <Button variant="outline" size="lg" className="border-border hover:bg-card-hover">
              Ver comparação completa dos planos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;