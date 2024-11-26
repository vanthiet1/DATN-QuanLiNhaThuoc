// DoughnutChart.js
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPie = ({ labels, dataValues }) => {
  const data = {
    labels: labels, // Tên các sản phẩm
    datasets: [
      {
        label: 'Số lượng bán',
        data: dataValues, // Số lượng bán tương ứng
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ChartPie data={data} options={options} />
    </div>
  );
};

export default ChartPie;
