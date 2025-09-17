import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Termos() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Termos de Uso</h1>
            <p className="text-xl text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Termos e Condições de Uso - AI Central</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
                <p className="mb-4">
                  Ao acessar e usar os serviços da VexPro, você concorda em cumprir e estar sujeito aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Descrição dos Serviços</h2>
                <p className="mb-4">
                  A VexPro oferece serviços de inteligência artificial através de uma API que permite aos usuários fazer perguntas e receber respostas sintetizadas utilizando tecnologia de orquestração de IA avançada.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Uso Aceitável</h2>
                <p className="mb-4">Você concorda em usar nossos serviços apenas para fins legais e de acordo com estes termos. É proibido:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Usar os serviços para qualquer propósito ilegal ou não autorizado</li>
                  <li>Tentar comprometer a segurança dos nossos sistemas</li>
                  <li>Fazer uso excessivo que possa prejudicar o desempenho dos serviços</li>
                  <li>Compartilhar suas credenciais de acesso com terceiros</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Planos e Pagamentos</h2>
                <p className="mb-4">
                  Oferecemos diferentes planos de serviço com limites específicos de requisições. Os pagamentos são processados através de provedores de pagamento seguros e as cobranças são realizadas conforme o plano escolhido.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
                <p className="mb-4">
                  Todos os direitos de propriedade intelectual relacionados aos serviços da VexPro permanecem de nossa propriedade. Você mantém os direitos sobre o conteúdo que submete através de nossos serviços.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Limitação de Responsabilidade</h2>
                <p className="mb-4">
                  A VexPro não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais resultantes do uso de nossos serviços. Fornecemos os serviços "como estão" sem garantias expressas ou implícitas.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Modificações dos Termos</h2>
                <p className="mb-4">
                  Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação. O uso continuado dos serviços constitui aceitação dos termos modificados.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Contato</h2>
                <p className="mb-4">
                  Para questões sobre estes termos, entre em contato conosco através da nossa página de contato ou pelo email vexpro.sc@gmail.com.
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