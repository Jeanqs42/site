import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Infinity, Gift } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Freemium",
    icon: Gift,
    price: "Grátis",
    period: "",
    description: "O plano de entrada, perfeito para quem quer experimentar a API sem custos. Ideal para testes e pequenos projetos.",
    requests: "100 requisições por dia",
    models: "Acesso aos modelos mais eficientes em custo",
    support: "Documentação e comunidade",
    features: [
      "100 requisições/dia",
      "Modelos básicos de IA",
      "Documentação completa",
      "Suporte",
      "Dashboard básico",
      "Rate limiting padrão"
    ],
    popular: false,
    cta: "Começar grátis"
  },
  {
    name: "Basic",
    icon: Zap,
    price: "R$ 59,90",
    period: "/mês",
    description: "Um plano acessível para desenvolvedores e pequenos negócios que precisam de um volume maior de interações diárias com a IA.",
    requests: "1.000 requisições por dia",
    models: "Acesso aos modelos do plano Freemium, com opções adicionais",
    support: "E-mail padrão",
    features: [
      "1.000 requisições/dia",
      "Todos os modelos básicos",
      "Modelos intermediários",
      "Suporte por email",
      "Analytics básico",
      "99.5% SLA",
      "Rate limiting flexível"
    ],
    popular: false,
    cta: "Assinar Basic"
  },
  {
    name: "Premium",
    icon: Crown,
    price: "R$ 99,90",
    period: "/mês",
    description: "Nosso plano mais recomendado para empresas e aplicações em crescimento, com um volume robusto de requisições e acesso a uma gama completa de modelos.",
    requests: "10.000 requisições por dia",
    models: "Acesso a todos os modelos de IA disponíveis ",
    support: "E-mail e chat prioritários",
    features: [
      "10.000 requisições/dia",
      "Todos os modelos de IA",
      "Busca na web integrada",
      "Suporte prioritário",
      "Analytics avançado",
      "99.9% SLA",
      "Webhooks personalizados",
      "Rate limiting customizável"
    ],
    popular: true,
    cta: "Assinar Premium"
  },
  {
    name: "Unlimited",
    icon: Infinity,
    price: "R$ 199,90",
    period: "/mês",
    description: "Para grandes corporações e projetos que demandam uso irrestrito da API, alta disponibilidade e suporte exclusivo.",
    requests: "Requisições ilimitadas",
    models: "Acesso prioritário a todos os modelos, incluindo futuras novidades e otimizações",
    support: "Suporte empresarial dedicado e consultoria técnica",
    features: [
      "Requisições ilimitadas",
      "Acesso prioritário a novos modelos",
      "Todas as funcionalidades avançadas",
      "Suporte dedicado 24/7",
      "Consultoria técnica",
      "SLA personalizado (99.99%)",
      "Infraestrutura dedicada",
      "Prioridade em implementações",
      "Rate limiting removido"
    ],
    popular: false,
    cta: "Assinar Unlimited"
  }
];

const Planos = () => {
  const { user, session, subscription } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planName: string) => {
    if (!user || !session) {
      toast.error("Você precisa estar logado para assinar um plano");
      return;
    }

    setLoading(planName);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan: planName },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (error) {
        toast.error("Erro ao criar sessão de pagamento");
        console.error(error);
      } else if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast.error("Erro ao processar pagamento");
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-8">
        <section className="gradient-hero py-16">
          <div className="mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              🚀 Planos de API do Agente Inteligente
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades. 
              Todos os planos incluem acesso à nossa API de IA avançada.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-smooth relative border ${
                    plan.popular ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="gradient-primary text-white text-sm font-semibold px-4 py-2 rounded-full">
                        ⭐ Mais recomendado
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          plan.popular ? 'gradient-primary' : 'bg-muted'
                        }`}>
                          <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-muted-foreground'}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                      </div>
                      <div className="mb-3">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground text-lg">{plan.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {plan.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-primary-muted rounded-lg">
                      <div className="font-semibold text-primary mb-1">Limite de Requisições:</div>
                      <div className="text-sm text-foreground">{plan.requests}</div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="font-semibold text-foreground mb-1">Modelos de IA:</div>
                      <div className="text-sm text-muted-foreground">{plan.models}</div>
                    </div>
                    
                    <div className="p-4 bg-accent rounded-lg">
                      <div className="font-semibold text-foreground mb-1">Suporte:</div>
                      <div className="text-sm text-muted-foreground">{plan.support}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Funcionalidades incluídas:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className={`w-full text-base py-3 ${
                      plan.popular 
                        ? 'gradient-primary border-0 shadow-hero' 
                        : 'border-border hover:bg-card-hover'
                    }`}
                    variant={
                      subscription?.subscription_tier === plan.name ? "secondary" :
                      plan.popular ? "default" : "outline"
                    }
                    onClick={user ? () => handleSubscribe(plan.name.toLowerCase()) : undefined}
                    disabled={loading === plan.name.toLowerCase() || subscription?.subscription_tier === plan.name}
                    size="lg"
                    asChild={!user}
                  >
                    {user ? (
                      <>
                        {loading === plan.name.toLowerCase() ? "Processando..." : 
                         subscription?.subscription_tier === plan.name ? "Plano Atual" : 
                         plan.cta}
                      </>
                    ) : (
                      <Link to="/login">{plan.cta}</Link>
                    )}
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Precisa de algo personalizado? Entre em contato conosco.
              </p>
              <Link to="/contato">
                <Button variant="outline" size="lg" className="border-border hover:bg-card-hover">
                  Falar com especialista
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Planos;