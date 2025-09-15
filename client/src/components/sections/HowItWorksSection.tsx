import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up in minutes with our simple, secure registration process. All you need is your basic information to get started."
  },
//   {
//     number: "02",
//     title: "Fund Your Account",
//     description: "Easily deposit funds using any Nigerian bank, debit card, or popular payment methods like Paystack and Flutterwave."
//   },
  {
    number: "02",
    title: "Build Your Portfolio",
    description: "Browse Nigerian stocks, research companies, and add your selections to your personalized investment portfolio."
  },
  {
    number: "03",
    title: "Trade & Monitor",
    description: "Execute trades in real-time and track your portfolio's performance with detailed analytics and visualizations."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Hamma Works</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Getting started with Hamma is quick and easy. Follow these simple steps to begin your investment journey.
          </p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 mb-6 md:mb-0 md:px-8">
                  <div className={`rounded-lg p-8 bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-md ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex justify-center items-center w-8 h-8 rounded-full bg-primary z-20">
                  <div className="w-3 h-3 rounded-full bg-background"></div>
                </div>
                
                <div className="w-full md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="rounded-full px-8" asChild>
            <a href="https://www.gohamma.com/register?source=landing">Get Started Now</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;