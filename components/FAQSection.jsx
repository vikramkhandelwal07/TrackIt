"use client"; // Mark this as a Client Component

import React from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How secure is my financial data?",
      answer:
        "We use bank-level 256-bit encryption to protect your data. Our security measures include two-factor authentication, regular security audits, and compliance with industry standards.",
    },
    {
      question: "Can I connect multiple bank accounts?",
      answer:
        "Yes! You can connect unlimited bank accounts with our Pro and Enterprise plans. The Basic plan allows up to 2 account connections.",
    },
    {
      question: "How does the AI-powered insight feature work?",
      answer:
        "Our AI analyzes your spending patterns, income, and financial goals to provide personalized recommendations and alerts. It learns from your habits to help you make better financial decisions.",
    },
    {
      question: "Can I export my financial reports?",
      answer:
        "Yes, you can export your reports in multiple formats including PDF, CSV, and Excel. This feature is available on all plans.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-neutral-800 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-neutral-700 transition-colors"
                onClick={(e) => {
                  const answer = e.currentTarget.nextElementSibling;
                  const icon = e.currentTarget.querySelector("svg");
                  answer.classList.toggle("hidden");
                  icon.classList.toggle("rotate-180");
                }}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <svg
                  className="w-6 h-6 text-gray-400 transform transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="faq-answer hidden p-4 text-gray-400 border-t border-neutral-700">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;