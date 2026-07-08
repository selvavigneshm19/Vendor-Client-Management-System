import useAuth from "../../hooks/useAuth";

const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 shadow-xl">

      <h1 className="text-4xl font-bold text-white">
        Welcome Back, {user?.name || "Admin"} 👋
      </h1>

      <p className="mt-3 text-violet-100 text-lg">
        Here's what's happening in your business today.
      </p>

    </div>
  );
};

export default WelcomeBanner;