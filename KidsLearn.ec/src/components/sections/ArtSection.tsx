import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eraser, Download } from 'lucide-react';

export function ArtSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.strokeStyle = color;
    context.lineWidth = 5;
    context.lineCap = 'round';
  }, [color]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    context.beginPath();
    context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'mi-dibujo.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="space-y-6 p-4">
      <Card className="max-w-md mx-auto p-6">
        <h3 className="text-2xl font-bold text-center mb-4">¡Dibuja lo que imagines!</h3>
        
        <div className="mb-4 flex justify-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 cursor-pointer"
          />
          <Button variant="outline" onClick={clearCanvas}>
            <Eraser className="w-4 h-4 mr-2" />
            Borrar todo
          </Button>
          <Button variant="outline" onClick={downloadDrawing}>
            <Download className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>

        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-gray-200 rounded-lg cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </Card>
    </div>
  );
}