import ChartLine from './ChartLine/ChartLine';
import ChartPie from './ChartPie/ChartPie';

function Chart() {
  return (
    <div className='flex w-[100%] h-[400px] items-center justify-center gap-5 mt-5'>
      <div className='w-[46%] h-auto p-5 bg-white shadow-md'>
        <h3 className='font-bold pb-5 '>User Analytics</h3>
        <ChartLine />
      </div>
      <div className='w-[46%] h-auto p-5 bg-white flex flex-col shadow-md'>
        <h3 className='font-bold pb-5 '>Revenue</h3>
        <ChartPie />
      </div>
    </div>
  );
}

export default Chart;
