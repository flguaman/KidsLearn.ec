import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Music as MusicIcon, Play, Pause } from 'lucide-react';

const NOTES = [
  { note: 'Do', frequency: 261.63 },
  { note: 'Re', frequency: 293.66 },
  { note: 'Mi', frequency: 329.63 },
  { note: 'Fa', frequency: 349.23 },
  { note: 'Sol', frequency: 392.00 },
];

export function MusicSection() {
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const playNote = (frequency: number, index: number) => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    setIsPlaying(index);
    
    setTimeout(() => {
      oscillator.stop();
      setIsPlaying(null);
    }, 500);
  };

  return (
    <div className="space-y-6 p-4">
      <Card className="max-w-md mx-auto p-6">
        <div className="flex items-center justify-center mb-6">
          <MusicIcon className="w-12 h-12 text-purple-500" />
        </div>
        
        <h3 className="text-2xl font-bold text-center mb-6">
          ¡Toca las notas musicales!
        </h3>

        <div className="grid grid-cols-5 gap-4">
          {NOTES.map((note, index) => (
            <Button
              key={note.note}
              variant="outline"
              className={`h-24 ${isPlaying === index ? 'bg-purple-100' : ''}`}
              onClick={() => playNote(note.frequency, index)}
            >
              <div className="flex flex-col items-center">
                {isPlaying === index ? <Pause className="w-6 h-6 mb-2" /> : <Play className="w-6 h-6 mb-2" />}
                <span>{note.note}</span>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}