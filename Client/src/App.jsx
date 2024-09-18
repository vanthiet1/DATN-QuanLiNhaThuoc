import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
  const handleOnclick = (e) => {
    alert('xin chào!');
  };
  return (
    <div>
      <ToastContainer />
      {/* auth test */}
      {/* <Index/> */}
     
    </div>
  );
};

export default App;
