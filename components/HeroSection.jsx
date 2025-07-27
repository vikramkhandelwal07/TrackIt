"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample transaction data
  const transactions = [
    { id: 1, title: "Grocery Shopping", amount: -85.50, date: "Jul 28", type: "expense", icon: "🛒" },
    { id: 2, title: "Salary Deposit", amount: 4500.00, date: "Jul 26", type: "income", icon: "💰" },
    { id: 3, title: "Coffee Shop", amount: -12.99, date: "Jul 25", type: "expense", icon: "☕" },
    { id: 4, title: "Online Shopping", amount: -199.99, date: "Jul 24", type: "expense", icon: "🛍️" },
  ];

  // Donut chart data
  const chartData = [
    { category: "Shopping", amount: 500, color: "#ef4444", percentage: 45.5 },
    { category: "Groceries", amount: 400, color: "#10b981", percentage: 36.4 },
    { category: "Personal", amount: 199.98, color: "#3b82f6", percentage: 18.1 },
  ];

  const DonutChart = () => {
    const radius = 80;
    const strokeWidth = 20;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    let cumulativePercentage = 0;

    return (
      <div className="relative w-32 h-32">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="#374151"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="opacity-20"
          />
          {chartData.map((item, index) => {
            const strokeDasharray = `${item.percentage / 100 * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativePercentage / 100 * circumference;
            cumulativePercentage += item.percentage;

            return (
              <circle
                key={index}
                stroke={item.color}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute top-1/2 right-1/4  flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Total</div>
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">$1,099</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="hero" className="bg-neutral-50 dark:bg-neutral-950 min-h-[70vh] pt-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight mb-6 transition-colors duration-500">
              Smarter Financial <br />
              <span className="bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 dark:from-neutral-300 dark:via-neutral-200 dark:to-neutral-100 text-transparent bg-clip-text">
                Management with AI
              </span>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0 transition-colors duration-500">
              TrackIt empowers you to track, analyze, and optimize your finances with real-time insights and intelligent recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/dashboard">
                <Button className="px-8 py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 shadow-lg hover:shadow-xl border-0">
                  Get Started
                </Button>
              </Link>
              <Link href="/">
                <Button className="px-8 py-4 bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-xl font-semibold hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 flex items-center justify-center gap-2">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard Preview Section - Overlapping Style */}
          <div className="relative" ref={imageRef}>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200/30 via-neutral-300/30 to-neutral-400/30 dark:from-neutral-700/30 dark:via-neutral-600/30 dark:to-neutral-500/30 rounded-3xl blur-xl"></div>

            {/* Main Dashboard Card */}
            <div className="relative bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-neutral-900/10 dark:shadow-neutral-950/30 transition-colors duration-500">

              {/* Recent Transactions Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Recent Transactions
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Latest 4 transactions</p>
                  </div>
                  <div className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Vikram khandelwal
                  </div>
                </div>

                <div className="space-y-2">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 transition-colors duration-500">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${transaction.type === 'income'
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : 'bg-red-100 dark:bg-red-900/30'
                          }`}>
                          {transaction.icon}
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                            {transaction.title}
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {transaction.date}, 2025
                          </div>
                        </div>
                      </div>
                      <div className={`font-semibold text-sm ${transaction.type === 'income'
                          ? 'text-green-500 dark:text-green-400'
                          : 'text-red-500 dark:text-red-400'
                        }`}>
                        {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overlapping Monthly Expense Breakdown Card */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-900/10 dark:shadow-neutral-950/30 transition-colors duration-500 w-80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
                    Monthly Expense Breakdown
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">July 2025 • Total: $1,099.98</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <DonutChart />

                <div className="flex-1">
                  <div className="space-y-2">
                    {chartData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-neutral-700 dark:text-neutral-300 capitalize">
                            {item.category.toLowerCase()}
                          </span>
                        </div>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          ${item.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      shopping: <span className="font-medium">45.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-80">
          <div className="text-neutral-600 dark:text-neutral-400 text-sm flex items-center gap-2 transition-colors duration-500">
            <svg className="w-5 h-5 text-amber-500 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">4.9/5 Rating</span>
          </div>
          <div className="text-neutral-600 dark:text-neutral-400 text-sm flex items-center gap-2 transition-colors duration-500">
            <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">10K+ Active Users</span>
          </div>
          <div className="text-neutral-600 dark:text-neutral-400 text-sm flex items-center gap-2 transition-colors duration-500">
            <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Secure & Reliable</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;