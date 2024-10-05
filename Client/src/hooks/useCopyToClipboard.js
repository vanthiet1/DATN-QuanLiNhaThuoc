import { useState } from 'react';
import { showToastSuccess } from '../configs/toastConfig';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      showToastSuccess('copy success!');
    } catch (error) {
      setIsCopied(false);
    }
  };

  return { isCopied, copyToClipboard };
};

export default useCopyToClipboard;
