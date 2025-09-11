import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, BarChart2, Repeat, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatNumberShort } from "@/lib/utils";

interface MarketSummary {
  symbol: string;
  exchange: string;
  last_update_time: string;
  point_change: number;
  percent_change: number;
  last_price: number;
  volume: number;
  market_capitalization: number;
  market_breadth: any[];
  top_gainers: Stock[];
  top_losers: Stock[];
}

interface Stock {
  symbol: string;
  last_close: number;
  todays_close: number;
  percentage_change: number;
}

const MarketSummaryPage = () => {
  const { data: marketData, isLoading: isLoadingMarket } = useQuery({
    queryKey: ['https://api-hamma-f0bcaabf77ea.herokuapp.com/support/summary/'],
    staleTime: 60000, // 1 minute
  });

  const marketSummary = marketData as MarketSummary | undefined;

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
                    <div className="text-2xl font-bold">{(marketSummary?.last_price||0)?.toLocaleString()}</div>
                    <div className="flex items-center mt-1">
                      <Badge
                        variant={marketSummary.percent_change >= 0 ? "default" : "destructive"}
                        className={`flex items-center ${marketSummary.percent_change >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                      >
                        {marketSummary.percent_change >= 0 ? 
                          <ArrowUp className="h-3 w-3 mr-1" /> : 
                          <ArrowDown className="h-3 w-3 mr-1" />
                        }
                        {Math.abs(marketSummary.percent_change).toFixed(2)}%
                      </Badge>
                      <span className="text-muted-foreground text-sm ml-2">
                        {marketSummary.point_change >= 0 ? "+" : ""}{marketSummary.point_change.toFixed(2)} pts
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
                    <div className="text-2xl font-bold">₦{formatNumberShort(marketSummary.market_capitalization.toString())}</div>
                    <div className="text-muted-foreground text-sm mt-1">
                      Volume: {formatNumberShort(marketSummary.volume.toString())} shares
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Repeat className="w-4 h-4 mr-2 text-primary" />
                      Exchange
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{marketSummary.exchange}</div>
                    <div className="text-muted-foreground text-sm mt-1">
                      {marketSummary.symbol} Index
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
                      {marketSummary.last_update_time ? formatDate(marketSummary.last_update_time) : "N/A"}
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
          {!isLoadingMarket && marketSummary && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Gainers Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ArrowUp className="text-green-500 w-5 h-5 mr-2" />
                    Top Gainers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {marketSummary.top_gainers && marketSummary.top_gainers.length > 0 ? (
                    <div className="space-y-3">
                      {marketSummary.top_gainers.slice(0, 5).map(stock => (
                        <div key={stock.symbol} className="flex justify-between items-center py-2 border-b border-border">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">₦{stock.todays_close.toFixed(2)}</div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-500">
                            +{stock.percentage_change.toFixed(2)}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No top gainers available today.</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Top Losers Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ArrowDown className="text-red-500 w-5 h-5 mr-2" />
                    Top Losers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {marketSummary.top_losers && marketSummary.top_losers.length > 0 ? (
                    <div className="space-y-3">
                      {marketSummary.top_losers.slice(0, 5).map(stock => (
                        <div key={stock.symbol} className="flex justify-between items-center py-2 border-b border-border">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">₦{stock.todays_close.toFixed(2)}</div>
                          </div>
                          <Badge className="bg-red-500/20 text-red-500">
                            {stock.percentage_change.toFixed(2)}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No top losers available today.</p>
                  )}
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
