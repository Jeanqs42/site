import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Política de Privacidade</h1>
            <p className="text-xl text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Política de Privacidade - VexPro</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Informações que Coletamos</h2>
                <p className="mb-4">
                  Coletamos informações quando você se registra em nossos serviços, faz uma compra, ou entra em contato conosco. Isso pode incluir:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Nome e informações de contato</li>
                  <li>Informações de pagamento (processadas por terceiros seguros)</li>
                  <li>Dados de uso da API e interações com nossos serviços</li>
                  <li>Informações técnicas como endereço IP e dados do dispositivo</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Como Usamos suas Informações</h2>
                <p className="mb-4">Utilizamos as informações coletadas para:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Processar pagamentos e gerenciar sua conta</li>
                  <li>Comunicar sobre atualizações e suporte</li>
                  <li>Analisar o uso dos serviços para otimização</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Compartilhamento de Informações</h2>
                <p className="mb-4">
                  Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provedores de serviços confiáveis que nos auxiliam nas operações</li>
                  <li>Quando exigido por lei ou processo legal</li>
                  <li>Para proteger nossos direitos ou a segurança dos usuários</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Segurança dos Dados</h2>
                <p className="mb-4">
                  Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Controles de acesso rigorosos</li>
                  <li>Monitoramento regular de segurança</li>
                  <li>Treinamento da equipe sobre práticas de privacidade</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Retenção de Dados</h2>
                <p className="mb-4">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos</h2>
                <p className="mb-4">Você tem o direito de:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir informações inexatas</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Limitar o processamento de suas informações</li>
                  <li>Portabilidade de dados</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Cookies e Tecnologias Similares</h2>
                <p className="mb-4">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do site e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Alterações nesta Política</h2>
                <p className="mb-4">
                  Podemos atualizar esta política de privacidade periodicamente. Notificaremos sobre mudanças significativas através do nosso site ou por email.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Contato</h2>
                <p className="mb-4">
                  Para questões sobre esta política de privacidade ou sobre como tratamos seus dados pessoais, entre em contato conosco através da nossa página de contato ou pelo email vexpro.sc@gmail.com.com.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}