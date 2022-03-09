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
      backgroundColor: '#65B0F',
      grid: false,
      borderColor: '#3773f5',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#3773f5',
      pointBackgroundColor: '#1F1D2B',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#3773f5',
      pointHoverBorderColor: '#3773f5',
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
