import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from './components/ui/input';
import Index from './modules/auth';
const App = () => {
  const data = [
    {
      id: 1,
      first_name: "Janessa",
      last_name: "Kneesha",
      email: "jkneesha0@about.com",
      gender: "Female",
      ip_address: "152.114.187.73"
    },
    {
      id: 2,
      first_name: "Hakim",
      last_name: "Reinhard",
      email: "hreinhard1@mapquest.com",
      gender: "Genderfluid",
      ip_address: "62.144.244.28"
    },
  ];
  return (
    <div>
      <ToastContainer />
      <Input
        type="text"
        placeholder="Input 1"
        leftIcon={<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>}
        addClassNames={'bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#333] dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-[30px] focus:ring-[1px] duration-200 relative'}
      />
      <br />
      <Input
        type="text"
        placeholder="Input 2"
        addClassNames={'bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  focus:ring-[1px] duration-200 relative'}
      />
<Index></Index>
    </div>

  );
};

export default App;
