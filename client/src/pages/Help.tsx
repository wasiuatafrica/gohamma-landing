import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient"; // Assuming apiRequest is in lib
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Import Label
import { Textarea } from "@/components/ui/textarea";
import {
        BookOpen,
        BadgeHelp,
        FileText,
        ShieldCheck,
        ChevronRight,
        Mail,
        Phone,
        MessageSquare,
        MapPin,
        Search,
        ArrowLeft,
        Tag,
        Loader2 // Import Loader icon
} from "lucide-react";
import { GuideSelector } from "@/components/guide/GuideSelector";
import { GuideContent } from "@/components/guide/GuideContent";
import { guideCategories, Guide, Category } from "@/components/guide/guide-data";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast"; // Import the hook
import { useChatbot } from "@/context/ChatbotContext"; // Import the context hook

interface SearchResult {
        categoryId: string;
        guideId: string;
        title: string;
        description: string;
        matchType: 'title' | 'description' | 'content' | 'step';
        stepIndex?: number;
        relevance: number;
}

const HelpPage = () => {
        const { toast } = useToast();
        const { setIsChatbotOpen } = useChatbot(); // Use the context hook
        const [searchQuery, setSearchQuery] = useState("");
        const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
        const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
        const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
        const [isSearching, setIsSearching] = useState(false);

        const handleSelectGuide = (categoryId: string, guideId: string) => {
                setSelectedCategory(categoryId);
                setSelectedGuide(guideId);
                setSearchResults([]);

                // Scroll to guides section
                document.getElementById("guides-section")?.scrollIntoView({ behavior: "smooth" });
        };

        const searchGuides = (query: string): SearchResult[] => {
                if (!query.trim()) return [];

                const results: SearchResult[] = [];
                const lowercaseQuery = query.toLowerCase();

                // Search through all guides in all categories
                guideCategories.forEach(category => {
                        category.guides.forEach(guide => {
                                // Check title match
                                if (guide.title.toLowerCase().includes(lowercaseQuery)) {
                                        results.push({
                                                categoryId: category.id,
                                                guideId: guide.id,
                                                title: guide.title,
                                                description: guide.description,
                                                matchType: 'title',
                                                relevance: 100, // Highest relevance for title matches
                                        });
                                }
                                // Check description match
                                else if (guide.description.toLowerCase().includes(lowercaseQuery)) {
                                        results.push({
                                                categoryId: category.id,
                                                guideId: guide.id,
                                                title: guide.title,
                                                description: guide.description,
                                                matchType: 'description',
                                                relevance: 80, // High relevance for description matches
                                        });
                                }

                                // Check content in steps
                                guide.steps.forEach((step, index) => {
                                        if (step.title.toLowerCase().includes(lowercaseQuery) ||
                                                step.content.toLowerCase().includes(lowercaseQuery)) {
                                                // Only add if not already in results
                                                if (!results.some(r => r.guideId === guide.id)) {
                                                        results.push({
                                                                categoryId: category.id,
                                                                guideId: guide.id,
                                                                title: guide.title,
                                                                description: guide.description,
                                                                matchType: 'step',
                                                                stepIndex: index,
                                                                relevance: step.title.toLowerCase().includes(lowercaseQuery) ? 70 : 60,
                                                        });
                                                }
                                        }
                                });
                        });
                });

                // Sort by relevance
                return results.sort((a, b) => b.relevance - a.relevance);
        };

        const handleSearch = (e: React.FormEvent) => {
                e.preventDefault();
                console.log("Searching for:", searchQuery);
                setIsSearching(true);

                // Simulate search delay for better UX
                setTimeout(() => {
                        const results = searchGuides(searchQuery);
                        setSearchResults(results);
                        setIsSearching(false);

                        // If we have results, scroll to them
                        if (results.length > 0) {
                                document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" });
                        }
                }, 300);
        };

        const handleBackToGuides = () => {
                setSelectedGuide(null);
                setSelectedCategory(null);
                setSearchResults([]);
        };

        // Find the currently selected guide
        const currentGuide = selectedCategory && selectedGuide
                ? guideCategories
                        .find(category => category.id === selectedCategory)
                        ?.guides.find(guide => guide.id === selectedGuide)
                : null;

        // Clear search results when navigating to a specific guide
        useEffect(() => {
                if (selectedGuide) {
                        setSearchResults([]);
                }
        }, [selectedGuide]);

        // --- Contact Form Logic ---
        const contactFormSchema = z.object({
                full_name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
                email: z.string().email({ message: "Please enter a valid email address." }),
                subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
                message: z.string().min(10, { message: "Message must be at least 10 characters." }),
        });

        type ContactFormData = z.infer<typeof contactFormSchema>;

        const {
                register,
                handleSubmit,
                formState: { errors },
                reset
        } = useForm<ContactFormData>({
                resolver: zodResolver(contactFormSchema),
        });

        const contactMutation = useMutation({
                mutationFn: (data: ContactFormData) => {
                        return apiRequest("POST", "https://api-hamma-f0bcaabf77ea.herokuapp.com/support/messages/", data);
                },
                onSuccess: async (res) => {
                        if (!res.ok) {
                                // Try to parse error message from backend if response is not ok
                                let errorData;
                                try {
                                        errorData = await res.json();
                                } catch (e) {
                                        console.log(errorData?.detail || `Request failed with status ${res.status}`);
                                }
                                // throw new Error(errorData?.detail || `Request failed with status ${res.status}`);
                        }
                        toast({
                                title: "Message Sent!",
                                description: "Thank you for contacting us. We'll get back to you soon.",
                        });
                        reset(); // Clear the form on success
                },
                onError: (error: Error) => {
                        toast({
                                title: "Submission Failed",
                                description: error.message || "An unexpected error occurred. Please try again.",
                                variant: "destructive",
                        });
                },
        });

        const onSubmitContact = (data: ContactFormData) => {
                contactMutation.mutate(data);
        };
        // --- End Contact Form Logic ---

        return (
                <div className="min-h-screen flex flex-col">
                        <Header />

                        <main className="flex-1">
                                {/* Hero Section */}
                                <section className="bg-primary/5 py-16 px-4">
                                        <div className="container mx-auto text-center">
                                                <h1 className="text-4xl md:text-5xl font-bold mb-4">How Can We Help You?</h1>
                                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                                                        Find resources to help you trade Nigerian stocks on the Hamma platform - the future of trading Nigerian stocks
                                                </p>

                                                <div className="max-w-2xl mx-auto">
                                                        <form onSubmit={handleSearch} className="relative">
                                                                <Input
                                                                        placeholder="Search for help topics..."
                                                                        className="w-full pr-12 h-12 rounded-full"
                                                                        value={searchQuery}
                                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                                />
                                                                <Button type="submit" className="absolute right-0 top-0 h-12 rounded-full px-4">
                                                                        <Search className="h-5 w-5" />
                                                                </Button>
                                                        </form>

                                                        <div className="mt-4 text-sm text-muted-foreground">
                                                                Popular searches:
                                                                <span className="ml-1">
                                                                        <Button
                                                                                variant="link"
                                                                                className="p-0 h-auto text-sm"
                                                                                onClick={() => {
                                                                                        setSearchQuery("account verification");
                                                                                        handleSelectGuide("getting-started", "account-setup");
                                                                                }}
                                                                        >
                                                                                account verification
                                                                        </Button>,
                                                                        <Button
                                                                                variant="link"
                                                                                className="p-0 h-auto text-sm"
                                                                                onClick={() => {
                                                                                        setSearchQuery("withdrawals");
                                                                                        handleSelectGuide("payments", "withdrawal-process");
                                                                                }}
                                                                        >
                                                                                withdrawals
                                                                        </Button>,
                                                                        <Button
                                                                                variant="link"
                                                                                className="p-0 h-auto text-sm"
                                                                                onClick={() => {
                                                                                        setSearchQuery("trading");
                                                                                        handleSelectGuide("trading", "placing-order");
                                                                                }}
                                                                        >
                                                                                trading guide
                                                                        </Button>
                                                                </span>
                                                        </div>
                                                </div>
                                        </div>
                                </section>

                                <div className="container mx-auto py-16 px-4">
                                        {/* Search Results */}
                                        {searchResults.length > 0 && (
                                                <section id="search-results" className="mb-16">
                                                        <div className="mb-8">
                                                                <div className="flex items-center justify-between">
                                                                        <h2 className="text-3xl font-bold">Search Results</h2>
                                                                        <Button
                                                                                variant="ghost"
                                                                                className="gap-2"
                                                                                onClick={() => setSearchResults([])}
                                                                        >
                                                                                Clear Results <span className="text-muted-foreground">({searchResults.length})</span>
                                                                        </Button>
                                                                </div>
                                                                <p className="text-muted-foreground">
                                                                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                                                                </p>
                                                        </div>

                                                        <div className="grid gap-4">
                                                                {searchResults.map((result, index) => {
                                                                        const category = guideCategories.find(c => c.id === result.categoryId);
                                                                        return (
                                                                                <Card key={`${result.guideId}-${index}`} className="overflow-hidden">
                                                                                        <CardContent className="p-0">
                                                                                                <div
                                                                                                        className="p-6 cursor-pointer transition-colors hover:bg-muted/50"
                                                                                                        onClick={() => handleSelectGuide(result.categoryId, result.guideId)}
                                                                                                >
                                                                                                        <div className="flex items-start justify-between gap-4">
                                                                                                                <div>
                                                                                                                        <div className="font-semibold text-lg mb-1">{result.title}</div>
                                                                                                                        <p className="text-muted-foreground text-sm mb-3">{result.description}</p>

                                                                                                                        <div className="flex items-center gap-2 text-xs">
                                                                                                                                {category && (
                                                                                                                                        <Badge variant="outline" className="gap-1">
                                                                                                                                                <Tag className="h-3 w-3" />
                                                                                                                                                {category.title}
                                                                                                                                        </Badge>
                                                                                                                                )}

                                                                                                                                {result.matchType === 'title' && (
                                                                                                                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                                                                                                                                Title match
                                                                                                                                        </Badge>
                                                                                                                                )}
                                                                                                                                {result.matchType === 'description' && (
                                                                                                                                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                                                                                                                                Description match
                                                                                                                                        </Badge>
                                                                                                                                )}
                                                                                                                                {result.matchType === 'step' && (
                                                                                                                                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                                                                                                                                                Content match
                                                                                                                                        </Badge>
                                                                                                                                )}
                                                                                                                        </div>
                                                                                                                </div>

                                                                                                                <Button
                                                                                                                        variant="ghost"
                                                                                                                        size="sm"
                                                                                                                        className="gap-1"
                                                                                                                        onClick={() => handleSelectGuide(result.categoryId, result.guideId)}
                                                                                                                >
                                                                                                                        View Guide <ChevronRight className="h-4 w-4" />
                                                                                                                </Button>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </CardContent>
                                                                                </Card>
                                                                        )
                                                                })}
                                                        </div>
                                                </section>
                                        )}

                                        {/* Loading state */}
                                        {isSearching && (
                                                <section className="mb-16 text-center py-12">
                                                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                        </div>
                                                        <p className="mt-4 text-muted-foreground">Searching for "{searchQuery}"...</p>
                                                </section>
                                        )}

                                        {/* Guides Section */}
                                        <section id="guides-section" className="mb-16">
                                                <div className="mb-8">
                                                        <h2 className="text-3xl font-bold mb-2">Help Guides</h2>
                                                        <p className="text-muted-foreground">
                                                                Detailed guides with step-by-step instructions, images, and videos to help you use the Hamma platform - the modern trading platform for Nigerian Stock
                                                        </p>
                                                </div>

                                                {selectedGuide && currentGuide ? (
                                                        <div>
                                                                <Button
                                                                        variant="outline"
                                                                        className="mb-6 gap-2"
                                                                        onClick={handleBackToGuides}
                                                                >
                                                                        <ArrowLeft className="h-4 w-4" />
                                                                        Back to Guides
                                                                </Button>

                                                                <GuideContent
                                                                        title={currentGuide.title}
                                                                        description={currentGuide.description}
                                                                        steps={currentGuide.steps}
                                                                />
                                                        </div>
                                                ) : (
                                                        <GuideSelector
                                                                categories={guideCategories}
                                                                onSelectGuide={handleSelectGuide}
                                                                selectedCategory={selectedCategory}
                                                                selectedGuide={selectedGuide}
                                                        />

                                                )}
                                        </section>

                                        <Separator className="my-16" />

                                        {/* FAQs Section */}
                                        <section className="mb-16">
                                                <div className="text-center mb-8">
                                                        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                                                        <p className="text-muted-foreground mt-2">
                                                                Find quick answers to the most common questions
                                                        </p>
                                                </div>

                                                <Tabs defaultValue="account" className="max-w-4xl mx-auto">
                                                        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
                                                                <TabsTrigger value="account">Account</TabsTrigger>
                                                                <TabsTrigger value="trading">Trading</TabsTrigger>
                                                                {/* <TabsTrigger value="deposits">Deposits & Withdrawals</TabsTrigger> */}
                                                                <TabsTrigger value="security">Security</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="account" className="mt-6">
                                                                <Accordion type="single" collapsible className="w-full">
                                                                        <AccordionItem value="item-1">
                                                                                <AccordionTrigger>How do I open a Hamma account?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        To open an account, click the "Sign Up" button at the top of the page and fill in your details. The process is instant.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-2">
                                                                                <AccordionTrigger>What documents do I need to register?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        You will need your personal details, a valid government ID (like a National ID, driver's license, or passport), proof of your address (like a utility bill or bank statement from the last 3 months), and your bank account information.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-3">
                                                                                <AccordionTrigger>How do I update my personal details?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        You can update most of your information in the "Profile" section after you log in. If you need to change important details like your name, bank information, or ID, you will need to contact customer support and provide the right documents.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-4">
                                                                                <AccordionTrigger>Can I have more than one Hamma account?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        No, you can only have one Hamma account per person. However, you can have multiple trading accounts under that one main account. This rule helps us follow regulations and keep things secure.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-5">
                                                                                <AccordionTrigger>How old do I need to be to open an account?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        You must be at least 18 years old to open a Hamma account.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-6">
                                                                                <AccordionTrigger>What is the difference between my Hamma account and my trading account?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Your Hamma account is your main profile and wallet. You can have several trading accounts linked to it for different goals or strategies, but they are all managed under your one Hamma account.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-7">
                                                                                <AccordionTrigger>Can I change my registered email address?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        No, you cannot change your registered email address.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-8">
                                                                                <AccordionTrigger>What happens if I forget my password?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        On the login page, click "Forgot Password?" and follow the instructions. A link to reset your password will be sent to your registered email address.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-9">
                                                                                <AccordionTrigger>How do I close my account?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        To close your account, you must first withdraw all your funds. Then, please contact customer support and submit a request.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-10">
                                                                                <AccordionTrigger>Can I use a joint bank account to register?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        No, the bank account you register with must be in your name only. This helps us follow regulations and protect your funds.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-11">
                                                                                <AccordionTrigger>Is there a fee to open an account?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        No, opening a Hamma account is completely free.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-12">
                                                                                <AccordionTrigger>Why do I need to provide proof of address?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        We need proof of address to confirm your identity and location. This is a standard practice required by financial regulations to prevent fraud and money laundering.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-13">
                                                                                <AccordionTrigger>How long does it take for my new documents to be verified?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        After you submit new documents, such as an updated ID, it typically takes 1 business days for our team to review and verify them.
                                                                                </AccordionContent>
                                                                        </AccordionItem>

                                                                </Accordion>
                                                        </TabsContent>

                                                        <TabsContent value="trading" className="mt-6">
                                                                <Accordion type="single" collapsible className="w-full">
                                                                        <AccordionItem value="item-1">
                                                                                <AccordionTrigger>How do I place a trade?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Log in, go to the "Market" section, and choose the stock you want to buy or sell. Enter how many you want and the price you want to pay (market or limit). Review your order and confirm it. Trades are completed during the Nigerian Stock Exchange (NSE) trading hours, from 10:00 AM to 2:30 PM WAT, Monday to Friday.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-2">
                                                                                <AccordionTrigger>What are the NSE trading hours?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        The Nigerian Stock Exchange (NSE) is open for trading from 10:00 AM to 2:30 PM WAT, Monday to Friday. It is closed on public holidays.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-3">
                                                                                <AccordionTrigger>What types of orders can I place?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Hamma offers two types of orders:
                                                                                        <ul className="list-disc list-inside pl-8">
                                                                                                <li>Market Orders: Buys or sells your stock right away at the best available price.</li>
                                                                                                <li>Limit Orders: Buys or sells your stock only when it reaches a specific price you choose.</li>
                                                                                        </ul>
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-4">
                                                                                <AccordionTrigger>How long does it take for my trade to be completed?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        If you place a market order, it's usually completed right away during trading hours. A limit order will only be completed if the stock reaches your chosen price, which could take longer or not happen at all.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-5">
                                                                                <AccordionTrigger>What is the minimum amount I can trade?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        The minimum trade amount depends on the stock's price and the type of order. You can trade as little as one share of a company.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-6">
                                                                                <AccordionTrigger>Can I trade outside of NSE trading hours?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        No, all trades are processed during official NSE trading hours (10:00 AM to 2:30 PM WAT). You can place orders at any time, but they will only be executed when the market opens.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-7">
                                                                                <AccordionTrigger>What is a trading fee?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        A trading fee is a small charge for each trade you make. This fee is a combination of brokerage fees, exchange fees, and other charges. The details of the fees are shown before you confirm a trade.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-8">
                                                                                <AccordionTrigger>Can I buy and sell shares on the same day?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Yes, you can. This is called day trading. As long as the market is open, you can buy and sell shares.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-9">
                                                                                <AccordionTrigger>How can I see a stock's past performance?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        On the “Market” section in the Hamma app, you will find a chart showing its price history over different time periods (e.g., daily, weekly, monthly, yearly).
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-10">
                                                                                <AccordionTrigger>What is a "bear market" and a "bull market"?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        A bull market is when stock prices are generally rising. A bear market is when stock prices are generally falling.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-11">
                                                                                <AccordionTrigger>Can I get a notification when a stock reaches a certain price?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Yes, you can set up price alerts. In the app, navigate to the “Alert” section. Choose the stock and set the price you want to be notified about. Here is a guide on with steps on how to go about it.
                                                                                </AccordionContent>
                                                                        </AccordionItem>

                                                                </Accordion>
                                                        </TabsContent>

                                                        {/* <TabsContent value="deposits" className="mt-6">
                                                                <Accordion type="single" collapsible className="w-full">
                                                                        <AccordionItem value="item-1">
                                                                                <AccordionTrigger>How do I deposit funds?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        You can deposit funds via bank transfer, debit card, USSD transfer, or mobile money.
                                                                                        Log in to your account, navigate to the "Fund Account" section, select your preferred
                                                                                        payment method, and follow the instructions. Bank transfers typically reflect within 1-3 hours,
                                                                                        while card payments are usually instant.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-2">
                                                                                <AccordionTrigger>What's the minimum deposit amount?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        The minimum deposit amount is ₦5,000. There's no upper limit, but deposits above
                                                                                        ₦10,000,000 may require additional verification in compliance with anti-money laundering regulations.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-3">
                                                                                <AccordionTrigger>How do I withdraw funds?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        To withdraw funds, log in to your account, go to the "Withdraw" section,
                                                                                        enter the amount you wish to withdraw, select your registered bank account,
                                                                                        and confirm the transaction. Standard withdrawals are processed within 24-48 hours,
                                                                                        while express withdrawals are processed within 2 hours for an additional fee.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-4">
                                                                                <AccordionTrigger>Are there withdrawal limits?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Yes, the minimum withdrawal amount is ₦1,000, and the maximum daily withdrawal limit
                                                                                        is ₦5,000,000. For larger withdrawals, please contact customer support in advance.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                </Accordion>
                                                        </TabsContent> */}

                                                        <TabsContent value="security" className="mt-6">
                                                                <Accordion type="single" collapsible className="w-full">
                                                                        <AccordionItem value="item-1">
                                                                                <AccordionTrigger>How is my account protected?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Your account is protected with multiple security features, including strong encryption, two-factor authentication (2FA), and automatic logouts. We regularly check our systems to keep them safe.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-2">
                                                                                <AccordionTrigger>How do I turn on two-factor authentication (2FA)?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Log in, go to the "Profile" section, navigate to “Privacy and Security” and then toggle on the "Two-Factor Authentication." Use an app like Google Authenticator to scan the QR code and activate it using the code on the Authenticator app.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-3">
                                                                                <AccordionTrigger>What should I do if I think someone has accessed my account without permission?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        If you think someone has used your account without your permission, you should immediately change your password and contact our customer support team.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-4">
                                                                                <AccordionTrigger>How often should I change my password?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        For the best security, we recommend changing your password every 3 months. Make sure your new password is at least 12 characters long and includes a mix of uppercase and lowercase letters, numbers, and symbols. Avoid using the same password for different accounts.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-5">
                                                                                <AccordionTrigger>Will Hamma ever ask for my password?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        No, Hamma staff will never ask for your password. Be very careful if anyone asks for your password, as this is a common way for scammers to get into accounts.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-6">
                                                                                <AccordionTrigger>How do I report a security issue?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        If you find a security problem or something you think is a risk, please report it to our security team immediately through our official contact channels.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-7">
                                                                                <AccordionTrigger>Is my personal information safe with Hamma?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Yes, we use advanced security measures and strict privacy policies to protect your personal information. We do not share your details with anyone without your consent, except as required by law.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-8">
                                                                                <AccordionTrigger>Why should I use a strong password?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        A strong password is difficult for others to guess or for computers to figure out. Using a mix of different types of characters makes your account much more secure.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-9">
                                                                                <AccordionTrigger>What is a "phishing" scam?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        A phishing scam is when someone tries to trick you into giving them your personal information (like passwords) by pretending to be Hamma. Always check the sender's email address and make sure the website link is correct before you log in.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                        <AccordionItem value="item-10">
                                                                                <AccordionTrigger>What are the signs of a suspicious email from Hamma?</AccordionTrigger>
                                                                                <AccordionContent>
                                                                                        Look out for spelling mistakes, an unusual sender email address, urgent requests for your personal information, or links that do not lead to the official Hamma website. When in doubt, do not click the link and contact us directly.
                                                                                </AccordionContent>
                                                                        </AccordionItem>
                                                                </Accordion>
                                                        </TabsContent>
                                                </Tabs>

                                                {/* <div className="text-center mt-8">
                                                        <Button
                                                                variant="outline"
                                                                className="gap-2"
                                                                onClick={() => window.open('https://drive.google.com/file/d/1hWuDvte-wB9OpdCg17Ak41VFZeQ1PsvG/view?usp=sharing', '_blank')}
                                                        >
                                                                View Detailed Guides <ChevronRight className="h-4 w-4" />
                                                        </Button>
                                                </div> */}
                                        </section>

                                        {/* Contact Us Section */}
                                        <section className="mb-16">
                                                <div className="text-center mb-8">
                                                        <h2 className="text-3xl font-bold">Contact Us</h2>
                                                        <p className="text-muted-foreground mt-2">
                                                                Our customer support team is available to assist you
                                                        </p>
                                                </div>

                                                <div className="grid md:grid-cols-3 gap-8 mb-12">
                                                        <Card>
                                                                <CardContent className="pt-6">
                                                                        <div className="flex flex-col items-center text-center">
                                                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                                                        <Mail className="h-6 w-6 text-primary" />
                                                                                </div>
                                                                                <h3 className="font-bold text-lg mb-2">Email Support</h3>
                                                                                <p className="text-muted-foreground mb-4">
                                                                                        Send us an email and we'll respond within 24 hours
                                                                                </p>
                                                                                <p className="font-medium">hello@hamma.trade</p>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>

                                                        <Card>
                                                                <CardContent className="pt-6">
                                                                        <div className="flex flex-col items-center text-center">
                                                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                                                        <Phone className="h-6 w-6 text-primary" />
                                                                                </div>
                                                                                <h3 className="font-bold text-lg mb-2">Whatsapp Support</h3>
                                                                                <p className="text-muted-foreground mb-4">
                                                                                        Call us during business hours: 9AM - 5PM (Mon-Fri)
                                                                                </p>
                                                                                <a href="http://wa.me/2349065566388" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">+234 906 556 6388</a>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>

                                                        <Card>
                                                                <CardContent className="pt-6">
                                                                        <div className="flex flex-col items-center text-center">
                                                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                                                        <MessageSquare className="h-6 w-6 text-primary" />
                                                                                </div>
                                                                                <h3 className="font-bold text-lg mb-2">Live Chat</h3>
                                                                                <p className="text-muted-foreground mb-4">
                                                                                        Chat with our support team in real-time
                                                                                </p>
                                                                                <Button onClick={() => setIsChatbotOpen(true)}>Start Chat</Button> {/* Add onClick handler */}
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                {/* Contact Form */}
                                                <Card className="max-w-3xl mx-auto">
                                                        <CardHeader>
                                                                <CardTitle>Send Us a Message</CardTitle>
                                                                <CardDescription>
                                                                        Fill out the form below and we'll get back to you as soon as possible
                                                                </CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <form className="space-y-4" onSubmit={handleSubmit(onSubmitContact)}>
                                                                        <div className="grid md:grid-cols-2 gap-4">
                                                                                <div className="space-y-1"> {/* Reduced spacing */}
                                                                                        <Label htmlFor="full_name">Full Name</Label>
                                                                                        <Input
                                                                                                id="full_name"
                                                                                                placeholder="Enter your full name"
                                                                                                {...register("full_name")}
                                                                                        />
                                                                                        {errors.full_name && <p className="text-sm text-red-500">{errors.full_name.message}</p>}
                                                                                </div>
                                                                                <div className="space-y-1"> {/* Reduced spacing */}
                                                                                        <Label htmlFor="email">Email Address</Label>
                                                                                        <Input
                                                                                                id="email"
                                                                                                type="email"
                                                                                                placeholder="Enter your email"
                                                                                                {...register("email")}
                                                                                        />
                                                                                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                                                                </div>
                                                                        </div>
                                                                        <div className="space-y-1"> {/* Reduced spacing */}
                                                                                <Label htmlFor="subject">Subject</Label>
                                                                                <Input
                                                                                        id="subject"
                                                                                        placeholder="What is your message about?"
                                                                                        {...register("subject")}
                                                                                />
                                                                                {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
                                                                        </div>
                                                                        <div className="space-y-1"> {/* Reduced spacing */}
                                                                                <Label htmlFor="message">Message</Label>
                                                                                <Textarea
                                                                                        id="message"
                                                                                        placeholder="Enter your message here"
                                                                                        rows={6}
                                                                                        {...register("message")}
                                                                                />
                                                                                {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                                                                        </div>
                                                                        <Button
                                                                                type="submit"
                                                                                className="w-full md:w-auto"
                                                                                disabled={contactMutation.isPending}
                                                                        >
                                                                                {contactMutation.isPending ? (
                                                                                        <>
                                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                                Sending...
                                                                                        </>
                                                                                ) : (
                                                                                        "Submit Message"
                                                                                )}
                                                                        </Button>
                                                                </form>
                                                        </CardContent>
                                                </Card>
                                        </section>

                                        {/* Office Location */}
                                        <section>
                                                <div className="bg-muted rounded-xl p-8 text-center">
                                                        <h2 className="text-2xl font-bold mb-4">Visit Our Office</h2>
                                                        <p className="text-muted-foreground mb-2">
                                                                Adepate House
                                                        </p>
                                                        <p className="text-muted-foreground mb-2">
                                                                42 Montgomery Rd, Yaba
                                                        </p>
                                                        <p className="text-muted-foreground">
                                                                Lagos, Nigeria
                                                        </p>
                                                        <a href="https://www.google.com/maps/place/44+Montgomery+Rd,+Yaba,+Lagos+101245,+Lagos/@15.9965026,-83.6180348,3z/data=!4m10!1m2!2m1!1sAdepate+House,+44+Montgomery+Rd,+Yaba+Lagos!3m6!1s0x103b8c58e0491c41:0x44c5f4a2547e771!8m2!3d6.5100455!4d3.3773482!15sCitBZGVwYXRlIEhvdXNlLCA0NCBNb250Z29tZXJ5IFJkLCBZYWJhIExhZ29zkgEQZ2VvY29kZWRfYWRkcmVzc-ABAA!16s%2Fg%2F11f9whhqw7?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="">
                                                                <Button variant="outline" className="mt-4 ">Get Directions</Button>
                                                        </a>
                                                </div>
                                        </section>
                                </div>
                        </main>

                        <Footer />
                </div>
        );
};

export default HelpPage;
