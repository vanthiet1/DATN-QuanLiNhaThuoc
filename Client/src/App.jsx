
import GlobalContextProvider from './contexts/GlobalContext';
import router from './routers/router';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <GlobalContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </GlobalContextProvider>    </>

  );
}

export default App;
