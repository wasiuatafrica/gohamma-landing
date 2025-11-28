import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Award, Users, ShieldCheck, Clock, BookOpen } from "lucide-react";
import hammaIcon from '../../../attached_assets/7.png';
import hammaIcon2 from '../../../attached_assets/8.png';
import hammafavicon from '../../../attached_assets/favicon.ico';

import HammaLogo1 from '../../../attached_assets/Hamma Logo (1).png';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Hamma</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nigeria's most trusted online stock trading platform, providing seamless access to the Nigerian Stock Exchange.
            </p>
          </div>

          {/* Our Mission */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At Hamma, our mission is to democratize access to the Nigerian stock market, 
                  making investing accessible to everyone regardless of experience or financial background.
                </p>
                <p className="text-lg text-muted-foreground">
                  We are committed to providing a secure, intuitive platform that empowers Nigerians 
                  to build wealth through smart investments in the local economy.
                </p>
              </div>
              <div className="bg-muted rounded-xl p-8">
                <blockquote className="text-xl italic">
                  "Our vision is to create a financially inclusive Nigeria where everyone has 
                  the opportunity to participate in and benefit from the growth of our economy."
                  <footer className="text-right mt-4 font-medium">- CEO, Hamma</footer>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Trust & Security</h3>
                    <p className="text-muted-foreground">
                      We prioritize your financial security with bank-level encryption and regulatory compliance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                    <p className="text-muted-foreground">
                      Making investment opportunities available to all Nigerians, not just the wealthy or financially savvy.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Education</h3>
                    <p className="text-muted-foreground">
                      Empowering investors with knowledge through comprehensive resources and market insights.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Hamma</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Real-Time Trading</h3>
                  <p className="text-muted-foreground">
                    Execute trades in real-time with instant confirmation and portfolio updates.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Low Fees</h3>
                  <p className="text-muted-foreground">
                    Competitive pricing with transparent fee structure and no hidden charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Diverse Investment Options</h3>
                  <p className="text-muted-foreground">
                    Access to a wide range of NSE-listed stocks across various sectors of the Nigerian economy.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
                  <p className="text-muted-foreground">
                    Our customer service team is available to assist you with any questions or concerns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Press Kit */}
          <section>
            <div className="bg-muted rounded-xl p-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="md:max-w-xl">
                  <h2 className="text-2xl font-bold mb-4">Press Kit</h2>
                  <p className="text-muted-foreground mb-4">
                    Welcome to the Hamma press kit. Here you'll find our logo, brand guidelines, 
                    company information, and media resources that you're free to use when 
                    featuring Hamma in articles or promotional materials.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    For media inquiries, please contact our press team at <a className="font-medium cursor-pointer hover:underline" href={"mailto:traders@gohamma.com"} >traders@gohamma.com</a>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="/hamma-logo-pack.zip" download="hamma-logo-pack.zip">
                      <Button variant="outline" className="gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Logo Pack
                      </Button>
                    </a>
                    
                    {/* <Button variant="outline" className="gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
                      </svg>
                      Brand Guidelines
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                      Media Kit
                    </Button> */}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 md:mt-0">
                  <div className="bg-white p-4 rounded-lg border">
                    <img 
                      src={HammaLogo1}
                      alt="Hamma logo" 
                      className="h-12 mx-auto mb-2"
                    />
                    <p className="text-xs text-center text-muted-foreground">Full logo</p>
                  </div>
                  <div className="bg-primary p-4 rounded-lg">
                    <img 
                      src={hammaIcon2}
                      alt="Hamma logo white" 
                      className="h-12 mx-auto mb-2"
                    />
                    <p className="text-xs text-center text-primary-foreground">White logo</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <img
                      src={hammafavicon}
                      alt="Hamma icon"
                      className="h-12 mx-auto mb-2"
                    />
                    <p className="text-xs text-center text-muted-foreground">Icon only</p>
                  </div>
                  <div className="bg-black p-4 rounded-lg">
                    <img 
                      src={hammaIcon}
                      alt="Hamma icon white" 
                      className="h-12 mx-auto mb-2"
                    />
                    <p className="text-xs text-center text-white">Icon white</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
