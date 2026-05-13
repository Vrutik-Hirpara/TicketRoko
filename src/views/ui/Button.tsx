// import React from 'react';
// import { motion } from 'framer-motion';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'outline';
//   children: React.ReactNode;
// }

// export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
//   const baseStyles = "transition-all duration-300 flex items-center justify-center active:scale-95";
  
//   const variants = {
//     primary: "btn-primary",
//     secondary: "bg-gray-100 text-black rounded-full px-6 py-2 hover:bg-gray-200",
//     outline: "border border-gray-200 text-gray-700 rounded-full px-6 py-2 hover:bg-gray-50",
//   };

//   return (
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       className={`${baseStyles} ${variants[variant]} ${className}`}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {

  const baseStyles =
    "transition-all duration-300 flex items-center justify-center active:scale-95";

  const variants = {
    primary: "btn-primary",
    secondary:
      "bg-gray-100 text-black rounded-full px-6 py-2 hover:bg-gray-200",
    outline:
      "border border-gray-200 text-gray-700 rounded-full px-6 py-2 hover:bg-gray-50",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};