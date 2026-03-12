import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const Footer = () => {
  return (
    <footer className="bg-background text-muted-foreground pt-12 pb-6 px-4 md:px-8 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="mb-2 inline-block overflow-hidden">
              <Logo />
            </Link>
            <p className="mb-4">The modern trading platform for Nigerian Stock - The future of trading Nigerian stocks.</p>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/@HammaHQ" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
              </a>
              <a href="https://twitter.com/hammaHQ" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/company/hammaHQ" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link href="/market" className="hover:text-primary transition">Market</Link></li>
              <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
              {/* <li><Link href="/fees" className="hover:text-primary transition">Pricing</Link></li> */}
              <li><Link href="/help" className="hover:text-primary transition">Help</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-primary transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-primary transition">Refund Policy</Link></li>
              <li><Link href="/cookie" className="hover:text-primary transition">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition">Disclaimer</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              {/* <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-primary min-h-4 min-w-4" size={24} />
                <span>Adepate House, 42 Montgomery Rd, Yaba Lagos, Nigeria</span>
              </li> */}
              <li >
                <a className="flex items-start hover:underline" href="mailto:traders@gohamma.com" >
                <Mail className="mt-1 mr-3 text-primary min-h-4 min-w-4" />
                <span>traders@gohamma.com</span>
                </a>
              </li>

            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Hamma. All Rights Reserved. | Designed with ❤️ in Lagos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
