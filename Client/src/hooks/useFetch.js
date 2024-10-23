import { useEffect, useState } from 'react';

const useFetch = (apiServices, params = {}, dependences = []) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, SetIsSuccess] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [responsData, setResponseData] = useState(null);
  const ERROR_MES = 'An error occurred, please try again later.';

  useEffect(() => {
    const controller = new AbortController();
    const handleFetch = async () => {
      setIsLoading(true);
      setIsError(false);
      setMessageError('');
      SetIsSuccess(false);

      try {
        let result = null;
        if (Array.isArray(apiServices)) {
          result = await Promise.all(
            apiServices.map((apiService) => apiService({ ...params, signal: controller.signal }))
          );
        } else {
          result = await apiServices({ ...params, signal: controller.signal });
        }
        setResponseData(result);
        SetIsSuccess(true);
      } catch (error) {
        setIsError(true);
        setMessageError(error.message || ERROR_MES);
        setResponseData(null);
      } finally {
        setIsLoading(false);
        SetIsSuccess(false);
      }
    };

    handleFetch();
    return () => controller.abort();
  }, dependences);

  return { isLoading, isError, messageError, responsData, isSuccess };
};
export default useFetch;
