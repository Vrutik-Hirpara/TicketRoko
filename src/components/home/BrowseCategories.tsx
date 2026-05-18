
// 'use client';

// import Image from 'next/image';
// import { motion } from 'framer-motion';

// import { SectionHeader } from '../ui/SectionHeader';

// const categories = [
//   { name: 'Movies', icon: '/movie.svg' },
//   { name: 'Events', icon: '/events.svg' },
//   { name: 'Plays', icon: '/Plays.svg' },
//   { name: 'Sports', icon: '/sports.svg' },
//   { name: 'Activities', icon: '/Activity.svg' },
//   { name: 'Offers', icon: '/Offers.svg' },
// ];

// export const BrowseCategories = () => {
//   return (
//     <section className="container-max">
//       <style dangerouslySetInnerHTML={{
//         __html: `
//         .group:hover .blue-icon-hover {
//           filter: invert(27%) sepia(91%) saturate(2352%) hue-rotate(211deg) brightness(95%) contrast(93%) !important;
//         }
//       `}} />
//       <div className="max-w-7xl mx-auto">

//         <SectionHeader title="Browse by Categories" />

//         <motion.div 
//           variants={{
//             hidden: { opacity: 0 },
//             visible: {
//               opacity: 1,
//               transition: { staggerChildren: 0.1 }
//             }
//           }}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-10"
//         >
//           {categories.map((cat) => (
//             <motion.div
//               key={cat.name}
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 }
//               }}
//               whileHover={{ y: -8 }}
//               className="group"
//             >
//               <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[140px] flex flex-col items-center justify-center cursor-pointer">

//                 {/* Icon */}
//                 <div className="mb-4 flex items-center justify-center w-12 h-12">
//                   <Image
//                     src={cat.icon}
//                     alt={cat.name}
//                     width={40}
//                     height={40}
//                     quality={100}
//                     unoptimized
//                     className="object-contain group-hover:scale-110 blue-icon-hover transition-all duration-300"
//                   />
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-[17px] font-semibold text-black group-hover:text-blue-600 transition-colors">
//                   {cat.name}
//                 </h3>

//                 {/* Explore */}
//                 <p className="text-[13px] text-blue-600 font-medium mt-1">
//                   Explore Now
//                 </p>

//               </div>
//             </motion.div>
//           ))}

//         </motion.div>
//       </div>
//     </section>
//   );
// };

// 'use client';

// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { SectionHeader } from '../ui/SectionHeader';

// const categories = [
//   { name: 'Movies', icon: '/movie.svg', bgColor: 'bg-blue-50' },
//   { name: 'Events', icon: '/events.svg', bgColor: 'bg-orange-50' },
//   { name: 'Plays', icon: '/Plays.svg', bgColor: 'bg-purple-50' },
//   { name: 'Sports', icon: '/sports.svg', bgColor: 'bg-green-50' },
//   { name: 'Activities', icon: '/Activity.svg', bgColor: 'bg-pink-50' },
//   { name: 'Offers', icon: '/Offers.svg', bgColor: 'bg-yellow-50' },
// ];

// export const BrowseCategories = () => {
//   return (
//     <section className="container-max py-10">
//       <div className="max-w-7xl mx-auto px-4">
//         <SectionHeader title="Browse by Categories" />

//         <motion.div 
//           variants={{
//             hidden: { opacity: 0 },
//             visible: {
//               opacity: 1,
//               transition: { staggerChildren: 0.1 }
//             }
//           }}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-10"
//         >
//           {categories.map((cat) => (
//             <motion.div
//               key={cat.name}
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 }
//               }}
//               whileHover={{ y: -5 }}
//               className="group cursor-pointer"
//             >
//               <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 py-4 flex flex-col items-center justify-center">

//                 {/* આઈકોન કન્ટેનર - ઈમેજ 2 મુજબ સર્કલ બેકગ્રાઉન્ડ */}
//                 <div className={`w-20 h-20 ${cat.bgColor} rounded-full mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
//                   <div className="relative w-10 h-10">
//                     <Image
//                       src={cat.icon}
//                       alt={cat.name}
//                       fill
//                       className="object-contain"
//                       unoptimized
//                     />
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-[17px] font-semibold text-gray-800 transition-colors">
//                   {cat.name}
//                 </h3>

//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// 'use client';

// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { SectionHeader } from '../ui/SectionHeader';

