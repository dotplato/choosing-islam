"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Building2,
  Info,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, name: "Bank Info" },
  { id: 2, name: "Amount" },
  { id: 3, name: "Details" },
];

const PRESET_AMOUNTS = [10, 25, 100, 250];

interface DonateFormProps {
  variant?: "light" | "dark";
}

export default function DonateForm({ variant = "light" }: DonateFormProps) {
  const [step, setStep] = useState(1);
  const isDark = variant === "dark";

  const [frequency, setFrequency] = useState("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bankName: "",
    accountNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentAmount =
    selectedAmount !== null
      ? selectedAmount
      : customAmount && !isNaN(Number(customAmount))
        ? Number(customAmount)
        : 0;

  const nextStep = async () => {
    if (step === 2 && currentAmount <= 0) return;
    if (step === 3) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/donate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            amount: currentAmount,
            frequency,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to send donation request");
        }

        setIsSuccess(true);
      } catch (error: any) {
        console.error("Failed to send email:", error);
        alert(
          `There was an error processing your request: ${error.message}. Please check your server configuration.`,
        );
      } finally {
        setIsLoading(false);
      }
    } else if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Card className="border-none shadow-xl overflow-hidden rounded-2xl bg-white text-gray-900">
      {/* Progress Indicator */}
      <div className="bg-gray-50/50 border-b px-8 py-6 border-gray-100">
        <div className="flex items-center justify-center gap-4">
          {STEPS.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  step === s.id
                    ? "bg-teal-600 w-6"
                    : s.id < step
                      ? "bg-teal-400"
                      : "bg-gray-300",
                )}
              />
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-semibold uppercase tracking-wider",
                  step === s.id ? "text-teal-600" : "text-gray-400",
                )}
              >
                {s.name}
              </span>
              {s.id < 3 && (
                <div className="w-4 sm:w-8 h-[2px] bg-gray-200 mx-1 sm:mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <CardContent className="p-6 sm:p-8">
        {isSuccess ? (
          <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-teal-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Donation Details Sent!
              </h2>
              <p className="text-gray-600 max-w-sm mx-auto">
                Thank you{formData.firstName ? `, ${formData.firstName}` : ""}!
                We have received your donation request of ${currentAmount} (
                {frequency}). Our team will contact you shortly with payment
                instructions.
              </p>
            </div>
            <div className="pt-4">
              <Button
                onClick={() => {
                  setStep(1);
                  setIsSuccess(false);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    bankName: "",
                    accountNumber: "",
                  });
                  setCustomAmount("");
                  setSelectedAmount(null);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-xl font-bold"
              >
                Make Another Donation
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {/* Step 1: Bank Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 text-teal-800">
                    <Building2 className="w-6 h-6" />
                    <h3 className="font-bold text-lg">Bank Transfer Details</h3>
                  </div>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between border-b border-teal-100 pb-2">
                      <span className="text-teal-600 font-medium">
                        Bank Name
                      </span>
                      <span className="font-bold">Heritage Bank Limited</span>
                    </div>
                    <div className="flex justify-between border-b border-teal-100 pb-2">
                      <span className="text-teal-600 font-medium">
                        Account Name
                      </span>
                      <span className="font-bold">Islamic Dawah Center </span>
                    </div>
                    <div className="flex justify-between border-b border-teal-100 pb-2">
                      <span className="text-teal-600 font-medium">
                        Account Number
                      </span>
                      <span className="font-bold tracking-wider text-teal-900">
                        9141575
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-600 font-medium">
                        Account Type
                      </span>
                      <span className="font-bold">Savings</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-teal-800 mb-2">
                    <CreditCard className="w-5 h-5" />
                    <h4 className="font-bold">Your Transfer Details</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="bankName"
                        className="font-semibold text-gray-700"
                      >
                        Your Bank Name
                      </Label>
                      <Input
                        id="bankName"
                        placeholder="Bank of Belize"
                        className="h-12 border-gray-100 bg-gray-50 rounded-xl focus:ring-teal-500 focus:border-teal-500"
                        value={formData.bankName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bankName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="accountNumber"
                        className="font-semibold text-gray-700"
                      >
                        Your Account Number
                      </Label>
                      <Input
                        id="accountNumber"
                        placeholder="123456789"
                        className="h-12 border-gray-100 bg-gray-50 rounded-xl focus:ring-teal-500 focus:border-teal-500"
                        value={formData.accountNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accountNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <Info className="w-5 h-5 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Please enter the details of the account you used for the
                    transfer. This helps us verify your donation.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Amount */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-900">
                    Select Frequency
                  </Label>
                  <Tabs
                    value={frequency}
                    className="w-full"
                    onValueChange={setFrequency}
                  >
                    <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-xl h-12">
                      <TabsTrigger
                        value="one-time"
                        className="rounded-lg cursor-pointer data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                      >
                        One-time
                      </TabsTrigger>
                      <TabsTrigger
                        value="monthly"
                        className="rounded-lg cursor-pointer data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                      >
                        Monthly
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-900">
                    Choose an Amount
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_AMOUNTS.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={cn(
                          "h-auto py-4 px-2 rounded-xl border-2 font-bold text-lg transition-all transform active:scale-95 cursor-pointer hover:bg-transparent",
                          selectedAmount === amount
                            ? "border-teal-600 bg-teal-50 text-teal-700 shadow-md"
                            : "border-gray-100 bg-white hover:border-teal-200 hover:bg-gray-50 text-gray-600",
                        )}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-900">
                    Custom Amount
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      className="pl-10 h-14 bg-gray-50 border-gray-100 rounded-xl text-lg focus:ring-teal-500 focus:border-teal-500"
                      value={customAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCustomAmount(value);
                        if (Number(value) > 0) setSelectedAmount(null);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 p-4 bg-teal-50 text-teal-700 rounded-xl border border-teal-100 text-sm font-medium">
                  <Info className="w-4 h-4" />
                  This section is optional. You can complete your donation
                  anonymously.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="font-semibold text-gray-700"
                    >
                      First Name (Optional)
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="h-12 border-gray-100 bg-gray-50 rounded-xl focus:ring-teal-500 focus:border-teal-500"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="font-semibold text-gray-700"
                    >
                      Last Name (Optional)
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="h-12 border-gray-100 bg-gray-50 rounded-xl focus:ring-teal-500 focus:border-teal-500"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-semibold text-gray-700"
                  >
                    Email Address (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 border-gray-100 bg-gray-50 rounded-xl focus:ring-teal-500 focus:border-teal-500"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="h-14 flex-1 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back
                </Button>
              )}
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  isLoading ||
                  (step === 1 &&
                    (!formData.bankName || !formData.accountNumber)) ||
                  (step === 2 && currentAmount <= 0)
                }
                className="h-14 flex-[2] bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-teal-100 transition-all hover:-translate-y-1 active:translate-y-0 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>
                    {step === 1
                      ? "Donate"
                      : step === 3
                        ? "Complete Donation"
                        : "Next Step"}{" "}
                    {step < 3 && <ChevronRight className="w-5 h-5 ml-1" />}
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
