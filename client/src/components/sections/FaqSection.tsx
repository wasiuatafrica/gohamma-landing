import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "account-creation",
    question: "How do I create an account on Hamma?",
    answer: "Creating an account on Hamma is easy. Click on the 'Sign Up' button, fill in your personal details, verify your email, and complete the KYC process to start trading immediately.",
  },
  {
    id: "trading-fees",
    question: "What are the trading fees?",
    answer: "Our trading fees are competitive and transparent. We charge a 0.5% commission on each trade, with no hidden costs. Volume discounts are available for active traders.",
  },
  {
    id: "deposit-funds",
    question: "How do I deposit funds?",
    answer: "You can deposit funds using bank transfers, credit/debit cards, or through our partnered payment gateways like Paystack. All deposits are processed instantly during business hours.",
  },
  {
    id: "withdraw-earnings",
    question: "How do I withdraw my earnings?",
    answer: "Withdrawals can be made through the 'Withdrawal' section of your account dashboard. Enter the amount you wish to withdraw and select your preferred bank account. Processing typically takes 1-2 business days.",
  },
  {
    id: "regulations",
    question: "Is Hamma regulated by the Nigerian SEC?",
    answer: "Yes, Hamma is fully regulated by the Securities and Exchange Commission of Nigeria and complies with all financial regulations and standards required for stock trading platforms in Nigeria.",
  },
];

const FaqSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-background">
      <div className="container mx-auto">
        <div className="bg-green-700 bg-opacity-20 rounded-t-3xl px-8 py-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">FAQs</h2>
          <p className="text-muted-foreground">Find answers to frequently asked questions</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b border-border">
              <AccordionTrigger className="py-5 px-8 hover:bg-muted transition data-[state=open]:bg-muted text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-5 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
