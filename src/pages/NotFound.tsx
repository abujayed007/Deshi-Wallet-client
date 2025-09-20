import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        {/* Big 404 text */}
        <h1 className="text-6xl font-extrabold text-blue-600 text-center mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex justify-center">
          <Link
            to="/"
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
