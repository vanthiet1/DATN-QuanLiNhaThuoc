// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartLine = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Organic',
        data: [40, 50, 45, 60, 70, 60, 60],
        borderColor: 'teal',
        backgroundColor: 'transparent',
        tension: 0.4
      },
      {
        label: 'Paid',
        data: [30, 45, 65, 50, 30, 40, 55],
        borderColor: '#A513F3',
        backgroundColor: 'transparent',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 10, // Chỉ hiển thị số tròn
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          }
        }
      }
    }
  };

  return (
    <div className='h-[300px]'>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartLine;
