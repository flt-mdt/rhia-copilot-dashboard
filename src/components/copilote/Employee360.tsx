
import React from 'react';
import { Users } from 'lucide-react';
import MiniEmployeeCard from './MiniEmployeeCard';

const Employee360: React.FC = () => {
  const employees = [
    {
      id: '1',
      name: 'Victor Martin',
      avatar: '/placeholder.svg',
      status: 'Période d\'essai',
      nextDeadline: '2024-01-15',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Clara Dubois',
      avatar: '/placeholder.svg',
      status: 'Entretien annuel',
      nextDeadline: '2024-01-18',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'Julien Moreau',
      avatar: '/placeholder.svg',
      status: 'Formation',
      nextDeadline: '2024-01-20',
      priority: 'low'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="h-5 w-5 text-sage" />
        <h2 className="text-lg font-bold text-charcoal">Dossiers actifs</h2>
      </div>
      
      <div className="space-y-4">
        {employees.map((employee) => (
          <MiniEmployeeCard
            key={employee.id}
            employee={employee}
            onClick={(employee) => {
              console.log('Opening employee sidebar:', employee);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Employee360;
