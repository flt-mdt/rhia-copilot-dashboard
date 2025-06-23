
import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  pauseAfterComplete?: number;
}

export const useTypewriter = ({ 
  words, 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delayBetweenWords = 2000,
  pauseAfterComplete = 5000
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Démarrer immédiatement l'animation
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Word completed, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Deletion completed, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isPaused ? pauseAfterComplete : (isDeleting ? deleteSpeed : typeSpeed));

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, typeSpeed, deleteSpeed, delayBetweenWords, pauseAfterComplete, isInitialized]);

  return currentText;
};
