import { PaystackLogo, PagaLogo, GoogleLogo } from "./PartnerLogos";

const PartnersSection = () => {
  return (
    <section className="py-8 px-4 md:px-8 bg-muted">
      <div className="container mx-auto">
        <p className="text-center text-muted-foreground mb-6">Trusted by</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <PaystackLogo className="h-8 opacity-75 hover:opacity-100 transition" />
          <PagaLogo className="h-8 opacity-75 hover:opacity-100 transition" />
          <GoogleLogo className="h-8 opacity-75 hover:opacity-100 transition" />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
