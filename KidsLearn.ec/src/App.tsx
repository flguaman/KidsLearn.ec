import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/CategoryCard';
import { MathSection } from '@/components/sections/MathSection';
import { ScienceSection } from '@/components/sections/ScienceSection';
import { GamesSection } from '@/components/sections/GamesSection';
import { MusicSection } from '@/components/sections/MusicSection';
import { ArtSection } from '@/components/sections/ArtSection';
import {
  Brain,
  Calculator,
  Music,
  Palette,
  Puzzle,
  Stars,
  ArrowLeft,
} from 'lucide-react';

type Section = 'math' | 'science' | 'games' | 'music' | 'art' | null;

function App() {
  const [activeSection, setActiveSection] = useState<Section>(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'math':
        return <MathSection />;
      case 'science':
        return <ScienceSection />;
      case 'games':
        return <GamesSection />;
      case 'music':
        return <MusicSection />;
      case 'art':
        return <ArtSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <header className="py-6 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stars className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              KidsLearn.ec
            </h1>
          </div>
          {activeSection && (
            <Button
              variant="ghost"
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!activeSection ? (
          <>
            <section className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                ¡Aprende jugando!
              </h2>
              <p className="text-xl text-gray-600">
                Explora un mundo mágico de conocimiento
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CategoryCard
                icon={<Calculator className="h-8 w-8" />}
                title="Matemáticas"
                description="¡Aprende números y operaciones de forma divertida!"
                color="bg-pink-500"
                onClick={() => setActiveSection('math')}
              />
              <CategoryCard
                icon={<Brain className="h-8 w-8" />}
                title="Ciencias"
                description="Descubre los misterios del mundo"
                color="bg-blue-500"
                onClick={() => setActiveSection('science')}
              />
              <CategoryCard
                icon={<Puzzle className="h-8 w-8" />}
                title="Juegos"
                description="Resuelve rompecabezas y desafíos"
                color="bg-green-500"
                onClick={() => setActiveSection('games')}
              />
              <CategoryCard
                icon={<Music className="h-8 w-8" />}
                title="Música"
                description="Explora ritmos y melodías"
                color="bg-yellow-500"
                onClick={() => setActiveSection('music')}
              />
              <CategoryCard
                icon={<Palette className="h-8 w-8" />}
                title="Arte"
                description="Libera tu creatividad"
                color="bg-purple-500"
                onClick={() => setActiveSection('art')}
              />
            </div>
          </>
        ) : (
          renderSection()
        )}
      </main>

      <footer className="bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Hecho con ❤️ para los pequeños exploradores</p>
        </div>
      </footer>
    </div>
  );
}

export default App;