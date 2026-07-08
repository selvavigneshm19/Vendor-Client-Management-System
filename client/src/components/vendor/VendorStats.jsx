const VendorStats = ({ vendors }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
      Total Vendors: {vendors.length}
    </div>
  );
};

export default VendorStats;