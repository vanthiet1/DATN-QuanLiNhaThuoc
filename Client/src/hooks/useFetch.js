import { useEffect, useState } from 'react';

const useFetch = (apiService, params = {}, dependences = []) => {
  const controller = new AbortController();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messsageError, setMessageError] = useState('');
  const [responsData, setResponseData] = useState(null);
  const ERROR_MES = 'An error occurred, please try again later.';

  useEffect(() => {
    const handleFetch = async () => {
      setIsLoading(true);
      setIsError(false);
      setMessageError('');

      try {
        const result = await apiService({ ...params, signal: controller.signal });
        setResponseData(result);
      } catch (error) {
        setIsError(true);
        setMessageError(error.message || ERROR_MES);
        setResponseData(null);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetch();
    return () => controller.abort();
  }, dependences);

  return { isLoading, isError, messsageError, responsData };
};
export default useFetch;
