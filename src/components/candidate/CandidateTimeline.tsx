
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { TimelineEvent } from "@/types/candidate";

interface CandidateTimelineProps {
  events: TimelineEvent[];
}

const CandidateTimeline = ({ events }: CandidateTimelineProps) => {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Function to get event type color based on action
  const getEventColor = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('reçue') || actionLower.includes('candidature')) return 'bg-blue-500';
    if (actionLower.includes('analysé') || actionLower.includes('ia')) return 'bg-cyan-500';
    if (actionLower.includes('consulté') || actionLower.includes('rh')) return 'bg-orange-500';
    if (actionLower.includes('entretien') || actionLower.includes('interview')) return 'bg-purple-500';
    if (actionLower.includes('accepté') || actionLower.includes('hired')) return 'bg-green-500';
    if (actionLower.includes('rejeté') || actionLower.includes('rejected')) return 'bg-red-500';
    return 'bg-gray-500';
  };

  // Function to get badge color for the event card
  const getBadgeColor = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('reçue') || actionLower.includes('candidature')) return 'bg-blue-100 text-blue-700';
    if (actionLower.includes('analysé') || actionLower.includes('ia')) return 'bg-cyan-100 text-cyan-700';
    if (actionLower.includes('consulté') || actionLower.includes('rh')) return 'bg-orange-100 text-orange-700';
    if (actionLower.includes('entretien') || actionLower.includes('interview')) return 'bg-purple-100 text-purple-700';
    if (actionLower.includes('accepté') || actionLower.includes('hired')) return 'bg-green-100 text-green-700';
    if (actionLower.includes('rejeté') || actionLower.includes('rejected')) return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="relative space-y-6">
      {sortedEvents.map((event, index) => (
        <div key={`${event.date}-${index}`} className="relative flex items-start">
          {/* Timeline line */}
          {index < sortedEvents.length - 1 && (
            <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-200" />
          )}
          
          {/* Timeline dot */}
          <div className="relative z-10 flex-shrink-0">
            <div className={`h-12 w-12 rounded-full ${getEventColor(event.action)} flex items-center justify-center shadow-md`}>
              <div className="h-3 w-3 bg-white rounded-full" />
            </div>
          </div>

          {/* Event card */}
          <div className="ml-6 flex-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                  {event.action}
                </h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(event.action)}`}>
                  {format(parseISO(event.date), 'd MMM', { locale: fr })}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {format(parseISO(event.date), 'd MMMM yyyy', { locale: fr })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateTimeline;
