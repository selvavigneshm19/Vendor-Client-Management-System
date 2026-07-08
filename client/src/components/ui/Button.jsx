const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`
        w-full
        py-3.5
        rounded-xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-violet-600
        via-purple-600
        to-fuchsia-600
        hover:scale-[1.02]
        hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
        active:scale-[0.98]
        transition-all
        duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;