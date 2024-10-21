import React, { useState } from 'react';
import { DiaLog } from '../../components/dialog';
import { Button } from '../../components/ui/button';
import { InputText } from '../../components/ui/form';
import Chart from '../../components/ui/chart/Chart';

const ContentLoginExample = () => {
  return (
    <div className='transition-all'>
      <h2 className='mb-4'>Bình An Dược Login</h2>
      <div className='flex flex-col mb-2'>
        <label htmlFor='' className='mb-2'>
          Your Email
        </label>
        <InputText placeholder='email here' size='m' rounded='s' />
      </div>
      <div className='flex flex-col mb-4'>
        <label htmlFor='' className='mb-2'>
          Your password
        </label>
        <InputText placeholder='password here' size='m' rounded='s' />
      </div>
      <div className='flex flex-col mb-4'>
        <label htmlFor='' className='mb-2'>
          Your comfirm password
        </label>
        <InputText placeholder='comfirm password here' size='m' rounded='s' />
      </div>
      <Button size='m' rounded='s' addClassNames='bg-blue-500 text-white hover:bg-blue-600'>
        Login
      </Button>
    </div>
  );
};

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
    <Chart />
      <Button onClick={() => handleOpenModal()} size='m' rounded='s' addClassNames='bg-slate-500 text-white m-5'>
        Click modal
      </Button>
      <DiaLog isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ContentLoginExample />
      </DiaLog>
    </div>
  );
};

export default Dashboard;
