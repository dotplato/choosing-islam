"use client";

import { useState } from "react";
import {
  Lock,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  DollarSign,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { DonateGallery } from "@/components/donate/DonateGallery";
import { ImpactStats } from "@/components/donate/ImpactStats";

const STEPS = [
  { id: 1, name: "Amount" },
  { id: 2, name: "Details" },
];

const PRESET_AMOUNTS = [10, 25, 100, 250];

export default function DonatePage() {
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
    if (step === 1 && currentAmount <= 0) return;
    if (step === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email) return;

      setIsLoading(true);
      try {
        const templateParams = {
          from_name: `${formData.firstName} ${formData.lastName}`,
          fname: formData.firstName,
          lname: formData.lastName,
          first_name: formData.firstName,
          last_name: formData.lastName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          from_email: formData.email,
          user_email: formData.email,
          sender_email: formData.email,
          email: formData.email,
          reply_to: formData.email,
          amount: currentAmount,
          frequency: frequency,
          to_name: "Islamic Dawah Center of Belize",
        };

        console.log("Sending donation details to EmailJS:", templateParams);

        const result = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
        );

        console.log("EmailJS Result:", result.text);
        setIsSuccess(true);
      } catch (error) {
        console.error("Failed to send email:", error);
        alert(
          "There was an error processing your request. Please check the browser console for details."
        );
      } finally {
        setIsLoading(false);
      }
    } else if (step < 2) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Support Our Mission
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            Your generous contribution helps us continue spreading the message
            of Islam and supporting the community.
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-none shadow-xl overflow-hidden rounded-2xl bg-white">
          {/* Progress Indicator */}
          <div className="bg-gray-50/50 border-b px-8 py-6">
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
                        : "bg-gray-300"
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      step === s.id ? "text-teal-600" : "text-gray-400"
                    )}
                  >
                    {s.name}
                  </span>
                  {s.id < 2 && (
                    <div className="w-8 h-[2px] bg-gray-200 mx-2 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <CardContent className="p-8">
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
                    Thank you, {formData.firstName}! We have received your
                    donation request of ${currentAmount} ({frequency}). Our team
                    will contact you shortly with payment instructions.
                  </p>
                </div>
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setStep(1);
                      setIsSuccess(false);
                      setFormData({ firstName: "", lastName: "", email: "" });
                      setCustomAmount("");
                      setSelectedAmount(null);
                    }}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-xl font-bold"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">
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
                      <Label className="text-base font-semibold">
                        Choose an Amount
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PRESET_AMOUNTS.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount("");
                            }}
                            className={cn(
                              "py-4 px-2 rounded-xl border-2 font-bold text-lg transition-all transform active:scale-95 cursor-pointer",
                              selectedAmount === amount
                                ? "border-teal-600 bg-teal-50 text-teal-700 shadow-md"
                                : "border-gray-100 bg-white hover:border-teal-200 hover:bg-gray-50 text-gray-600"
                            )}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-semibold">
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

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-semibold">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="h-12 border-gray-100 bg-gray-50 rounded-xl"
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
                        <Label htmlFor="lastName" className="font-semibold">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="h-12 border-gray-100 bg-gray-50 rounded-xl"
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
                      <Label htmlFor="email" className="font-semibold">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="h-12 border-gray-100 bg-gray-50 rounded-xl"
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
                      (step === 1 && currentAmount <= 0) ||
                      (step === 2 &&
                        (!formData.firstName ||
                          !formData.lastName ||
                          !formData.email))
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
                        {step === 2 ? "Complete Donation" : "Next Step"}
                        {step < 2 && <ChevronRight className="w-5 h-5 ml-1" />}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto mt-12">
        <DonateGallery />
      </div>

      {/* Impact Stats Section */}
      <ImpactStats />
    </div>
  );
}
