import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
import { Separator } from "@/components/ui/separator";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: April 14, 2025</p>
            
            <Separator className="my-8" />
            
            <div className="prose prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground max-w-none">
              <h2 className="text-2xl">1. Introduction</h2>
              <p>
                Hamma Ltd ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Service").
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
              </p>

              <h2 className="text-2xl mt-8">2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, information we obtain automatically when you use the Service, and information from third-party sources.
              </p>
              <h3 className="text-xl mt-4">2.1. Information You Provide</h3>
              <p>
                We collect information you provide when you create an account, complete your profile, conduct transactions, contact customer support, or otherwise communicate with us. This may include:
              </p>
              <ul>
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Financial information (bank account details, BVN)</li>
                <li>Identification documents (government-issued ID, proof of address)</li>
                <li>Correspondence with us</li>
              </ul>

              <h3 className="text-xl mt-4">2.2. Automatically Collected Information</h3>
              <p>
                When you use our Service, we automatically collect information about your device and how you interact with our Service, including:
              </p>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage information (pages visited, time spent, links clicked)</li>
                <li>Location data (derived from IP address)</li>
                <li>Cookies and similar technologies</li>
              </ul>

              <h2 className="text-2xl mt-8">3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including to:
              </p>
              <ul>
                <li>Provide, maintain, and improve the Service</li>
                <li>Process transactions and send transaction notifications</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Personalize your experience</li>
                <li>Monitor and analyze usage patterns</li>
                <li>Protect the security and integrity of the Service</li>
              </ul>

              <h2 className="text-2xl mt-8">4. Information Sharing and Disclosure</h2>
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> We share information with third-party vendors who provide services on our behalf.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, or legal process.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>With Your Consent:</strong> We may share information with third parties when you consent to such sharing.</li>
              </ul>

              <h2 className="text-2xl mt-8">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl mt-8">6. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>Access to your personal information</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction or objection to processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>

              <h2 className="text-2xl mt-8">7. International Data Transfers</h2>
              <p>
                Your information may be transferred to, stored, and processed in countries other than the country in which you reside. When we transfer information across borders, we take appropriate safeguards to protect your information in accordance with applicable data protection laws.
              </p>

              <h2 className="text-2xl mt-8">8. Children's Privacy</h2>
              <p>
                Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
              </p>

              <h2 className="text-2xl mt-8">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2 className="text-2xl mt-8">10. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <ul>
                <li>Email: traders@gohamma.com</li>
                <li>Phone: +234 800 123 4567</li>
                <li>Address: Adepate House, 44 Montgomery Rd, Yaba Lagos</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;