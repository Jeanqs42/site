import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, Send, CheckCircle, AlertCircle, Activity, Zap, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [apiKey, setApiKey] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [keyStatus, setKeyStatus] = useState<"valid" | "invalid" | null>(null);
  const { toast } = useToast();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const validateKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma API Key válida.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      const response = await fetch("https://aicentral.store/api/v1/validate-key", {
        method: "GET",
        headers: {
          "X-API-Key": apiKey,
        },
      });
      
      if (response.ok) {
        setKeyStatus("valid");
        toast({
          title: "Sucesso",
          description: "API Key validada com sucesso!",
        });
      } else {
        setKeyStatus("invalid");
        toast({
          title: "Erro",
          description: "API Key inválida ou expirada.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setKeyStatus("invalid");
      toast({
        title: "Erro",
        description: "Erro ao validar API Key. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const askQuestion = async () => {
    if (!apiKey.trim() || !question.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma API Key e uma pergunta.",
        variant: "destructive",
      });
      return;
    }

    setIsAsking(true);
    try {
      const response = await fetch("https://aicentral.store/api/v1/ask", {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResponse(data.answer || "Resposta recebida com sucesso!");
        toast({
          title: "Sucesso",
          description: "Pergunta processada com sucesso!",
        });
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao processar pergunta.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao conectar com a API. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo, {user.email}! Gerencie sua API Key e teste nossa API de IA em tempo real.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* API Key Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>Configuração da API Key</span>
                </CardTitle>
                <CardDescription>
                  Configure e valide sua API Key para começar a usar nossos serviços.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apikey">API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="apikey"
                      type="password"
                      placeholder="Insira sua API Key aqui..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={validateKey} 
                      disabled={isValidating}
                      className="gradient-primary border-0"
                      size="sm"
                    >
                      {isValidating ? "Validando..." : "Validar"}
                    </Button>
                  </div>
                  {keyStatus && (
                    <div className={`flex items-center space-x-2 text-sm ${
                      keyStatus === "valid" ? "text-green-600" : "text-red-600"
                    }`}>
                      {keyStatus === "valid" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      <span>
                        {keyStatus === "valid" ? "API Key válida" : "API Key inválida"}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Playground Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Playground</span>
                </CardTitle>
                <CardDescription>
                  Teste nossa API fazendo perguntas em tempo real.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Sua pergunta</Label>
                  <Textarea
                    id="question"
                    placeholder="Digite sua pergunta aqui... Por exemplo: 'Qual a capital da França?'"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={askQuestion} 
                  disabled={isAsking || !apiKey}
                  className="gradient-primary border-0 w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isAsking ? "Processando..." : "Enviar pergunta"}
                </Button>
                
                {response && (
                  <div className="space-y-2">
                    <Label>Resposta da IA</Label>
                    <div className="p-4 bg-muted rounded-lg border">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {response}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Status da Conta</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plano atual:</span>
                  <Badge variant="secondary">Freemium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Limite diário:</span>
                  <span className="text-sm font-medium">100 requisições</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uso atual:</span>
                  <span className="text-sm font-medium">23/100</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: "23%" }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Upgrade</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Precisa de mais requisições? Faça upgrade para o plano Basic e obtenha 1.000 requisições/dia.
                </p>
                <Button variant="outline" className="w-full border-border hover:bg-card-hover">
                  Ver planos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;