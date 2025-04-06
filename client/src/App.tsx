import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Features from "@/pages/features";
import Products from "@/pages/products";
import Agents from "@/pages/agents";
import Donate from "@/pages/donate";
import Login from "@/pages/login";
import Signup from "@/pages/signup";

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/features" component={Features} />
        <Route path="/products" component={Products} />
        <Route path="/agents" component={Agents} />
        <Route path="/donate" component={Donate} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
