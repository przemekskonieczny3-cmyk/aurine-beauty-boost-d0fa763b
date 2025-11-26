import { FileSignature, Calendar, Building2, DollarSign, Clock } from "lucide-react";

interface ContractPreviewProps {
  data: {
    clientName: string;
    clientAddress: string;
    clientNIP: string;
    contractNumber: string;
    signDate: string;
    serviceScope: string;
    contractValue: string;
    paymentTerms: string;
    contractDuration: string;
  };
}

const ContractPreview = ({ data }: ContractPreviewProps) => {
  return (
    <div
      id="contract-preview"
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
          <div className="inline-block bg-gradient-to-r from-rose-500/20 to-orange-500/20 border border-rose-500/30 rounded-lg px-4 py-2 mb-2">
            <FileSignature className="w-5 h-5 text-rose-500 inline mr-2" />
            <span className="text-rose-500 font-bold">Umowa Marketingowa</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{data.contractNumber}</p>
        </div>
      </header>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-2">
          UMOWA O ŚWIADCZENIE USŁUG MARKETINGOWYCH
        </h1>
        <p className="text-zinc-400">zawarta w dniu {new Date(data.signDate).toLocaleDateString("pl-PL")}</p>
      </div>

      {/* Parties */}
      <div className="mb-8 space-y-4">
        <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-xl p-6">
          <h3 className="font-bold text-pink-500 mb-3">ZLECENIODAWCA:</h3>
          <div className="text-sm text-zinc-300 space-y-1">
            <p className="font-semibold text-white text-base">{data.clientName}</p>
            {data.clientAddress && <p>{data.clientAddress}</p>}
            {data.clientNIP && <p>NIP: {data.clientNIP}</p>}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <h3 className="font-bold text-purple-500 mb-3">ZLECENIOBIORCA:</h3>
          <div className="text-sm text-zinc-300 space-y-1">
            <p className="font-semibold text-white text-base">Aurine Agency</p>
            <p>ul. Przykładowa 123, 00-000 Warszawa</p>
            <p>NIP: 1234567890</p>
          </div>
        </div>
      </div>

      {/* Contract Details */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FileSignature className="w-5 h-5 text-rose-500" />
          Przedmiot umowy
        </h2>
        <div className="bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-rose-500/30 rounded-xl p-6">
          <p className="text-zinc-300 leading-relaxed">{data.serviceScope}</p>
        </div>
      </div>

      {/* Key Terms */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-white">Wartość umowy</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{parseFloat(data.contractValue).toFixed(2)} PLN</p>
          <p className="text-sm text-zinc-400 mt-1">netto, zwolnione z VAT</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-white">Warunki płatności</h3>
          </div>
          <p className="text-zinc-300">{data.paymentTerms}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-purple-500" />
            <h3 className="font-bold text-white">Czas trwania</h3>
          </div>
          <p className="text-zinc-300">{data.contractDuration}</p>
        </div>
      </div>

      {/* Legal Clauses */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Postanowienia końcowe</h2>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-3 text-sm text-zinc-400">
          <p>§1 Zleceniobiorca zobowiązuje się do wykonania usług marketingowych zgodnie z najlepszą wiedzą i praktyką branżową.</p>
          <p>§2 Wszelkie zmiany umowy wymagają formy pisemnej pod rygorem nieważności.</p>
          <p>§3 W sprawach nieuregulowanych niniejszą umową mają zastosowanie przepisy Kodeksu Cywilnego.</p>
          <p>§4 Ewentualne spory będą rozstrzygane przez sąd właściwy dla siedziby Zleceniobiorcy.</p>
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="border-t border-zinc-700 pt-4">
          <p className="text-sm text-zinc-500 mb-6">Podpis Zleceniodawcy</p>
          <p className="text-xs text-zinc-600">________________________</p>
        </div>
        <div className="border-t border-zinc-700 pt-4">
          <p className="text-sm text-zinc-500 mb-6">Podpis Zleceniobiorcy</p>
          <p className="text-xs text-zinc-600">________________________</p>
        </div>
      </div>

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

export default ContractPreview;
