
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

  return (
    <div className="relative ml-3">
      {sortedEvents.map((event, index) => (
        <div key={`${event.date}-${index}`} className="mb-6 last:mb-0">
          <div className="flex items-center">
            <div className="absolute left-0 mt-1 -ml-3">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            </div>
            <div className="min-w-0 flex-1 ml-4">
              <p className="text-sm font-medium text-gray-900">{event.action}</p>
              <p className="text-xs text-gray-500">
                {format(parseISO(event.date), 'd MMMM yyyy', { locale: fr })}
              </p>
            </div>
          </div>
          {index < sortedEvents.length - 1 && (
            <div className="absolute h-full w-px bg-gray-300 left-[-0.75rem] top-3" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CandidateTimeline;
