import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết từ Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartBar = ({ labels, dataValues, title }) => {
  const data = {
    labels: labels, // Các nhãn trên trục x
    datasets: [
      {
        label: 'Doanh thu',
        data: dataValues, // Giá trị tương ứng cho mỗi nhãn
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Màu nền của thanh
        borderColor: 'rgba(75, 192, 192, 1)', // Màu viền của thanh
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: title || 'Thống kê biểu đồ cột'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500000 // Điều chỉnh stepSize tùy theo dữ liệu
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartBar;
