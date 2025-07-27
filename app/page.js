import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl font-bold text-neutral-700 dark:text-neutral-300 mb-2 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-white dark:bg-neutral-950 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {featuresData.map((feature, index) => (
              <Card
                className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 group w-full max-w-sm"
                key={index}
              >
                <CardContent className="space-y-4 pt-4">
                  <div className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-14 border-2 pt-8 pb-14 rounded-full">
          <h2 className="text-3xl font-bold text-center mb-16 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center group max-w-sm">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors duration-300 border border-neutral-200 dark:border-neutral-700">
                  <div className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-white dark:bg-neutral-950 transition-colors duration-300"
      >
        <div className="container mx-auto px-4 max-w-7xl ">
          <h2 className="text-3xl font-bold text-center mb-16 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 group"
              >
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-neutral-200 dark:border-neutral-700"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                    {testimonial.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-700/30 via-neutral-800/30 to-neutral-900/30 dark:from-neutral-600/30 dark:via-neutral-700/30 dark:to-neutral-800/30"></div>
            <div className="absolute right-0 top-0 -mt-20 -mr-20 w-96 h-96 bg-neutral-600 dark:bg-neutral-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute left-0 bottom-0 -mb-20 -ml-20 w-96 h-96 bg-neutral-700 dark:bg-neutral-600 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative py-16 px-8 md:py-24 md:px-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to Take Control of Your Finances?
                </h2>
                <p className="text-lg md:text-xl text-neutral-200 dark:text-neutral-300 mb-8">
                  Join thousands of users who are already managing their
                  finances smarter with TrackIt&apos;s AI-powered platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="group px-8 py-4 bg-white text-neutral-900 rounded-xl font-semibold hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="relative z-10">Get Started Free</span>
                  </Button>
                  <Button className="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                    <span className="relative z-10">Schedule Demo</span>
                  </Button>
                </div>
                <p className="mt-6 text-neutral-300 dark:text-neutral-400 text-sm">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            <div className="text-center group">
              <div className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
                10K+
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                Active Users
              </p>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
                $1M+
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                Tracked Monthly
              </p>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
                4.9/5
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                User Rating
              </p>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
                99.9%
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                Uptime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <footer className="bg-neutral-100 dark:bg-neutral-950 transition-colors duration-300 pt-20 pb-10 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 transition-colors duration-300">
                TrackIt
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                Smart financial management powered by AI to help you make better
                financial decisions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6 transition-colors duration-300">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#features"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-300"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-300"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6 transition-colors duration-300">
                Legal
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-300"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6 transition-colors duration-300">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  support@trackit.com
                </li>
                <li className="flex items-center text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  1-800-TRACKIT
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm transition-colors duration-300">
                © 2024 TrackIt. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-300 text-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-300 text-sm"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
