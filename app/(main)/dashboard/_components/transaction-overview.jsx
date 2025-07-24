"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, DollarSign } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for pie chart
  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  // Calculate total monthly expenses
  const totalMonthlyExpenses = pieChartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-black dark:to-slate-900 dark:bg-black hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-black dark:to-slate-800 dark:bg-black rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <div>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Recent Transactions
              </CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Latest {recentTransactions.length} transactions
              </p>
            </div>
          </div>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[160px] border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors bg-white/80 dark:bg-black/80 backdrop-blur-sm">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="border-2 border-slate-200 dark:border-slate-700 dark:bg-black">
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id} className="hover:bg-blue-50 dark:hover:bg-slate-800 dark:bg-black">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${account.isDefault ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
                    {account.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-black dark:to-slate-800 dark:bg-black rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-slate-400 dark:text-slate-600" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  No recent transactions
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                  Your latest transactions will appear here
                </p>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-black dark:to-slate-800 dark:bg-black hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${transaction.type === "EXPENSE"
                        ? "bg-red-100 dark:bg-black dark:border dark:border-red-800"
                        : "bg-green-100 dark:bg-black dark:border dark:border-green-800"
                      }`}>
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {transaction.description || "Untitled Transaction"}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(transaction.date), "PP")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex items-center font-bold text-lg",
                        transaction.type === "EXPENSE"
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      )}
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      {transaction.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-black dark:to-slate-900 dark:bg-black hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-black dark:to-slate-800 dark:bg-black rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
            <div>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Monthly Expense Breakdown
              </CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {format(currentDate, "MMMM yyyy")} • Total: ${totalMonthlyExpenses.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {pieChartData.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-black dark:to-slate-800 dark:bg-black rounded-full flex items-center justify-center border dark:border-purple-800">
                <DollarSign className="w-8 h-8 text-purple-400 dark:text-purple-600" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                No expenses this month
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                Your spending breakdown will appear here
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-50 to-white dark:from-black dark:to-slate-900 dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {COLORS.map((color, index) => (
                        <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                          <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value, percent }) =>
                        `${name}: ${(percent * 100).toFixed(1)}%`
                      }
                      labelLine={false}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth={2}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#gradient-${index % COLORS.length})`}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [
                        `$${value.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}`,
                        name
                      ]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        fontSize: "14px",
                        color: "#1f2937"
                      }}
                      contentStyleDark={{
                        backgroundColor: "rgba(0, 0, 0, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid #374151",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                        fontSize: "14px",
                        color: "#f3f4f6"
                      }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: '20px' }}
                      formatter={(value, entry) => (
                        <span style={{ color: entry.color, fontWeight: '500' }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Category breakdown list */}
              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Category Breakdown
                </h4>
                {pieChartData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-black dark:border dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      ${item.value.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}