// DoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPie = () => {
  const data = {
    labels: ['Shirts', 'Shoes', 'Bags'],
    datasets: [
      {
        label: 'Revenue',
        data: [500, 300, 200],
        backgroundColor: ['#76BFFA', '#5E99CA', '#BF47FF'],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className='flex justify-center h-[300px]'>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ChartPie;
