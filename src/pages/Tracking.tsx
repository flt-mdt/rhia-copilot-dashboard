
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Plus, TrendingUp, TrendingDown, Users, Target, Star, MapPin } from "lucide-react";
import { useCandidates } from "@/hooks/useCandidatesData";
import { useLanguage } from "@/contexts/LanguageContext";

const Tracking = () => {
  const [timePeriod, setTimePeriod] = useState("month");
  const { data: candidates = [] } = useCandidates();
  const { t } = useLanguage();

  // Calculate statistics from real data
  const totalCandidates = candidates.length;
  const qualifiedCandidates = candidates.filter(c => c.ai_score && c.ai_score >= 70).length;
  const qualificationRate = totalCandidates > 0 ? Math.round((qualifiedCandidates / totalCandidates) * 100) : 0;
  const averageScore = candidates.length > 0 
    ? Math.round(candidates.reduce((sum, c) => sum + (c.ai_score || 0), 0) / candidates.length) 
    : 0;
  const interviewCandidates = candidates.filter(c => 
    c.status === 'interview_scheduled' || c.status === 'hired' || c.status === 'offer_sent'
  ).length;

  // Mock data for charts (in a real app, this would come from your database)
  const applicationData = [
    { date: "1 Jul", candidatures: 28, selections: 12 },
    { date: "2 Jul", candidatures: 32, selections: 15 },
    { date: "3 Jul", candidatures: 21, selections: 8 },
    { date: "4 Jul", candidatures: 35, selections: 14 },
    { date: "5 Jul", candidatures: 54, selections: 18 },
    { date: "6 Jul", candidatures: 48, selections: 19 },
    { date: "7 Jul", candidatures: 16, selections: 6 },
    { date: "8 Jul", candidatures: 35, selections: 12 },
    { date: "9 Jul", candidatures: 28, selections: 10 },
    { date: "10 Jul", candidatures: 46, selections: 15 },
    { date: "11 Jul", candidatures: 34, selections: 11 },
    { date: "12 Jul", candidatures: 58, selections: 22 }
  ];

  const sourceData = [
    { name: t('tracking.sources.linkedin'), value: 35, color: "#4F46E5" },
    { name: t('tracking.sources.welcomeToTheJungle'), value: 25, color: "#06B6D4" },
    { name: t('tracking.sources.careerSite'), value: 15, color: "#10B981" },
    { name: t('tracking.sources.referral'), value: 12, color: "#F59E0B" },
    { name: t('tracking.sources.jobBoards'), value: 8, color: "#EF4444" },
    { name: t('tracking.sources.others'), value: 5, color: "#8B5CF6" }
  ];

  const locationData = [
    { country: "France", percentage: 42, flagCode: "FR", candidatures: 340, matchPercentage: 78 },
    { country: "Belgique", percentage: 23, flagCode: "BE", candidatures: 185, matchPercentage: 82 },
    { country: "Maroc", percentage: 12, flagCode: "MA", candidatures: 97, matchPercentage: 71 },
    { country: "Tunisie", percentage: 8, flagCode: "TN", candidatures: 64, matchPercentage: 75 },
    { country: "Canada", percentage: 7, flagCode: "CA", candidatures: 56, matchPercentage: 84 },
    { country: "Suisse", percentage: 5, flagCode: "CH", candidatures: 40, matchPercentage: 89 },
    { country: "Algérie", percentage: 3, flagCode: "DZ", candidatures: 24, matchPercentage: 68 }
  ];

  const StatCard = ({ 
    title, 
    value, 
    change, 
    isPositive, 
    icon: Icon 
  }: { 
    title: string; 
    value: string; 
    change: string; 
    isPositive: boolean; 
    icon: any;
  }) => (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Icon size={16} />
            <span>{title}</span>
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{change}</span>
        </div>
      </CardContent>
    </Card>
  );

  const chartConfig = {
    candidatures: {
      label: t('tracking.charts.applicationsReceived'),
      color: "#3B82F6",
    },
    selections: {
      label: t('tracking.charts.shortlistedCandidates'),
      color: "#F97316",
    },
  };

  // Component for improved flag display with SVG flags
  const FlagDisplay = ({ flagCode }: { flagCode: string }) => (
    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center relative overflow-hidden">
      <img
        src={`https://flagcdn.com/w40/${flagCode.toLowerCase()}.png`}
        alt={`Flag of ${flagCode}`}
        className="w-6 h-4 object-cover rounded-sm"
        onError={(e) => {
          // Fallback to a colored circle with country code if flag image fails
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.nextElementSibling!.classList.remove('hidden');
        }}
      />
      <div className="hidden absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 bg-gradient-to-br from-blue-500 to-green-500 text-white">
        {flagCode}
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-gray-50 transition-all duration-300 ease-in-out"
      style={{ marginLeft: 'var(--sidebar-width, 256px)' }}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('tracking.title')}</h1>
          <div className="flex items-center gap-4">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">{t('tracking.timePeriod.week')}</SelectItem>
                <SelectItem value="month">{t('tracking.timePeriod.month')}</SelectItem>
                <SelectItem value="quarter">{t('tracking.timePeriod.quarter')}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white border-gray-200 hover:bg-gray-50">
              <Plus size={16} className="mr-2" />
              {t('tracking.addSource')}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('tracking.stats.totalCandidates')}
            value={totalCandidates.toLocaleString()}
            change="2.5%"
            isPositive={true}
            icon={Users}
          />
          <StatCard
            title={t('tracking.stats.qualificationRate')}
            value={`${qualificationRate}%`}
            change="0.5%"
            isPositive={true}
            icon={Target}
          />
          <StatCard
            title={t('tracking.stats.averageScore')}
            value={`${averageScore}/100`}
            change="0.2%"
            isPositive={false}
            icon={Star}
          />
          <StatCard
            title={t('tracking.stats.interviewConversions')}
            value={interviewCandidates.toString()}
            change="0.12%"
            isPositive={true}
            icon={TrendingUp}
          />
        </div>

        {/* Main Chart */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">{t('tracking.charts.applicationsVsSelections')}</CardTitle>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{t('tracking.charts.applicationsReceived')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{t('tracking.charts.shortlistedCandidates')}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="h-80 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="candidatures" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="selections" fill="#F97316" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sources Chart */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">{t('tracking.charts.applicationSources')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  {sourceData.map((source, index) => (
                    <div key={source.name} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: source.color }}
                      ></div>
                      <span className="text-sm text-gray-600 min-w-0 flex-1">{source.name} – {source.value}%</span>
                    </div>
                  ))}
                </div>
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution - Colored Flag Display */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <MapPin size={20} />
                {t('tracking.charts.geographicDistribution')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationData.map((location, index) => (
                  <div key={location.country} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <FlagDisplay flagCode={location.flagCode} />
                      <div>
                        <span className="text-base font-medium text-gray-900">{location.country}</span>
                        <div className="text-sm text-gray-500">
                          {location.candidatures} {t('tracking.geographic.applications')} • {location.matchPercentage}% {t('tracking.geographic.averageMatch')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${location.percentage}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-gray-900 min-w-[50px] text-right">{location.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
