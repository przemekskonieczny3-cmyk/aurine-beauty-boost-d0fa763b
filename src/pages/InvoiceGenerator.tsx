import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Eye, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type InvoiceType = "advance" | "final" | "full";

const InvoiceGenerator = () => {
  const navigate = useNavigate();
  const [invoiceType, setInvoiceType] = useState<InvoiceType>("full");
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    invoiceNumber: "",
    issueDate: new Date().toISOString().split("T")[0],
    serviceDescription: "Usługi marketingowe Facebook Ads",
    amount: "",
    advanceAmount: "",
  });

  const invoiceTypes = [
    {
      id: "advance" as InvoiceType,
      label: "Faktura Zaliczkowa",
      description: "Płatność zaliczki przed rozpoczęciem kampanii",
    },
    {
      id: "final" as InvoiceType,
      label: "Faktura Końcowa",
      description: "Rozliczenie końcowe po zaliczce",
    },
    {
      id: "full" as InvoiceType,
      label: "Faktura Pełna",
      description: "Pełna kwota usługi",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreview = () => {
    if (!formData.clientName || !formData.invoiceNumber || !formData.amount) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    if (invoiceType === "final" && !formData.advanceAmount) {
      toast.error("Podaj kwotę zaliczki dla faktury końcowej");
      return;
    }

    setShowPreview(true);
  };

  const handleGeneratePDF = async () => {
    toast.loading("Generowanie PDF...");
    
    const element = document.getElementById("invoice-preview");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#000000",
      });

      const imgData = canvas.toDataURL("image/png", 0.95);
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [imgWidth, imgHeight],
        compress: true,
      });

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

      const fileName = `${formData.invoiceNumber.replace(/\//g, "-")}-${formData.clientName.replace(/\s+/g, "-")}.pdf`;
      pdf.save(fileName);

      // Save to history
      const historyItem = {
        id: Date.now().toString(),
        type: "invoice" as const,
        subtype: invoiceType,
        data: { ...formData, invoiceType },
        generatedAt: new Date().toISOString(),
        fileName,
      };

      const history = JSON.parse(localStorage.getItem("documentHistory") || "[]");
      history.unshift(historyItem);
      localStorage.setItem("documentHistory", JSON.stringify(history));

      toast.success("Faktura została wygenerowana");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Błąd podczas generowania PDF");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-zinc-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img
                src="/src/assets/aurine-logo.png"
                alt="Aurine"
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold">Generator Faktur</h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/document-history")}
              className="hover:bg-zinc-800"
            >
              <History className="w-5 h-5 mr-2" />
              Historia
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Invoice Type Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">
              Wybierz typ faktury
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {invoiceTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setInvoiceType(type.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    invoiceType === type.id
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-zinc-800 hover:border-pink-500/50"
                  }`}
                >
                  <h3 className="font-bold mb-2">{type.label}</h3>
                  <p className="text-sm text-zinc-400">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 text-white">
              Dane faktury
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="clientName">Nazwa klienta *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  className="bg-black border-zinc-800"
                  placeholder="Salon Beauty XYZ"
                />
              </div>

              <div>
                <Label htmlFor="invoiceNumber">Numer faktury *</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) =>
                    handleInputChange("invoiceNumber", e.target.value)
                  }
                  className="bg-black border-zinc-800"
                  placeholder="FV/2025/001"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="clientAddress">Adres klienta</Label>
                <Input
                  id="clientAddress"
                  value={formData.clientAddress}
                  onChange={(e) =>
                    handleInputChange("clientAddress", e.target.value)
                  }
                  className="bg-black border-zinc-800"
                  placeholder="ul. Przykładowa 123, 00-000 Warszawa"
                />
              </div>

              <div>
                <Label htmlFor="issueDate">Data wystawienia</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => handleInputChange("issueDate", e.target.value)}
                  className="bg-black border-zinc-800"
                />
              </div>

              <div>
                <Label htmlFor="amount">
                  {invoiceType === "final" ? "Kwota całkowita" : "Kwota"} (PLN) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="bg-black border-zinc-800"
                  placeholder="5000"
                />
              </div>

              {invoiceType === "final" && (
                <div>
                  <Label htmlFor="advanceAmount">Zaliczka (PLN) *</Label>
                  <Input
                    id="advanceAmount"
                    type="number"
                    value={formData.advanceAmount}
                    onChange={(e) =>
                      handleInputChange("advanceAmount", e.target.value)
                    }
                    className="bg-black border-zinc-800"
                    placeholder="2000"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <Label htmlFor="serviceDescription">Opis usługi</Label>
                <Input
                  id="serviceDescription"
                  value={formData.serviceDescription}
                  onChange={(e) =>
                    handleInputChange("serviceDescription", e.target.value)
                  }
                  className="bg-black border-zinc-800"
                  placeholder="Usługi marketingowe Facebook Ads"
                />
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300">
                ℹ️ Wszystkie faktury są zwolnione z VAT
              </p>
            </div>

            {/* Generate Button */}
            <div className="mt-8">
              <Button
                onClick={handlePreview}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg py-6"
              >
                <Eye className="w-5 h-5 mr-2" />
                Podgląd i generowanie
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="mt-8 animate-fade-in">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Podgląd faktury</h2>
                  <Button
                    onClick={handleGeneratePDF}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Pobierz PDF
                  </Button>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                  <InvoicePreview data={{ ...formData, invoiceType }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InvoiceGenerator;
