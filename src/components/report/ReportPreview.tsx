import { TrendingUp, Target, CheckCircle2, Sparkles } from "lucide-react";
import aurinelogo from "@/assets/aurine-report-logo.png";
import { SimplePieChart, SimpleBarChart, SimpleLineChart } from "./SimpleCharts";

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

interface ReportPreviewProps {
  data: ReportData;
}

export const ReportPreview = ({ data }: ReportPreviewProps) => {
  const parseNumber = (str?: string): number => {
    if (!str) return 0;
    return parseFloat(str.replace(/,/g, "").replace(/\s/g, ""));
  };

  const engagementValue = data.engagementRate ? parseNumber(data.engagementRate) : 23;
  const engagementData = [
    { name: "Zaangażowani", value: engagementValue, color: "#3b82f6" },
    { name: "Pozostali", value: 100 - engagementValue, color: "#27272a" },
  ];

  const bookingsNum = parseNumber(data.bookings) || 33;
  const conversionsNum = parseNumber(data.conversions) || 50;
  const conversionPercentage = conversionsNum > 0 ? (bookingsNum / conversionsNum) * 100 : 66;
  const conversionData = [
    { name: "Rezerwacje", value: conversionPercentage, color: "#ec4899" },
    { name: "Pozostałe", value: 100 - conversionPercentage, color: "#27272a" },
  ];

  const weeklyData = data.weeklyReachData && data.weeklyClicksData
    ? data.weeklyReachData.split(",").map((reach, i) => ({
        label: `T${i + 1}`,
        value1: parseNumber(reach),
        value2: parseNumber(data.weeklyClicksData!.split(",")[i] || "0"),
      }))
    : [
        { label: "T1", value1: 15000, value2: 650 },
        { label: "T2", value1: 19000, value2: 820 },
        { label: "T3", value1: 25000, value2: 1100 },
        { label: "T4", value1: 26000, value2: 930 },
      ];

  const dailyBookings = data.dailyBookingsData
    ? data.dailyBookingsData.split(",").map((val, i) => ({
        label: ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"][i] || `D${i + 1}`,
        value: parseNumber(val),
      }))
    : [
        { label: "Pn", value: 3 },
        { label: "Wt", value: 5 },
        { label: "Śr", value: 7 },
        { label: "Cz", value: 6 },
        { label: "Pt", value: 8 },
        { label: "Sb", value: 2 },
        { label: "Nd", value: 2 },
      ];

  return (
    <div
      id="report-preview"
      className="bg-black text-white rounded-3xl shadow-2xl overflow-hidden w-[794px] min-h-[1123px] mx-auto p-10"
    >
      {/* Header */}
      <header className="flex items-start justify-between mb-10 border-b border-zinc-800 pb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-2 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <img
                src={aurinelogo}
                alt="Aurine"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-light">
                Aurine Agency
              </p>
              <p className="text-base font-semibold text-white">
                Raport kampanii Facebook Ads
              </p>
            </div>
          </div>
          <div>
            <h1
              className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
              data-export-solid="true"
            >
              {data.clientName || "Salon Beauty"}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {data.city || "Lokalizacja"} • {data.period || "Okres kampanii"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex flex-col items-end gap-1 px-5 py-3 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 shadow-xl shadow-pink-500/25">
            <span className="text-[10px] uppercase tracking-[0.25em] text-pink-100 font-light">
              Budżet
            </span>
            <p className="text-2xl font-bold text-white">
              {data.budget ? `${data.budget} PLN` : "—"}
            </p>
          </div>
          <p className="text-[10px] text-zinc-600 mt-2">Premium Analytics Report</p>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-2 gap-4 mb-6">
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
      <section className="grid grid-cols-3 gap-4 mb-8">
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

      {/* Charts */}
      <section className="space-y-5 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-pink-950/20 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-pink-800/20 p-4 flex flex-col gap-3 backdrop-blur shadow-lg">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Efektywność rezerwacji</h4>
                <p className="text-[10px] text-pink-300">
                  {bookingsNum} z {conversionsNum} konwersji
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <SimplePieChart data={conversionData} size={160} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-950/20 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-blue-800/20 p-4 flex flex-col gap-3 backdrop-blur shadow-lg">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Zaangażowanie</h4>
                <p className="text-[10px] text-blue-300">
                  {engagementValue}% zaangażowanych odbiorców
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <SimplePieChart data={engagementData} size={160} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-950/20 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-purple-800/20 p-4 flex flex-col gap-3 backdrop-blur shadow-lg">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Trend tygodniowy</h4>
                <p className="text-[10px] text-purple-300">Zasięg i kliknięcia</p>
              </div>
            </div>
            <div className="flex justify-center">
              <SimpleLineChart
                data={weeklyData}
                width={320}
                height={150}
                color1="#ec4899"
                color2="#3b82f6"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-950/20 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-rose-800/20 p-4 flex flex-col gap-3 backdrop-blur shadow-lg">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Rezerwacje dzienne</h4>
                <p className="text-[10px] text-rose-300">Rozkład tygodniowy</p>
              </div>
            </div>
            <div className="flex justify-center">
              <SimpleBarChart
                data={dailyBookings}
                width={320}
                height={150}
                color="#ec4899"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="bg-gradient-to-br from-emerald-950/30 via-zinc-950/60 to-zinc-950/50 rounded-2xl border border-emerald-800/30 p-5 flex flex-col gap-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Rekomendacje marketingowe</h4>
            <p className="text-[10px] text-emerald-300">Konkretne kolejne kroki</p>
          </div>
        </div>
        <div className="space-y-3">
          {data.recommendations ? (
            data.recommendations
              .split("\n")
              .filter((line) => line.trim())
              .map((rec, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
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
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Zwiększ budżet w godzinach popołudniowych (16-20), kiedy najwięcej klientek rezerwuje wizyty.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-emerald-400">2</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Dodaj kampanię remarketingową do osób, które kliknęły reklamę, ale nie dokończyły rezerwacji.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-emerald-400">3</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Pokaż w kreacjach efekt "przed i po" oraz opinie zadowolonych klientek, żeby zwiększyć zaufanie.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <footer className="mt-6 pt-3 border-t border-zinc-900 flex items-center justify-between text-[9px] text-zinc-700">
        <p>© 2024 Aurine Agency · Profesjonalne kampanie dla salonów beauty</p>
        <p>facebook.com/aurine.agency</p>
      </footer>
    </div>
  );
};
