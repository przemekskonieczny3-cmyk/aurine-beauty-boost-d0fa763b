import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Receipt, FileSignature, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HistoryItem {
  id: string;
  type: "report" | "invoice" | "contract";
  subtype?: string;
  data: any;
  generatedAt: string;
  fileName: string;
}

const DocumentHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const stored = localStorage.getItem("documentHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  };

  const deleteItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("documentHistory", JSON.stringify(updated));
    toast.success("Dokument usunięty z historii");
  };

  const regenerateDocument = (item: HistoryItem) => {
    if (item.type === "report") {
      navigate("/report-generator", { state: { data: item.data } });
    } else if (item.type === "invoice") {
      navigate("/invoice-generator", { state: { data: item.data } });
    } else if (item.type === "contract") {
      navigate("/contract-generator", { state: { data: item.data } });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "report":
        return <FileText className="w-5 h-5 text-pink-500" />;
      case "invoice":
        return <Receipt className="w-5 h-5 text-purple-500" />;
      case "contract":
        return <FileSignature className="w-5 h-5 text-rose-500" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (item: HistoryItem) => {
    if (item.type === "invoice" && item.subtype) {
      switch (item.subtype) {
        case "advance":
          return "Faktura Zaliczkowa";
        case "final":
          return "Faktura Końcowa";
        case "full":
          return "Faktura Pełna";
      }
    }
    switch (item.type) {
      case "report":
        return "Raport Facebook Ads";
      case "invoice":
        return "Faktura";
      case "contract":
        return "Umowa Marketingowa";
      default:
        return "Dokument";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
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
            <h1 className="text-xl font-bold">Historia Dokumentów</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {history.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-2xl p-8 mb-4">
                <FileText className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Brak dokumentów w historii
                </h2>
                <p className="text-zinc-400">
                  Wygenerowane dokumenty będą wyświetlane tutaj
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-800 rounded-xl p-6 hover:border-pink-500/50 transition-all animate-fade-in"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-black/50 border border-zinc-800 rounded-lg p-3">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">
                          {getTypeLabel(item)}
                        </h3>
                        <p className="text-sm text-zinc-400">
                          {item.data.clientName || "Bez nazwy"}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          {new Date(item.generatedAt).toLocaleString("pl-PL")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => regenerateDocument(item)}
                        className="hover:bg-pink-500/10 hover:text-pink-500"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Wygeneruj ponownie
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                        className="hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <div>
              <p>© 2025 Aurine Agency · Kampanie Facebook ads dla salonów beauty</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://aurine.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                aurine.pl
              </a>
              <span>·</span>
              <a
                href="https://wa.me/48731856524"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-500 transition-colors"
              >
                <span>+48 731 856 524</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DocumentHistory;
