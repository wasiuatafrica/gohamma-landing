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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="trading">Trading</TabsTrigger>
                <TabsTrigger value="deposits">Deposits & Withdrawals</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I open an account?</AccordionTrigger>
                    <AccordionContent>
                      To open a Hamma account, click the "Sign Up" button at the top of the page. 
                      You'll need to provide personal information, including your BVN, valid ID, proof of address, 
                      and bank details. The verification process typically takes 1-2 business days. 
                      Once approved, you can fund your account and start trading.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What documents do I need to register?</AccordionTrigger>
                    <AccordionContent>
                      To register, you'll need to provide your BVN (Bank Verification Number), 
                      a valid government-issued photo ID (National ID, driver's license, or passport), 
                      proof of address (utility bill or bank statement from the last 3 months), and your bank account details.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I update my personal information?</AccordionTrigger>
                    <AccordionContent>
                      You can update most of your personal information in the "Account Settings" section 
                      after logging in. For changes to critical information like your name or BVN, 
                      you may need to contact customer support with appropriate documentation.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I have multiple Hamma accounts?</AccordionTrigger>
                    <AccordionContent>
                      No, each individual is limited to one Hamma account. This policy is in place 
                      to comply with regulatory requirements and prevent fraudulent activities. 
                      However, you can have different types of accounts (personal and corporate) if you qualify.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="trading" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I place a trade?</AccordionTrigger>
                    <AccordionContent>
                      To place a trade, log in to your account, navigate to the trading section, 
                      select the stock you want to trade, enter the quantity and set your price (market or limit), 
                      then review and confirm your order. Trades are executed during NSE trading hours 
                      (10:00 AM to 2:30 PM WAT, Monday to Friday, excluding holidays).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What are the NSE trading hours?</AccordionTrigger>
                    <AccordionContent>
                      The Nigerian Stock Exchange (NSE) operates from 10:00 AM to 2:30 PM West African Time (WAT), 
                      Monday to Friday, excluding public holidays and any special closures announced by the exchange.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What types of orders can I place?</AccordionTrigger>
                    <AccordionContent>
                      Hamma supports several order types: Market Orders (executed at the current best available price), 
                      Limit Orders (executed at a specified price or better), Day Orders (valid for the current trading day only), 
                      and Good-Till-Cancelled Orders (remain active until executed or cancelled).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How long does it take for my trade to be executed?</AccordionTrigger>
                    <AccordionContent>
                      Market orders are typically executed immediately during trading hours if there's sufficient market liquidity. 
                      Limit orders are executed only when the stock reaches your specified price and may take longer 
                      or may not be executed if the price condition isn't met.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="deposits" className="mt-6">
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
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How is my account protected?</AccordionTrigger>
                    <AccordionContent>
                      Your Hamma account is protected with multiple security layers including 
                      128-bit SSL encryption, two-factor authentication (2FA), biometric login (where available), 
                      and automatic logout after inactivity. Our systems are regularly updated and audited 
                      for potential vulnerabilities.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I enable two-factor authentication?</AccordionTrigger>
                    <AccordionContent>
                      To enable two-factor authentication (2FA), log in to your account, 
                      go to "Security Settings," select "Two-Factor Authentication," and follow the prompts. 
                      You can choose between SMS-based verification or using an authenticator app like 
                      Google Authenticator or Authy.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What should I do if I suspect unauthorized access?</AccordionTrigger>
                    <AccordionContent>
                      If you suspect unauthorized access to your account, immediately change your password 
                      and contact our customer support team. We recommend enabling notifications for all account 
                      activities so you're alerted to any suspicious transactions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How often should I change my password?</AccordionTrigger>
                    <AccordionContent>
                      We recommend changing your password every 3 months for optimal security. 
                      Choose a strong password with at least 12 characters, including upper and lowercase letters, 
                      numbers, and special characters. Avoid using the same password across multiple platforms.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => handleSelectGuide('getting-started', 'account-setup')}
              >
                View Detailed Guides <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
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
                    <p className="font-medium">traders@gohamma.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Phone Support</h3>
                    <p className="text-muted-foreground mb-4">
                      Call us during business hours: 9AM - 5PM (Mon-Fri)
                    </p>
                    <p className="font-medium">+234 800 123 4567</p>
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
                44 Montgomery Rd, Yaba
              </p>
              <p className="text-muted-foreground">
                Lagos, Nigeria
              </p>
              <div className="mt-4">
                <Button variant="outline">Get Directions</Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpPage;
