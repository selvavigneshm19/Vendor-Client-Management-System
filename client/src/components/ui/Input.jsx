const Input = ({
  label,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-300 font-medium">
        {label}
      </label>

      <div className="relative">

        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />

        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <RightIcon size={18} />
          </button>
        )}

      </div>
    </div>
  );
};

export default Input;