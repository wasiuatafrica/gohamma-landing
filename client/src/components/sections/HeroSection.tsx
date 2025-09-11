import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { miniChartData } from "@/lib/chart-data";
import { heroImageData } from "@/assets/heroImageData";

const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-background">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Trade Nigerian Stocks <span className="text-primary">Smarter &</span> <span className="text-primary">Faster!</span>
          </h1>
          <p className="text-muted-foreground mb-6 md:pr-12">
            Experience seamless trading with our advanced platform designed to help you make informed investment decisions in the Nigerian stock market.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" asChild>
              <a href="https://www.gohamma.com/register">Get Started</a>
            </Button>
            {/* <Button variant="outline" size="lg" className="border-primary text-primary" asChild>
              <a href="/about">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button> */}
          </div>
        </div>
        
        <div className="relative mt-8 md:mt-0">
          <Card className="bg-card rounded-2xl p-4 shadow-xl transform rotate-2">
            <div className="w-full rounded-lg bg-dark overflow-hidden">
              <svg
                viewBox="0 0 400 250"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <image
                  href={heroImageData}
                  className="rounded-sm" width="400" height="250" />
                
                {/* <rect width="400" height="250" fill="#1E1E1E" />
                <path
                  d="M0 40 H400 M0 80 H400 M0 120 H400 M0 160 H400 M0 200 H400"
                  stroke="#333"
                  strokeWidth="0.5"
                />
                <path
                  d="M80 0 V250 M160 0 V250 M240 0 V250 M320 0 V250"
                  stroke="#333"
                  strokeWidth="0.5"
                />
                <path
                  d="M20,180 L60,160 L100,170 L140,150 L180,155 L220,140 L260,130 L300,110 L340,100 L380,80"
                  stroke="#00C853"
                  strokeWidth="2"
                  fill="none"
                /> */}
                {/* <circle cx="140" cy="150" r="4" fill="#00C853" />
                <circle cx="220" cy="140" r="4" fill="#00C853" />
                <circle cx="300" cy="110" r="4" fill="#00C853" />
                
                <rect x="50" y="20" width="140" height="16" rx="2" fill="#333" />
                <rect x="320" y="20" width="60" height="16" rx="2" fill="#00C853" /> */}
                
                {/* <rect x="20" y="210" width="80" height="20" rx="2" fill="#333" />
                <rect x="110" y="210" width="80" height="20" rx="2" fill="#333" />
                <rect x="200" y="210" width="80" height="20" rx="2" fill="#333" />
                <rect x="290" y="210" width="80" height="20" rx="2" fill="#00C853" /> */}
              </svg>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-muted rounded-xl p-3 shadow-lg transform -rotate-3">
              <div className="w-40 h-20 bg-card rounded-lg overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="miniChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C853" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#00C853"
                      strokeWidth={2}
                      fill="url(#miniChartGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
