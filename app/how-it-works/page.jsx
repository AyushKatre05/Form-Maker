// pages/index.tsx

import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-gray-900 h-auto text-gray-200">
      <Head>
        <title>AI Form Builder</title>
        <meta name="description" content="Build forms with AI effortlessly." />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Build Forms with AI
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Effortlessly create smart forms that adapt to your needs.
          </p>
          <div>
            <a href="#how-it-works" className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600">
              Learn More
            </a>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-500 text-4xl mb-4">1</div>
              <h3 className="text-xl font-semibold text-white mb-2">Step 1: Input Your Requirements</h3>
              <p className="text-gray-400">
                Start by specifying the type of form you need and the key details you want to capture.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-500 text-4xl mb-4">2</div>
              <h3 className="text-xl font-semibold text-white mb-2">Step 2: AI Generates Form</h3>
              <p className="text-gray-400">
                Our AI analyzes your requirements and generates a custom form tailored to your needs.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-500 text-4xl mb-4">3</div>
              <h3 className="text-xl font-semibold text-white mb-2">Step 3: Customize and Deploy</h3>
              <p className="text-gray-400">
                Customize the generated form if needed and deploy it directly on your website or application.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-center py-4 text-gray-400">
        © 2024 AI Form Builder. All rights reserved.
      </footer>
    </div>
  );
}
