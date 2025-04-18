import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 150000,
    label: "Active Users",
    prefix: "",
    suffix: "+"
  },
  {
    value: 200,
    label: "Nigerian Stocks",
    prefix: "",
    suffix: "+"
  },
  {
    value: 1.5,
    label: "Billion Naira",
    prefix: "₦",
    suffix: "B+"
  },
  {
    value: 99.9,
    label: "Uptime",
    prefix: "",
    suffix: "%"
  }
];

// Animate counter effect
const AnimatedCounter = ({ value, prefix, suffix }: { value: number, prefix: string, suffix: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000; // 2 seconds
        const increment = Math.ceil(value / (duration / 16)); // Approx 60fps
        const startTime = performance.now();
        
        const updateCount = () => {
          const currentTime = performance.now();
          const elapsed = currentTime - startTime;
          
          if (elapsed < duration) {
            const targetValue = (elapsed / duration) * value;
            setCount(Math.min(targetValue, value));
            requestAnimationFrame(updateCount);
          } else {
            setCount(value);
          }
        };
        
        requestAnimationFrame(updateCount);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [value]);
  
  return (
    <div ref={counterRef} className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
      {prefix}
      {count.toLocaleString(undefined, { 
        maximumFractionDigits: value % 1 === 0 ? 0 : 1 
      })}
      {suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nigeria's Fastest Growing Trading Platform</h2>
          <p className="text-primary-foreground/80 text-lg max-w-3xl mx-auto">
            Join thousands of Nigerians who are building wealth through Hamma
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="text-lg mt-2 text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;