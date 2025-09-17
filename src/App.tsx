import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth.tsx";
import { ThemeProvider } from "@/hooks/useTheme";
import Home from "./pages/Home";
import Planos from "./pages/Planos";
import Dashboard from "./pages/Dashboard";
import Docs from "./pages/Docs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
// Importe as novas páginas
import Contato from "./pages/Contato";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import AuthCallback from "./pages/AuthCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vexpro-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/planos" element={<Planos />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/login" element={<Login />} />
              {/* Rotas adicionadas para corrigir o erro 404 */}
              <Route path="/contato" element={<Contato />} />
              <Route path="/termos" element={<Termos />} />
              <Route path="/politica" element={<Privacidade />} />
              {/* O catch-all deve ser a última rota */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;