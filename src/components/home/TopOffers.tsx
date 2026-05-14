// 'use client';

// import React, { useRef } from 'react';
// import Image from 'next/image';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { SectionHeader } from '../ui/SectionHeader';

// const offers = [
//   {
//     title: "Flat 20% OFF",
//     subtitle: "Up to ₹100",
//     description: "On Movies & Events",
//     code: "ROKO20",
//     bg: "bg-gradient-to-br from-[#DCE4FA] to-[#BCCBEF]",
//     titleColor: "text-[#1E40AF]",
//     subtitleColor: "text-[#2563EB]",
//     button: "bg-[#2563EB]",
//     image: "/popcorn.png"
//   },
//   {
//     title: "Flat ₹75 OFF",
//     subtitle: "On min. booking of ₹499",
//     description: "",
//     code: "ROKO7S",
//     bg: "bg-gradient-to-br from-[#FFF9E5] to-[#FFEDC2]",
//     titleColor: "text-[#9A5B13]",
//     subtitleColor: "text-gray-900",
//     button: "bg-[#B36B16]",
//     image: "/filmroll.png"
//   },
//   {
//     title: "Super Saver",
//     subtitle: "Get 10% OFF",
//     description: "On your first booking",
//     code: "HELLO10",
//     bg: "bg-gradient-to-br from-[#FFEBEE] to-[#FFD8E0]",
//     titleColor: "text-[#C2185B]",
//     subtitleColor: "text-[#D81B60]",
//     button: "bg-[#C2185B]",
//     image: "/percentage.png"
//   }
// ];

// export const TopOffers = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   // Absolute sequential reveal: cards start completely hidden and only show in their turn
//   // Using a wider 'zero zone' to ensure they stay hidden until sticky is fully engaged
//   const card1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.4], [0, 0, 1, 1]);
//   const card1X = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.4], [200, 200, 0, 0]);

//   const card2Opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 0.65], [0, 0, 1, 1]);
//   const card2X = useTransform(scrollYProgress, [0, 0.4, 0.6, 0.65], [200, 200, 0, 0]);

//   const card3Opacity = useTransform(scrollYProgress, [0, 0.65, 0.85, 0.95], [0, 0, 1, 1]);
//   const card3X = useTransform(scrollYProgress, [0, 0.65, 0.85, 0.95], [200, 200, 0, 0]);
//   const cardsVisibility = useTransform(
//     scrollYProgress,
//     [0, 0.12, 0.13],
//     ["hidden", "hidden", "visible"]
//   );
//   const cardStyles = [
//     { opacity: card1Opacity, x: card1X },
//     { opacity: card2Opacity, x: card2X },
//     { opacity: card3Opacity, x: card3X }
//   ];

//   return (
//     <div ref={containerRef} className="relative h-[450vh] mt-10">
//       {/* Sticky Container */}
//       <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
//         <section className="container-max py-10">
//           <div className="max-w-7xl mx-auto">

//             <SectionHeader
//               title="Top Offers for You"
//               viewAllLink="/offers"
//             />

//             {/* Cards Grid */}
//            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
//   {offers.map((offer, idx) => (
//     <motion.div
//       key={idx}
//       ref={(el) => { cardRefs.current[idx] = el; }}
//       initial={{ x: 200 }}
//       animate={{ 
//         x: activeCards.includes(idx) ? 0 : 200
//       }}
//       transition={{ 
//         duration: 0.6,
//         delay: activeCards.includes(idx) ? idx * 0.15 : 0
//       }}
//       whileHover={{ y: -4 }}
//       className={`${offer.bg} rounded-[20px] h-[190px] px-8 py-6 relative overflow-hidden flex items-center shadow-sm`}
//     >
//       {/* rest of the card content remains SAME */}
//     </motion.div>
//   ))}
// </div>


//           </div>
//         </section>
//       </div >
//     </div >
//   );
// };

// 'use client';

// import React, { useRef, useEffect, useState } from 'react';
// import Image from 'next/image';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { SectionHeader } from '../ui/SectionHeader';

// const offers = [
//   {
//     title: "Flat 20% OFF",
//     subtitle: "Up to ₹100",
//     description: "On Movies & Events",
//     code: "ROKO20",
//     bg: "bg-gradient-to-br from-[#DCE4FA] to-[#BCCBEF]",
//     titleColor: "text-[#1E40AF]",
//     subtitleColor: "text-[#2563EB]",
//     button: "bg-[#2563EB]",
//     image: "/popcorn.png"
//   },
//   {
//     title: "Flat ₹75 OFF",
//     subtitle: "On min. booking of ₹499",
//     description: "",
//     code: "ROKO7S",
//     bg: "bg-gradient-to-br from-[#FFF9E5] to-[#FFEDC2]",
//     titleColor: "text-[#9A5B13]",
//     subtitleColor: "text-gray-900",
//     button: "bg-[#B36B16]",
//     image: "/filmroll.png"
//   },
//   {
//     title: "Super Saver",
//     subtitle: "Get 10% OFF",
//     description: "On your first booking",
//     code: "HELLO10",
//     bg: "bg-gradient-to-br from-[#FFEBEE] to-[#FFD8E0]",
//     titleColor: "text-[#C2185B]",
//     subtitleColor: "text-[#D81B60]",
//     button: "bg-[#C2185B]",
//     image: "/percentage.png"
//   }
// ];

