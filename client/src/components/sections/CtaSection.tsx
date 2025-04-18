import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Zap, PieChart } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-muted relative overflow-hidden">
      <div className="absolute bottom-0 right-0 opacity-30">
        <svg
          width="250"
          height="250"
          viewBox="0 0 250 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary opacity-10"
        >
          <path
            d="M100 50C128 50 150 72 150 100M100 0C156 0 200 44 200 100M160 170C160 187 147 200 130 200H70C53 200 40 187 40 170V130C40 113 53 100 70 100H130C147 100 160 113 160 130V170ZM130 200L130 250M70 200L70 250M100 200L100 250"
            stroke="currentColor"
            strokeWidth="15"
          />
          <circle cx="170" cy="75" r="75" fill="currentColor" fillOpacity="0.2" />
        </svg>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Trading Today</h2>
          <h3 className="text-xl md:text-2xl text-primary font-medium mb-6">No Minimums!</h3>
          
          <Card className="bg-card rounded-xl p-8 mb-8 shadow-lg">
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <Lock className="text-primary h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Secure</h4>
                  <p className="text-muted-foreground text-sm">Bank-level security</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <Zap className="text-primary h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Fast</h4>
                  <p className="text-muted-foreground text-sm">Quick execution</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <PieChart className="text-primary h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Analytics</h4>
                  <p className="text-muted-foreground text-sm">Advanced insights</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Button size="lg" className="px-8" asChild>
            <a href="/auth">Get Started Now</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
