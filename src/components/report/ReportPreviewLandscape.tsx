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
  city?: string;
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

interface ReportPreviewLandscapeProps {
  data: ReportData;
}

export const ReportPreviewLandscape = ({ data }: ReportPreviewLandscapeProps) => {
  const conversionData = [
    { name: "Rezerwacje", value: 72 },
    { name: "Pozostałe", value: 28 },
  ];

  const engagementData = [
    { name: "Zaangażowani", value: 65 },
    { name: "Pozostali", value: 35 },
  ];

  const weeklyData = [
    { week: "T1", reach: 15000, clicks: 650 },
    { week: "T2", reach: 19000, clicks: 820 },
    { week: "T3", reach: 25000, clicks: 1100 },
    { week: "T4", reach: 26000, clicks: 930 },
  ];

  const dailyBookings = [
    { day: "Pn", value: 22 },
    { day: "Wt", value: 28 },
    { day: "Śr", value: 32 },
    { day: "Cz", value: 35 },
    { day: "Pt", value: 38 },
    { day: "Sb", value: 42 },
    { day: "Nd", value: 25 },
  ];

  return (
    <div
      id="report-preview-landscape"
      className="bg-[hsl(var(--brand-darker))] p-8 w-full"
      style={{ aspectRatio: '16/9', maxWidth: '1920px' }}
    >
      {/* Header - Compact */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-slate-800">
        <div className="flex items-center gap-4">
          <img src={aurinelogo} alt="Aurine" className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {data.clientName}
            </h1>
            <p className="text-sm text-slate-400">
              Raport Facebook Ads • {data.period} • {data.city}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 px-6 py-3 rounded-xl border-2 border-pink-500/30">
          <p className="text-xs text-slate-400">Budżet</p>
          <p className="text-2xl font-bold text-pink-400">{data.budget} PLN</p>
        </div>
      </div>

      {/* Main Content - 16:9 Layout */}
      <div className="flex flex-col gap-6 h-full">
        {/* Upper grid: kluczowe metryki + wykresy */}
        <div className="grid grid-cols-[1.4fr,2fr] gap-6 items-stretch">
          {/* Left - Key Metrics */}
          <section className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-200 mb-4 tracking-[0.18em] uppercase">
              Kluczowe metryki
            </h3>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-gradient-to-br from-pink-900/50 to-pink-700/70 rounded-xl p-4 border border-pink-500/40 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-pink-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-pink-300" />
                  </div>
                  <p className="text-slate-200 text-xs font-semibold">
                    Wyświetlenia
                  </p>
                </div>
                <p className="text-3xl font-bold text-white leading-tight">
                  {data.impressions}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-purple-700/70 rounded-xl p-4 border border-purple-500/40 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-purple-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-purple-300" />
                  </div>
                  <p className="text-slate-200 text-xs font-semibold">Zasięg</p>
                </div>
                <p className="text-3xl font-bold text-white leading-tight">
                  {data.reach}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/70 rounded-xl p-4 border border-blue-500/40 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                    <Facebook className="w-4 h-4 text-blue-300" />
                  </div>
                  <p className="text-slate-200 text-xs font-semibold">
                    Kliknięcia
                  </p>
                </div>
                <p className="text-3xl font-bold text-white leading-tight">
                  {data.clicks}
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-4 border-2 border-pink-500 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white text-xs font-semibold">
                    Rezerwacje
                  </p>
                </div>
                <p className="text-3xl font-bold text-white leading-tight">
                  {data.bookings}
                </p>
              </div>
            </div>
          </section>

          {/* Right - Charts */}
          <section className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 flex flex-col">
              <h4 className="text-white font-semibold text-xs mb-3 flex items-center gap-2">
                <div className="bg-pink-500 w-6 h-6 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                Efektywność rezerwacji
              </h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conversionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      <Cell fill="#ec4899" />
                      <Cell fill="#334155" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-slate-300 text-[11px] mt-2">
                {data.bookings} z {data.conversions}
              </p>
            </div>

            <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 flex flex-col">
              <h4 className="text-white font-semibold text-xs mb-3 flex items-center gap-2">
                <div className="bg-blue-500 w-6 h-6 rounded-lg flex items-center justify-center">
                  <Target className="w-3 h-3 text-white" />
                </div>
                Zaangażowanie
              </h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#334155" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 flex flex-col">
              <h4 className="text-white font-semibold text-xs mb-3 flex items-center gap-2">
                <div className="bg-purple-500 w-6 h-6 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                Tygodniowy trend
              </h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <XAxis
                      dataKey="week"
                      stroke="#94a3b8"
                      style={{ fontSize: "10px" }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      style={{ fontSize: "10px" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="reach"
                      stroke="#ec4899"
                      strokeWidth={2}
                      dot={{ fill: "#ec4899", r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 flex flex-col">
              <h4 className="text-white font-semibold text-xs mb-3 flex items-center gap-2">
                <div className="bg-pink-500 w-6 h-6 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                Rezerwacje wg dni
              </h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyBookings}>
                    <XAxis
                      dataKey="day"
                      stroke="#94a3b8"
                      style={{ fontSize: "10px" }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      style={{ fontSize: "10px" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                    <Bar dataKey="value" fill="#ec4899" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Section - Stats + Recommendations */}
        <div className="grid grid-cols-[1.1fr,2fr] gap-6">
          {/* Performance Stats */}
          <section className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.18em] mb-3">
              Podsumowanie KPI
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900/70 rounded-xl p-3 border border-slate-700">
                <p className="text-slate-300 text-xs mb-1">CTR</p>
                <p className="text-xl font-bold text-white">{data.ctr}%</p>
              </div>
              <div className="bg-slate-900/70 rounded-xl p-3 border border-slate-700">
                <p className="text-slate-300 text-xs mb-1">Konwersje</p>
                <p className="text-xl font-bold text-white">{data.conversions}</p>
              </div>
              <div className="bg-slate-900/70 rounded-xl p-3 border border-slate-700">
                <p className="text-slate-300 text-xs mb-1">Koszt/konw.</p>
                <p className="text-xl font-bold text-white">{data.costPerConversion}</p>
              </div>
            </div>
          </section>

          {/* Recommendations */}
          <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-white font-bold text-sm">Rekomendacje</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-lg p-2.5">
                <p className="text-white/90 text-xs font-semibold mb-1">
                  Optymalizacja budżetu
                </p>
                <p className="text-white/80 text-[11px] leading-tight">
                  Zwiększ +20% w weekendy
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-2.5">
                <p className="text-white/90 text-xs font-semibold mb-1">
                  Targetowanie
                </p>
                <p className="text-white/80 text-[11px] leading-tight">
                  Kobiety 35-50, wellness
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-2.5">
                <p className="text-white/90 text-xs font-semibold mb-1">
                  Video Ads
                </p>
                <p className="text-white/80 text-[11px] leading-tight">
                  Format przed/po, +45% CTR
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-2.5">
                <p className="text-white/90 text-xs font-semibold mb-1">
                  Instagram Stories
                </p>
                <p className="text-white/80 text-[11px] leading-tight">
                  -15% promocja, +30% zasięg
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
        <p className="text-slate-400 text-xs">Raport wygenerowany przez Aurine Agency</p>
        <p className="text-slate-500 text-xs">aurine-agency.com</p>
      </div>
    </div>
  );
};
