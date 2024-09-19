import './index.css';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalContextProvider from './contexts/GlobalContext';
import router from './routers/router';
const App = () => {
  return (
    <>
      <GlobalContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </GlobalContextProvider>
    </>
  );
};

export default App;
