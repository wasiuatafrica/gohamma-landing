import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  initials: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ola Adeyemi",
    role: "Retail Investor",
    initials: "O",
    content: "This platform has revolutionized my trading. Competing on the Nigerian stock exchange has never been this rewarding, thanks to its worth.",
  },
  {
    id: 2,
    name: "Chioma Okafor",
    role: "Day Trader",
    initials: "C",
    content: "This platform has revolutionized my trading. Competing on the Nigerian stock exchange has never been this rewarding, thanks to its worth.",
  },
  {
    id: 3,
    name: "Tunde Bakare",
    role: "Investment Analyst",
    initials: "T",
    content: "This platform has revolutionized my trading. Competing on the Nigerian stock exchange has never been this rewarding, thanks to its worth.",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <section className="py-16 px-4 md:px-8 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What traders say about us</h2>
        
        <div className="relative overflow-hidden" 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full md:w-full lg:w-full flex-shrink-0 px-4">
                <Card className="bg-card rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold">
                        {testimonial.initials}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {testimonial.content}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex 
                    ? "bg-primary opacity-100" 
                    : "bg-border opacity-50 hover:opacity-75"
                } focus:outline-none`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-card rounded-full w-10 h-10 flex items-center justify-center hover:bg-muted focus:outline-none"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-card rounded-full w-10 h-10 flex items-center justify-center hover:bg-muted focus:outline-none"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
