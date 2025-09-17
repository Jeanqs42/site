import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, Crown, User, Key, CheckCircle, Activity, Zap, Bot } from "lucide-react"; // Adicionado o ícone 'Bot'
import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user, subscription, checkSubscription } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState<{ requests_today: number; daily_limit: number }>({
    requests_today: 0,
    daily_limit: 100,
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      checkSubscription();
    }
  }, [user, checkSubscription]);

  useEffect(() => {
    if (profile?.api_key) {
      fetchUsage(profile.api_key);
    }
  }, [profile?.api_key]);

  const fetchProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or(`api_key.eq.${user.id},user_id.eq.${user.id}`)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const fetchUsage = async (apiKey: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/v1/validate-key`, {
        headers: { "X-API-Key": apiKey },
      });

      if (!res.ok) throw new Error("Erro ao buscar uso da API");

      const data = await res.json();
      setUsage({
        requests_today: data.requests_today,
        daily_limit: data.daily_limit === -1 ? Infinity : data.daily_limit,
      });
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível carregar o uso da API");
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copiado para a área de transferência!`);
    } catch {
      toast.error("Erro ao copiar para a área de transferência");
    }
  };

  const handleManageSubscription = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal", {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        toast.error("Erro ao abrir portal de gerenciamento");
        console.error(error);
      } else if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      toast.error("Erro ao processar solicitação");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  // 🔹 Redireciona para home se não tiver usuário logado
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const percentUsage =
    usage.daily_limit === Infinity ? 0 : Math.min(100, (usage.requests_today / usage.daily_limit) * 100);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo, {profile?.full_name || "Usuário"}! Gerencie sua conta e acompanhe suas assinaturas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Status da Assinatura */}
          <Card className="bg-card shadow-card hover:shadow-card-hover transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Status da Assinatura</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {subscription?.subscribed ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="outline">Inativo</Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {subscription?.subscription_tier || "Freemium"}
                </p>
                {subscription?.subscription_end && (
                  <p className="text-xs text-muted-foreground">
                    Renova em: {formatDate(subscription.subscription_end)}
                  </p>
                )}
                {subscription?.subscribed ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManageSubscription}
                    disabled={loading}
                    className="w-full mt-2"
                  >
                    {loading ? "Carregando..." : "Gerenciar Assinatura"}
                  </Button>
                ) : (
                  <Link to="/planos">
                    <Button variant="default" size="sm" className="w-full mt-2">
                      Ver Planos
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informações do Perfil */}
          <Card className="bg-card shadow-card hover:shadow-card-hover transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Informações do Perfil</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Nome</p>
                  <p className="text-sm font-medium text-foreground">{profile?.full_name || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Membro desde</p>
                  <p className="text-sm font-medium text-foreground">
                    {profile?.created_at ? formatDate(profile.created_at) : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Key */}
          <Card className="bg-card shadow-card hover:shadow-card-hover transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">API Key</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-muted px-2 py-1 rounded text-xs font-mono truncate">
                    {profile?.api_key || "Carregando..."}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(profile?.api_key, "API Key")}
                    disabled={!profile?.api_key}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Use esta chave para integrar com a API da Vexpro AI</p>
              </div>
            </CardContent>
          </Card>

          {/* Uso da API */}
          <Card className="bg-card shadow-card hover:shadow-card-hover transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Uso da API</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Limite diário:</span>
                  <span className="text-xs font-medium">
                    {usage.daily_limit === Infinity ? "Ilimitado" : usage.daily_limit} requisições
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Uso hoje:</span>
                  <span className="text-xs font-medium">{usage.requests_today} requisições</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentUsage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card className="bg-card shadow-card hover:shadow-card-hover transition-smooth md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Ações Rápidas</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* INÍCIO DA MODIFICAÇÃO */}
                <a href="https://chatia-2pzrsk.manus.space" target="_blank" rel="noopener noreferrer">
                  <Button variant="default" size="sm" className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Bot className="h-4 w-4 mr-2" />
                    Testar Agente no Chat
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground px-1 pt-1">
                  Copie sua API Key e cole no chat para testar todo o potencial do nosso agente inteligente.
                </p>
                {/* FIM DA MODIFICAÇÃO */}
                <Link to="/planos">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Ver Planos
                  </Button>
                </Link>
                <Link to="/docs">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Documentação
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    checkSubscription();
                    if (profile?.api_key) fetchUsage(profile.api_key);
                  }}
                >
                  Atualizar Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}