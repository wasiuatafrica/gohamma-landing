import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

interface Stock {
  symbol: string;
  current_price: number;
  change: number;
}

interface MarketSummary {
  nseIndex: number;
  change: number;
  percentChange: number;
  volume: string;
  marketCap: string;
  advancers: number;
  decliners: number;
  unchanged: number;
  lastUpdated: string;
}

export const StockTicker = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { 
    data: stocksData, 
    isLoading: isLoadingStocks, 
    isError: isErrorStocks 
  } = useQuery({
    queryKey: ['https://api-hamma-f0bcaabf77ea.herokuapp.com/portfolio/popular-stocks/'], // Updated endpoint
    staleTime: 1000 * 60 * 0.30, // 1 minute
  });

  const { 
    data: marketData, 
    isLoading: isLoadingMarket, 
    isError: isErrorMarket 
  } = useQuery({
    queryKey: ['/api/market-summary'],
    staleTime: 60000, // 1 minute
  });

  // Assuming stocksData is { popular_stocks: Stock[] } based on usage
  const stocks = (stocksData as { popular_stocks: Stock[] } | undefined)?.popular_stocks;
  const marketSummary = marketData as MarketSummary | undefined;

  // Set up automatic scrolling
  useEffect(() => {
    if (!stocks || !scrollRef.current || !contentRef.current) return;
    
    let animationId: number;
    let scrollPosition = 0;
    const scrollContainer = scrollRef.current;
    const contentWidth = contentRef.current.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;
    
    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollPosition += 0.5; // Adjust speed here
      
      // Reset position when we've scrolled the full content width
      if (scrollPosition >= contentWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start the animation
    animationId = requestAnimationFrame(scroll);
    
    // Pause scrolling on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };
    
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [stocks]);

  if (isLoadingStocks || isLoadingMarket) {
    return (
      <div className="bg-muted py-2 overflow-hidden border-b border-border">
        <div className="container mx-auto">
          <div className="flex gap-4 items-center animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-32 bg-muted-foreground/20 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isErrorStocks || !stocks) {
    return (
      <div className="bg-muted py-2 overflow-hidden border-b border-border">
        <div className="container mx-auto">
          <p className="text-sm text-muted-foreground">Unable to load stock data</p>
        </div>
      </div>
    );
  }

  // Duplicate the stocks array to create a continuous scrolling effect
  // Ensure stocks is not undefined before spreading
  const duplicatedStocks = stocks ? [...stocks, ...stocks] : [];

  return (
    <div className="bg-muted py-2 overflow-hidden border-b border-border">
      <div className="container mx-auto">
        <div 
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar whitespace-nowrap"
        >
          <div 
            ref={contentRef}
            className="inline-flex items-center"
          >
            {duplicatedStocks.map((stock, index) => (
              <div 
                key={`${stock.symbol}-${index}`} 
                className="inline-flex items-center space-x-2 mr-6"
              >
                <span className="font-medium text-sm">{stock.symbol}</span>
                {/* Use stock.price as defined in the interface */}
                <span className="text-sm">₦{stock.current_price?.toFixed(2)?.toLocaleString()}</span>
                <Badge 
                  variant={stock.change >= 0 ? "default" : "destructive"} 
                  className={`flex items-center text-xs ${stock.change >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                >
                  {stock.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(stock.change).toFixed(2)?.toLocaleString()}%
                </Badge>
              </div>
            ))}

            {/* Add NSE index summary */}
            {marketSummary && (
              <div className="inline-flex items-center ml-4 pl-4 border-l border-border mr-8">
                <span className="text-xs text-muted-foreground mr-2">NSE Index:</span>
                <span className="text-sm font-medium">{marketSummary.nseIndex.toLocaleString()}</span>
                <Badge 
                  variant="default" 
                  className={`ml-2 flex items-center text-xs ${marketSummary.percentChange >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                >
                  {marketSummary.percentChange >= 0 ? 
                    <ArrowUp className="h-3 w-3 mr-1" /> : 
                    <ArrowDown className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(marketSummary.percentChange).toFixed(2)}%
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTicker;
