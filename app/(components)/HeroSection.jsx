import React from 'react';

const HeroSection = () => {
  return (
    <div>
      <section className='border-b shadow-sm'>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Create Your Form Using the
              <strong className="font-extrabold text-primary sm:block"> Power Of AI.</strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Lets make a form fancy and more usable with this app.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              Create Form

              Learn More
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections for more content */}
      <section className="py-20 border-b shadow-sm">
        <div className="mx-auto max-w-screen-xl px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our AI Form Builder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
              <p className="text-lg">Our AI-powered form builder makes creating forms a breeze, even for beginners.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Advanced Features</h3>
              <p className="text-lg">Unlock advanced customization and integration options to suit your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <footer className="text-white py-12">
        <div className="mx-auto max-w-screen-xl px-4 text-center">
          <p className="text-lg font-semibold">Contact us for more information.</p>
          <p className="mt-4">123 AI Street, AI Town, India</p>
          <p>Phone: +1-123-456-7890</p>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
