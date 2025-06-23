
import { useTypewriter } from "@/hooks/useTypewriter";

interface AnimatedTitleProps {
  words: string[];
  className?: string;
}

export const AnimatedTitle = ({ words, className = "" }: AnimatedTitleProps) => {
  const text = useTypewriter({
    words,
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
    pauseAfterComplete: 3000
  });

  return (
    <h1 className={`animate-fade-in ${className}`}>
      {text}
      <span className="animate-pulse text-blue-600">|</span>
    </h1>
  );
};
