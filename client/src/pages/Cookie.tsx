import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StockTicker from "@/components/sections/StockTicker";
import { Separator } from "@/components/ui/separator";

const CookiePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: April 14, 2025</p>
            
            <Separator className="my-8" />
            
            <div className="prose prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground max-w-none">
              <h2 className="text-2xl">1. Introduction</h2>
              <p>
                This Cookie Policy explains how Hamma ("we", "our", or "us") uses cookies and similar technologies to recognize you when you visit our website ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>

              <h2 className="text-2xl mt-8">2. What Are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Hamma) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (such as advertising, interactive content, and analytics).
              </p>

              <h2 className="text-2xl mt-8">3. Why Do We Use Cookies?</h2>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
              </p>

              <h2 className="text-2xl mt-8">4. Types of Cookies We Use</h2>
              <p>
                The specific types of first and third-party cookies served through our Website and the purposes they perform are described below:
              </p>

              <h3 className="text-xl mt-4">4.1. Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Without these cookies, services you have asked for, like secure login, cannot be provided.
              </p>

              <h3 className="text-xl mt-4">4.2. Performance and Functionality Cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
              </p>

              <h3 className="text-xl mt-4">4.3. Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
              </p>

              <h3 className="text-xl mt-4">4.4. Advertising Cookies</h3>
              <p>
                These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
              </p>

              <h3 className="text-xl mt-4">4.5. Social Media Cookies</h3>
              <p>
                These cookies are used to enable you to share pages and content that you find interesting on our Website through third-party social networking and other websites. These cookies may also be used for advertising purposes.
              </p>

              <h2 className="text-2xl mt-8">5. How Can You Control Cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner on our Website.
              </p>
              <p>
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
              </p>

              <h2 className="text-2xl mt-8">6. How Often Will We Update This Cookie Policy?</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>

              <h2 className="text-2xl mt-8">7. Where Can You Get Further Information?</h2>
              <p>
                If you have any questions about our use of cookies or other technologies, please contact us at:
              </p>
              <ul>
                <li>Email: traders@gohamma.com</li>
                <li>Phone: +234 906 556 6388</li>
                {/* <li>Address: Adepate House, 42 Montgomery Rd, Yaba Lagos</li> */}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePage;