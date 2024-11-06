import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
  isActive?: boolean;
}

export function CategoryCard({
  icon,
  title,
  description,
  color,
  onClick,
  isActive = false,
}: CategoryCardProps) {
  return (
    <Card 
      className={cn(
        "group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden",
        isActive && "ring-2 ring-offset-2 ring-blue-500"
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div
          className={`${color} text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  );
}