// export const TopOffers = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeCards, setActiveCards] = useState<number[]>([]);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   // Track scroll progress to activate cards
//   useEffect(() => {
//     const unsubscribe = scrollYProgress.on("change", (value) => {
//       // Card 1 activates between 0.15 and 0.35
//       if (value >= 0.15 && value < 0.4 && !activeCards.includes(0)) {
//         setActiveCards(prev => [...prev, 0].sort());
//       }
//       // Card 2 activates between 0.4 and 0.65
//       else if (value >= 0.4 && value < 0.65 && !activeCards.includes(1)) {
//         setActiveCards(prev => [...prev, 1].sort());
//       }
//       // Card 3 activates between 0.65 and 0.95
//       else if (value >= 0.65 && value <= 1 && !activeCards.includes(2)) {
//         setActiveCards(prev => [...prev, 2].sort());
//       }
      
//       // Deactivate when scrolling back up
//       if (value < 0.15 && activeCards.includes(0)) {
//         setActiveCards(prev => prev.filter(i => i !== 0));
//       }
//       if (value < 0.4 && activeCards.includes(1)) {
//         setActiveCards(prev => prev.filter(i => i !== 1));
//       }
//       if (value < 0.65 && activeCards.includes(2)) {
//         setActiveCards(prev => prev.filter(i => i !== 2));
//       }
//     });
    
//     return () => unsubscribe();
//   }, [scrollYProgress, activeCards]);

//   return (
//     <div ref={containerRef} className="relative h-[450vh] mt-10">
//       {/* Sticky Container */}
//       <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
//         <section className="container-max py-10">
//           <div className="max-w-7xl mx-auto">
//             <SectionHeader
//               title="Top Offers for You"
//               viewAllLink="/offers"
//             />

//             {/* Cards Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
//               {offers.map((offer, idx) => (
//                 <motion.div
//                   key={idx}
//                   ref={(el) => { cardRefs.current[idx] = el; }}
//                   initial={{ x: 200 }}
//                   animate={{ 
//                     x: activeCards.includes(idx) ? 0 : 200
//                   }}
//                   transition={{ 
//                     duration: 0.6,
//                     delay: activeCards.includes(idx) ? idx * 0.15 : 0
//                   }}
//                   whileHover={{ y: -4 }}
//                   className={`${offer.bg} rounded-[20px] h-[190px] px-8 py-6 relative overflow-hidden flex items-center shadow-sm`}
//                 >
//                   {/* Left Content */}
//                   <div className="flex flex-col justify-center h-full flex-1 relative z-10">
//                     <h3 className={`text-[24px] leading-[28px] font-black ${offer.titleColor}`}>
//                       {offer.title}
//                     </h3>

//                     <p className={`text-[16px] font-bold ${offer.subtitleColor} mt-2 leading-none`}>
//                       {offer.subtitle}
//                     </p>

//                     {offer.description && (
//                       <p className="text-[12px] text-gray-600 mt-2 font-medium">
//                         {offer.description}
//                       </p>
//                     )}

//                     <button
//                       className={`${offer.button} text-white text-[12px] font-bold px-5 py-2.5 rounded-lg mt-5 w-fit shadow-md hover:brightness-110 transition-all`}
//                     >
//                       Use Code: {offer.code}
//                     </button>
//                   </div>

//                   {/* Right Image */}
//                   <div className="relative w-[140px] h-[140px] shrink-0 -mr-4 flex items-center justify-center">
//                     <Image
//                       src={offer.image}
//                       alt={offer.title}
//                       fill
//                       unoptimized
//                       className="object-contain drop-shadow-xl"
//                     />
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    code: "ROKO75",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCards, setActiveCards] = useState<number[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track scroll progress to activate cards
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Card 1: 0.10 - 0.30
      if (value >= 0.10 && value < 0.30) {
        setActiveCards(prev => {
          if (!prev.includes(0)) return [...prev, 0].sort();
          return prev;
        });
      }
      // Card 2: 0.30 - 0.55
      else if (value >= 0.30 && value < 0.55) {
        setActiveCards(prev => {
          if (!prev.includes(1)) return [...prev, 1].sort();
          return prev;
        });
      }
      // Card 3: 0.55 - 1.00
      else if (value >= 0.55 && value <= 1) {
        setActiveCards(prev => {
          if (!prev.includes(2)) return [...prev, 2].sort();
          return prev;
        });
      }
      
      // Remove cards when scrolling back up
      if (value < 0.10) {
        setActiveCards([]);
      } else if (value < 0.30 && activeCards.includes(1)) {
        setActiveCards(prev => prev.filter(i => i !== 1 && i !== 2));
      } else if (value < 0.55 && activeCards.includes(2)) {
        setActiveCards(prev => prev.filter(i => i !== 2));
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, activeCards]);

  return (
    <div ref={containerRef} className="relative  ">
      {/* Sticky Container */}
      <div className="sticky top-0 h-[65vh] flex flex-col  justify-center ">
        <section className="container-max ">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Top Offers for You"
              viewAllLink="/offers"
            />

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
              {offers.map((offer, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ 
                    opacity: activeCards.includes(idx) ? 1 : 0,
                    x: activeCards.includes(idx) ? 0 : 200
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: activeCards.includes(idx) ? idx * 0.1 : 0
                  }}
                  whileHover={{ y: -4 }}
                  className={`${offer.bg} rounded-[20px] h-[190px] px-8 py-6 relative overflow-hidden flex items-center shadow-sm`}
                  style={{ opacity: 0 }} // Force initial hidden
                >
                  {/* Left Content */}
                  <div className="flex flex-col justify-center h-full flex-1 relative z-10">
                    <h3 className={`text-[24px] leading-[28px] font-black ${offer.titleColor}`}>
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
      </div>
    </div>
  );
};