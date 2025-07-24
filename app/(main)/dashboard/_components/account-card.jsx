"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  const balanceValue = parseFloat(balance);
  const isPositive = balanceValue >= 0;

  return (
    <Card className="hover:shadow-xl transition-all duration-300 group relative overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-black dark:to-slate-900 dark:bg-black border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:scale-[1.02]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Default account indicator */}
      {isDefault && (
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-blue-500">
          <div className="absolute -top-[15px] -right-[2px] text-white text-xs font-bold transform rotate-45">
            ★
          </div>
        </div>
      )}

      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-black dark:to-slate-800 dark:bg-black relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-black dark:to-slate-800 dark:bg-black border border-blue-200 dark:border-blue-800">
              <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold capitalize text-slate-800 dark:text-slate-100">
                {name}
              </CardTitle>
              <Badge
                variant={isDefault ? "default" : "secondary"}
                className={`text-xs mt-1 ${isDefault
                    ? 'bg-blue-100 text-blue-700 dark:bg-black dark:text-blue-300 dark:border dark:border-blue-800'
                    : 'bg-slate-100 text-slate-600 dark:bg-black dark:text-slate-400 dark:border dark:border-slate-700'
                  }`}
              >
                {isDefault ? "Default" : "Secondary"}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600"
            />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {updateDefaultLoading ? "Updating..." : "Default"}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pb-4 relative z-10 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-black/50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className={`text-3xl font-bold ${isPositive
                  ? 'text-slate-800 dark:text-slate-100'
                  : 'text-red-600 dark:text-red-400'
                }`}>
                ${Math.abs(balanceValue).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {type.charAt(0) + type.slice(1).toLowerCase()} Account
                </p>
                <Badge
                  variant={isPositive ? "default" : "destructive"}
                  className={`text-xs ${isPositive
                      ? 'bg-green-100 text-green-700 dark:bg-black dark:text-green-400 dark:border dark:border-green-800'
                      : 'bg-red-100 text-red-700 dark:bg-black dark:text-red-400 dark:border dark:border-red-800'
                    }`}
                >
                  {isPositive ? 'Positive' : 'Negative'}
                </Badge>
              </div>
            </div>
            <div className={`p-3 rounded-full ${isPositive
                ? 'bg-green-100 dark:bg-black dark:border dark:border-green-800'
                : 'bg-red-100 dark:bg-black dark:border dark:border-red-800'
              }`}>
              {isPositive ? (
                <ArrowUpRight className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDownRight className="h-6 w-6 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-black dark:to-slate-800 dark:bg-black relative z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-black dark:border dark:border-green-800 hover:bg-green-100 dark:hover:bg-slate-800 transition-colors">
              <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Income</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-black dark:border dark:border-red-800 hover:bg-red-100 dark:hover:bg-slate-800 transition-colors">
              <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">Expense</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Click to view details →
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}