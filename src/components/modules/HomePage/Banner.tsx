import wallet from "@/assets/images/banner.png";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { Link } from "react-router";

const Banner = () => {
  const { data, isLoading } = useGetUserInfoQuery(undefined);
  const userRole = data?.data?.data?.role;

  // Loading skeleton
  if (isLoading && !userRole) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-7">
        <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
          <div className="hidden md:flex justify-center md:justify-end">
            <Skeleton className="h-72 w-72 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center pt-7">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 md:items-center gap-8">
        <div className="max-w-prose text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Fast, Secure &amp; Reliable
            <strong className="text-indigo-600"> Digital Payments </strong>
            for Everyone
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg sm:leading-relaxed">
            Send, receive, and manage your money anytime, anywhere. Our platform
            ensures seamless transactions with top-notch security, so you can
            focus on what matters most.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/register"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium shadow-sm transition-colors hover:bg-indigo-700 text-sm text-white sm:text-base"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 text-sm sm:text-base"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="hidden md:flex justify-center md:justify-end">
          <img
            src={wallet}
            alt="Wallet banner"
            className="w-3/4 sm:w-2/3 md:w-full max-w-md lg:max-w-lg drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
