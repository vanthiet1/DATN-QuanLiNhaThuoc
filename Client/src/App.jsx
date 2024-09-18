import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Index from './modules/auth';
import { Button } from './components/ui/button';

const UserIcon = () => {
  return (
    <svg fill='currentColor' viewBox='0 0 20 20' class='w-5 h-5'>
      <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'></path>
    </svg>
  );
};

const App = () => {
  const handleOnclick = (e) => {
    alert('xin chào!');
  };
  return (
    <div>
      <ToastContainer />
      {/* auth test */}
      {/* <Index/> */}
      <Button addClassNames={'text-gray-200 py-10 px-[60px]'} onClick={(e) => handleOnclick()} rightIcon={UserIcon}>
        sss
      </Button>
    </div>
  );
};

export default App;
