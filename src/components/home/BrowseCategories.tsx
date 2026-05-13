
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { SectionHeader } from '../ui/SectionHeader';

const categories = [
  { name: 'Movies', icon: '/movie.svg' },
  { name: 'Events', icon: '/events.svg' },
  { name: 'Plays', icon: '/Plays.svg' },
  { name: 'Sports', icon: '/sports.svg' },
  { name: 'Activities', icon: '/Activity.svg' },
  { name: 'Offers', icon: '/Offers.svg' },
];

export const BrowseCategories = () => {
  return (
    <section className="container-max">
      <style dangerouslySetInnerHTML={{
        __html: `
        .group:hover .blue-icon-hover {
          filter: invert(27%) sepia(91%) saturate(2352%) hue-rotate(211deg) brightness(95%) contrast(93%) !important;
        }
      `}} />
      <div className="max-w-7xl mx-auto">

        <SectionHeader title="Browse by Categories" />

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[140px] flex flex-col items-center justify-center cursor-pointer">

                {/* Icon */}
                <div className="mb-4 flex items-center justify-center w-12 h-12">
                  <Image
                    src={cat.icon}
                    alt={cat.name}
                    width={40}
                    height={40}
                    quality={100}
                    unoptimized
                    className="object-contain group-hover:scale-110 blue-icon-hover transition-all duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-semibold text-black group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>

                {/* Explore */}
                <p className="text-[13px] text-blue-600 font-medium mt-1">
                  Explore Now
                </p>

              </div>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};