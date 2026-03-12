import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-muted-foreground">Last updated: April 14, 2025</p>
            
            <Separator className="my-8" />
            
            <Alert className="mb-8">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                Please read this disclaimer carefully before using our services. By accessing or using Hamma, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
              </AlertDescription>
            </Alert>
            
            <div className="prose prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground max-w-none">
              <h2 className="text-2xl">1. Investment Risks</h2>
              <p>
                Trading in financial instruments involves high risks, including the risk of losing some, or all, of your investment amount. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.
              </p>
              <p>
                The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with trading and seek advice from an independent financial advisor if you have any doubts.
              </p>

              <h2 className="text-2xl mt-8">2. Not Financial Advice</h2>
              <p>
                The information provided by Hamma is for general informational purposes only. None of the information provided by us constitutes financial advice, investment advice, trading advice, or any other sort of advice, and you should not treat any of the website's content as such.
              </p>
              <p>
                Hamma does not recommend that any security or financial product should be bought, sold, or held by you. You should always conduct your own research and consult a qualified financial advisor before making any investment decisions.
              </p>

              <h2 className="text-2xl mt-8">3. No Guarantee of Returns</h2>
              <p>
                Past performance is not indicative of future results. No representation or warranty is made regarding future performance. Any projections, market outlooks, or estimates are forward-looking statements and are based upon certain assumptions. Other events that were not taken into account may occur and may significantly affect returns or performance.
              </p>
              <p>
                Any opinions, news, research, analyses, prices, or other information contained on Hamma is provided as general market commentary and does not constitute investment advice. Hamma will not accept liability for any loss or damage, including without limitation, any loss of profit which may arise directly or indirectly from the use of or reliance on such information.
              </p>

              <h2 className="text-2xl mt-8">4. Accuracy of Information</h2>
              <p>
                While we strive to provide accurate and timely information, we cannot guarantee that such information is accurate as of the date it is received or that it will continue to be accurate in the future. Market data, quotes, news, research, and other information accessible through our platform is provided "as is" and is believed to be reliable, but we cannot guarantee its accuracy, completeness, or timeliness.
              </p>
              <p>
                We do not warrant that the information provided by us is accurate, complete, reliable, useful, timely, or suitable for any particular purpose. We are not responsible for any errors or omissions, or for the results obtained from the use of such information.
              </p>

              <h2 className="text-2xl mt-8">5. Technical Risks</h2>
              <p>
                Hamma shall not be responsible for any communication failures, disruptions, errors, distortions, or delays you may experience when trading via our platform, however caused. We do not accept any liability for any losses or damages that may result from such occurrences.
              </p>

              <h2 className="text-2xl mt-8">6. Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites, advertisers, services, special offers, or other events or activities that are not owned or controlled by us. We do not endorse or assume any responsibility for any such third-party sites, information, materials, products, or services.
              </p>
              <p>
                If you access a third-party website from our platform, you do so at your own risk, and you understand that this Disclaimer does not apply to your use of such sites. You expressly relieve Hamma from any and all liability arising from your use of any third-party website, service, or content.
              </p>

              <h2 className="text-2xl mt-8">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Hamma and its officers, directors, employees, agents, affiliates, and partners shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses resulting from:
              </p>
              <ul>
                <li>The use or the inability to use the service</li>
                <li>Unauthorized access to or alteration of your transmissions or data</li>
                <li>Statements or conduct of any third party on the service</li>
                <li>Any other matter relating to the service</li>
              </ul>

              <h2 className="text-2xl mt-8">8. Changes to This Disclaimer</h2>
              <p>
                We reserve the right to modify this Disclaimer at any time. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this Disclaimer, we will notify you that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use or disclose it.
              </p>

              <h2 className="text-2xl mt-8">9. Contact Us</h2>
              <p>
                If you have any questions about this Disclaimer, please contact us:
              </p>
              <ul>
                <li>Email: traders@gohamma.com</li>
                <li>Phone: +234 906 556 6388</li>
                {/* <li>Address: Adepate House, 42 Montgomery Rd, Yaba Lagos, Nigeria</li> */}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DisclaimerPage;