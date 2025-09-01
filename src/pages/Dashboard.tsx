import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, Crown, User, Key, Calendar, CheckCircle, LogOut, Activity, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, subscription, checkSubscription } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      checkSubscription(); // Refresh subscription status
    }
  }, [user, checkSubscription]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copiado para a área de transferência!`);
    } catch (err) {
      toast.error('Erro ao copiar para a área de transferência');
    }
  };

  const handleManageSubscription = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        toast.error("Erro ao abrir portal de gerenciamento");
        console.error(error);
      } else if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast.error("Erro ao processar solicitação");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo, {user.email}! Gerencie sua conta e acompanhe suas assinaturas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Subscription Status Card */}
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
                {subscription?.subscription_tier ? (
                  <p className="text-2xl font-bold text-foreground">
                    {subscription.subscription_tier}
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-foreground">Freemium</p>
                )}
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

          {/* Profile Info Card */}
          <Card className="bg-card shadow-card hover:shadow-card-hover transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Informações do Perfil</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Nome</p>
                  <p className="text-sm font-medium text-foreground">
                    {profile?.full_name || 'Não informado'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">
                    {user.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Membro desde</p>
                  <p className="text-sm font-medium text-foreground">
                    {profile?.created_at ? formatDate(profile.created_at) : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Key Card */}
          <Card className="bg-card shadow-card hover:shadow-card-hover transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">API Key</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-muted px-2 py-1 rounded text-xs font-mono truncate">
                    {profile?.api_key || 'Carregando...'}
                  </code>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => copyToClipboard(profile?.api_key, 'API Key')}
                    disabled={!profile?.api_key}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use esta chave para integrar com a API da Vexpro AI
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats Card */}
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
                    {subscription?.subscription_tier === 'Basic' ? '1.000' :
                     subscription?.subscription_tier === 'Premium' ? '10.000' :
                     subscription?.subscription_tier === 'Ilimitado' ? '∞' : '100'} requisições
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Uso hoje:</span>
                  <span className="text-xs font-medium">0 requisições</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="bg-card shadow-card hover:shadow-card-hover transition-smooth md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Ações Rápidas</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
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
                  onClick={() => checkSubscription()}
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