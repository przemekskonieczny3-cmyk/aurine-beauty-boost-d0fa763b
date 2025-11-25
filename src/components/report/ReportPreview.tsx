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
      className="bg-white p-12 min-h-[1400px]"
    >
      {/* Header with Logo */}
      <div className="flex justify-between items-center mb-12 pb-8 border-b-2 border-slate-200">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={aurinelogo} alt="Aurine" className="w-16 h-16" />
            <div>
              <h2 className="text-xl font-bold text-slate-900">Aurine Agency</h2>
              <p className="text-pink-600 text-sm font-medium">Digital Marketing Excellence</p>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
            {data.clientName}
          </h1>
          <p className="text-2xl text-slate-600 font-medium">Raport Facebook Ads - {data.period}</p>
        </div>
        <div className="text-right bg-gradient-to-br from-pink-50 to-purple-50 px-8 py-6 rounded-2xl border-2 border-pink-200">
          <p className="text-sm text-slate-600 mb-2">Budżet kampanii</p>
          <p className="text-4xl font-bold text-pink-600">{data.budget}</p>
          <p className="text-slate-500 text-sm font-medium">PLN</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mb-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Facebook className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Podsumowanie kampanii</h2>
          </div>
          <p className="text-white/95 text-lg leading-relaxed">
            Kampania Facebook Ads dla salonu <span className="font-bold text-white">{data.clientName}</span> osiągnęła
            wybitne rezultaty. Zainwestowany budżet <span className="font-bold text-white">{data.budget} PLN</span> przyniósł{" "}
            <span className="font-bold text-white">{data.bookings} rezerwacji wizyt</span>, co przekłada się na
            doskonały zwrot z inwestycji. Kampania dotarła do <span className="font-bold text-white">{data.reach}</span> unikalnych
            użytkowników, generując wysokie zaangażowanie i konwersje.
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Kluczowe metryki</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 shadow-lg border-2 border-pink-200 hover:shadow-xl transition-all">
          <div className="bg-white/60 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-pink-600" />
          </div>
          <p className="text-slate-600 text-sm font-semibold mb-2">Wyświetlenia</p>
          <p className="text-4xl font-bold text-slate-900 mb-1">{data.impressions}</p>
          <p className="text-pink-600 text-xs font-medium">Zasięg Facebook</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-lg border-2 border-purple-200 hover:shadow-xl transition-all">
          <div className="bg-white/60 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-slate-600 text-sm font-semibold mb-2">Zasięg</p>
          <p className="text-4xl font-bold text-slate-900 mb-1">{data.reach}</p>
          <p className="text-purple-600 text-xs font-medium">Unikalni użytkownicy</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:shadow-xl transition-all">
          <div className="bg-white/60 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Facebook className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-slate-600 text-sm font-semibold mb-2">Kliknięcia</p>
          <p className="text-4xl font-bold text-slate-900 mb-1">{data.clicks}</p>
          <p className="text-blue-600 text-xs font-medium">Akcje użytkowników</p>
        </div>

        <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl p-6 shadow-lg border-2 border-pink-700 hover:shadow-xl transition-all">
          <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <p className="text-white/90 text-sm font-semibold mb-2">Rezerwacje</p>
          <p className="text-4xl font-bold text-white mb-1">{data.bookings}</p>
          <p className="text-pink-200 text-xs font-medium">Wizyt zarezerwowanych</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 w-12 h-12 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-pink-700" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Wysoki</span>
          </div>
          <p className="text-slate-600 text-sm font-semibold mb-2">CTR (Click-through rate)</p>
          <p className="text-4xl font-bold text-slate-900">{data.ctr}%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-12 h-12 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-700" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Sukces</span>
          </div>
          <p className="text-slate-600 text-sm font-semibold mb-2">Konwersje</p>
          <p className="text-4xl font-bold text-slate-900">{data.conversions}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-12 h-12 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-700" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Optymalne</span>
          </div>
          <p className="text-slate-600 text-sm font-semibold mb-2">Koszt / konwersja</p>
          <p className="text-4xl font-bold text-slate-900">{data.costPerConversion} PLN</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Analiza wydajności</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200">
          <h3 className="text-slate-800 font-bold text-lg mb-6 flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
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
                <Cell fill="#ec4899" />
                <Cell fill="#e5e7eb" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-slate-600 mt-4 font-medium">
            {data.bookings} rezerwacji z {data.conversions} konwersji
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200">
          <h3 className="text-slate-800 font-bold text-lg mb-6 flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
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
                <Cell fill="#3b82f6" />
                <Cell fill="#e5e7eb" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-slate-600 mt-4 font-medium">Wysoki poziom interakcji</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200">
          <h3 className="text-slate-800 font-bold text-lg mb-6 flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            Tygodniowy zasięg i kliknięcia
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyData}>
              <XAxis dataKey="week" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reach"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ fill: "#ec4899", r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200">
          <h3 className="text-slate-800 font-bold text-lg mb-6 flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            Rezerwacje według dni tygodnia
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailyBookings}>
              <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="value" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Marketing Recommendations */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-10 border-2 border-slate-200 shadow-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
            <Lightbulb className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Rekomendacje marketingowe</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-7 border-2 border-pink-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-pink-100 w-10 h-10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-pink-600" />
              </div>
              <h4 className="text-pink-600 font-bold text-lg">Optymalizacja budżetu</h4>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Zwiększ budżet o 20% w weekendy, kiedy notujemy najwyższą konwersję. Skoncentruj wydatki na godzinach 
              18:00-21:00, gdy aktywność użytkowników jest najwyższa.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border-2 border-purple-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 w-10 h-10 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="text-purple-600 font-bold text-lg">Targetowanie</h4>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Rozszerz grupę docelową o kobiety 35-50 lat zainteresowane wellness. Dodaj remarketingowe kampanie 
              dla osób, które odwiedziły stronę ale nie dokonały rezerwacji.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border-2 border-blue-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 w-10 h-10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-blue-600 font-bold text-lg">Kreacje reklamowe</h4>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Testuj video ads pokazujące efekty przed/po. Reklamy z treścią video mają o 45% wyższy CTR. 
              Dodaj social proof - opinie zadowolonych klientek.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border-2 border-pink-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-pink-100 w-10 h-10 rounded-xl flex items-center justify-center">
                <Facebook className="w-5 h-5 text-pink-600" />
              </div>
              <h4 className="text-pink-600 font-bold text-lg">Instagram Stories</h4>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Uruchom równoległą kampanię w Instagram Stories z promocją -15% dla nowych klientek. 
              Stories mają potencjał zwiększyć zasięg o dodatkowe 30%.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t-2 border-slate-200 flex justify-between items-center">
        <div>
          <p className="text-slate-600 font-medium">Raport wygenerowany przez Aurine Agency</p>
          <p className="text-slate-500 text-sm mt-1">Data: {new Date().toLocaleDateString('pl-PL')}</p>
        </div>
        <div className="text-right">
          <p className="text-pink-600 font-bold text-lg">aurine-agency.com</p>
          <p className="text-slate-600 text-sm mt-1">kontakt@aurine-agency.com</p>
        </div>
      </div>
    </div>
  );
};
