export default function NotFound() {
    return (
      <div className="relative z-20 flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mt-2">
          Oops! The page you are looking for does not exist.
        </p>
        <a href="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
          Go Back Home
        </a>
      </div>
    );
  }
  