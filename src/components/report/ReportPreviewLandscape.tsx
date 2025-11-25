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

      {/* Main Content - 3 Columns */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Column - Key Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-3">Kluczowe metryki</h3>
          
          <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/40 rounded-xl p-4 border border-pink-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-pink-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-pink-400" />
              </div>
              <p className="text-slate-300 text-xs font-semibold">Wyświetlenia</p>
            </div>
            <p className="text-2xl font-bold text-white">{data.impressions}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-slate-300 text-xs font-semibold">Zasięg</p>
            </div>
            <p className="text-2xl font-bold text-white">{data.reach}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                <Facebook className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-slate-300 text-xs font-semibold">Kliknięcia</p>
            </div>
            <p className="text-2xl font-bold text-white">{data.clicks}</p>
          </div>

          <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-4 border-2 border-pink-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-white text-xs font-semibold">Rezerwacje</p>
            </div>
            <p className="text-2xl font-bold text-white">{data.bookings}</p>
          </div>
        </div>

        {/* Middle Column - Charts */}
        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <div className="bg-pink-500 w-6 h-6 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
              Efektywność rezerwacji
            </h4>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
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
            <p className="text-center text-slate-300 text-xs mt-2">
              {data.bookings} z {data.conversions}
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <div className="bg-blue-500 w-6 h-6 rounded-lg flex items-center justify-center">
                <Target className="w-3 h-3 text-white" />
              </div>
              Zaangażowanie
            </h4>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
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

        {/* Right Column - More Charts */}
        <div className="space-y-4">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <div className="bg-purple-500 w-6 h-6 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              Tygodniowy trend
            </h4>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="week" stroke="#94a3b8" style={{ fontSize: '10px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '10px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '11px' }} />
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

          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <div className="bg-pink-500 w-6 h-6 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
              Rezerwacje wg dni
            </h4>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={dailyBookings}>
                <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '10px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '10px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="value" fill="#ec4899" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section - Stats + Recommendations */}
      <div className="grid grid-cols-2 gap-6">
        {/* Performance Stats */}
        <div className="flex gap-3">
          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700 flex-1">
            <p className="text-slate-300 text-xs mb-1">CTR</p>
            <p className="text-xl font-bold text-white">{data.ctr}%</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700 flex-1">
            <p className="text-slate-300 text-xs mb-1">Konwersje</p>
            <p className="text-xl font-bold text-white">{data.conversions}</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700 flex-1">
            <p className="text-slate-300 text-xs mb-1">Koszt/konw.</p>
            <p className="text-xl font-bold text-white">{data.costPerConversion}</p>
          </div>
        </div>

        {/* Recommendations - Compact */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-white font-bold text-sm">Rekomendacje</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-white/90 text-xs font-semibold mb-1">Optymalizacja budżetu</p>
              <p className="text-white/70 text-[10px] leading-tight">Zwiększ +20% w weekendy</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-white/90 text-xs font-semibold mb-1">Targetowanie</p>
              <p className="text-white/70 text-[10px] leading-tight">Kobiety 35-50, wellness</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-white/90 text-xs font-semibold mb-1">Video Ads</p>
              <p className="text-white/70 text-[10px] leading-tight">Przed/po +45% CTR</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-white/90 text-xs font-semibold mb-1">Instagram Stories</p>
              <p className="text-white/70 text-[10px] leading-tight">-15% promocja +30% zasięg</p>
            </div>
          </div>
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
