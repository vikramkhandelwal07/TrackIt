"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

export function AccountChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    // Filter transactions within date range
    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    // Group transactions by date
    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      return acc;
    }, {});

    // Convert to array and sort by date
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  // Calculate totals for the selected period
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  const netBalance = totals.income - totals.expense;
  const isProfit = netBalance >= 0;

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white dark:from-black dark:to-slate-900 dark:bg-black">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-black dark:to-slate-900 dark:bg-black rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Transaction Overview
          </CardTitle>
        </div>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px] border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors bg-white/80 dark:bg-black/80 backdrop-blur-sm">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="border-2 border-slate-200 dark:border-slate-700 dark:bg-black">
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key} className="hover:bg-blue-50 dark:hover:bg-slate-800 dark:bg-black">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Total Income */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-black dark:to-slate-900 dark:bg-black p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Income</p>
            </div>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ${totals.income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Total Expenses */}
          <div className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-black dark:to-slate-900 dark:bg-black p-4 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-sm font-medium text-red-700 dark:text-red-300">Total Expenses</p>
            </div>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${totals.expense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Net Balance */}
          <div className={`bg-gradient-to-br p-4 rounded-xl border hover:shadow-md transition-shadow ${isProfit
              ? 'from-blue-50 to-cyan-100 dark:from-black dark:to-slate-900 dark:bg-black border-blue-200 dark:border-blue-800'
              : 'from-orange-50 to-amber-100 dark:from-black dark:to-slate-900 dark:bg-black border-orange-200 dark:border-orange-800'
            }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${isProfit ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
              <p className={`text-sm font-medium ${isProfit
                  ? 'text-blue-700 dark:text-blue-300'
                  : 'text-orange-700 dark:text-orange-300'
                }`}>
                Net Balance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-bold ${isProfit
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-orange-600 dark:text-orange-400'
                }`}>
                {isProfit ? '+' : ''}${Math.abs(netBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${isProfit
                  ? 'bg-blue-100 text-blue-700 dark:bg-black dark:text-blue-300 dark:border dark:border-blue-800'
                  : 'bg-orange-100 text-orange-700 dark:bg-black dark:text-orange-300 dark:border dark:border-orange-800'
                }`}>
                {isProfit ? 'Profit' : 'Loss'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-white dark:from-black dark:to-slate-900 dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                barCategoryGap="20%"
              >
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  strokeOpacity={0.6}
                />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b', fontWeight: '500' }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b', fontWeight: '500' }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    fontSize: "14px",
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
                  cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="roundRect"
                />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="url(#incomeGradient)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="url(#expenseGradient)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}