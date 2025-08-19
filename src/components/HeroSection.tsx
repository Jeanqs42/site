import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary-muted text-primary px-3 py-1 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>API de IA mais avançada</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Transforme ideias em{" "}
                <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                  respostas
                </span>{" "}
                com nossa API de IA
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Uma API rápida, segura e escalável para gerar respostas inteligentes. 
                Integre IA avançada em seus projetos em minutos.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="gradient-primary border-0 shadow-hero hover:opacity-90 transition-smooth group w-full sm:w-auto"
                >
                  Começar agora
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-border hover:bg-card-hover transition-base"
                >
                  Ver documentação
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>99.9% uptime</span>
              </div>
              <div>
                <span>Mais de 1M+ requisições/dia</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-hero">
              <img 
                src={heroImage} 
                alt="Vexpro AI Interface" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;