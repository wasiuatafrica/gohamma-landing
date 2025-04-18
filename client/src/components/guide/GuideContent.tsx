import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Smile, 
  Frown, 
  Meh, 
  Heart, 
  HelpCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

interface GuideStep {
  title: string;
  content: string;
  media?: MediaItem[];
}

interface GuideContentProps {
  title: string;
  description: string;
  steps: GuideStep[];
  className?: string;
}

export function GuideContent({ title, description, steps, className }: GuideContentProps) {
  const [feedbackGiven, setFeedbackGiven] = React.useState<string | null>(null);

  const handleFeedback = (type: string) => {
    setFeedbackGiven(type);
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="space-y-8 mb-10">
          {steps.map((step, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-medium">
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-2">
                  {index + 1}
                </span>
                {step.title}
              </h3>
              <p className="text-muted-foreground ml-10">{step.content}</p>
              
              {step.media && step.media.length > 0 && (
                <div className="ml-10 mt-4 space-y-4">
                  {step.media.map((media, mediaIndex) => (
                    <div key={mediaIndex} className="rounded-md overflow-hidden">
                      {media.type === 'image' ? (
                        <div>
                          <img 
                            src={media.url} 
                            alt={media.caption || `Step ${index + 1} image`} 
                            className="w-full object-cover rounded-md border border-border"
                          />
                          {media.caption && (
                            <p className="text-sm text-muted-foreground mt-1">{media.caption}</p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="relative pt-[56.25%] rounded-md border border-border overflow-hidden">
                            <iframe
                              src={media.url}
                              className="absolute top-0 left-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={media.caption || `Step ${index + 1} video`}
                            />
                          </div>
                          {media.caption && (
                            <p className="text-sm text-muted-foreground mt-1">{media.caption}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h4 className="font-medium text-center">Was this guide helpful?</h4>
          
          <div className="flex justify-center gap-2">
            <Button
              variant={feedbackGiven === 'very-unhelpful' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "gap-1",
                feedbackGiven === 'very-unhelpful' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''
              )}
              onClick={() => handleFeedback('very-unhelpful')}
            >
              <Frown className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline-block">Very Unhelpful</span>
            </Button>
            
            <Button
              variant={feedbackGiven === 'unhelpful' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "gap-1",
                feedbackGiven === 'unhelpful' ? 'bg-destructive/70 text-destructive-foreground hover:bg-destructive/80' : ''
              )}
              onClick={() => handleFeedback('unhelpful')}
            >
              <ThumbsDown className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline-block">Unhelpful</span>
            </Button>
            
            <Button
              variant={feedbackGiven === 'neutral' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "gap-1",
                feedbackGiven === 'neutral' ? 'bg-muted-foreground text-white hover:bg-muted-foreground/90' : ''
              )}
              onClick={() => handleFeedback('neutral')}
            >
              <Meh className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline-block">Neutral</span>
            </Button>
            
            <Button
              variant={feedbackGiven === 'helpful' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "gap-1",
                feedbackGiven === 'helpful' ? 'bg-primary/70 text-primary-foreground hover:bg-primary/80' : ''
              )}
              onClick={() => handleFeedback('helpful')}
            >
              <ThumbsUp className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline-block">Helpful</span>
            </Button>
            
            <Button
              variant={feedbackGiven === 'very-helpful' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "gap-1",
                feedbackGiven === 'very-helpful' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
              )}
              onClick={() => handleFeedback('very-helpful')}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline-block">Very Helpful</span>
            </Button>
          </div>
          
          {feedbackGiven && (
            <p className="text-center text-muted-foreground text-sm">
              {feedbackGiven === 'very-helpful' || feedbackGiven === 'helpful' 
                ? "Thank you for your feedback! We're glad this was helpful." 
                : feedbackGiven === 'neutral'
                ? "Thank you for your feedback. We'll continue to improve our guides."
                : "Thank you for your feedback. We'll improve this guide based on your response."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}