import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Code, Key, Send, ExternalLink, Clock, Shield, Zap } from "lucide-react";
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

  const curlExampleBearer = `curl -X POST https://aicentral.store/api/v1/ask \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer SEU_API_KEY" \\
-d '{
  "question": "Qual é a tecnologia de orquestração utilizada aqui?",
  "session_id": "minha-sessao-123",
  "temperature": 0.7
}'`;

  const curlExampleXAPI = `curl -X POST https://aicentral.store/api/v1/ask \\
-H "Content-Type: application/json" \\
-H "X-API-Key: SEU_API_KEY" \\
-d '{
  "question": "Qual é a tecnologia de orquestração utilizada aqui?",
  "session_id": "minha-sessao-123"
}'`;

  const jsExample = `fetch("https://aicentral.store/api/v1/ask", {
  method: "POST",
  headers: {
    "Authorization": "Bearer SEU_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ 
    question: "Qual é a tecnologia de orquestração utilizada aqui?",
    session_id: "minha-sessao-123",
    temperature: 0.7
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

  const pythonExample = `import requests

url = "https://aicentral.store/api/v1/ask"
headers = {
    "Authorization": "Bearer SEU_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "question": "Qual é a tecnologia de orquestração utilizada aqui?",
    "session_id": "minha-sessao-123",
    "temperature": 0.7
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)`;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                📚 Documentação da API VexPro AI Orchestrator
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Aprenda como integrar nossa API de IA orquestrada em seus projetos. Múltiplos serviços (Groq, Gemini, Cohere, Google Search) em uma única API.
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

        {/* Base URL */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Base URL</span>
                  </CardTitle>
                  <CardDescription>
                    Todas as requisições devem ser feitas para esta URL base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <code className="text-lg font-mono">https://aicentral.store/api/v1</code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                🔐 Autenticação
              </h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Duas formas de autenticação</CardTitle>
                  <CardDescription>
                    Você pode escolher uma das duas formas para se autenticar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      1. Header Authorization (Bearer Token)
                    </h4>
                    <div className="bg-muted p-3 rounded text-sm">
                      <code>Authorization: Bearer SEU_API_KEY</code>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Exemplo: Authorization: Bearer sk-example-12345
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Key className="w-4 h-4 mr-2" />
                      2. Header X-API-Key
                    </h4>
                    <div className="bg-muted p-3 rounded text-sm">
                      <code>X-API-Key: SEU_API_KEY</code>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Exemplo: X-API-Key: sk-example-12345
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Importante:</strong> A chave de API é validada no backend. Se a chave for inválida ou estiver ausente, a requisição será rejeitada com um erro 401 Unauthorized.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                🔗 Endpoint Principal
              </h2>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">POST</Badge>
                      <span>/ask</span>
                    </CardTitle>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      https://aicentral.store/api/v1/ask
                    </code>
                  </div>
                  <CardDescription>
                    Endpoint principal para interagir com a IA. Orquestra múltiplos serviços (Groq, Gemini, Cohere, Google Search) para fornecer a melhor resposta possível.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Parâmetros do corpo da requisição (JSON):</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Campo</th>
                              <th className="text-left p-2">Tipo</th>
                              <th className="text-left p-2">Descrição</th>
                              <th className="text-left p-2">Obrigatório</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="p-2"><code>question</code></td>
                              <td className="p-2">string</td>
                              <td className="p-2">A pergunta do usuário</td>
                              <td className="p-2">✅ Sim</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2"><code>session_id</code></td>
                              <td className="p-2">string</td>
                              <td className="p-2">ID da sessão para manter histórico da conversa</td>
                              <td className="p-2">❌ Não</td>
                            </tr>
                            <tr>
                              <td className="p-2"><code>temperature</code></td>
                              <td className="p-2">number</td>
                              <td className="p-2">Controla a criatividade (0-2)</td>
                              <td className="p-2">❌ Não</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Exemplo de requisição:</h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "question": "Qual é a tecnologia de orquestração utilizada aqui?",
  "session_id": "minha-sessao-123",
  "temperature": 0.7
}`}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Estrutura da resposta:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Campo</th>
                              <th className="text-left p-2">Tipo</th>
                              <th className="text-left p-2">Descrição</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="p-2"><code>id</code></td>
                              <td className="p-2">string</td>
                              <td className="p-2">ID único para a resposta da API</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2"><code>created</code></td>
                              <td className="p-2">integer</td>
                              <td className="p-2">Timestamp da criação (em segundos)</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2"><code>session_id</code></td>
                              <td className="p-2">string</td>
                              <td className="p-2">ID da sessão usado na requisição</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2"><code>provider</code></td>
                              <td className="p-2">string</td>
                              <td className="p-2">Indica que foi gerado pelo orquestrador</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2"><code>answer</code></td>
                              <td className="p-2">string</td>
                              <td className="p-2">A resposta da IA para sua pergunta</td>
                            </tr>
                            <tr>
                              <td className="p-2"><code>usage</code></td>
                              <td className="p-2">object</td>
                              <td className="p-2">Metadados de uso (opcional)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Exemplo de resposta:</h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "id": "chatcmpl-unique-id-123",
  "created": 1756417200,
  "session_id": "minha-sessao-123",
  "provider": "groq_orchestrated",
  "answer": "A tecnologia de orquestração utilizada é baseada no modelo Groq, que integra informações de outras fontes como Google Search, Gemini e Cohere para fornecer uma resposta mais completa."
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                💻 Exemplos de Código
              </h2>
              
              <div className="space-y-8">
                {/* cURL Bearer Example */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">cURL (Bearer Token)</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(curlExampleBearer)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {curlExampleBearer}
                  </pre>
                </div>

                {/* cURL X-API-Key Example */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">cURL (X-API-Key)</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(curlExampleXAPI)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {curlExampleXAPI}
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

        {/* Rate Limiting & Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                ⚡ Recursos Adicionais
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rate Limiting */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Limitação de Taxa</span>
                    </CardTitle>
                    <CardDescription>
                      Controle de uso diário das requisições
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        O endpoint /ask possui limite de requisições diárias. Verifique os headers da resposta:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li><code className="bg-muted px-1 rounded">X-RateLimit-Limit</code>: Limite diário</li>
                        <li><code className="bg-muted px-1 rounded">X-RateLimit-Remaining</code>: Requisições restantes</li>
                        <li><code className="bg-muted px-1 rounded">X-RateLimit-Reset</code>: Reset em UTC</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Sessions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Sessões e Histórico</span>
                    </CardTitle>
                    <CardDescription>
                      Mantenha contexto nas conversas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        O histórico da conversa é mantido por até 15 minutos após a última interação.
                      </p>
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Dica:</strong> Use o mesmo session_id para manter o contexto da conversa.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                🚀 Como Começar
              </h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Passos para integrar a API</CardTitle>
                  <CardDescription>
                    Siga estes passos para começar a usar nossa API de IA orquestrada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Obtenha sua API Key</h4>
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
                        <h4 className="font-semibold text-foreground">Configure a autenticação</h4>
                        <p className="text-sm text-muted-foreground">
                          Escolha entre Bearer Token ou X-API-Key para autenticar suas requisições.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Faça sua primeira chamada</h4>
                        <p className="text-sm text-muted-foreground">
                          Envie uma pergunta para o endpoint /ask e receba uma resposta inteligente orquestrada.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Explore recursos avançados</h4>
                        <p className="text-sm text-muted-foreground">
                          Use sessões para manter contexto, ajuste a temperatura para controlar criatividade e monitore seus limites de uso.
                        </p>
                      </div>
                    </div>
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