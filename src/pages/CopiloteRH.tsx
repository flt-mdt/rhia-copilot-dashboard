
import React, { useState } from 'react';
import { Calendar, Filter, Plus, User, CheckCircle2, Clock, AlertTriangle, Users, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

interface Task {
  id: string;
  title: string;
  employee: string;
  avatar: string;
  category: 'recrutement' | 'paie' | 'formation' | 'juridique' | 'evaluation';
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  description?: string;
}

interface Employee {
  id: string;
  name: string;
  avatar: string;
  department: string;
  status: string;
  nextAction: string;
  nextDeadline: string;
}

const CopiloteRH = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Finaliser le contrat de Sarah Martin',
      employee: 'Sarah Martin',
      avatar: '/placeholder.svg',
      category: 'recrutement',
      priority: 'high',
      deadline: '2024-01-15',
      status: 'pending',
      description: 'Négociation salariale en cours'
    },
    {
      id: '2',
      title: 'Préparer entretien annuel - Clara Dubois',
      employee: 'Clara Dubois',
      avatar: '/placeholder.svg',
      category: 'evaluation',
      priority: 'medium',
      deadline: '2024-01-18',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Vérifier période d\'essai - Victor Martin',
      employee: 'Victor Martin',
      avatar: '/placeholder.svg',
      category: 'juridique',
      priority: 'high',
      deadline: '2024-01-16',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Formation cybersécurité - Équipe IT',
      employee: 'Équipe IT',
      avatar: '/placeholder.svg',
      category: 'formation',
      priority: 'low',
      deadline: '2024-01-25',
      status: 'pending'
    }
  ];

  const employees: Employee[] = [
    {
      id: '1',
      name: 'Victor Martin',
      avatar: '/placeholder.svg',
      department: 'Développement',
      status: 'Période d\'essai',
      nextAction: 'Entretien de validation',
      nextDeadline: '2024-01-16'
    },
    {
      id: '2',
      name: 'Clara Dubois',
      avatar: '/placeholder.svg',
      department: 'Marketing',
      status: 'CDI',
      nextAction: 'Entretien annuel',
      nextDeadline: '2024-01-18'
    },
    {
      id: '3',
      name: 'Sarah Martin',
      avatar: '/placeholder.svg',
      department: 'Design',
      status: 'Recrutement',
      nextAction: 'Signature contrat',
      nextDeadline: '2024-01-15'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'recrutement': return 'bg-blue-100 text-blue-800';
      case 'paie': return 'bg-green-100 text-green-800';
      case 'formation': return 'bg-purple-100 text-purple-800';
      case 'juridique': return 'bg-red-100 text-red-800';
      case 'evaluation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Demain";
    if (diffDays > 0) return `Dans ${diffDays}j`;
    return `Retard ${Math.abs(diffDays)}j`;
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">To-do RH</h1>
            <p className="text-gray-600 mt-1">Bonjour Camille 👋 Vous avez {tasks.filter(t => t.status === 'pending').length} tâches en attente</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="recrutement">Recrutement</SelectItem>
              <SelectItem value="paie">Paie</SelectItem>
              <SelectItem value="formation">Formation</SelectItem>
              <SelectItem value="juridique">Juridique</SelectItem>
              <SelectItem value="evaluation">Évaluation</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1 max-w-sm">
            <Input
              placeholder="Rechercher une tâche ou un collaborateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle tâche
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tâches prioritaires */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-blue-600" />
                  Tâches prioritaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Checkbox className="mt-1" />
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={task.avatar} alt={task.employee} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <div className="flex items-center space-x-2">
                          {getPriorityIcon(task.priority)}
                          <Badge variant="outline" className={getCategoryColor(task.category)}>
                            {task.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{task.employee}</p>
                      {task.description && (
                        <p className="text-sm text-gray-500">{task.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                          {formatDate(task.deadline)}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Panel latéral */}
          <div className="space-y-6">
            {/* Dossiers actifs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Dossiers actifs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.department}</p>
                      <p className="text-xs text-gray-500">{employee.nextAction}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {employee.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(employee.nextDeadline)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Statistiques rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Aperçu du jour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tâches terminées</span>
                  <span className="font-semibold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">En attente</span>
                  <span className="font-semibold text-orange-600">{tasks.filter(t => t.status === 'pending').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Échéances cette semaine</span>
                  <span className="font-semibold text-blue-600">8</span>
                </div>
                <div className="pt-2 border-t">
                  <Button variant="outline" size="sm" className="w-full">
                    Voir le rapport complet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopiloteRH;
