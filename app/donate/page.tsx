"use client";

import { DonateGallery } from "@/components/donate/DonateGallery";
import { ImpactStats } from "@/components/donate/ImpactStats";
import DonateForm from "@/components/donate/DonateForm";

export default function DonatePage() {
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

        {/* Donation Form Component */}
        <DonateForm />
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
