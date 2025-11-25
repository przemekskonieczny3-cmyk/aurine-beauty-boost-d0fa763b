import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Facebook, TrendingUp, Target, CheckCircle2, Lightbulb } from "lucide-react";
import aurinelogo from "@/assets/aurine-report-logo.png";

interface ReportData {
  clientName?: string;
  period?: string;
  budget?: string;
  impressions?: string;
  reach?: string;
  clicks?: string;
  ctr?: string;
  conversions?: string;
  costPerConversion?: string;
  bookings?: string;
}

interface ReportPreviewProps {
  data: ReportData;
}

export const ReportPreview = ({ data }: ReportPreviewProps) => {
  const conversionData = [
    { name: "Rezerwacje", value: 72 },
    { name: "Pozostałe", value: 28 },
  ];

  const engagementData = [
    { name: "Zaangażowani", value: 65 },
    { name: "Pozostali", value: 35 },
  ];

  const weeklyData = [
    { week: "Tydz 1", reach: 15000, clicks: 650 },
    { week: "Tydz 2", reach: 19000, clicks: 820 },
    { week: "Tydz 3", reach: 25000, clicks: 1100 },
    { week: "Tydz 4", reach: 26000, clicks: 930 },
  ];

  const dailyBookings = [
    { day: "Pon", value: 22 },
    { day: "Wt", value: 28 },
    { day: "Śr", value: 32 },
    { day: "Czw", value: 35 },
    { day: "Pt", value: 38 },
    { day: "Sob", value: 42 },
    { day: "Nie", value: 25 },
  ];

  const PINK = "#ec4899";
  const BLUE = "#3b82f6";
  const GRAY = "#64748b";

  return (
    <div
      id="report-preview"
      className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-12 min-h-[1400px]"
    >
      {/* Header with Logo */}
      <div className="flex justify-between items-start mb-12 pb-8 border-b border-slate-800">
        <div>
          <h1 className="text-5xl font-bold text-white mb-3">
            Raport Facebook Ads
          </h1>
          <p className="text-2xl text-slate-300 mb-2">{data.clientName}</p>
          <p className="text-slate-400 text-lg">{data.period}</p>
        </div>
        <div className="text-right">
          <img src={aurinelogo} alt="Aurine" className="w-20 h-20 mb-3 ml-auto" />
          <p className="text-white font-semibold text-xl">Aurine Agency</p>
          <p className="text-pink-400 text-sm">Marketing Excellence</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mb-10 bg-gradient-to-r from-pink-600/20 to-blue-600/20 rounded-2xl p-8 border border-pink-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Facebook className="w-8 h-8 text-blue-400" />
          <h2 className="text-3xl font-bold text-white">Podsumowanie kampanii</h2>
        </div>
        <p className="text-slate-200 text-lg leading-relaxed">
          Kampania Facebook Ads dla salonu <span className="text-pink-400 font-semibold">{data.clientName}</span> osiągnęła
          wybitne rezultaty. Zainwestowany budżet <span className="text-pink-400 font-semibold">{data.budget} PLN</span> przyniósł{" "}
          <span className="text-pink-400 font-semibold">{data.bookings} rezerwacji wizyt</span>, co przekłada się na
          doskonały zwrot z inwestycji. Kampania dotarła do <span className="text-pink-400 font-semibold">{data.reach}</span> unikalnych
          użytkowników, generując wysokie zaangażowanie i konwersje.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-4 gap-5 mb-10">
        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 hover:border-pink-500/50 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></div>
            <p className="text-slate-400 text-sm font-medium">Budżet</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{data.budget}</p>
          <p className="text-slate-400 text-sm">PLN</p>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 hover:border-pink-500/50 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <p className="text-slate-400 text-sm font-medium">Wyświetlenia</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{data.impressions}</p>
          <p className="text-slate-400 text-sm">Facebook</p>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 hover:border-pink-500/50 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></div>
            <p className="text-slate-400 text-sm font-medium">Zasięg</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{data.reach}</p>
          <p className="text-slate-400 text-sm">Użytkownicy</p>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 hover:border-pink-500/50 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <p className="text-slate-400 text-sm font-medium">Kliknięcia</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{data.clicks}</p>
          <p className="text-slate-400 text-sm">Linki</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-10">
        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 hover:border-pink-500/50 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-pink-500" />
            <p className="text-slate-400 text-sm font-medium">CTR</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{data.ctr}%</p>
          <p className="text-slate-400 text-sm">Click-through rate</p>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 hover:border-pink-500/50 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-pink-500" />
            <p className="text-slate-400 text-sm font-medium">Konwersje</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{data.conversions}</p>
          <p className="text-slate-400 text-sm">Cele osiągnięte</p>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 hover:border-pink-500/50 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-pink-500" />
            <p className="text-slate-400 text-sm font-medium">Koszt/konwersja</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{data.costPerConversion}</p>
          <p className="text-slate-400 text-sm">PLN</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-5 mb-10">
        <div className="bg-slate-900/80 rounded-xl p-7 border border-slate-800">
          <h3 className="text-white font-semibold text-xl mb-5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            Efektywność rezerwacji
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                <Cell fill={PINK} />
                <Cell fill={GRAY} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-slate-300 mt-3">
            {data.bookings} rezerwacji z {data.conversions} konwersji
          </p>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-7 border border-slate-800">
          <h3 className="text-white font-semibold text-xl mb-5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Zaangażowanie odbiorców
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                <Cell fill={BLUE} />
                <Cell fill={GRAY} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-slate-300 mt-3">Wysoki poziom interakcji</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-10">
        <div className="bg-slate-900/80 rounded-xl p-7 border border-slate-800">
          <h3 className="text-white font-semibold text-xl mb-5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            Tygodniowy zasięg i kliknięcia
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyData}>
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reach"
                stroke={PINK}
                strokeWidth={3}
                dot={{ fill: PINK, r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke={BLUE}
                strokeWidth={3}
                dot={{ fill: BLUE, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-7 border border-slate-800">
          <h3 className="text-white font-semibold text-xl mb-5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            Rezerwacje według dni tygodnia
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailyBookings}>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill={PINK} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Marketing Recommendations */}
      <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-2xl p-8 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">Rekomendacje marketingowe</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
            <h4 className="text-pink-400 font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Optymalizacja budżetu
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Zwiększ budżet o 20% w weekendy, kiedy notujemy najwyższą konwersję. Skoncentruj wydatki na godzinach 
              18:00-21:00, gdy aktywność użytkowników jest najwyższa.
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
            <h4 className="text-pink-400 font-semibold text-lg mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Targetowanie
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Rozszerz grupę docelową o kobiety 35-50 lat zainteresowane wellness. Dodaj remarketingowe kampanie 
              dla osób, które odwiedziły stronę ale nie dokonały rezerwacji.
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
            <h4 className="text-pink-400 font-semibold text-lg mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Kreacje reklamowe
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Testuj video ads pokazujące efekty przed/po. Reklamy z treścią video mają o 45% wyższy CTR. 
              Dodaj social proof - opinie zadowolonych klientek.
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
            <h4 className="text-pink-400 font-semibold text-lg mb-3 flex items-center gap-2">
              <Facebook className="w-5 h-5" />
              Instagram Stories
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Uruchom równoległą kampanię w Instagram Stories z promocją -15% dla nowych klientek. 
              Stories mają potencjał zwiększyć zasięg o dodatkowe 30%.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm">Raport wygenerowany przez Aurine Agency</p>
          <p className="text-slate-500 text-xs mt-1">Data: {new Date().toLocaleDateString('pl-PL')}</p>
        </div>
        <div className="text-right">
          <p className="text-pink-400 font-semibold">aurine-agency.com</p>
          <p className="text-slate-500 text-xs mt-1">kontakt@aurine-agency.com</p>
        </div>
      </div>
    </div>
  );
};
