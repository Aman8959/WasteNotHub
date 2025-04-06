import DonationForm from "@/components/donation-form";

const Donate = () => {
  return (
    <main className="flex-grow">
      {/* Header Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl mb-4">Support Our Mission</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Your donations help us maintain our platform, support our volunteer agents, and expand our reach to help more people.
          </p>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl mb-4 text-neutral-800">Make a Donation</h2>
              <p className="text-neutral-600">
                Your financial contributions help us maintain our platform, support our volunteer agents, 
                and expand our reach to help more people in need.
              </p>
            </div>
            
            <DonationForm />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4 text-neutral-800">Your Impact</h2>
            <p className="max-w-3xl mx-auto text-neutral-600">
              See how your donations help us make a difference in our community and environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <h3 className="font-heading font-semibold text-xl mb-2 text-neutral-800">Items Shared</h3>
              <p className="text-neutral-600">
                Over 500 items have been redirected from landfills to people who need them.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <h3 className="font-heading font-semibold text-xl mb-2 text-neutral-800">Families Helped</h3>
              <p className="text-neutral-600">
                We've helped over 200 families access items they need without financial burden.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">5,000kg</div>
              <h3 className="font-heading font-semibold text-xl mb-2 text-neutral-800">Waste Prevented</h3>
              <p className="text-neutral-600">
                Approximately 5,000kg of waste has been prevented through our reuse initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Donate;
