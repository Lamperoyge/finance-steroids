import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
const data = {
  labels: [
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
  ],
  datasets: [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#65B0F6',
      grid: false,
      borderColor: '#65B0F6',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#65B0F6',
      pointBackgroundColor: '#65B0F6',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#65B0F6',
      pointHoverBorderColor: '#65B0F6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0, 0, 0, 0, 0, 72, 45, 67, 55, 42],
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};
export default function LineChart() {
  return (
    <div>
      <Line data={data} options={options} width={400} height={100} />
    </div>
  );
}
