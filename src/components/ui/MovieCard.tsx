// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { Heart, Star } from 'lucide-react';
// import { motion } from 'framer-motion';

// export const MovieCard = ({
//   title,
//   description,
//   imageUrl,
// }: {
//   title: string;
//   description?: string;
//   imageUrl?: string | null;
// }) => {
//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-2xl p-2 shadow-xl hover:shadow-xl transition-all duration-300 w-full"
//     >
//       {/* Image Section */}
//       <div className="relative w-full aspect-[16/12] rounded-2xl overflow-hidden mb-4">
//         <Image
//           src={imageUrl || '/placeholder.jpg'} // Fallback image if null
//           alt={title}
//           fill
//           className="object-cover"
//         />

//         {/* Heart Icon */}
//         <button className="absolute top-3 right-3   rounded-full ">
//           <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="px-2 pb-1">
//         <h3 className="text-[18px] font-semibold text-gray-900 line-clamp-1">
//           {title}
//         </h3>

//         <p className="text-[15px] text-gray-500 mt-2 line-clamp-1">
//           {description}
//         </p>


//       </div>
//     </motion.div>
//   );
// };
'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const MovieCard = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description?: string;
  imageUrl?: string | null;
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="w-[246px] bg-white rounded-[18px] p-[4px] shadow-xl"
    >
      {/* IMAGE */}
      <div className="relative w-[238px] h-[161px] rounded-[16px] overflow-hidden">
        <Image
          src={imageUrl || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover"
        />

    
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-[14px] w-[210px] my-[18px] mx-[14px]">
        {/* TITLE */}
        <h3 className="text-[18px] font-semibold leading-[22px] text-black line-clamp-1">
          {title}
        </h3>

        {/* GENRE */}
        <p className="text-[15px] leading-[20px] text-gray-600 line-clamp-1">
          {description}
        </p>

        {/* BOTTOM */}
        <div className="flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center gap-1">
            {/* <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-[16px] font-medium text-black">
              8.2
            </span> */}
          </div>

          {/* Language */}
          <div className="bg-blue-600 text-white text-[14px] font-medium px-4 py-1 rounded-full">
            Gujarati
          </div>
        </div>
      </div>
    </motion.div>
  );
};