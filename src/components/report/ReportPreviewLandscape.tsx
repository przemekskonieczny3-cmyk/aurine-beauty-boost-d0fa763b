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
import { TrendingUp, Target, CheckCircle2, Sparkles } from "lucide-react";
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
  engagementRate?: string;
  weeklyReachData?: string;
  weeklyClicksData?: string;
  dailyBookingsData?: string;
  recommendations?: string;
}

interface ReportPreviewLandscapeProps {
  data: ReportData;
}

export const ReportPreviewLandscape = ({ data }: ReportPreviewLandscapeProps) => {
  // Calculate chart data - zawsze pokazuj wykresy, użyj przykładowych danych jeśli brak
  const engagementValue = data.engagementRate ? parseFloat(data.engagementRate) : 23;
  const engagementData = [
    { name: "Zaangażowani", value: engagementValue },
    { name: "Pozostali", value: 100 - engagementValue },
  ];

  const bookingsNum = data.bookings ? parseFloat(data.bookings) : 33;
  const conversionsNum = data.conversions ? parseFloat(data.conversions) : 50;
  const conversionData = conversionsNum > 0
    ? [
        { name: "Rezerwacje", value: (bookingsNum / conversionsNum) * 100 },
        { name: "Pozostałe", value: ((conversionsNum - bookingsNum) / conversionsNum) * 100 },
      ]
    : [
        { name: "Rezerwacje", value: 66 },
        { name: "Pozostałe", value: 34 },
      ];

  const weeklyData = data.weeklyReachData && data.weeklyClicksData
    ? data.weeklyReachData.split(",").map((reach, i) => ({
        week: `T${i + 1}`,
        reach: parseFloat(reach.trim()),
        clicks: parseFloat(data.weeklyClicksData!.split(",")[i]?.trim() || "0"),
      }))
    : [
        { week: "T1", reach: 15000, clicks: 650 },
        { week: "T2", reach: 19000, clicks: 820 },
        { week: "T3", reach: 25000, clicks: 1100 },
        { week: "T4", reach: 26000, clicks: 930 },
      ];

  const dailyBookings = data.dailyBookingsData
    ? data.dailyBookingsData.split(",").map((val, i) => ({
        day: ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"][i] || `D${i + 1}`,
        value: parseFloat(val.trim()),
      }))
    : [
        { day: "Pn", value: 3 },
        { day: "Wt", value: 5 },
        { day: "Śr", value: 7 },
        { day: "Cz", value: 6 },
        { day: "Pt", value: 8 },
        { day: "Sb", value: 2 },
        { day: "Nd", value: 2 },
      ];

  return (
    <div
      id="report-preview-landscape"
      className="w-[1600px] h-[900px] bg-black text-white rounded-3xl shadow-2xl overflow-hidden"
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-72 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-r border-pink-900/20 flex flex-col justify-between p-8 shadow-2xl">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-2 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <img
                  src={aurinelogo}
                  alt="Aurine"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-light">
                  Aurine Agency
                </p>
                <p className="text-base font-semibold text-white">
                  Raport Kampanii
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="pb-3 border-b border-zinc-800/50">
                <p className="font-semibold text-base text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
                  {data.clientName || "Salon Beauty"}
                </p>
                <p className="text-zinc-400 text-xs mt-1">{data.city || "Lokalizacja"}</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Okres</span>
                  <span className="text-zinc-300 font-medium">{data.period || "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Budżet</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 font-semibold">
                    {data.budget ? `${data.budget} PLN` : "—"}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-[10px] uppercase tracking-widest text-pink-300">
                  Facebook Ads
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 text-[10px] text-zinc-600 space-y-0.5">
            <p className="text-zinc-500">Premium Analytics Report</p>
            <p className="text-zinc-700">aurine-agency.com</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 h-full bg-black p-6 flex flex-col gap-4 overflow-hidden">
          {/* Header */}
          <header className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-sm text-zinc-500 mt-2 max-w-2xl leading-relaxed">
                Kompleksowa analiza wyników kampanii reklamowej dla salonu beauty — kluczowe metryki efektywności i konwersji.
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex flex-col items-end gap-1 px-5 py-3 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 shadow-xl shadow-pink-500/25">
                <span className="text-[10px] uppercase tracking-[0.25em] text-pink-100 font-light">
                  Wizyty
                </span>
                <p className="text-3xl font-bold text-white">
                  {data.bookings || "—"}
                </p>
              </div>
            </div>
          </header>

          {/* KPI Cards */}
          <section className="grid grid-cols-4 gap-4">
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-5 backdrop-blur">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Wyświetlenia</span>
                <TrendingUp className="w-4 h-4 text-pink-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{data.impressions || "—"}</p>
              <p className="text-[10px] text-zinc-600">Łączna liczba wyświetleń reklam</p>
            </div>

            <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-5 backdrop-blur">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Zasięg</span>
                <Target className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{data.reach || "—"}</p>
              <p className="text-[10px] text-zinc-600">Unikalne osoby objęte kampanią</p>
            </div>

            <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-5 backdrop-blur">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Kliknięcia</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{data.clicks || "—"}</p>
              <p className="text-[10px] text-zinc-600">Interakcje z reklamami</p>
            </div>

            <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 rounded-2xl border border-pink-500/30 p-5 backdrop-blur shadow-lg shadow-pink-500/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-pink-300 uppercase tracking-wider">CTR</span>
                <TrendingUp className="w-4 h-4 text-pink-300" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{data.ctr ? `${data.ctr}%` : "—"}</p>
              <p className="text-[10px] text-pink-200/60">Współczynnik klikalności</p>
            </div>
          </section>

          {/* Secondary metrics */}
          <section className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 px-5 py-3 backdrop-blur">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Konwersje</p>
              <p className="text-xl font-bold text-white">{data.conversions || "—"}</p>
            </div>
            <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 px-5 py-3 backdrop-blur">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Koszt / konwersja</p>
              <p className="text-xl font-bold text-pink-400">{data.costPerConversion ? `${data.costPerConversion} PLN` : "—"}</p>
            </div>
            <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 px-5 py-3 backdrop-blur">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Rezerwacje</p>
              <p className="text-xl font-bold text-white">{data.bookings || "—"}</p>
            </div>
          </section>

          {/* Charts and recommendations grid */}
          <div className="grid grid-cols-[1fr,340px] gap-4 flex-1 min-h-0">
            {/* Charts grid 2x2 */}
            <div className="grid grid-cols-2 gap-4 min-h-0">
              {/* Left column */}
              <div className="flex flex-col gap-4 min-h-0">
                <div className="bg-gradient-to-br from-pink-950/20 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-pink-800/20 p-4 flex flex-col flex-1 min-h-0 backdrop-blur shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Efektywność rezerwacji</h4>
                      <p className="text-[10px] text-pink-300">
                        {bookingsNum} z {conversionsNum} konwersji
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={conversionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          <Cell fill="#ec4899" />
                          <Cell fill="#27272a" />
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-950/20 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-blue-800/20 p-4 flex flex-col flex-1 min-h-0 backdrop-blur shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Zaangażowanie</h4>
                      <p className="text-[10px] text-blue-300">
                        {engagementValue}% zaangażowanych odbiorców
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={engagementData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#27272a" />
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4 min-h-0">
                <div className="bg-gradient-to-br from-purple-950/20 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-purple-800/20 p-4 flex flex-col flex-1 min-h-0 backdrop-blur shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Trend tygodniowy</h4>
                      <p className="text-[10px] text-purple-300">Zasięg i kliknięcia</p>
                    </div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyData}>
                        <XAxis dataKey="week" stroke="#a855f7" style={{ fontSize: "10px" }} />
                        <YAxis stroke="#a855f7" style={{ fontSize: "10px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#18181b",
                            border: "1px solid #3f3f46",
                            borderRadius: "12px",
                            fontSize: "11px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="reach"
                          stroke="#ec4899"
                          strokeWidth={3}
                          dot={{ fill: "#ec4899", r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="clicks"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-950/20 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-rose-800/20 p-4 flex flex-col flex-1 min-h-0 backdrop-blur shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Rezerwacje dzienne</h4>
                      <p className="text-[10px] text-rose-300">Rozkład tygodniowy</p>
                    </div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailyBookings}>
                        <XAxis dataKey="day" stroke="#fb7185" style={{ fontSize: "10px" }} />
                        <YAxis stroke="#fb7185" style={{ fontSize: "10px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#18181b",
                            border: "1px solid #3f3f46",
                            borderRadius: "12px",
                            fontSize: "11px",
                          }}
                        />
                        <Bar dataKey="value" fill="#ec4899" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations panel */}
            <div className="bg-gradient-to-br from-emerald-950/30 via-zinc-950/60 to-zinc-950/50 rounded-2xl border border-emerald-800/30 p-5 flex flex-col min-h-0 backdrop-blur shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Rekomendacje</h4>
                  <p className="text-[10px] text-emerald-300">Dalsze działania</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {data.recommendations ? (
                  data.recommendations.split('\n').filter(line => line.trim()).map((rec, idx) => (
                    <div key={idx} className="flex gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                        <span className="text-[10px] font-bold text-emerald-400">{idx + 1}</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{rec}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-400">1</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">Zwiększ budżet na kampanie w godzinach popołudniowych (16-20), kiedy rezerwacje są najwyższe</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-400">2</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">Uruchom kampanie retargetingowe dla osób, które kliknęły ale nie zarezerwowały wizyty</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-400">3</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">Przetestuj kreacje z ofertami weekendowymi, aby zwiększyć rezerwacje w soboty i niedziele</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-400">4</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">Skoncentruj się na targetowaniu lokalnym (5km wokół salonu) dla lepszej jakości ruchu</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[9px] text-zinc-700">
            <p>© 2024 Aurine Agency · Profesjonalne kampanie dla salonów beauty</p>
            <p>facebook.com/aurine.agency</p>
          </footer>
        </main>
      </div>
    </div>
  );
};
