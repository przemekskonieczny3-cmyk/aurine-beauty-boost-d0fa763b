import { Receipt, Calendar, Building2, FileText } from "lucide-react";

interface InvoicePreviewProps {
  data: {
    invoiceType: "advance" | "final" | "full";
    clientName: string;
    clientAddress: string;
    invoiceNumber: string;
    issueDate: string;
    serviceDescription: string;
    amount: string;
    advanceAmount?: string;
  };
}

const InvoicePreview = ({ data }: InvoicePreviewProps) => {
  const getInvoiceTypeLabel = () => {
    switch (data.invoiceType) {
      case "advance":
        return "Faktura Zaliczkowa";
      case "final":
        return "Faktura Końcowa";
      case "full":
        return "Faktura Pełna";
    }
  };

  const getFinalAmount = () => {
    if (data.invoiceType === "final" && data.advanceAmount) {
      return (parseFloat(data.amount) - parseFloat(data.advanceAmount)).toFixed(2);
    }
    if (data.invoiceType === "advance" && data.advanceAmount) {
      return parseFloat(data.advanceAmount).toFixed(2);
    }
    return parseFloat(data.amount).toFixed(2);
  };

  return (
    <div
      id="invoice-preview"
      className="bg-black text-white w-[794px] min-h-[1123px] p-8 mx-auto"
    >
      {/* Header */}
      <header className="flex items-start justify-between mb-8 border-b border-zinc-800 pb-6">
        <div>
          <img
            src="/src/assets/aurine-logo.png"
            alt="Aurine"
            className="h-12 mb-4"
          />
          <div className="text-sm text-zinc-400">
            <p className="font-semibold text-white">Aurine Agency</p>
            <p>ul. Przykładowa 123</p>
            <p>00-000 Warszawa</p>
            <p>NIP: 1234567890</p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-block bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-lg px-4 py-2 mb-2">
            <Receipt className="w-5 h-5 text-pink-500 inline mr-2" />
            <span className="text-pink-500 font-bold">{getInvoiceTypeLabel()}</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{data.invoiceNumber}</p>
        </div>
      </header>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-purple-500" />
              <h3 className="font-bold text-white">Nabywca</h3>
            </div>
            <div className="text-sm text-zinc-300">
              <p className="font-semibold text-white mb-1">{data.clientName}</p>
              {data.clientAddress && <p>{data.clientAddress}</p>}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-rose-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-white">Data wystawienia</h3>
            </div>
            <p className="text-lg font-semibold text-white">
              {new Date(data.issueDate).toLocaleDateString("pl-PL")}
            </p>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 p-4 border-b border-pink-500/30">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-500" />
              <h3 className="font-bold text-white">Usługi</h3>
            </div>
          </div>
          
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                  <th className="text-left pb-3">Nazwa usługi</th>
                  <th className="text-center pb-3">Ilość</th>
                  <th className="text-right pb-3">Cena netto</th>
                  <th className="text-right pb-3">Wartość netto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-white">
                  <td className="py-4">{data.serviceDescription}</td>
                  <td className="text-center py-4">1</td>
                  <td className="text-right py-4">{getFinalAmount()} PLN</td>
                  <td className="text-right py-4 font-bold">{getFinalAmount()} PLN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-400">Wartość netto:</span>
            <span className="text-xl font-bold text-white">{getFinalAmount()} PLN</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-400">VAT:</span>
            <span className="text-white">Zwolnione z VAT</span>
          </div>
          <div className="border-t border-emerald-500/30 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-emerald-400">Razem do zapłaty:</span>
              <span className="text-3xl font-bold text-emerald-400">{getFinalAmount()} PLN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info for Final Invoice */}
      {data.invoiceType === "final" && data.advanceAmount && (
        <div className="mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <p className="text-sm text-zinc-300">
              <span className="text-purple-400 font-semibold">Informacja:</span> Zaliczka w wysokości{" "}
              <span className="font-bold text-white">{data.advanceAmount} PLN</span> została
              uiszczona wcześniej. Pozostała kwota do zapłaty:{" "}
              <span className="font-bold text-white">{getFinalAmount()} PLN</span>
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800 pt-6 mt-auto">
        <div className="flex justify-between items-center text-sm text-zinc-500">
          <div>
            <p className="text-pink-500 font-semibold mb-1">Powered by Aurine</p>
            <p>© 2025 Aurine Agency · Kampanie Facebook ads dla salonów beauty</p>
          </div>
          <div className="text-right">
            <a
              href="https://aurine.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              aurine.pl
            </a>
            <p className="mt-1">+48 731 856 524</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvoicePreview;
