import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Vexpro AI</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Transforme ideias em respostas com nossa API de IA rápida, segura e escalável.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Produto</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/planos" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Documentação
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/politica" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Vexpro AI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;