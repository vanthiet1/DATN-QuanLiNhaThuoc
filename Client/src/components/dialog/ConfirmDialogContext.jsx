import { useContext, createContext, useState, useRef } from 'react';
import DiaLogAlert from './DiaLogAlert';

const ConfirmDialogContext = createContext();

const ConfirmDialogProvider = ({ children }) => {
  const [state, setState] = useState({ isOpen: false });
  const fn = useRef();

  const confirm = (data) => {
    return new Promise((resolve) => {
      setState({ ...data, isOpen: true });
      fn.current = (choice) => {
        resolve(choice);
        setState({ isOpen: false });
      };
    });
  };

  return (
    <ConfirmDialogContext.Provider value={confirm}>
      {children}
      <DiaLogAlert
        {...state}
        onCancel={() => fn.current && fn.current(false)}
        onConfirm={() => fn.current && fn.current(true)}
      />
    </ConfirmDialogContext.Provider>
  );
};

const useConfirmDialog = () => {
  return useContext(ConfirmDialogContext);
};

export { useConfirmDialog, ConfirmDialogProvider };
