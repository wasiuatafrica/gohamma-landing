import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import lightLogo from "../../assets/hamma-logo-light.png";
import darkLogo from "../../assets/hamma-logo-dark.png";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  height?: number;
}

export function Logo({ className, height }: LogoProps) {
  const { theme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(lightLogo);
  
  useEffect(() => {
    const isDarkMode = 
      theme === "dark" || 
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setLogoSrc(isDarkMode ? darkLogo : lightLogo);
    
    // Add listener for system theme changes when using "system" theme
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setLogoSrc(e.matches ? darkLogo : lightLogo);
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);
  
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logoSrc} 
        alt="Hamma Logo" 
        className={cn(
          "w-auto object-contain transition-all duration-200",
          height ? "" : "h-24 sm:h-20 md:h-24 lg:h-28"
        )}
        style={height ? {
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          objectPosition: 'center',
          backgroundColor: 'transparent'
        } : undefined}
      />
    </div>
  );
}