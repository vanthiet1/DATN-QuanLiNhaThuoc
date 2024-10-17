import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SpinnerLoading } from '../ui/loaders';
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const Loading = () => {
  return <div className='loading-spinner'>
    <SpinnerLoading />
  </div>;
};

const SuspenseWrapper = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseWrapper;
