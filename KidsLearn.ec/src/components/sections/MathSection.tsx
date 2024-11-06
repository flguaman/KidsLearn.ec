import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';

export function MathSection() {
  const [answer, setAnswer] = useState('');
  const [num1] = useState(() => Math.floor(Math.random() * 10));
  const [num2] = useState(() => Math.floor(Math.random() * 10));
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const checkAnswer = () => {
    const correct = Number(answer) === num1 + num2;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }
  };

  const newProblem = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Suma los números!</h3>
        <p className="text-gray-600">Puntuación: {score}</p>
      </div>

      <div className="flex items-center justify-center gap-4 text-3xl font-bold">
        <span>{num1}</span>
        <span>+</span>
        <span>{num2}</span>
        <span>=</span>
        <Input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-20 text-center text-2xl"
        />
      </div>

      {isCorrect !== null && (
        <div className={`text-center ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {isCorrect ? (
            <div className="flex items-center justify-center gap-2">
              <Check className="w-6 h-6" />
              <span>¡Correcto!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <X className="w-6 h-6" />
              <span>¡Inténtalo de nuevo!</span>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Button onClick={checkAnswer}>Comprobar</Button>
        <Button variant="outline" onClick={newProblem}>Nuevo problema</Button>
      </div>
    </div>
  );
}