import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, BarChart2, Repeat, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface Stock {
  symbol: string;
  current_price: number;
  change: number;
}

const MarketSummaryPage = () => {
  const { data: marketData, isLoading: isLoadingMarket } = useQuery({
    queryKey: ['/api/market-summary'],
    staleTime: 60000, // 1 minute
  });

  const { data: stocksData, isLoading: isLoadingStocks } = useQuery({
    queryKey: ['https://api-hamma-f0bcaabf77ea.herokuapp.com/portfolio/popular-stocks/'], // Updated endpoint
    staleTime: 60000, // 1 minute
  });

  const marketSummary = marketData as MarketSummary | undefined;
  const stocks = (stocksData as { popular_stocks: Stock[] } | undefined)?.popular_stocks;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />
      
      <main className="flex-1 py-10 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Market Summary</h1>
          
          {isLoadingMarket || !marketSummary ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-xl"></div>
              ))}
            </div>
          ) : (
            <>
              {/* Market Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <BarChart2 className="w-4 h-4 mr-2 text-primary" />
                      NSE All-Share Index
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{marketSummary.nseIndex.toLocaleString()}</div>
                    <div className="flex items-center mt-1">
                      <Badge 
                        variant={marketSummary.percentChange >= 0 ? "default" : "destructive"}
                        className={`flex items-center ${marketSummary.percentChange >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                      >
                        {marketSummary.percentChange >= 0 ? 
                          <ArrowUp className="h-3 w-3 mr-1" /> : 
                          <ArrowDown className="h-3 w-3 mr-1" />
                        }
                        {Math.abs(marketSummary.percentChange).toFixed(2)}%
                      </Badge>
                      <span className="text-muted-foreground text-sm ml-2">
                        {marketSummary.change >= 0 ? "+" : ""}{marketSummary.change.toFixed(2)} pts
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                      Market Cap
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦{marketSummary.marketCap}</div>
                    <div className="text-muted-foreground text-sm mt-1">
                      Volume: {marketSummary.volume} shares
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Repeat className="w-4 h-4 mr-2 text-primary" />
                      Market Breadth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="text-lg font-bold text-green-500">{marketSummary.advancers}</div>
                        <div className="text-xs text-muted-foreground">Gainers</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-red-500">{marketSummary.decliners}</div>
                        <div className="text-xs text-muted-foreground">Losers</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{marketSummary.unchanged}</div>
                        <div className="text-xs text-muted-foreground">Unchanged</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      Last Updated
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-medium">
                      {marketSummary.lastUpdated ? formatDate(marketSummary.lastUpdated) : "N/A"}
                    </div>
                    <div className="text-muted-foreground text-sm mt-1">
                      Nigerian Stock Exchange
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          
          {/* Top Gainers and Losers */}
          {!isLoadingStocks && stocks && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ArrowUp className="text-green-500 w-5 h-5 mr-2" />
                    Top Gainers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stocks
                      .filter(stock => stock.change > 0)
                      .sort((a, b) => b.change - a.change)
                      .slice(0, 5)
                      .map(stock => (
                        <div key={stock.symbol} className="flex justify-between items-center py-2 border-b border-border">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">₦{stock.current_price.toFixed(2)}</div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-500">
                            +{stock.change.toFixed(2)}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ArrowDown className="text-red-500 w-5 h-5 mr-2" />
                    Top Losers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stocks
                      .filter(stock => stock.change < 0)
                      .sort((a, b) => a.change - b.change)
                      .slice(0, 5)
                      .map(stock => (
                        <div key={stock.symbol} className="flex justify-between items-center py-2 border-b border-border">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">₦{stock.current_price.toFixed(2)}</div>
                          </div>
                          <Badge className="bg-red-500/20 text-red-500">
                            {stock.change.toFixed(2)}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketSummaryPage;