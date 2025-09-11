import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-muted-foreground">Last updated: April 14, 2025</p>
            
            <Separator className="my-8" />
            
            <div className="prose prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground max-w-none">
              <h2 className="text-2xl">1. Introduction</h2>
              <p>
                These Terms and Conditions ("Terms", "Terms and Conditions") govern your use of the Hamma website and application (the "Service") operated by Hamma ("us", "we", or "our").
              </p>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
              </p>

              <h2 className="text-2xl mt-8">2. Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>

              <h2 className="text-2xl mt-8">3. Trading and Investment Risks</h2>
              <p>
                Trading and investing in securities involve substantial risk of loss and is not suitable for every investor. The value of stocks, shares, and other securities may go down as well as up, and investors may get back less than they invested.
              </p>
              <p>
                Past performance is not indicative of future results. You understand and agree that:
              </p>
              <ul>
                <li>You may lose a substantial part or all of the money you invest</li>
                <li>We do not provide investment advice or recommendations</li>
                <li>You are solely responsible for your investment decisions</li>
                <li>Market data may be delayed and not in real-time</li>
              </ul>

              <h2 className="text-2xl mt-8">4. Service Availability</h2>
              <p>
                We do not guarantee that the Service, or any content on it, will always be available or be uninterrupted. Access to the Service is permitted on a temporary basis. We may suspend, withdraw, discontinue or change all or any part of the Service without notice. We will not be liable to you if for any reason the Service is unavailable at any time or for any period.
              </p>

              <h2 className="text-2xl mt-8">5. Fees and Charges</h2>
              <p>
                You agree to pay all fees associated with your use of the Service as outlined in our Fee Schedule. Fees are subject to change upon notice. All fees are exclusive of applicable taxes, which you are also responsible for paying.
              </p>
              <p>
                We reserve the right to deduct any fees, charges, or other amounts due to us directly from your account balance.
              </p>

              <h2 className="text-2xl mt-8">6. Limitation of Liability</h2>
              <p>
                In no event shall Hamma, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul>
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>

              <h2 className="text-2xl mt-8">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>

              <h2 className="text-2xl mt-8">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>

              <h2 className="text-2xl mt-8">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <ul>
                <li>Email: hello@hamma.trade</li>
                <li>Phone: +234 906 556 6388</li>
                {/* <li>Address: 12th Floor, Victoria Island Tower, 1234 Adeola Odeku Street, Victoria Island, Lagos, Nigeria</li> */}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;