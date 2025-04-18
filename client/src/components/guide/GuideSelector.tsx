import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Shield, 
  BarChart3, 
  Wallet,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from './guide-data';

interface GuideSelectorProps {
  categories: Category[];
  onSelectGuide: (categoryId: string, guideId: string) => void;
  selectedCategory: string | null;
  selectedGuide: string | null;
  className?: string;
}

export function GuideSelector({ 
  categories, 
  onSelectGuide, 
  selectedCategory,
  selectedGuide,
  className 
}: GuideSelectorProps) {
  // Get icon component based on iconName
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="h-5 w-5" />;
      case 'BarChart3':
        return <BarChart3 className="h-5 w-5" />;
      case 'FileText':
        return <FileText className="h-5 w-5" />;
      case 'Shield':
        return <Shield className="h-5 w-5" />;
      case 'Wallet':
        return <Wallet className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className={cn(
              "cursor-pointer transition-all hover:border-primary hover:shadow-md",
              selectedCategory === category.id ? "border-primary bg-primary/5" : ""
            )}
            onClick={() => onSelectGuide(category.id, category.guides[0].id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-full bg-primary/10 text-primary">
                  {getIcon(category.iconName)}
                </div>
                <div>
                  <h3 className="font-medium mb-1">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                  
                  <Button 
                    variant="link" 
                    className="px-0 h-auto py-0 text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectGuide(category.id, category.guides[0].id);
                    }}
                  >
                    <span>View guides</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedCategory && (
        <div className="mt-8">
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">
              {categories.find(c => c.id === selectedCategory)?.title} Guides
            </h3>
            <p className="text-muted-foreground">
              Select a guide from the list below to view detailed instructions
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories
              .find(c => c.id === selectedCategory)
              ?.guides.map((guide) => (
                <Button
                  key={guide.id}
                  variant={selectedGuide === guide.id ? "default" : "outline"}
                  className="mb-2"
                  onClick={() => onSelectGuide(selectedCategory, guide.id)}
                >
                  {guide.title}
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}