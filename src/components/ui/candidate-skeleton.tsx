
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const CandidateSkeleton = () => {
  return (
    <Card className="overflow-hidden border border-gray-100 p-6">
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Skeleton className="h-6 w-16 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-8" />
        </div>
        <Skeleton className="h-2 w-full" />
      </div>

      <div className="grid grid-cols-2 gap-y-3 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>

      <Skeleton className="h-4 w-20 mb-4" />

      <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </Card>
  );
};

export const CandidateSkeletonGrid = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="animate-fade-in opacity-0"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'forwards'
          }}
        >
          <CandidateSkeleton />
        </div>
      ))}
    </div>
  );
};
