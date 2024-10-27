
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobalContextProvider from './contexts/GlobalContext';
import router from './routers/router';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
// import UseCheckIsActiveAccount from './hooks/useCheckIsActiveAccount';

const App = () => {
  return (
    <>
        <GlobalContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
        </GlobalContextProvider>
    </>
  );
}

export default App;
