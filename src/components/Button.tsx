import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  const baseClasses = 'font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg';
  
  const variantClasses = {
    primary: 'bg-kamora-orange hover:bg-kamora-red text-white',
    secondary: 'bg-kamora-cream hover:bg-orange-100 text-kamora-dark border border-kamora-orange',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
