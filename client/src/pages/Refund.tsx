import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
import { Separator } from "@/components/ui/separator";

const RefundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
            <p className="text-muted-foreground">Last updated: April 14, 2025</p>
            
            <Separator className="my-8" />
            
            <div className="prose prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground max-w-none">
              <h2 className="text-2xl">1. Introduction</h2>
              <p>
                This Refund Policy outlines the terms and conditions for refunds of fees and charges associated with your use of Hamma's services. We are committed to fair and transparent practices regarding refunds.
              </p>

              <h2 className="text-2xl mt-8">2. Trading Commissions and Fees</h2>
              <p>
                Trading commissions and fees charged for executed trades are generally non-refundable. However, in the following circumstances, we may consider refunds on a case-by-case basis:
              </p>
              <ul>
                <li><strong>System Errors:</strong> If a system error on our part results in an unintended trade or incorrect fees being charged, we will investigate and may issue a refund.</li>
                <li><strong>Duplicate Charges:</strong> If you are charged multiple times for the same transaction, the duplicate charges will be refunded.</li>
                <li><strong>Unauthorized Transactions:</strong> If unauthorized transactions occur due to a security breach of our systems, refunds will be processed accordingly.</li>
              </ul>

              <h2 className="text-2xl mt-8">3. Subscription Fees</h2>
              <p>
                For premium subscription services:
              </p>
              <ul>
                <li><strong>Cancellation Within 14 Days:</strong> If you cancel your premium subscription within 14 days of initial subscription or renewal, you are eligible for a full refund of the subscription fee for the current billing period.</li>
                <li><strong>Cancellation After 14 Days:</strong> No refunds will be issued for cancellations after the 14-day period. Your subscription will remain active until the end of the current billing period.</li>
                <li><strong>Pro-rated Refunds:</strong> We do not offer pro-rated refunds for partial use of subscription services.</li>
              </ul>

              <h2 className="text-2xl mt-8">4. Account Maintenance Fees</h2>
              <p>
                Annual account maintenance fees are non-refundable once they have been applied to your account, except in the following circumstances:
              </p>
              <ul>
                <li><strong>Double Charging:</strong> If you are charged the maintenance fee twice in error.</li>
                <li><strong>Account Closure:</strong> If you close your account within 30 days of being charged the annual maintenance fee, a pro-rated refund may be considered.</li>
              </ul>

              <h2 className="text-2xl mt-8">5. Withdrawal Fees</h2>
              <p>
                Fees charged for processing withdrawals are generally non-refundable once the withdrawal has been initiated. However:
              </p>
              <ul>
                <li><strong>Failed Withdrawals:</strong> If a withdrawal fails due to technical issues on our end, any associated fees will be refunded.</li>
                <li><strong>Delayed Withdrawals:</strong> If an express withdrawal is not processed within the advertised timeframe due to our error, the express fee difference may be refunded.</li>
              </ul>

              <h2 className="text-2xl mt-8">6. How to Request a Refund</h2>
              <p>
                To request a refund, please follow these steps:
              </p>
              <ol>
                <li>Contact our customer support team via email at support@gohamma.com or call +234 800 123 4567.</li>
                <li>Provide your account information, details of the transaction in question, and the reason for your refund request.</li>
                <li>Include any supporting documentation or evidence that may help us process your request.</li>
              </ol>
              <p>
                We will review your request and respond within 5 business days. If approved, refunds will typically be processed within 7-14 business days.
              </p>

              <h2 className="text-2xl mt-8">7. Refund Methods</h2>
              <p>
                Refunds will be issued using the same payment method used for the original transaction whenever possible. If the original payment method is no longer available or valid, we will work with you to determine an alternative refund method.
              </p>

              <h2 className="text-2xl mt-8">8. Exceptions</h2>
              <p>
                We reserve the right to make exceptions to this policy at our discretion. Any exceptions made will not constitute a waiver of our right to enforce this policy in the future.
              </p>

              <h2 className="text-2xl mt-8">9. Changes to This Policy</h2>
              <p>
                We may update this Refund Policy from time to time. We will notify you of any changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after any changes to the Refund Policy constitutes your acceptance of the updated policy.
              </p>

              <h2 className="text-2xl mt-8">10. Contact Us</h2>
              <p>
                If you have questions about this Refund Policy or need assistance with a refund request, please contact us:
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

export default RefundPage;