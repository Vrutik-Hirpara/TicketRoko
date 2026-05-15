'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const ClubBanner = () => {
  return (
    <section className="container-max ">
      <div className="w-full max-w-7xl mx-auto ">
        <div className="w-full banner-gradient rounded-[24px] pl-8 md:pl-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl border border-white/5">

          {/* Decorative Orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          {/* Left Content */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
              Join TicketRoko Club
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mb-6">
              More Points. More Movies.
            </h3>
            <p className="text-white/60 text-base md:text-lg mb-10 max-w-md mx-auto md:mx-0 font-medium">
              Earn points on every booking and unlock exclusive rewards, early access, and special screenings.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-10 py-4 rounded-2xl font-black text-base hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all duration-300"
            >
              Join Now – It's Free!
            </motion.button>
          </div>

          {/* Right Image - Gift Card */}
          <div className="relative z-10 mt-32 md:mt-24 ml-8 md:ml-14">
            <div className="relative w-[360px] h-[260px] md:w-[430px] md:h-[340px]">
              <Image
                src="/giftcard.png"
                alt="TicketRoko Club Card"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
