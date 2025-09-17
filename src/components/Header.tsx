import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Brain, User, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth.tsx";
import { useTheme } from "@/hooks/useTheme";

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">AI Central</span>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {/* Novo botão para o tema Sépia */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme("sepia")}
              className="flex items-center"
            >
              {/* Você pode usar um ícone diferente ou um texto para o botão Sépia */}
              <span>Sépia</span>
            </Button>
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;