import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      // Here you would handle the actual authentication
      // For now, we'll just show a message about Supabase integration
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">Vexpro AI</span>
          </Link>
          <p className="text-muted-foreground mt-2">
            Acesse sua conta para gerenciar sua API
          </p>
        </div>

        <Card className="shadow-hero border-border/50">
          <CardHeader className="text-center">
            <CardTitle>Bem-vindo de volta</CardTitle>
            <CardDescription>
              Entre na sua conta ou crie uma nova para começar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gradient-primary border-0 shadow-hero"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                    {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </form>
                
                <div className="text-center">
                  <a 
                    href="#" 
                    className="text-sm text-primary hover:text-primary-hover transition-base"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gradient-primary border-0 shadow-hero"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar conta"}
                    {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </form>
                
                <div className="text-center text-xs text-muted-foreground">
                  Ao criar uma conta, você concorda com nossos{" "}
                  <a href="#" className="text-primary hover:text-primary-hover">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-primary hover:text-primary-hover">
                    Política de Privacidade
                  </a>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Supabase Integration Notice */}
        <Card className="mt-6 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-yellow-800 mb-2">
                🔧 Funcionalidade em desenvolvimento
              </h3>
              <p className="text-sm text-yellow-700">
                Para implementar autenticação completa, conecte este projeto ao Supabase 
                clicando no botão verde "Supabase" no topo direito da interface.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-primary transition-base"
          >
            ← Voltar para home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;