import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const SCIENCE_FACTS = [
  {
    fact: "El agua hierve a 100 grados Celsius",
    image: "https://images.unsplash.com/photo-1603987248955-9c142c5ae89b?w=400&auto=format&fit=crop&q=60",
  },
  {
    fact: "Las plantas necesitan luz solar para crecer",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400&auto=format&fit=crop&q=60",
  },
  {
    fact: "La Tierra gira alrededor del Sol",
    image: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=400&auto=format&fit=crop&q=60",
  },
];

export function ScienceSection() {
  const [currentFact, setCurrentFact] = useState(0);

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % SCIENCE_FACTS.length);
  };

  return (
    <div className="space-y-6 p-4">
      <Card className="max-w-md mx-auto overflow-hidden">
        <img
          src={SCIENCE_FACTS[currentFact].image}
          alt="Science fact illustration"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Sabías que...?</h3>
          <p className="text-gray-600 text-lg mb-4">{SCIENCE_FACTS[currentFact].fact}</p>
          <Button onClick={nextFact} className="w-full">
            Siguiente dato curioso
          </Button>
        </div>
      </Card>
    </div>
  );
}