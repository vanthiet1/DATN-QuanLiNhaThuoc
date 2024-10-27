import { Suspense, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="p-4 text-center">
    <p className="text-red-500 font-semibold">Something went wrong:</p>
    <pre className="text-gray-700">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      Try again
    </button>
  </div>
);

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <img
        src="http://localhost:5173/src/assets/images/logo/logo1.png"
        alt="Bình An Dược"
        className="w-max h-24 animate-pulse"
      />
    </div>
  );
};

const SuspenseWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    },1000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      )}
    </ErrorBoundary>
  );
};

export default SuspenseWrapper;