// const categories = [
//   { name: 'Movies', icon: '/movie.svg', bgColor: 'bg-blue-50' ,bgBoxColor: 'bg-blue-100'},
//   { name: 'Events', icon: '/events.svg', bgColor: 'bg-orange-50', bgBoxColor: 'bg-orange-100'},
//   { name: 'Plays', icon: '/Plays.svg', bgColor: 'bg-purple-50' ,bgBoxColor: 'bg-purple-100'},
//   { name: 'Sports', icon: '/sports.svg', bgColor: 'bg-green-50' ,bgBoxColor: 'bg-green-100'},
//   { name: 'Activities', icon: '/Activity.svg', bgColor: 'bg-pink-50', bgBoxColor: 'bg-pink-100'},
//   { name: 'Offers', icon: '/Offers.svg', bgColor: 'bg-yellow-50', bgBoxColor: 'bg-yellow-100'},
// ];

// export const BrowseCategories = () => {
//   return (
//     <section className="container-max py-10">
//       <div className="max-w-7xl mx-auto px-4">
//         <SectionHeader title="Browse by Categories" />

//         <motion.div 
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={{
//             hidden: { opacity: 0 },
//             visible: {
//               opacity: 1,
//               transition: { staggerChildren: 0.1 }
//             }
//           }}
//           className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-10"
//         >
//           {categories.map((cat) => (
//             <motion.div
//               key={cat.name}
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 }
//               }}
//               whileHover={{ y: -5 }}
//               className="group cursor-pointer"
//             >
//               <div className={`${cat.bgBoxColor} rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 py-4 flex flex-col items-center justify-center`}>

//                 {/* આઈકોન કન્ટેનર વિથ રોટેશન એનિમેશન */}
//                 <motion.div 
//                   // જ્યારે આખા કાર્ડ (group) પર હોવર થાય ત્યારે આઈકોન 360 ડિગ્રી ફરશે
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6, ease: "easeInOut" }}
//                   className={`w-20 h-20 ${cat.bgColor} rounded-full mb-4 flex items-center justify-center`}
//                 >
//                   <div className="relative w-10 h-10">
//                     <Image
//                       src={cat.icon}
//                       alt={cat.name}
//                       fill
//                       className="object-contain"
//                       unoptimized
//                     />
//                   </div>
//                 </motion.div>

//                 {/* Title */}
//                 <h3 className="text-[17px] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
//                   {cat.name}
//                 </h3>

//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };
'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';

const categories = [
  { name: 'Movies', icon: '/movie.svg', bgColor: 'bg-blue-50' ,bgBoxColor: 'bg-blue-100'},
  { name: 'Events', icon: '/events.svg', bgColor: 'bg-orange-50', bgBoxColor: 'bg-orange-100'},
  { name: 'Plays', icon: '/Plays.svg', bgColor: 'bg-purple-50' ,bgBoxColor: 'bg-purple-100'},
  { name: 'Sports', icon: '/sports.svg', bgColor: 'bg-green-50' ,bgBoxColor: 'bg-green-100'},
  { name: 'Activities', icon: '/Activity.svg', bgColor: 'bg-pink-50', bgBoxColor: 'bg-pink-100'},
  { name: 'Offers', icon: '/Offers.svg', bgColor: 'bg-yellow-50', bgBoxColor: 'bg-yellow-100'},
];

// આઈકોન માટેના વેરિઅન્ટ્સ
const iconVariants: Variants = {
  initial: { 
    rotate: 0 
  },
  hover: { 
    rotate: 360 
  }
};

export const BrowseCategories = () => {
  return (
    <section className="container-max py-10">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Browse by Categories" />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-10"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              initial="initial"
              whileHover="hover"
              // variants={{
              //   hidden: { opacity: 0, y: 20 },
              //   visible: { opacity: 1, y: 0 },
              //   hover: { y: -8 }
              // }}
              // // આ ટ્રાન્ઝિશન કાર્ડના ઉપર-નીચે જવાને સ્મૂથ રાખશે (બંને બાજુ)
              // transition={{ duration: 0.4, ease: "easeInOut" }}
              className="group cursor-pointer"
            >
              <div className={`${cat.bgBoxColor} rounded-xl border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-500 py-4 flex flex-col items-center justify-center`}>

                <motion.div 
                  // variants={iconVariants}
                  // // અહીં ટ્રાન્ઝિશન આપવાથી તે રિવર્સ અને ફોરવર્ડ બંને વખતે સેમ સ્મૂથનેસ રાખશે
                  // transition={{ duration: 0.6, ease: "easeInOut" }}
                  className={`w-20 h-20 ${cat.bgColor} rounded-full mb-4 flex items-center justify-center shadow-inner`}
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src={cat.icon}
                      alt={cat.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </motion.div>

                <h3 className="text-[17px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};