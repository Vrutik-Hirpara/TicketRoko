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

const offers = [
  {
    title: "Flat 20% OFF",
    subtitle: "Up to ₹100",
    description: "On Movies & Events",
    code: "ROKO20",
    bg: "bg-[#EEF3FF]",
    titleColor: "text-[#1D4ED8]",
    button: "bg-[#1D4ED8]",
    image: "/popcorn.png"
  },
  {
    title: "Flat ₹75 OFF",
    subtitle: "On min. booking of ₹499",
    description: "On all categories",
    code: "ROKO75",
    bg: "bg-[#FFF1C9]",
    titleColor: "text-[#C96A00]",
    button: "bg-[#D97706]",
    image: "/filmroll.png"
  },
  {
    title: "Super Saver",
    subtitle: "Get 10% OFF",
    description: "On your first booking",
    code: "HELLO10",
    bg: "bg-[#FFE1EA]",
    titleColor: "text-[#D81B60]",
    button: "bg-[#D81B60]",
    image: "/percentage.png"
  }
];

export const TopOffers = () => {
  return (
  <section className="container-max py-10">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-[32px] font-bold text-black">
        Top Offers for You
      </h2>

      <button className="flex items-center gap-1 text-blue-600 text-sm font-semibold">
        View All
        <span className="text-lg">›</span>
      </button>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {offers.map((offer, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -3 }}
          className={`${offer.bg} rounded-[12px] h-[175px] px-6 py-5 relative overflow-hidden flex items-center`}
        >

          {/* Left Content */}
          <div className="flex flex-col justify-center h-full flex-1 relative z-10">

            <h3
              className={`text-[22px] leading-[26px] font-extrabold ${offer.titleColor}`}
            >
              {offer.title}
            </h3>

            <p className="text-[14px] font-semibold text-black mt-2 leading-[20px]">
              {offer.subtitle}
            </p>

            <p className="text-[13px] text-gray-700 mt-1">
              {offer.description}
            </p>

            <button
              className={`${offer.button} text-white text-[12px] font-semibold px-4 py-2 rounded-lg mt-4 w-fit shadow-sm`}
            >
              Use Code: {offer.code}
            </button>

          </div>

          {/* Right Image */}
          <div className="relative w-[150px] h-[150px] shrink-0 -mr-6 flex items-center justify-center">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              className="object-contain"
            />
          </div>

        </motion.div>
      ))}

    </div>
  </div>
</section>
  );
};