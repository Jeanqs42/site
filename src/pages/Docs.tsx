import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Code, Key, Send, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Docs = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência.",
    });
  };

  const curlExample = `curl -X POST "http://18.230.116.139:8000/ask" \\
-H "X-API-Key: SUA_CHAVE" \\
-H "Content-Type: application/json" \\
-d '{"question": "Qual a capital da França?"}'`;

  const jsExample = `fetch("http://18.230.116.139:8000/ask", {
  method: "POST",
  headers: {
    "X-API-Key": "SUA_CHAVE",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ 
    question: "Qual a capital da França?" 
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

  const pythonExample = `import requests

url = "http://18.230.116.139:8000/ask"
headers = {
    "X-API-Key": "SUA_CHAVE",
    "Content-Type": "application/json"
}
data = {
    "question": "Qual a capital da França?"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)`;

  const validateExample = `curl -X GET "http://18.230.116.139:8000/validate-key" \\
-H "X-API-Key: SUA_CHAVE"`;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                📚 Documentação da API
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Aprenda como integrar nossa API de IA em seus projetos de forma rápida e simples.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary border-0 shadow-hero">
                  <Send className="w-4 h-4 mr-2" />
                  Começar agora
                </Button>
                <Button variant="outline" size="lg" className="border-border hover:bg-card-hover">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver exemplos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                🚀 Início Rápido
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">1. Obtenha sua API Key</h3>
                  <p className="text-sm text-muted-foreground">
                    Crie uma conta e obtenha sua chave única de acesso.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">2. Faça sua primeira chamada</h3>
                  <p className="text-sm text-muted-foreground">
                    Use nossa API RESTful simples para enviar perguntas.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">3. Receba respostas</h3>
                  <p className="text-sm text-muted-foreground">
                    Obtenha respostas inteligentes em tempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                🔗 Endpoints da API
              </h2>
              
              <div className="space-y-6">
                {/* Ask Endpoint */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">POST</Badge>
                        <span>/ask</span>
                      </CardTitle>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        http://18.230.116.139:8000/ask
                      </code>
                    </div>
                    <CardDescription>
                      Envie uma pergunta para a IA e receba uma resposta inteligente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Headers obrigatórios:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li><code>X-API-Key</code>: Sua chave de API</li>
                          <li><code>Content-Type</code>: application/json</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Body (JSON):</h4>
                        <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "question": "Qual a capital da França?"
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Resposta:</h4>
                        <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "answer": "A capital da França é Paris.",
  "model": "gpt-3.5-turbo",
  "usage": {
    "tokens": 42
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Validate Key Endpoint */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">GET</Badge>
                        <span>/validate-key</span>
                      </CardTitle>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        http://18.230.116.139:8000/validate-key
                      </code>
                    </div>
                    <CardDescription>
                      Valide se sua API Key está ativa e funcionando corretamente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Headers obrigatórios:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li><code>X-API-Key</code>: Sua chave de API</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Resposta (sucesso):</h4>
                        <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "valid": true,
  "plan": "premium",
  "remaining_requests": 9847
}`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                💻 Exemplos de Código
              </h2>
              
              <div className="space-y-8">
                {/* cURL Example */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">cURL</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(curlExample)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {curlExample}
                  </pre>
                </div>

                {/* JavaScript Example */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">JavaScript</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(jsExample)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {jsExample}
                  </pre>
                </div>

                {/* Python Example */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">Python</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(pythonExample)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {pythonExample}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Key Management */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                🔐 Gerenciamento de API Keys
              </h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Como gerar e usar sua API Key</CardTitle>
                  <CardDescription>
                    Siga estes passos para começar a usar nossa API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Crie sua conta</h4>
                        <p className="text-sm text-muted-foreground">
                          Registre-se em nossa plataforma e escolha o plano ideal para suas necessidades.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Acesse o Dashboard</h4>
                        <p className="text-sm text-muted-foreground">
                          Faça login e vá para o dashboard onde você pode gerar e gerenciar suas API Keys.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Valide sua chave</h4>
                        <p className="text-sm text-muted-foreground">
                          Use o endpoint de validação para verificar se sua chave está funcionando corretamente.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Faça suas primeiras chamadas</h4>
                        <p className="text-sm text-muted-foreground">
                          Comece a enviar perguntas para nossa API e receber respostas inteligentes.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Exemplo de validação:</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">cURL</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(validateExample)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {validateExample}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Docs;