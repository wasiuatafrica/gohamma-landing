import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FeesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Competitive rates with no hidden fees. Know exactly what you're paying for.
            </p>
          </div>

          {/* Fee Structure Tabs */}
          <Tabs defaultValue="trading" className="mb-16">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="trading">Trading Fees</TabsTrigger>
              <TabsTrigger value="account">Account Fees</TabsTrigger>
            </TabsList>

            <TabsContent value="trading">
              <Card>
                <CardHeader>
                  <CardTitle>Stock Trading Fees</CardTitle>
                  <CardDescription>
                    Fees applied when buying and selling shares on the Nigerian Stock Exchange
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>
                      All fees are in accordance with NSE and SEC regulations
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fee Type</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Brokerage Commission</TableCell>
                        <TableCell>0.75%</TableCell>
                        <TableCell>Applied to the total value of each transaction</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">SEC Fee</TableCell>
                        <TableCell>0.30%</TableCell>
                        <TableCell>Regulatory fee charged by the Securities and Exchange Commission</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">NSE Fee</TableCell>
                        <TableCell>0.30%</TableCell>
                        <TableCell>Fee charged by the Nigerian Stock Exchange</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">CSCS Fee</TableCell>
                        <TableCell>0.25%</TableCell>
                        <TableCell>Central Securities Clearing System fee for settlement</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Stamp Duty</TableCell>
                        <TableCell>0.05%</TableCell>
                        <TableCell>Government tax on stock market transactions</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="flex items-center mt-6 p-4 bg-muted rounded-lg">
                    <Info className="h-5 w-5 mr-2 text-primary" />
                    <p className="text-sm">
                      Total transaction cost is approximately 1.65% for buy orders and 1.65% for sell orders.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Maintenance Fees</CardTitle>
                  <CardDescription>
                    Costs associated with maintaining your Hamma trading account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>
                      Account maintenance fees are subject to change with notice
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fee Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Account Opening</TableCell>
                        <TableCell>₦0</TableCell>
                        <TableCell>One-time</TableCell>
                        <TableCell>No fee to open a trading account</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Maintenance</TableCell>
                        <TableCell>₦1,000</TableCell>
                        <TableCell>Annual</TableCell>
                        <TableCell>Annual fee to maintain your account</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Inactivity Fee</TableCell>
                        <TableCell>₦500</TableCell>
                        <TableCell>Quarterly</TableCell>
                        <TableCell>Applied if no trades are executed for 6+ months</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Statement</TableCell>
                        <TableCell>₦0</TableCell>
                        <TableCell>On-demand</TableCell>
                        <TableCell>Electronic statements are free of charge</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Physical Statement</TableCell>
                        <TableCell>₦2,000</TableCell>
                        <TableCell>Per request</TableCell>
                        <TableCell>Fee for printed and mailed account statements</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Deposit and Withdrawal Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Deposit & Withdrawal Fees</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Deposits</CardTitle>
                  <CardDescription>Fees for adding funds to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-muted-foreground">Regular transfer from Nigerian banks</p>
                      </div>
                      <p className="font-medium text-green-600">Free</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Debit Card</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, Verve</p>
                      </div>
                      <p className="font-medium">1.5%</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">USSD Transfer</p>
                        <p className="text-sm text-muted-foreground">Using bank USSD codes</p>
                      </div>
                      <p className="font-medium">Bank charges may apply</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Mobile Money</p>
                        <p className="text-sm text-muted-foreground">Via supported mobile money providers</p>
                      </div>
                      <p className="font-medium">1.0%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Withdrawals</CardTitle>
                  <CardDescription>Fees for withdrawing funds from your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Bank Transfer (Standard)</p>
                        <p className="text-sm text-muted-foreground">Processed within 24-48 hours</p>
                      </div>
                      <p className="font-medium">₦100</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Bank Transfer (Express)</p>
                        <p className="text-sm text-muted-foreground">Processed within 2 hours</p>
                      </div>
                      <p className="font-medium">₦500</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Minimum Withdrawal</p>
                        <p className="text-sm text-muted-foreground">Lowest amount allowed per transaction</p>
                      </div>
                      <p className="font-medium">₦1,000</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Maximum Daily Withdrawal</p>
                        <p className="text-sm text-muted-foreground">Highest amount allowed per day</p>
                      </div>
                      <p className="font-medium">₦5,000,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Premium Features */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Premium Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <div className="text-4xl font-bold mb-2">Free</div>
                  <CardDescription>For new investors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Standard trading features</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Market summaries</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Basic portfolio management</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Email support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <div className="text-4xl font-bold mb-2">₦5,000</div>
                  <CardDescription>Monthly subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>All Basic features</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Advanced charting tools</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Real-time market data</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Priority customer support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Market research reports</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Institutional</CardTitle>
                  <div className="text-4xl font-bold mb-2">Custom</div>
                  <CardDescription>For corporate clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>All Pro features</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Dedicated account manager</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>API access</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Discounted trading fees</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Customized reporting</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeesPage;