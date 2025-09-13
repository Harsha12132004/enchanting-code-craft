import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Measurements from "./pages/Measurements";
import PhotoUploadPage from "./pages/PhotoUpload";
import ProductSelectionPage from "./pages/ProductSelectionPage";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/measurements" element={<Measurements />} />
          <Route path="/photo-upload" element={<PhotoUploadPage />} />
          <Route path="/product-selection" element={<ProductSelectionPage />} />
          <Route path="/analysis" element={<Analysis />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
