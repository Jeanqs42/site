import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Vexpro AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-base hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/planos" 
              className={`text-sm font-medium transition-base hover:text-primary ${
                isActive('/planos') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Planos
            </Link>
            <Link 
              to="/docs" 
              className={`text-sm font-medium transition-base hover:text-primary ${
                isActive('/docs') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Docs
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="gradient-primary border-0 shadow-hero hover:opacity-90">
                Começar agora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;