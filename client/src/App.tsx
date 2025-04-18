import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MarketSummary from "@/pages/MarketSummary";
import About from "@/pages/About";
import Fees from "@/pages/Fees";
import Help from "@/pages/Help";
import AuthPage from "@/pages/auth-page";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Refund from "@/pages/Refund";
import Cookie from "@/pages/Cookie";
import Disclaimer from "@/pages/Disclaimer";
import University from "@/pages/University";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { ThemeProvider } from "@/components/theme/theme-provider";

function Router() {
  return (
    <Switch>
      {/* Main Pages */}
      <Route path="/" component={Home} />
      <Route path="/market" component={MarketSummary} />
      <Route path="/about" component={About} />
      <Route path="/fees" component={Fees} />
      <Route path="/help" component={Help} />
      <Route path="/university" component={University} />
      <Route path="/auth" component={AuthPage} />
      
      {/* Legal Pages */}
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/refund" component={Refund} />
      <Route path="/cookie" component={Cookie} />
      <Route path="/disclaimer" component={Disclaimer} />
      
      {/* Protected Routes */}
      {/* <ProtectedRoute path="/dashboard" component={Dashboard} /> */}
      {/* <ProtectedRoute path="/settings" component={Settings} /> */}
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="hamma-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
