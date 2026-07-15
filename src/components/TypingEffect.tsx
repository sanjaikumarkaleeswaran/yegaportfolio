import { useEffect, useState } from 'react';

interface TypingEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingEffect({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
}: TypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setCurrentText((prev) => activeWord.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Word completed, wait and then delete
    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }

    // Word deleted, move to next word
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center">
      <span className="text-accent-cyan font-semibold text-glow-cyan font-orbitron">{currentText}</span>
      <span className="w-[3px] h-[1.25em] bg-accent-cyan ml-1 animate-[pulse_1s_infinite] shadow-[0_0_8px_#22d3ee]" />
    </span>
  );
}
