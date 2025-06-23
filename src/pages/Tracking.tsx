
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Plus, TrendingUp, TrendingDown, Users, Target, Star, MapPin } from "lucide-react";
import { useCandidates } from "@/hooks/useCandidatesData";
import InteractiveGlobe from "@/components/tracking/InteractiveGlobe";

const Tracking = () => {
  const [timePeriod, setTimePeriod] = useState("month");
  const { data: candidates = [] } = useCandidates();

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
    { name: "LinkedIn", value: 35, color: "#4F46E5" },
    { name: "Welcome to the Jungle", value: 25, color: "#06B6D4" },
    { name: "Site Carrière", value: 15, color: "#10B981" },
    { name: "Referral", value: 12, color: "#F59E0B" },
    { name: "Job Boards", value: 8, color: "#EF4444" },
    { name: "Autres", value: 5, color: "#8B5CF6" }
  ];

  const locationData = [
    { country: "France", percentage: 42, flag: "🇫🇷", coordinates: [2.3522, 48.8566] as [number, number] },
    { country: "Belgique", percentage: 23, flag: "🇧🇪", coordinates: [4.3517, 50.8503] as [number, number] },
    { country: "Maroc", percentage: 12, flag: "🇲🇦", coordinates: [-6.8498, 34.0209] as [number, number] },
    { country: "Tunisie", percentage: 8, flag: "🇹🇳", coordinates: [10.1815, 36.8065] as [number, number] },
    { country: "Canada", percentage: 7, flag: "🇨🇦", coordinates: [-106.3468, 56.1304] as [number, number] },
    { country: "Suisse", percentage: 5, flag: "🇨🇭", coordinates: [8.2275, 46.8182] as [number, number] },
    { country: "Algérie", percentage: 3, flag: "🇩🇿", coordinates: [1.6596, 28.0339] as [number, number] }
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
      label: "Candidatures reçues",
      color: "#3B82F6",
    },
    selections: {
      label: "Candidats shortlistés",
      color: "#F97316",
    },
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 transition-all duration-300 ease-in-out"
      style={{ marginLeft: 'var(--sidebar-width, 256px)' }}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tracking</h1>
          <div className="flex items-center gap-4">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white border-gray-200 hover:bg-gray-50">
              <Plus size={16} className="mr-2" />
              Ajouter une source
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total candidats"
            value={totalCandidates.toLocaleString()}
            change="2.5%"
            isPositive={true}
            icon={Users}
          />
          <StatCard
            title="Taux de qualification"
            value={`${qualificationRate}%`}
            change="0.5%"
            isPositive={true}
            icon={Target}
          />
          <StatCard
            title="Score moyen"
            value={`${averageScore}/100`}
            change="0.2%"
            isPositive={false}
            icon={Star}
          />
          <StatCard
            title="Conversions entretien"
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
              <CardTitle className="text-xl font-semibold text-gray-900">Candidatures vs Sélections</CardTitle>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Candidatures reçues</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Candidats shortlistés</span>
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
              <CardTitle className="text-xl font-semibold text-gray-900">Sources de candidatures</CardTitle>
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

          {/* Geographic Distribution with Interactive Globe */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Répartition géographique</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Country List with Modern Flag Display */}
                <div className="space-y-3">
                  {locationData.map((location, index) => (
                    <div key={location.country} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                          <span className="text-xl">{location.flag}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{location.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${location.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 min-w-[40px] text-right">{location.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Interactive 3D Globe */}
                <div className="mt-6">
                  <InteractiveGlobe locationData={locationData} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
