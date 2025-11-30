import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneratorSelector from "./pages/GeneratorSelector";
import ReportGenerator from "./pages/ReportGenerator";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import ContractGenerator from "./pages/ContractGenerator";
import NotFound from "./pages/NotFound";
import MobileBottomNav from "@/components/MobileBottomNav";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<GeneratorSelector />} />
            <Route path="/report-generator" element={<ReportGenerator />} />
            <Route path="/invoice-generator" element={<InvoiceGenerator />} />
            <Route path="/contract-generator" element={<ContractGenerator />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileBottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
