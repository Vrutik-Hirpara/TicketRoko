// 'use client';

// import React from 'react';
// import { Film, Calendar, Theater, Trophy, Bike, Tag } from 'lucide-react';
// import { motion } from 'framer-motion';

// const categories = [
//   { name: 'Movies', icon: Film, color: 'text-blue-500' },
//   { name: 'Events', icon: Calendar, color: 'text-orange-500' },
//   { name: 'Plays', icon: Theater, color: 'text-purple-500' },
//   { name: 'Sports', icon: Trophy, color: 'text-green-500' },
//   { name: 'Activities', icon: Bike, color: 'text-blue-400' },
//   { name: 'Offers', icon: Tag, color: 'text-red-500' },
// ];

// export const BrowseCategories = () => {
//   return (
//     <section className="container-max">
//       <h2 className="text-3xl font-extrabold text-[#111827] mb-10">Browse by Categories</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
//         {categories.map((cat) => (
//           <motion.div
//             key={cat.name}
//             whileHover={{ scale: 1.05, translateY: -8 }}
//             className="flex flex-col items-center justify-center p-10 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group"
//           >
//             <div className={`p-6 rounded-[24px] bg-gray-50 mb-6 group-hover:bg-primary/5 transition-colors duration-500`}>
//               <cat.icon className={`h-10 w-10 ${cat.color} group-hover:scale-110 transition-transform duration-500`} />
//             </div>
//             <span className="font-bold text-[#111827] text-lg tracking-tight">{cat.name}</span>
//             <span className="text-primary text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all font-black uppercase tracking-widest">Explore</span>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };
'use client';

import React from 'react';
import { Film, Calendar, Theater, Trophy, Bike, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Movies', icon: Film },
  { name: 'Events', icon: Calendar },
  { name: 'Plays', icon: Theater },
  { name: 'Sports', icon: Trophy },
  { name: 'Activities', icon: Bike },
  { name: 'Offers', icon: Tag },
];

export const BrowseCategories = () => {
  return (
    <section className="container-max">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-[28px] font-bold text-black mb-8">
          Browse by Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[140px] flex flex-col items-center justify-center cursor-pointer">

                {/* Icon */}
                <div className="mb-4">
                  <cat.icon className="w-9 h-9 text-black group-hover:text-blue-600 transition-colors duration-300" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-semibold text-black">
                  {cat.name}
                </h3>

                {/* Explore */}
                <p className="text-[13px] text-blue-600 font-medium mt-1">
                  Explore Now
                </p>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};