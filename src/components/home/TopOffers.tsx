'use client';

import React from 'react';
import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';

const offers = [
  { title: "Flat 20% OFF", subtitle: "Up to ₹100", description: "On Movies & Events", code: "ROKO20", bg: "bg-gradient-to-br from-[#DCE4FA] to-[#BCCBEF]", titleColor: "text-[#1E40AF]", subtitleColor: "text-[#2563EB]", button: "bg-[#2563EB]", image: "/popcorn.png" },
  { title: "Flat ₹75 OFF", subtitle: "On min. booking of ₹499", description: "", code: "ROKO75", bg: "bg-gradient-to-br from-[#FFF9E5] to-[#FFEDC2]", titleColor: "text-[#9A5B13]", subtitleColor: "text-gray-900", button: "bg-[#B36B16]", image: "/filmroll.png" },
  { title: "Super Saver", subtitle: "Get 10% OFF", description: "On your first booking", code: "HELLO10", bg: "bg-gradient-to-br from-[#FFEBEE] to-[#FFD8E0]", titleColor: "text-[#C2185B]", subtitleColor: "text-[#D81B60]", button: "bg-[#C2185B]", image: "/percentage.png" }
];

export const TopOffers = () => {
  return (
    <div className="container-max py-20">
      <section className="container-max px-4">
        <div className="max-w-7xl mx-auto">

          <SectionHeader
            title="Top Offers for You"
            viewAllLink="/offers"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            {offers.map((offer, idx) => (
              <div
                key={idx}
                className={`${offer.bg} rounded-[20px] h-[190px] px-8 py-6 relative overflow-hidden flex items-center shadow-lg`}
              >
                <div className="flex flex-col justify-center h-full flex-1 relative z-10">

                  <h3 className={`text-[24px] font-black ${offer.titleColor} whitespace-nowrap`}>
                    {offer.title}
                  </h3>

                  <p className={`text-[16px] font-bold ${offer.subtitleColor} mt-2`}>
                    {offer.subtitle}
                  </p>

                  {offer.description && (
                    <p className="text-[12px] text-gray-600 mt-2 font-medium">
                      {offer.description}
                    </p>
                  )}

                  <button
                    className={`${offer.button} text-white text-[12px] font-bold px-2 py-2.5 rounded-lg mt-5 w-fit`}
                  >
                    Use Code: {offer.code}
                  </button>
                </div>

                <div className="relative w-[120px] h-[120px] shrink-0">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};