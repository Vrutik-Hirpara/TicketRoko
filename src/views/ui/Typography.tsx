import React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({ variant = 'p', children, className }) => {
  const Component = variant;
  
  const styles = {
    h1: "text-[44px] font-black leading-tight",
    h2: "text-[28px] font-black",
    h3: "text-[20px] font-bold",
    p: "text-[16px] font-medium",
    span: "text-[14px] font-normal",
  };

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
};
