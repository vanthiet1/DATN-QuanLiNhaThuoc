import { toast } from 'react-toastify';

export const toastConfig = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const showToastSuccess = (message) => {
  toast.success(message, toastConfig);
};

export const showToastError = (message) => {
  toast.error(message, toastConfig);
};