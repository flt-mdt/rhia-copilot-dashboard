
import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter = ({ 
  end, 
  duration = 1500, 
  suffix = "", 
  className = "" 
}: AnimatedCounterProps) => {
  const { count } = useCountUp({ end, duration });

  return (
    <span className={className}>
      {Math.round(count)}{suffix}
    </span>
  );
};
