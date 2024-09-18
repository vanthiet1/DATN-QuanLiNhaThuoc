import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Index from './modules/auth';
const App = () => {
  return (
    <div>
      <ToastContainer />
      {/* auth test */}
      <Index/>
    </div>
  );
};

export default App;