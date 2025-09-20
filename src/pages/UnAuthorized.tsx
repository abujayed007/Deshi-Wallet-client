import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full shadow-md">
          Unauthorized
        </div>

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          You are not authorized
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Sorry, you don’t have permission to access this page.
        </p>

        <div className="flex justify-center">
          <Link
            to="/"
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-all duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
