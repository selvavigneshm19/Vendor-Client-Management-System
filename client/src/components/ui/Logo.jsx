const Logo = () => {
  return (
    <div className="flex items-center gap-3 mb-8">

      <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
        V
      </div>

      <div>

        <h1 className="text-2xl font-bold text-white">
          VCMS
        </h1>

        <p className="text-gray-400 text-sm">
          Vendor Client Management
        </p>

      </div>

    </div>
  );
};

export default Logo;