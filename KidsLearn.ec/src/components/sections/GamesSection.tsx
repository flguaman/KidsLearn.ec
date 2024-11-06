import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const COLORS = ['red', 'blue', 'green', 'yellow'];

export function GamesSection() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setSequence([newColor]);
    setPlayerSequence([]);
    setIsPlaying(true);
    setScore(0);
  };

  const handleColorClick = (color: string) => {
    if (!isPlaying) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (
      newPlayerSequence[newPlayerSequence.length - 1] !==
      sequence[newPlayerSequence.length - 1]
    ) {
      setIsPlaying(false);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(score + 1);
      const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      setTimeout(() => {
        setSequence([...sequence, newColor]);
        setPlayerSequence([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (sequence.length > 0 && isPlaying) {
      let i = 0;
      const interval = setInterval(() => {
        const button = document.querySelector(
          `[data-color="${sequence[i]}"]`
        ) as HTMLElement;
        button?.classList.add('ring-4');
        setTimeout(() => button?.classList.remove('ring-4'), 500);
        i++;
        if (i >= sequence.length) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sequence, isPlaying]);

  return (
    <div className="space-y-6 p-4">
      <Card className="max-w-md mx-auto p-6">
        <h3 className="text-2xl font-bold text-center mb-4">Simón Dice</h3>
        <p className="text-center mb-4">Puntuación: {score}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {COLORS.map((color) => (
            <button
              key={color}
              data-color={color}
              className={`w-full h-24 rounded-lg transition-all ${
                color === 'red'
                  ? 'bg-red-500'
                  : color === 'blue'
                  ? 'bg-blue-500'
                  : color === 'green'
                  ? 'bg-green-500'
                  : 'bg-yellow-500'
              }`}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>

        <Button onClick={startGame} className="w-full" disabled={isPlaying}>
          {isPlaying ? 'Jugando...' : 'Empezar juego'}
        </Button>
      </Card>
    </div>
  );
}
