// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';

// const offers = [
//   {
//     title: "Flat 20% OFF",
//     subtitle: "Up to ₹100",
//     description: "On Movies & Events",
//     code: "ROKO20",
//     bg: "bg-blue-50",
//     accent: "bg-blue-600"
//   },
//   {
//     title: "Flat ₹75 OFF",
//     subtitle: "On min. booking of ₹499",
//     description: "On all categories",
//     code: "ROKO75",
//     bg: "bg-orange-50",
//     accent: "bg-orange-500"
//   },
//   {
//     title: "Super Saver",
//     subtitle: "Get 10% OFF",
//     description: "On your first booking",
//     code: "HELLO10",
//     bg: "bg-pink-50",
//     accent: "bg-pink-600"
//   }
// ];

// export const TopOffers = () => {
//   return (
//     <section className="container-max py-12">
//       <div className="flex items-center justify-between mb-10">
//         <h2 className="text-3xl font-extrabold text-[#111827]">Top Offers for You</h2>
//         <button className="text-primary text-sm font-bold hover:underline">View All &rsaquo;</button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {offers.map((offer, idx) => (
//           <motion.div
//             key={idx}
//             whileHover={{ scale: 1.03, translateY: -5 }}
//             className={`${offer.bg} rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-between h-[220px] border border-white shadow-sm hover:shadow-2xl transition-all duration-500`}
//           >
//             <div className="relative z-10">
//               <h3 className={`text-3xl font-black ${offer.accent.replace('bg-', 'text-')} tracking-tighter`}>{offer.title}</h3>
//               <p className="font-bold text-gray-800 text-base mt-2">{offer.subtitle}</p>
//               <p className="text-gray-500 text-sm mt-1">{offer.description}</p>
//             </div>

//             <div className="relative z-10 flex items-center gap-3">
//                <div className="bg-white border-2 border-dashed border-gray-100 px-6 py-2.5 rounded-2xl text-sm font-black text-gray-700 shadow-sm">
//                  Use Code: <span className={offer.accent.replace('bg-', 'text-')}>{offer.code}</span>
//                </div>
//             </div>

//             {/* Decorative Elements */}
//             <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${offer.accent} opacity-5 blur-2xl`} />
//             <div className={`absolute -left-10 -bottom-10 w-40 h-40 rounded-full ${offer.accent} opacity-10 blur-3xl`} />
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };


'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { SectionHeader } from '../ui/SectionHeader';

const offers = [
  {
    title: "Flat 20% OFF",
    subtitle: "Up to ₹100",
    description: "On Movies & Events",
    code: "ROKO20",
    bg: "bg-gradient-to-br from-[#DCE4FA] to-[#BCCBEF]",
    titleColor: "text-[#1E40AF]",
    subtitleColor: "text-[#2563EB]",
    button: "bg-[#2563EB]",
    image: "/popcorn.png"
  },
  {
    title: "Flat ₹75 OFF",
    subtitle: "On min. booking of ₹499",
    description: "",
    code: "ROKO7S",
    bg: "bg-gradient-to-br from-[#FFF9E5] to-[#FFEDC2]",
    titleColor: "text-[#9A5B13]",
    subtitleColor: "text-gray-900",
    button: "bg-[#B36B16]",
    image: "/filmroll.png"
  },
  {
    title: "Super Saver",
    subtitle: "Get 10% OFF",
    description: "On your first booking",
    code: "HELLO10",
    bg: "bg-gradient-to-br from-[#FFEBEE] to-[#FFD8E0]",
    titleColor: "text-[#C2185B]",
    subtitleColor: "text-[#D81B60]",
    button: "bg-[#C2185B]",
    image: "/percentage.png"
  }
];

export const TopOffers = () => {
  return (
  <section className="container-max py-10 footer-gradient ">
  <div className="max-w-7xl mx-auto">

    <SectionHeader 
      title="Top Offers for You" 
      viewAllLink="/offers" 
    />

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">

      {offers.map((offer, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -4 }}
          className={`${offer.bg} rounded-[20px] h-[190px] px-8 py-6 relative overflow-hidden flex items-center shadow-sm`}
        >

          {/* Left Content */}
          <div className="flex flex-col justify-center h-full flex-1 relative z-10">

            <h3
              className={`text-[24px] leading-[28px] font-black ${offer.titleColor}`}
            >
              {offer.title}
            </h3>

            <p className={`text-[16px] font-bold ${offer.subtitleColor} mt-2 leading-none`}>
              {offer.subtitle}
            </p>

            {offer.description && (
              <p className="text-[12px] text-gray-600 mt-2 font-medium">
                {offer.description}
              </p>
            )}

            <button
              className={`${offer.button} text-white text-[12px] font-bold px-5 py-2.5 rounded-lg mt-5 w-fit shadow-md hover:brightness-110 transition-all`}
            >
              Use Code: {offer.code}
            </button>

          </div>

          {/* Right Image */}
          <div className="relative w-[140px] h-[140px] shrink-0 -mr-4 flex items-center justify-center">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              unoptimized
              className="object-contain drop-shadow-xl"
            />
          </div>

        </motion.div>
      ))}

    </div>
  </div>
</section>
  );
};