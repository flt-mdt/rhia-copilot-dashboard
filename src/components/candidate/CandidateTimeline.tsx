
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
    if (actionLower.includes('reçue') || actionLower.includes('candidature')) return 'bg-blue-100 text-blue-600';
    if (actionLower.includes('analysé') || actionLower.includes('ia')) return 'bg-cyan-100 text-cyan-600';
    if (actionLower.includes('consulté') || actionLower.includes('rh')) return 'bg-orange-100 text-orange-600';
    if (actionLower.includes('entretien') || actionLower.includes('interview')) return 'bg-purple-100 text-purple-600';
    if (actionLower.includes('accepté') || actionLower.includes('hired')) return 'bg-green-100 text-green-600';
    if (actionLower.includes('rejeté') || actionLower.includes('rejected')) return 'bg-red-100 text-red-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="relative">
      {sortedEvents.map((event, index) => (
        <div key={`${event.date}-${index}`} className="relative flex items-start pb-8 last:pb-0">
          {/* Timeline line - positioned exactly like in the reference */}
          {index < sortedEvents.length - 1 && (
            <div className="absolute left-3 top-6 w-0.5 h-full bg-gray-200" style={{ height: 'calc(100% + 2rem)' }} />
          )}
          
          {/* Timeline dot - exact size and positioning from reference */}
          <div className="relative z-10 flex-shrink-0 mr-4">
            <div className={`w-6 h-6 rounded-full ${getEventColor(event.action)} flex items-center justify-center`}>
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* Event card - matching the reference style exactly */}
          <div className="flex-1 min-w-0">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm leading-5">
                  {event.action}
                </h4>
              </div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getBadgeColor(event.action)}`}>
                  {format(parseISO(event.date), 'd MMM yyyy', { locale: fr })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateTimeline;
