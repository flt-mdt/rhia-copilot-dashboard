
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Clock, Video, Globe, ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const availableTimes = [
  '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
];

const ScheduleDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (date && selectedTime) {
      alert(`Rendez-vous confirmé pour le ${format(date, 'PPP', { locale: fr })} à ${selectedTime}. Vous allez être redirigé vers la page d'accueil.`);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-gray-200">
        {/* Left Panel */}
        <div className="p-8 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
          <button onClick={() => navigate('/')} className="self-start mb-8 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>
          <div className="flex items-center gap-3 mb-8">
             <img
              src="/lovable-uploads/fdc4d16b-8516-4b74-b559-2340f062242b.png"
              alt="RHIA Copilot Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-semibold text-xl text-gray-900">RHIA Copilot</span>
          </div>

          <p className="text-gray-500 font-medium">Expert RHIA</p>
          <h1 className="text-3xl font-bold text-gray-900 my-2">Démo personnalisée</h1>

          <div className="space-y-4 mt-6 text-gray-600">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <span>30 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 flex-shrink-0" />
                <span>Visioconférence (Google Meet)</span>
              </div>
          </div>

          <p className="text-sm text-gray-500 mt-8 flex-grow">
            Planifiez une session de 30 minutes avec l'un de nos experts pour découvrir comment RHIA peut transformer votre processus de recrutement.
          </p>
        </div>

        {/* Right Panel - Calendar & Time Slots */}
        <div className="p-8 lg:col-span-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Sélectionnez une date</h2>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day) => { setDate(day); setSelectedTime(null); }}
                    disabled={(current) => current < new Date(new Date().setDate(new Date().getDate() - 1))}
                    className="p-0 rounded-lg border"
                    locale={fr}
                />
                <div className="flex items-center gap-3 text-gray-600 mt-4 pt-4 border-t border-gray-100">
                    <Globe className="w-5 h-5" />
                    <span>Europe/Paris (GMT+2)</span>
                </div>
            </div>
            
            <div className="flex-1 md:max-w-xs">
                 <h2 className="font-semibold text-xl mb-4 text-center md:text-left capitalize">
                    {date ? format(date, 'eeee d MMMM', { locale: fr }) : 'Sélectionnez une date'}
                </h2>
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                    {availableTimes.map((time) => (
                    <div key={time} className="relative">
                        <Button
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full justify-center"
                        onClick={() => handleTimeSelect(time)}
                        disabled={!date}
                        >
                        {time}
                        </Button>
                        {selectedTime === time && (
                        <Button 
                            onClick={handleConfirm} 
                            className="absolute inset-0 w-full bg-blue-600 hover:bg-blue-700 z-10 animate-fade-in"
                        >
                            Confirmer
                        </Button>
                        )}
                    </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDemo;
