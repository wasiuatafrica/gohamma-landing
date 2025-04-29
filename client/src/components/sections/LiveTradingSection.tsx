import { Card, CardContent } from "@/components/ui/card";
import { BarChart, ChevronUp, ChevronDown } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { stockChartData } from "@/lib/chart-data";
import { phoneImageData } from "@/assets/heroImageData";

const LiveTradingSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-background">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Card className="bg-card rounded-2xl overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <BarChart className="mr-3 text-primary h-6 w-6" />
              Live Trading on Nigerian Stocks
            </h2>
            <p className="text-muted-foreground mb-6">
              Stay updated with real-time market data and make informed decisions with our comprehensive trading tools.
            </p>
            <div className="bg-muted rounded-xl p-4">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={stockChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C853" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#BBBBBB' }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <YAxis 
                    tick={{ fill: '#BBBBBB' }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <CartesianGrid stroke="rgba(255, 255, 255, 0.05)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E1E1E', 
                      borderColor: '#333333',
                      color: '#EEEEEE' 
                    }}
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00C853"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <div className="relative max-w-xs">
            {/* Phone mockup */}
            <div className="border-4 border-muted rounded-3xl overflow-hidden bg-muted shadow-xl">
              <div className="w-full h-8 bg-muted flex items-center justify-center">
                <div className="w-16 h-1 bg-gray-500 rounded-full"></div>
              </div>
              <div className="w-full h-[500px] bg-card overflow-hidden">
                <svg
                  viewBox="0 0 300 550"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  {/* <rect width="300" height="550" fill="#1E1E1E" /> */}
                  <image href={phoneImageData} width="300" height="550" />
                  {/* Header */}
                  {/* <rect x="0" y="0" width="300" height="60" fill="#121212" /> */}
                  {/* <circle cx="35" cy="30" r="20" fill="#2D2D2D" /> */}
                  {/* <rect x="70" y="20" width="160" height="20" rx="2" fill="#2D2D2D" /> */}
                  {/* <circle cx="265" cy="30" r="20" fill="#2D2D2D" /> */}
                  
                  {/* Main chart */}
                  {/* <rect x="20" y="80" width="260" height="180" rx="4" fill="#121212" />
                  <path
                    d="M30,190 L60,170 L90,175 L120,160 L150,165 L180,155 L210,140 L240,130 L270,110"
                    stroke="#00C853"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M30,190 L270,190"
                    stroke="#333"
                    strokeDasharray="2,2"
                  />
                   */}
                  {/* Price tickers */}
                  {/* <rect x="20" y="280" width="80" height="50" rx="4" fill="#121212" />
                  <rect x="25" y="285" width="50" height="15" rx="2" fill="#333" />
                  <rect x="25" y="305" width="70" height="20" rx="2" fill="#00C853" />
                  
                  <rect x="110" y="280" width="80" height="50" rx="4" fill="#121212" />
                  <rect x="115" y="285" width="50" height="15" rx="2" fill="#333" />
                  <rect x="115" y="305" width="70" height="20" rx="2" fill="#FF3D00" />
                  
                  <rect x="200" y="280" width="80" height="50" rx="4" fill="#121212" />
                  <rect x="205" y="285" width="50" height="15" rx="2" fill="#333" />
                  <rect x="205" y="305" width="70" height="20" rx="2" fill="#00C853" />
                   */}
                  {/* Action buttons */}
                  {/* <rect x="20" y="350" width="260" height="60" rx="4" fill="#121212" />
                  <rect x="40" y="365" width="100" height="30" rx="4" fill="#00C853" />
                  <rect x="160" y="365" width="100" height="30" rx="4" fill="#FF3D00" /> */}
                  
                  {/* Bottom menu */}
                  {/* <rect x="0" y="500" width="300" height="50" fill="#121212" />
                  <circle cx="50" cy="525" r="15" fill="#2D2D2D" />
                  <circle cx="150" cy="525" r="15" fill="#00C853" />
                  <circle cx="250" cy="525" r="15" fill="#2D2D2D" /> */}
                </svg>
              </div>
              <div className="w-full h-8 bg-muted flex items-center justify-center">
                <div className="w-12 h-3 bg-gray-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Floating element */}
            <div className="absolute -top-4 -right-4 bg-card rounded-xl p-3 shadow-lg transform rotate-6">
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-black">
                  <ChevronUp className="h-6 w-6" />
                </div>
                <div className="w-10 h-10 bg-destructive rounded-md flex items-center justify-center text-white">
                  <ChevronDown className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTradingSection;
